import type { VerbFormKind } from '../../types/revision';

const KIND_LABELS: Record<VerbFormKind, string> = {
  indicative: 'Indicatif',
  potential: 'Potentiel',
  passive: 'Passif',
  causative: 'Causatif',
  te: 'Forme en て',
  tara: 'Conditionnelle たら',
  ba: 'Conditionnelle ば',
  volitional: 'Volitif',
  imperative: 'Impératif',
};

const ALL_KINDS = Object.keys(KIND_LABELS) as VerbFormKind[];

interface FormKindSelectorProps {
  selectedKinds: VerbFormKind[];
  onChange: (kinds: VerbFormKind[]) => void;
}

export function FormKindSelector({ selectedKinds, onChange }: FormKindSelectorProps) {
  const toggle = (kind: VerbFormKind) => {
    const next = selectedKinds.includes(kind)
      ? selectedKinds.filter((k) => k !== kind)
      : [...selectedKinds, kind];
    onChange(next);
  };

  return (
    <div className="form-kind-selector">
      {ALL_KINDS.map((kind) => (
        <label key={kind} className="form-kind-label">
          <input
            type="checkbox"
            checked={selectedKinds.includes(kind)}
            onChange={() => toggle(kind)}
          />
          {KIND_LABELS[kind]}
        </label>
      ))}
    </div>
  );
}
