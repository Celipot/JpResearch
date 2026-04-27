import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PronunciationPanel } from '../../../components/organisms/PronunciationPanel';

const renderWithRouter = (ui: React.ReactElement) => render(<MemoryRouter>{ui}</MemoryRouter>);

const mockPronunciations = [
  { hiragana: 'じゅう', romaji: 'juu', isStandard: true },
  { hiragana: 'とお', romaji: 'too', isStandard: false },
];

describe('PronunciationPanel', () => {
  it('when not visible, then shows toggle button but no pronunciations', () => {
    // Given
    renderWithRouter(
      <PronunciationPanel
        pronunciations={mockPronunciations}
        visible={false}
        onToggle={vi.fn()}
        onSpeak={vi.fn()}
      />
    );

    // Then
    expect(
      screen.getByRole('button', { name: /Afficher les prononciations/i })
    ).toBeInTheDocument();
    expect(screen.queryByText('じゅう')).not.toBeInTheDocument();
  });

  it('when visible, then shows all pronunciations', () => {
    // Given
    renderWithRouter(
      <PronunciationPanel
        pronunciations={mockPronunciations}
        visible={true}
        onToggle={vi.fn()}
        onSpeak={vi.fn()}
      />
    );

    // Then
    expect(screen.getByText('じゅう')).toBeInTheDocument();
    expect(screen.getByText('とお')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cacher les prononciations/i })).toBeInTheDocument();
  });

  it('when toggle button clicked, then calls onToggle', () => {
    // Given
    const onToggle = vi.fn();
    renderWithRouter(
      <PronunciationPanel
        pronunciations={mockPronunciations}
        visible={false}
        onToggle={onToggle}
        onSpeak={vi.fn()}
      />
    );

    // When
    fireEvent.click(screen.getByRole('button', { name: /Afficher les prononciations/i }));

    // Then
    expect(onToggle).toHaveBeenCalled();
  });

  it('when Écouter clicked, then calls onSpeak with hiragana', () => {
    // Given
    const onSpeak = vi.fn();
    renderWithRouter(
      <PronunciationPanel
        pronunciations={mockPronunciations}
        visible={true}
        onToggle={vi.fn()}
        onSpeak={onSpeak}
      />
    );

    // When
    fireEvent.click(screen.getAllByRole('button', { name: /Écouter/i })[0]);

    // Then
    expect(onSpeak).toHaveBeenCalledWith('じゅう');
  });
});
