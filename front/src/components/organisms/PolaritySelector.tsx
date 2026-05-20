import type { VerbPolarity } from '../../types/revision';

const POLARITY_LABELS: Record<VerbPolarity, string> = {
  affirmative: 'Affirmatif',
  negative: 'Négatif',
};

const ALL_POLARITIES = Object.keys(POLARITY_LABELS) as VerbPolarity[];

interface PolaritySelectorProps {
  selectedPolarities: VerbPolarity[];
  onChange: (polarities: VerbPolarity[]) => void;
}

export function PolaritySelector({ selectedPolarities, onChange }: PolaritySelectorProps) {
  const togglePolarity = (polarity: VerbPolarity) => {
    const next = selectedPolarities.includes(polarity)
      ? selectedPolarities.filter((p) => p !== polarity)
      : [...selectedPolarities, polarity];
    onChange(next);
  };

  return (
    <div className="form-kind-selector">
      {ALL_POLARITIES.map((polarity) => (
        <label key={polarity} className="form-kind-label">
          <input
            type="checkbox"
            checked={selectedPolarities.includes(polarity)}
            onChange={() => togglePolarity(polarity)}
          />
          {POLARITY_LABELS[polarity]}
        </label>
      ))}
    </div>
  );
}
