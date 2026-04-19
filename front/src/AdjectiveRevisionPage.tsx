import { useState } from 'react';
import type { AdjectiveResult } from './types/revision';
import { getRandomAdjective, checkAnswer as checkAnswerService } from './services/revisionService';

export default function AdjectiveRevisionPage() {
  const [result, setResult] = useState<AdjectiveResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const fetchAdjective = async () => {
    setLoading(true);
    setFeedback(null);
    setUserAnswer('');
    try {
      setResult(await getRandomAdjective());
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const getFormLabel = (form: string): string => {
    const labels: Record<string, string> = {
      present_affirmative: 'Affirmatif',
      present_negative: 'Négatif',
    };
    return labels[form] || form;
  };

  const checkAnswer = async () => {
    if (!result || !userAnswer.trim()) return;
    const correct = await checkAnswerService(userAnswer.trim(), [result.answer]);
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
              Forme : <strong>Présent {getFormLabel(result.form)}</strong>
            </p>
          </div>

          <div className="answer-section">
            <label htmlFor="answer">Conjugaison :</label>
            <input
              id="answer"
              type="text"
              value={userAnswer}
              onChange={(e) => {
                setUserAnswer(e.target.value);
                setFeedback(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  checkAnswer();
                }
              }}
              placeholder="Écrivez en hiragana ou romaji"
            />
            <button className="check-btn" onClick={checkAnswer} disabled={!userAnswer.trim()}>
              Vérifier
            </button>
          </div>

          {feedback === 'correct' && <div className="feedback correct">✓ Correct !</div>}

          {feedback === 'incorrect' && (
            <div className="feedback incorrect">
              ✗ Incorrect. La réponse était : <strong>{result.answer}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
