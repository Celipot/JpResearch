import { useState } from 'react';

interface GrammarRule {
  id: string;
  particle: string;
  name: string;
  description: string;
}

interface ExerciseResult {
  type: 'fill-in-the-blank' | 'multiple-choice' | 'translation';
  rule: GrammarRule;
  question: string;
  correctAnswers: string[];
  options: string[] | null;
  explanation: string;
}

const normalize = (str: string): string =>
  str
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/。/g, '')
    .replace(/ā/g, 'aa')
    .replace(/ī/g, 'ii')
    .replace(/ū/g, 'uu')
    .replace(/ō/g, 'oo');

const RULES = [
  { id: 'wa', particle: 'は' },
  { id: 'wo', particle: 'を' },
];

export default function GrammarRevisionPage() {
  const [selectedRules, setSelectedRules] = useState<Set<string>>(new Set([RULES[0].id]));
  const [exercise, setExercise] = useState<ExerciseResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const toggleRule = (ruleId: string) => {
    const newSelected = new Set(selectedRules);
    if (newSelected.has(ruleId)) {
      newSelected.delete(ruleId);
    } else {
      newSelected.add(ruleId);
    }
    setSelectedRules(newSelected);
  };

  const fetchExercise = async () => {
    if (selectedRules.size === 0) return;
    setLoading(true);
    setFeedback(null);
    setUserAnswer('');
    try {
      const rulesArray = Array.from(selectedRules);
      const rule = rulesArray[Math.floor(Math.random() * rulesArray.length)];
      const res = await fetch(`/api/exercises/random?rule=${rule}`);
      const data = await res.json();
      setExercise(data);
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkAnswer = (answer: string) => {
    if (!exercise) return;
    const normalizedAnswer = normalize(answer);
    const isCorrect = exercise.correctAnswers.some(
      (correct) => normalize(correct) === normalizedAnswer
    );
    setFeedback(isCorrect ? 'correct' : 'incorrect');
  };

  const handleMultipleChoiceSelect = (option: string) => {
    setUserAnswer(option);
    checkAnswer(option);
  };

  return (
    <div className="container">
      <h1>Révision de grammaire</h1>

      <div className="rule-selector">
        {RULES.map((rule) => (
          <button
            key={rule.id}
            className={selectedRules.has(rule.id) ? 'mode-btn active' : 'mode-btn'}
            onClick={() => {
              toggleRule(rule.id);
              setExercise(null);
              setFeedback(null);
            }}
          >
            {rule.particle}
          </button>
        ))}
      </div>

      <button onClick={fetchExercise} disabled={loading}>
        {loading ? 'Chargement...' : 'Nouvel exercice'}
      </button>

      {exercise && (
        <div className="revision-section">
          <p className="grammar-rule-label">
            Particule : <strong>{exercise.rule.particle}</strong> — {exercise.rule.name}
          </p>

          {exercise.type === 'fill-in-the-blank' && (
            <FillInTheBlankExercise
              question={exercise.question}
              userAnswer={userAnswer}
              feedback={feedback}
              onAnswerChange={(value) => {
                setUserAnswer(value);
                setFeedback(null);
              }}
              onSubmit={() => checkAnswer(userAnswer)}
            />
          )}

          {exercise.type === 'multiple-choice' && (
            <MultipleChoiceExercise
              question={exercise.question}
              options={exercise.options ?? []}
              feedback={feedback}
              selectedAnswer={userAnswer}
              onSelect={handleMultipleChoiceSelect}
            />
          )}

          {exercise.type === 'translation' && (
            <TranslationExercise
              question={exercise.question}
              userAnswer={userAnswer}
              feedback={feedback}
              onAnswerChange={(value) => {
                setUserAnswer(value);
                setFeedback(null);
              }}
              onSubmit={() => checkAnswer(userAnswer)}
            />
          )}

          {feedback === 'correct' && <div className="feedback correct">✓ Correct !</div>}

          {feedback === 'incorrect' && (
            <div className="feedback incorrect">
              ✗ Incorrect. <span>La réponse était : {exercise.correctAnswers[0]}</span>
            </div>
          )}

          {feedback !== null && <div className="explanation">{exercise.explanation}</div>}
        </div>
      )}
    </div>
  );
}

interface FillInTheBlankProps {
  question: string;
  userAnswer: string;
  feedback: 'correct' | 'incorrect' | null;
  onAnswerChange: (value: string) => void;
  onSubmit: () => void;
}

function FillInTheBlankExercise({
  question,
  userAnswer,
  feedback,
  onAnswerChange,
  onSubmit,
}: FillInTheBlankProps) {
  return (
    <div className="exercise-section">
      <p className="exercise-question">{question}</p>
      <div className="answer-section">
        <label htmlFor="fill-answer">Complétez avec la bonne particule :</label>
        <input
          id="fill-answer"
          type="text"
          value={userAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
          placeholder="Particule..."
          disabled={feedback !== null}
        />
        <button
          className="check-btn"
          onClick={onSubmit}
          disabled={!userAnswer.trim() || feedback !== null}
        >
          Vérifier
        </button>
      </div>
    </div>
  );
}

interface MultipleChoiceProps {
  question: string;
  options: string[];
  feedback: 'correct' | 'incorrect' | null;
  selectedAnswer: string;
  onSelect: (option: string) => void;
}

function MultipleChoiceExercise({
  question,
  options,
  feedback,
  selectedAnswer,
  onSelect,
}: MultipleChoiceProps) {
  return (
    <div className="exercise-section">
      <p className="exercise-question">{question}</p>
      <div className="options-grid">
        {options.map((option) => (
          <button
            key={option}
            className={`option-btn${selectedAnswer === option ? ' selected' : ''}`}
            onClick={() => onSelect(option)}
            disabled={feedback !== null}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

interface TranslationProps {
  question: string;
  userAnswer: string;
  feedback: 'correct' | 'incorrect' | null;
  onAnswerChange: (value: string) => void;
  onSubmit: () => void;
}

function TranslationExercise({
  question,
  userAnswer,
  feedback,
  onAnswerChange,
  onSubmit,
}: TranslationProps) {
  return (
    <div className="exercise-section">
      <p className="exercise-question">{question}</p>
      <div className="answer-section">
        <label htmlFor="translation-answer">Traduisez en japonais (hiragana ou romaji) :</label>
        <input
          id="translation-answer"
          type="text"
          value={userAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
          placeholder="Ex: わたしは..."
          disabled={feedback !== null}
        />
        <button
          className="check-btn"
          onClick={onSubmit}
          disabled={!userAnswer.trim() || feedback !== null}
        >
          Vérifier
        </button>
      </div>
    </div>
  );
}
