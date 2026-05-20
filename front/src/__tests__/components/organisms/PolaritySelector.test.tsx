import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PolaritySelector } from '../../../components/organisms/PolaritySelector';
import type { VerbPolarity } from '../../../types/revision';

const ALL_POLARITIES: VerbPolarity[] = ['affirmative', 'negative'];

describe('PolaritySelector', () => {
  it('when all polarities selected, then all checkboxes are checked', () => {
    // Given
    render(<PolaritySelector selectedPolarities={ALL_POLARITIES} onChange={vi.fn()} />);

    // When
    const checkboxes = screen.getAllByRole('checkbox');

    // Then
    checkboxes.forEach((cb) => expect(cb).toBeChecked());
  });

  it('when no polarities selected, then all checkboxes are unchecked', () => {
    // Given
    render(<PolaritySelector selectedPolarities={[]} onChange={vi.fn()} />);

    // When
    const checkboxes = screen.getAllByRole('checkbox');

    // Then
    checkboxes.forEach((cb) => expect(cb).not.toBeChecked());
  });

  it('when unchecking a polarity, then calls onChange without that polarity', () => {
    // Given
    const onChange = vi.fn();
    render(<PolaritySelector selectedPolarities={ALL_POLARITIES} onChange={onChange} />);

    // When
    fireEvent.click(screen.getByLabelText('Négatif'));

    // Then
    expect(onChange).toHaveBeenCalledWith(['affirmative']);
  });

  it('when checking an unchecked polarity, then calls onChange with that polarity added', () => {
    // Given
    const onChange = vi.fn();
    render(<PolaritySelector selectedPolarities={[]} onChange={onChange} />);

    // When
    fireEvent.click(screen.getByLabelText('Affirmatif'));

    // Then
    expect(onChange).toHaveBeenCalledWith(['affirmative']);
  });
});
