import type { VerbTense } from '../../types/revision';

const TENSE_LABELS: Record<VerbTense, string> = {
  present: 'Présent',
  past: 'Passé',
};

const ALL_TENSES = Object.keys(TENSE_LABELS) as VerbTense[];

interface TenseSelectorProps {
  selectedTenses: VerbTense[];
  onChange: (tenses: VerbTense[]) => void;
}

export function TenseSelector({ selectedTenses, onChange }: TenseSelectorProps) {
  const toggleTense = (tense: VerbTense) => {
    const next = selectedTenses.includes(tense)
      ? selectedTenses.filter((t) => t !== tense)
      : [...selectedTenses, tense];
    onChange(next);
  };

  return (
    <div className="form-kind-selector">
      {ALL_TENSES.map((tense) => (
        <label key={tense} className="form-kind-label">
          <input
            type="checkbox"
            checked={selectedTenses.includes(tense)}
            onChange={() => toggleTense(tense)}
          />
          {TENSE_LABELS[tense]}
        </label>
      ))}
    </div>
  );
}
