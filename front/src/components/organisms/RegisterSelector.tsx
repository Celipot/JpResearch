import type { VerbRegister } from '../../types/revision';

const REGISTER_LABELS: Record<VerbRegister, string> = {
  plain: 'Plain',
  polite: 'Poli',
};

const ALL_REGISTERS = Object.keys(REGISTER_LABELS) as VerbRegister[];

interface RegisterSelectorProps {
  selectedRegisters: VerbRegister[];
  onChange: (registers: VerbRegister[]) => void;
}

export function RegisterSelector({ selectedRegisters, onChange }: RegisterSelectorProps) {
  const toggleRegister = (register: VerbRegister) => {
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
