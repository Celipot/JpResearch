import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormKindSelector } from '../../../components/organisms/FormKindSelector';
import type { VerbFormKind } from '../../../types/revision';

const ALL_KINDS: VerbFormKind[] = [
  'indicative',
  'potential',
  'passive',
  'causative',
  'imperative',
  'tara',
  'ba',
  'te',
  'volitional',
];

describe('FormKindSelector', () => {
  it('when all kinds selected, then all checkboxes are checked', () => {
    // Given
    render(<FormKindSelector selectedKinds={ALL_KINDS} onChange={vi.fn()} />);

    // Then
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((cb) => expect(cb).toBeChecked());
  });

  it('when no kinds selected, then all checkboxes are unchecked', () => {
    // Given
    render(<FormKindSelector selectedKinds={[]} onChange={vi.fn()} />);

    // Then
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((cb) => expect(cb).not.toBeChecked());
  });

  it('when unchecking a kind, then calls onChange without that kind', () => {
    // Given
    const onChange = vi.fn();
    render(<FormKindSelector selectedKinds={ALL_KINDS} onChange={onChange} />);

    // When
    fireEvent.click(screen.getByLabelText('Forme en て'));

    // Then
    expect(onChange).toHaveBeenCalledWith(ALL_KINDS.filter((k) => k !== 'te'));
  });

  it('when checking an unchecked kind, then calls onChange with that kind added', () => {
    // Given
    const onChange = vi.fn();
    render(<FormKindSelector selectedKinds={[]} onChange={onChange} />);

    // When
    fireEvent.click(screen.getByLabelText('Indicatif'));

    // Then
    expect(onChange).toHaveBeenCalledWith(['indicative']);
  });
});
