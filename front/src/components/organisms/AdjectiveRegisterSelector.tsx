import type { AdjectiveRegister } from '../../types/revision';

const REGISTER_LABELS: Record<AdjectiveRegister, string> = {
  familiar: 'Familier',
  polite: 'Poli',
};

const ALL_REGISTERS = Object.keys(REGISTER_LABELS) as AdjectiveRegister[];

interface AdjectiveRegisterSelectorProps {
  selectedRegisters: AdjectiveRegister[];
  onChange: (registers: AdjectiveRegister[]) => void;
}

export function AdjectiveRegisterSelector({
  selectedRegisters,
  onChange,
}: AdjectiveRegisterSelectorProps) {
  const toggleRegister = (register: AdjectiveRegister) => {
    const next = selectedRegisters.includes(register)
      ? selectedRegisters.filter((r) => r !== register)
      : [...selectedRegisters, register];
    onChange(next);
  };

  return (
    <div className="form-kind-selector">
      {ALL_REGISTERS.map((register) => (
        <label key={register} className="form-kind-label">
          <input
            type="checkbox"
            checked={selectedRegisters.includes(register)}
            onChange={() => toggleRegister(register)}
          />
          {REGISTER_LABELS[register]}
        </label>
      ))}
    </div>
  );
}
