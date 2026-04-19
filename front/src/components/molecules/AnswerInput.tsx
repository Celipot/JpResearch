interface AnswerInputProps {
  label: string;
  value: string;
  placeholder: string;
  type?: 'text' | 'number';
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function AnswerInput({
  label,
  value,
  placeholder,
  type = 'text',
  onChange,
  onSubmit,
}: AnswerInputProps) {
  return (
    <div className="answer-section">
      <label htmlFor="answer">{label}</label>
      <input
        id="answer"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSubmit();
        }}
        placeholder={placeholder}
      />
      <button className="check-btn" onClick={onSubmit} disabled={!value.trim()}>
        Vérifier
      </button>
    </div>
  );
}
