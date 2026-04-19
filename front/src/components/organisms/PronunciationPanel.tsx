import type { Pronunciation } from '../../types/revision';

interface PronunciationPanelProps {
  pronunciations: Pronunciation[];
  visible: boolean;
  onToggle: () => void;
  onSpeak: (hiragana: string) => void;
}

export function PronunciationPanel({
  pronunciations,
  visible,
  onToggle,
  onSpeak,
}: PronunciationPanelProps) {
  return (
    <>
      <button className="toggle-btn" onClick={onToggle}>
        {visible ? 'Cacher les prononciations' : 'Afficher les prononciations'}
      </button>

      {visible && (
        <div className="pronunciation">
          {pronunciations.map((p, index) => (
            <div key={index} className="pronunciation-card">
              <span className={p.isStandard ? 'badge-standard' : 'badge-alt'}>
                {p.isStandard ? 'Standard' : 'Alternative'}
              </span>
              <p className="hiragana">{p.hiragana}</p>
              <p className="romaji">{p.romaji}</p>
              <button className="speak-btn" onClick={() => onSpeak(p.hiragana)}>
                Écouter
              </button>
            </div>
          ))}
          <span className="tooltip-wrapper">
            <span className="tooltip-icon">?</span>
            <span className="tooltip-text">
              Si le son ne fonctionne pas, ajoutez la langue japonaise dans les paramètres de votre
              PC (Paramètres → Heure et langue → Japonais).
            </span>
          </span>
        </div>
      )}
    </>
  );
}
