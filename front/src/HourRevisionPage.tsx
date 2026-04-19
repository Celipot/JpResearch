import { useState } from 'react';
import type { HourResult } from './types/revision';
import { getRandomHour, checkAnswer as checkAnswerService } from './services/revisionService';
import { useRevisionSession, type Mode } from './hooks/useRevisionSession';
import { useSpeech } from './hooks/useSpeech';
import { ModeSelector } from './components/organisms/ModeSelector';
import { AnswerInput } from './components/molecules/AnswerInput';
import { FeedbackDisplay } from './components/molecules/FeedbackDisplay';
import { PronunciationPanel } from './components/organisms/PronunciationPanel';

const formatTime = (hour: number, minute: number): string =>
  `${hour}時${minute < 10 ? '0' : ''}${minute}分`;

export default function HourRevisionPage() {
  const [mode, setMode] = useState<Mode>('jp-to-fr');
  const [result, setResult] = useState<HourResult | null>(null);
  const {
    loading,
    setLoading,
    userAnswer,
    onAnswerChange,
    feedback,
    setFeedback,
    showPronunciation,
    setShowPronunciation,
    reset,
  } = useRevisionSession();
  const { speak, speakAndRemember, replay } = useSpeech();

  const fetchHour = async () => {
    setLoading(true);
    reset();
    try {
      const data = await getRandomHour();
      setResult(data);
      if (mode === 'jp-to-fr') {
        const spoken =
          data.allPronunciations[Math.floor(Math.random() * data.allPronunciations.length)];
        speakAndRemember(spoken.hiragana);
      }
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setResult(null);
    reset();
  };

  const submitAnswer = async () => {
    if (!result || !userAnswer.trim()) return;
    if (mode === 'fr-to-jp') {
      const correct = await checkAnswerService(
        userAnswer.trim(),
        result.allPronunciations.map((p) => p.hiragana)
      );
      setFeedback(correct ? 'correct' : 'incorrect');
    } else {
      const userTime = userAnswer.trim().toLowerCase().replace(/\s+/g, '');
      const kanjiFormat = formatTime(result.hour, result.minute).toLowerCase();
      const hFormat = `${result.hour}h${result.minute < 10 ? '0' : ''}${result.minute}`;
      setFeedback(userTime === kanjiFormat || userTime === hFormat ? 'correct' : 'incorrect');
    }
  };

  const correctAnswers = result
    ? result.allPronunciations.map((p) => `${p.hiragana} / ${p.romaji}`).join(' ou ')
    : '';

  return (
    <div className="container">
      <h1>Révision d&apos;heures</h1>

      <ModeSelector mode={mode} onModeChange={handleModeChange} />

      <button onClick={fetchHour} disabled={loading}>
        {loading ? 'Chargement...' : 'Nouvelle heure'}
      </button>

      {result !== null && (
        <div className="revision-section">
          {mode === 'jp-to-fr' ? (
            <>
              <div className="audio-section">
                <button className="speak-btn" onClick={replay}>
                  🔊 Réécouter
                </button>
              </div>
              <AnswerInput
                label="Quelle heure est-ce ? (format: XhYY)"
                value={userAnswer}
                placeholder="Ex: 12h30"
                onChange={onAnswerChange}
                onSubmit={submitAnswer}
              />
            </>
          ) : (
            <>
              <p className="number">{formatTime(result.hour, result.minute)}</p>
              <AnswerInput
                label="Écrivez en hiragana ou romaji :"
                value={userAnswer}
                placeholder="Ex: じゅうにじさんじゅっぷん / juunijisanjuppun"
                onChange={onAnswerChange}
                onSubmit={submitAnswer}
              />
            </>
          )}

          <FeedbackDisplay
            feedback={feedback}
            correctMessage={
              mode === 'jp-to-fr' && (
                <> C&apos;était bien {formatTime(result.hour, result.minute)}.</>
              )
            }
            incorrectMessage={
              mode === 'jp-to-fr' ? (
                <> La réponse était {formatTime(result.hour, result.minute)}.</>
              ) : (
                <> La réponse était : {correctAnswers}.</>
              )
            }
          />

          {feedback !== null && (
            <PronunciationPanel
              pronunciations={result.allPronunciations}
              visible={showPronunciation}
              onToggle={() => setShowPronunciation(!showPronunciation)}
              onSpeak={speak}
            />
          )}
        </div>
      )}
    </div>
  );
}
