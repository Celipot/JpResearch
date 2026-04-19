import { describe, it, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useRevisionSession } from '../../hooks/useRevisionSession';

describe('useRevisionSession', () => {
  it('when initialized, then feedback and userAnswer are empty', () => {
    // When
    const { result } = renderHook(() => useRevisionSession());

    // Then
    expect(result.current.feedback).toBeNull();
    expect(result.current.userAnswer).toBe('');
    expect(result.current.showPronunciation).toBe(false);
  });

  it('when onAnswerChange called, then updates userAnswer and clears feedback', () => {
    // Given
    const { result } = renderHook(() => useRevisionSession());
    act(() => result.current.setFeedback('correct'));

    // When
    act(() => result.current.onAnswerChange('じゅう'));

    // Then
    expect(result.current.userAnswer).toBe('じゅう');
    expect(result.current.feedback).toBeNull();
  });

  it('when reset called, then clears userAnswer, feedback and showPronunciation', () => {
    // Given
    const { result } = renderHook(() => useRevisionSession());
    act(() => {
      result.current.setUserAnswer('test');
      result.current.setFeedback('incorrect');
      result.current.setShowPronunciation(true);
    });

    // When
    act(() => result.current.reset());

    // Then
    expect(result.current.userAnswer).toBe('');
    expect(result.current.feedback).toBeNull();
    expect(result.current.showPronunciation).toBe(false);
  });
});
