import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RegisterSelector } from '../../../components/organisms/RegisterSelector';
import type { VerbRegister } from '../../../types/revision';

const ALL_REGISTERS: VerbRegister[] = ['plain', 'polite'];

describe('RegisterSelector', () => {
  it('when all registers selected, then all checkboxes are checked', () => {
    // Given
    render(<RegisterSelector selectedRegisters={ALL_REGISTERS} onChange={vi.fn()} />);

    // When
    const checkboxes = screen.getAllByRole('checkbox');

    // Then
    checkboxes.forEach((cb) => expect(cb).toBeChecked());
  });

  it('when no registers selected, then all checkboxes are unchecked', () => {
    // Given
    render(<RegisterSelector selectedRegisters={[]} onChange={vi.fn()} />);

    // When
    const checkboxes = screen.getAllByRole('checkbox');

    // Then
    checkboxes.forEach((cb) => expect(cb).not.toBeChecked());
  });

  it('when unchecking a register, then calls onChange without that register', () => {
    // Given
    const onChange = vi.fn();
    render(<RegisterSelector selectedRegisters={ALL_REGISTERS} onChange={onChange} />);

    // When
    fireEvent.click(screen.getByLabelText('Poli'));

    // Then
    expect(onChange).toHaveBeenCalledWith(['plain']);
  });

  it('when checking an unchecked register, then calls onChange with that register added', () => {
    // Given
    const onChange = vi.fn();
    render(<RegisterSelector selectedRegisters={[]} onChange={onChange} />);

    // When
    fireEvent.click(screen.getByLabelText('Plain'));

    // Then
    expect(onChange).toHaveBeenCalledWith(['plain']);
  });
});
