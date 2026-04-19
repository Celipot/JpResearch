import { useState } from 'react';
import type { DateResult } from './types/revision';
import { getRandomDate, checkAnswer as checkAnswerService } from './services/revisionService';
import { useRevisionSession, type Mode } from './hooks/useRevisionSession';
import { useSpeech } from './hooks/useSpeech';
import { ModeSelector } from './components/organisms/ModeSelector';
import { AnswerInput } from './components/molecules/AnswerInput';
import { FeedbackDisplay } from './components/molecules/FeedbackDisplay';
import { PronunciationPanel } from './components/organisms/PronunciationPanel';

const MONTHS = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
];
const MONTHS_SHORT = [
  'jan',
  'fév',
  'mars',
  'avr',
  'mai',
  'juin',
  'juil',
  'août',
  'sept',
  'oct',
  'nov',
  'déc',
];

const validDateFormats = (day: number, month: number, year: number): string[] => [
  `${day} ${MONTHS[month - 1]} ${year}`,
  `${day} ${MONTHS_SHORT[month - 1]} ${year}`,
  `${day}/${month}/${year}`,
  `${day}-${month}-${year}`,
  `${day}.${month}.${year}`,
  `${day} ${MONTHS[month - 1]}`,
  `${day} ${MONTHS_SHORT[month - 1]}`,
];

export default function DateRevisionPage() {
  const [mode, setMode] = useState<Mode>('jp-to-fr');
  const [result, setResult] = useState<DateResult | null>(null);
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

  const fetchDate = async () => {
    setLoading(true);
    reset();
    try {
      const data = await getRandomDate();
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
      const answer = userAnswer.trim().toLowerCase();
      const formats = validDateFormats(result.day, result.month, result.year);
      setFeedback(formats.some((f) => answer === f.toLowerCase()) ? 'correct' : 'incorrect');
    }
  };

  const correctAnswers = result
    ? result.allPronunciations.map((p) => `${p.hiragana} / ${p.romaji}`).join(' ou ')
    : '';

  return (
    <div className="container">
      <h1>Révision de Dates</h1>

      <ModeSelector mode={mode} onModeChange={handleModeChange} />

      <button onClick={fetchDate} disabled={loading}>
        {loading ? 'Chargement...' : 'Nouvelle date'}
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
                label="Quelle date est-ce ? (ex: 16 février 2024)"
                value={userAnswer}
                placeholder="Ex: 16 février 2024"
                onChange={onAnswerChange}
                onSubmit={submitAnswer}
              />
            </>
          ) : (
            <>
              <p className="number">{result.japaneseFormat}</p>
              <AnswerInput
                label="Écrivez en hiragana ou romaji :"
                value={userAnswer}
                placeholder="Ex: にせんにじゅうよんねんろくがつつはつか"
                onChange={onAnswerChange}
                onSubmit={submitAnswer}
              />
            </>
          )}

          <FeedbackDisplay
            feedback={feedback}
            correctMessage={
              mode === 'jp-to-fr' && (
                <>
                  {' '}
                  C'était bien {result.day} {MONTHS[result.month - 1]} {result.year}.
                </>
              )
            }
            incorrectMessage={
              mode === 'jp-to-fr' ? (
                <>
                  {' '}
                  La réponse était {result.day} {MONTHS[result.month - 1]} {result.year}.
                </>
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
