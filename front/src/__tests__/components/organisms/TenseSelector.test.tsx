import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TenseSelector } from '../../../components/organisms/TenseSelector';
import type { VerbTense } from '../../../types/revision';

const ALL_TENSES: VerbTense[] = ['present', 'past'];

describe('TenseSelector', () => {
  it('when all tenses selected, then all checkboxes are checked', () => {
    // Given
    render(<TenseSelector selectedTenses={ALL_TENSES} onChange={vi.fn()} />);

    // When
    const checkboxes = screen.getAllByRole('checkbox');

    // Then
    checkboxes.forEach((cb) => expect(cb).toBeChecked());
  });

  it('when no tenses selected, then all checkboxes are unchecked', () => {
    // Given
    render(<TenseSelector selectedTenses={[]} onChange={vi.fn()} />);

    // When
    const checkboxes = screen.getAllByRole('checkbox');

    // Then
    checkboxes.forEach((cb) => expect(cb).not.toBeChecked());
  });

  it('when unchecking a tense, then calls onChange without that tense', () => {
    // Given
    const onChange = vi.fn();
    render(<TenseSelector selectedTenses={ALL_TENSES} onChange={onChange} />);

    // When
    fireEvent.click(screen.getByLabelText('Passé'));

    // Then
    expect(onChange).toHaveBeenCalledWith(['present']);
  });

  it('when checking an unchecked tense, then calls onChange with that tense added', () => {
    // Given
    const onChange = vi.fn();
    render(<TenseSelector selectedTenses={[]} onChange={onChange} />);

    // When
    fireEvent.click(screen.getByLabelText('Présent'));

    // Then
    expect(onChange).toHaveBeenCalledWith(['present']);
  });
});
