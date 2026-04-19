import { useState } from 'react';
import type { AdjectiveResult } from './types/revision';
import { getRandomAdjective, checkAnswer as checkAnswerService } from './services/revisionService';
import { useRevisionSession } from './hooks/useRevisionSession';
import { AnswerInput } from './components/molecules/AnswerInput';
import { FeedbackDisplay } from './components/molecules/FeedbackDisplay';

export default function AdjectiveRevisionPage() {
  const [result, setResult] = useState<AdjectiveResult | null>(null);
  const { loading, setLoading, userAnswer, onAnswerChange, feedback, setFeedback, reset } =
    useRevisionSession();

  const fetchAdjective = async () => {
    setLoading(true);
    reset();
    try {
      setResult(await getRandomAdjective());
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTenseLabel = (tense: string): string => (tense === 'past' ? 'Passé' : 'Présent');

  const getPolarityLabel = (polarity: string): string =>
    polarity === 'affirmative' ? 'Affirmatif' : 'Négatif';

  const getRegisterLabel = (register: string): string =>
    register === 'polite' ? 'Poli' : 'Familier';

  const submitAnswer = async () => {
    if (!result || !userAnswer.trim()) return;
    const correct = await checkAnswerService(userAnswer.trim(), result.answers);
    setFeedback(correct ? 'correct' : 'incorrect');
  };

  return (
    <div className="container">
      <h1>Révision d&apos;adjectifs</h1>

      <button onClick={fetchAdjective} disabled={loading}>
        {loading ? 'Chargement...' : 'Nouvel adjectif'}
      </button>

      {result !== null && (
        <div className="revision-section">
          <div className="adjective-display">
            <p className="adjective-hiragana">{result.hiragana}</p>
            <p className="adjective-translation">{result.translation}</p>
          </div>

          <div className="form-display">
            <p className="form-label">
              Forme :{' '}
              <strong>
                {getTenseLabel(result.tense)} {getPolarityLabel(result.polarity)} ·{' '}
                {getRegisterLabel(result.register)}
              </strong>
            </p>
          </div>

          <AnswerInput
            label="Conjugaison :"
            value={userAnswer}
            placeholder="Écrivez en hiragana ou romaji"
            onChange={onAnswerChange}
            onSubmit={submitAnswer}
          />

          <FeedbackDisplay
            feedback={feedback}
            incorrectMessage={
              <>
                {' '}
                La réponse était :{' '}
                {result.answers.map((a, i) => (
                  <span key={a}>
                    <strong>{a}</strong>
                    {i < result.answers.length - 1 ? ' ou ' : ''}
                  </span>
                ))}
              </>
            }
          />
        </div>
      )}
    </div>
  );
}
