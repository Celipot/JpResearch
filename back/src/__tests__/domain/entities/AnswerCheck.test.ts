import { describe, it, expect } from 'vitest';
import { AnswerCheck } from '../../../domain/entities/AnswerCheck';

describe('AnswerCheck', () => {
  describe('AnswerCheck.isCorrect', () => {
    it('when user answer is exact hiragana, then returns true', () => {
      // Given
      const userAnswer = 'たかくない';
      const expectedAnswer = 'たかくない';

      // When
      const result = AnswerCheck.isCorrect(userAnswer, expectedAnswer);

      // Then
      expect(result).toBe(true);
    });

    it('when user answer is hiragana with spaces, then returns true', () => {
      // Given
      const userAnswer = 'た かく ない';
      const expectedAnswer = 'たかくない';

      // When
      const result = AnswerCheck.isCorrect(userAnswer, expectedAnswer);

      // Then
      expect(result).toBe(true);
    });

    it('when user answer is equivalent romaji, then returns true', () => {
      // Given
      const userAnswer = 'takakunai';
      const expectedAnswer = 'たかくない';

      // When
      const result = AnswerCheck.isCorrect(userAnswer, expectedAnswer);

      // Then
      expect(result).toBe(true);
    });

    it('when user answer is romaji with normalized ou, then returns true', () => {
      // Given
      const userAnswer = 'toukyou';
      const expectedAnswer = 'とうきょう';

      // When
      const result = AnswerCheck.isCorrect(userAnswer, expectedAnswer);

      // Then
      expect(result).toBe(true);
    });

    it('when user answer is wrong, then returns false', () => {
      // Given
      const userAnswer = 'ちがう';
      const expectedAnswer = 'たかくない';

      // When
      const result = AnswerCheck.isCorrect(userAnswer, expectedAnswer);

      // Then
      expect(result).toBe(false);
    });

    it('when user answer is na-adjective with だ, then accepts hiragana', () => {
      // Given
      const userAnswer = 'きれいだ';
      const expectedAnswer = 'きれいだ';

      // When
      const result = AnswerCheck.isCorrect(userAnswer, expectedAnswer);

      // Then
      expect(result).toBe(true);
    });

    it('when user answer is na-adjective romaji, then returns true', () => {
      // Given
      const userAnswer = 'kireida';
      const expectedAnswer = 'きれいだ';

      // When
      const result = AnswerCheck.isCorrect(userAnswer, expectedAnswer);

      // Then
      expect(result).toBe(true);
    });
  });
});
