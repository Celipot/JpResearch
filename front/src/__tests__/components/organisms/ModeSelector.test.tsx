import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModeSelector } from '../../../components/organisms/ModeSelector';

describe('ModeSelector', () => {
  it('when mode is jp-to-fr, then jp-to-fr button has active class', () => {
    // Given
    render(<ModeSelector mode="jp-to-fr" onModeChange={vi.fn()} />);

    // Then
    expect(screen.getByRole('button', { name: /Japonais → Français/i })).toHaveClass('active');
    expect(screen.getByRole('button', { name: /Français → Japonais/i })).not.toHaveClass('active');
  });

  it('when mode is fr-to-jp, then fr-to-jp button has active class', () => {
    // Given
    render(<ModeSelector mode="fr-to-jp" onModeChange={vi.fn()} />);

    // Then
    expect(screen.getByRole('button', { name: /Français → Japonais/i })).toHaveClass('active');
    expect(screen.getByRole('button', { name: /Japonais → Français/i })).not.toHaveClass('active');
  });

  it('when clicking fr-to-jp button, then calls onModeChange with fr-to-jp', () => {
    // Given
    const onModeChange = vi.fn();
    render(<ModeSelector mode="jp-to-fr" onModeChange={onModeChange} />);

    // When
    fireEvent.click(screen.getByRole('button', { name: /Français → Japonais/i }));

    // Then
    expect(onModeChange).toHaveBeenCalledWith('fr-to-jp');
  });
});
