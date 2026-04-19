import { useState } from 'react';
import type { NumberResult } from './types/revision';
import { getRandomNumber, checkAnswer as checkAnswerService } from './services/revisionService';
import { useRevisionSession, type Mode } from './hooks/useRevisionSession';
import { useSpeech } from './hooks/useSpeech';
import { ModeSelector } from './components/organisms/ModeSelector';
import { AnswerInput } from './components/molecules/AnswerInput';
import { FeedbackDisplay } from './components/molecules/FeedbackDisplay';
import { PronunciationPanel } from './components/organisms/PronunciationPanel';

export default function NumberRevisionPage() {
  const [mode, setMode] = useState<Mode>('jp-to-fr');
  const [result, setResult] = useState<NumberResult | null>(null);
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(1000000000);
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

  const fetchNumber = async () => {
    setLoading(true);
    reset();
    try {
      const data = await getRandomNumber(minValue, maxValue);
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
      setFeedback(parseInt(userAnswer.trim(), 10) === result.number ? 'correct' : 'incorrect');
    }
  };

  const correctAnswers = result
    ? result.allPronunciations.map((p) => `${p.hiragana} / ${p.romaji}`).join(' ou ')
    : '';

  return (
    <div className="container">
      <h1>Révision de Nombres</h1>

      <ModeSelector mode={mode} onModeChange={handleModeChange} />

      <div className="range-selector">
        <label>Plage: </label>
        <div className="range-inputs">
          <input
            type="number"
            min="1"
            max="1000000000"
            value={minValue}
            onChange={(e) => {
              const newMin = Math.max(1, Math.min(1000000000, parseInt(e.target.value, 10) || 1));
              setMinValue(newMin);
              if (newMin > maxValue) setMaxValue(newMin);
            }}
            placeholder="Min"
          />
          <span> - </span>
          <input
            type="number"
            min="1"
            max="1000000000"
            value={maxValue}
            onChange={(e) => {
              const newMax = Math.max(
                1,
                Math.min(1000000000, parseInt(e.target.value, 10) || 1000000000)
              );
              setMaxValue(newMax);
              if (newMax < minValue) setMinValue(newMax);
            }}
            placeholder="Max"
          />
        </div>
      </div>

      <button onClick={fetchNumber} disabled={loading}>
        {loading ? 'Chargement...' : 'Nouveau nombre'}
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
                label="Quel nombre est-ce ? (en chiffres)"
                value={userAnswer}
                placeholder="Ex: 42"
                type="number"
                onChange={onAnswerChange}
                onSubmit={submitAnswer}
              />
            </>
          ) : (
            <>
              <p className="number">{result.number}</p>
              <AnswerInput
                label="Écrivez en hiragana ou romaji :"
                value={userAnswer}
                placeholder="Ex: よんじゅうに / yonjuuni"
                onChange={onAnswerChange}
                onSubmit={submitAnswer}
              />
            </>
          )}

          <FeedbackDisplay
            feedback={feedback}
            correctMessage={mode === 'jp-to-fr' && <> C'était bien {result.number}.</>}
            incorrectMessage={
              mode === 'jp-to-fr' ? (
                <> La réponse était {result.number}.</>
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
