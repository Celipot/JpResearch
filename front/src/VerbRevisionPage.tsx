import { useState } from 'react';
import type { VerbResult, VerbForm } from './types/revision';
import { getRandomVerb, checkAnswer as checkAnswerService } from './services/revisionService';
import { useRevisionSession } from './hooks/useRevisionSession';
import { AnswerInput } from './components/molecules/AnswerInput';
import { FeedbackDisplay } from './components/molecules/FeedbackDisplay';

const KIND_LABEL: Record<string, string> = {
  indicative: 'Indicatif',
  potential: 'Potentielle',
  passive: 'Passive',
  causative: 'Causative',
};

const getFormLabel = (form: VerbForm): string => {
  if (form.kind === 'te') {
    const polarity = form.polarity === 'affirmative' ? 'Affirmatif' : 'Négatif';
    return `Forme en て · ${polarity}`;
  }
  if (form.kind === 'tara') {
    const polarity = form.polarity === 'affirmative' ? 'Affirmative' : 'Négative';
    return `Conditionnelle en たら · ${polarity}`;
  }
  if (form.kind === 'ba') {
    const polarity = form.polarity === 'affirmative' ? 'Affirmative' : 'Négative';
    return `Conditionnelle en ば · ${polarity}`;
  }
  if (form.kind === 'volitional') {
    const register = form.register === 'polite' ? 'Poli' : 'Plain';
    return `Forme volitionnelle · ${register}`;
  }
  if (form.kind === 'imperative') {
    const polarity = form.polarity === 'affirmative' ? 'Affirmatif' : 'Négatif';
    const register = form.register === 'polite' ? 'Poli' : 'Plain';
    return `Impérative · ${polarity} · ${register}`;
  }
  const kindLabel = KIND_LABEL[form.kind];
  const tense = form.tense === 'past' ? 'Passé' : 'Présent';
  const polarity = form.polarity === 'affirmative' ? 'Affirmatif' : 'Négatif';
  const register = form.register === 'polite' ? 'Poli' : 'Plain';
  return `${kindLabel} · ${tense} ${polarity} · ${register}`;
};

export default function VerbRevisionPage() {
  const [result, setResult] = useState<VerbResult | null>(null);
  const { loading, setLoading, userAnswer, onAnswerChange, feedback, setFeedback, reset } =
    useRevisionSession();

  const fetchVerb = async () => {
    setLoading(true);
    reset();
    try {
      setResult(await getRandomVerb());
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!result || !userAnswer.trim()) return;
    const correct = await checkAnswerService(userAnswer.trim(), result.answers);
    setFeedback(correct ? 'correct' : 'incorrect');
  };

  return (
    <div className="container">
      <h1>Révision de verbes</h1>

      <button onClick={fetchVerb} disabled={loading}>
        {loading ? 'Chargement...' : 'Nouveau verbe'}
      </button>

      {result !== null && (
        <div className="revision-section">
          <div className="adjective-display">
            <p className="adjective-hiragana">{result.kanji}</p>
            <p className="adjective-hiragana">{result.hiragana}</p>
            <p className="adjective-translation">{result.translation}</p>
          </div>

          <div className="form-display">
            <p className="form-label">
              Forme : <strong>{getFormLabel(result.form)}</strong>
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
