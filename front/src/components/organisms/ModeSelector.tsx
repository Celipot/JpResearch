import type { Mode } from '../hooks/useRevisionSession';

interface ModeSelectorProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  jpToFrLabel?: string;
  frToJpLabel?: string;
}

export function ModeSelector({
  mode,
  onModeChange,
  jpToFrLabel = '🇯🇵 → 🇫🇷 Japonais → Français',
  frToJpLabel = '🇫🇷 → 🇯🇵 Français → Japonais',
}: ModeSelectorProps) {
  return (
    <div className="mode-selector">
      <button
        className={mode === 'jp-to-fr' ? 'mode-btn active' : 'mode-btn'}
        onClick={() => onModeChange('jp-to-fr')}
      >
        {jpToFrLabel}
      </button>
      <button
        className={mode === 'fr-to-jp' ? 'mode-btn active' : 'mode-btn'}
        onClick={() => onModeChange('fr-to-jp')}
      >
        {frToJpLabel}
      </button>
    </div>
  );
}
