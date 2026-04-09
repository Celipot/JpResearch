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

const romajiToHiragana: Record<string, string> = {
  wa: 'は',
  ha: 'は',
  wo: 'を',
  o: 'を',
  ga: 'が',
  ni: 'に',
  de: 'で',
  kara: 'から',
  made: 'まで',
  mo: 'も',
  no: 'の',
  he: 'へ',
  e: 'へ',
  to: 'と',
  ya: 'や',
  yori: 'より',
  dake: 'だけ',
};

const convertRomajiToHiragana = (str: string): string => {
  const lower = str.toLowerCase().trim();
  return romajiToHiragana[lower] || lower;
};

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
  { id: 'wa', particle: 'は', name: 'wa (topic)' },
  { id: 'wo', particle: 'を', name: 'wo (objet)' },
  { id: 'ga', particle: 'が', name: 'ga (sujet)' },
  { id: 'ni', particle: 'に', name: 'ni (destination)' },
  { id: 'de', particle: 'で', name: 'de (lieu/moyen)' },
  { id: 'kara', particle: 'から', name: 'kara (origine)' },
  { id: 'made', particle: 'まで', name: "made (jusqu'à)" },
  { id: 'mo', particle: 'も', name: 'mo (aussi)' },
  { id: 'no', particle: 'の', name: 'no (possession)' },
  { id: 'he', particle: 'へ', name: 'he (direction)' },
  { id: 'to', particle: 'と', name: 'to (et)' },
  { id: 'ya', particle: 'や', name: 'ya (et non-exhaustif)' },
  { id: 'yori', particle: 'より', name: 'yori (comparaison)' },
  { id: 'dake', particle: 'だけ', name: 'dake (seulement)' },
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
    const trimmedAnswer = answer.trim().toLowerCase();
    const romajiConverted = convertRomajiToHiragana(trimmedAnswer);
    const normalizedAnswer = normalize(romajiConverted);

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

      <div className="rule-selector-section">
        <div className="rule-selector">
          {RULES.map((rule) => (
            <button
              key={rule.id}
              className={selectedRules.has(rule.id) ? 'mode-btn active' : 'mode-btn'}
              title={rule.name}
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

        <div className="rule-actions">
          <button
            className="action-btn"
            onClick={() => {
              setSelectedRules(new Set(RULES.map((r) => r.id)));
              setExercise(null);
              setFeedback(null);
            }}
          >
            Tout sélectionner
          </button>
          <button
            className="action-btn"
            onClick={() => {
              setSelectedRules(new Set([RULES[0].id]));
              setExercise(null);
              setFeedback(null);
            }}
          >
            Réinitialiser
          </button>
        </div>
      </div>

      <button
        className="fetch-btn"
        onClick={fetchExercise}
        disabled={loading || selectedRules.size === 0}
      >
        {loading ? 'Chargement...' : 'Nouvel exercice'}
      </button>

      {exercise && (
        <div className="revision-section">
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
        <label htmlFor="fill-answer">
          Complétez avec la bonne particule (hiragana ou romaji) :
        </label>
        <input
          id="fill-answer"
          type="text"
          value={userAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
          placeholder="Ex: は ou wa"
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
