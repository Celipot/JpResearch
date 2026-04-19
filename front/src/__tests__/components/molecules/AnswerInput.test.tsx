import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AnswerInput } from '../../../components/molecules/AnswerInput';

describe('AnswerInput', () => {
  it('when rendered, then shows label and input', () => {
    // Given
    render(
      <AnswerInput
        label="Conjugaison :"
        value=""
        placeholder="Ex: たかい"
        onChange={vi.fn()}
        onSubmit={vi.fn()}
      />
    );

    // Then
    expect(screen.getByLabelText('Conjugaison :')).toBeInTheDocument();
  });

  it('when value is empty, then Vérifier button is disabled', () => {
    // Given
    render(
      <AnswerInput
        label="Conjugaison :"
        value=""
        placeholder=""
        onChange={vi.fn()}
        onSubmit={vi.fn()}
      />
    );

    // Then
    expect(screen.getByRole('button', { name: /Vérifier/i })).toBeDisabled();
  });

  it('when value is not empty, then Vérifier button is enabled', () => {
    // Given
    render(
      <AnswerInput
        label="Conjugaison :"
        value="じゅう"
        placeholder=""
        onChange={vi.fn()}
        onSubmit={vi.fn()}
      />
    );

    // Then
    expect(screen.getByRole('button', { name: /Vérifier/i })).toBeEnabled();
  });

  it('when Enter is pressed, then calls onSubmit', () => {
    // Given
    const onSubmit = vi.fn();
    render(
      <AnswerInput
        label="Conjugaison :"
        value="じゅう"
        placeholder=""
        onChange={vi.fn()}
        onSubmit={onSubmit}
      />
    );

    // When
    fireEvent.keyDown(screen.getByLabelText('Conjugaison :'), { key: 'Enter' });

    // Then
    expect(onSubmit).toHaveBeenCalled();
  });

  it('when typing, then calls onChange with new value', () => {
    // Given
    const onChange = vi.fn();
    render(
      <AnswerInput
        label="Conjugaison :"
        value=""
        placeholder=""
        onChange={onChange}
        onSubmit={vi.fn()}
      />
    );

    // When
    fireEvent.change(screen.getByLabelText('Conjugaison :'), { target: { value: 'じゅう' } });

    // Then
    expect(onChange).toHaveBeenCalledWith('じゅう');
  });
});
