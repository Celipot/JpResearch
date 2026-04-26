import { Link } from 'react-router-dom';
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
              <div className="speak-row">
                <button className="speak-btn" onClick={() => onSpeak(p.hiragana)}>
                  Écouter
                </button>
                <Link to="/aide" className="help-link">
                  Le son ne fonctionne pas ?
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
