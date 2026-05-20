import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AdjectiveRegisterSelector } from '../../../components/organisms/AdjectiveRegisterSelector';
import type { AdjectiveRegister } from '../../../types/revision';

const ALL_REGISTERS: AdjectiveRegister[] = ['familiar', 'polite'];

describe('AdjectiveRegisterSelector', () => {
  it('when all registers selected, then all checkboxes are checked', () => {
    // Given
    render(<AdjectiveRegisterSelector selectedRegisters={ALL_REGISTERS} onChange={vi.fn()} />);

    // When
    const checkboxes = screen.getAllByRole('checkbox');

    // Then
    checkboxes.forEach((cb) => expect(cb).toBeChecked());
  });

  it('when no registers selected, then all checkboxes are unchecked', () => {
    // Given
    render(<AdjectiveRegisterSelector selectedRegisters={[]} onChange={vi.fn()} />);

    // When
    const checkboxes = screen.getAllByRole('checkbox');

    // Then
    checkboxes.forEach((cb) => expect(cb).not.toBeChecked());
  });

  it('when unchecking a register, then calls onChange without that register', () => {
    // Given
    const onChange = vi.fn();
    render(<AdjectiveRegisterSelector selectedRegisters={ALL_REGISTERS} onChange={onChange} />);

    // When
    fireEvent.click(screen.getByLabelText('Poli'));

    // Then
    expect(onChange).toHaveBeenCalledWith(['familiar']);
  });

  it('when checking an unchecked register, then calls onChange with that register added', () => {
    // Given
    const onChange = vi.fn();
    render(<AdjectiveRegisterSelector selectedRegisters={[]} onChange={onChange} />);

    // When
    fireEvent.click(screen.getByLabelText('Familier'));

    // Then
    expect(onChange).toHaveBeenCalledWith(['familiar']);
  });
});
