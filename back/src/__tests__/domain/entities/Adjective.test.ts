import { describe, it, expect } from 'vitest';
import { Adjective } from '../../../domain/entities/Adjective';
import { AdjectivePolarity } from '../../../domain/entities/AdjectivePolarity';
import { AdjectiveRegister } from '../../../domain/entities/AdjectiveRegister';

describe('Adjective', () => {
  describe('conjugate()', () => {
    it('when conjugating たかい familiar affirmative, then returns たかい', () => {
      // Given
      const adj = new Adjective('たかい', 'i', 'high/expensive');

      // When
      const result = adj.conjugate({
        polarity: AdjectivePolarity.AFFIRMATIVE,
        register: AdjectiveRegister.FAMILIAR,
      });

      // Then
      expect(result).toBe('たかい');
    });

    it('when conjugating たかい familiar negative, then returns たかくない', () => {
      // Given
      const adj = new Adjective('たかい', 'i', 'high/expensive');

      // When
      const result = adj.conjugate({
        polarity: AdjectivePolarity.NEGATIVE,
        register: AdjectiveRegister.FAMILIAR,
      });

      // Then
      expect(result).toBe('たかくない');
    });

    it('when conjugating special いい familiar negative, then returns よくない', () => {
      // Given
      const adj = new Adjective('いい', 'i', 'good');

      // When
      const result = adj.conjugate({
        polarity: AdjectivePolarity.NEGATIVE,
        register: AdjectiveRegister.FAMILIAR,
      });

      // Then
      expect(result).toBe('よくない');
    });

    it('when conjugating きれい familiar affirmative, then returns きれいだ', () => {
      // Given
      const adj = new Adjective('きれい', 'na', 'clean/pretty');

      // When
      const result = adj.conjugate({
        polarity: AdjectivePolarity.AFFIRMATIVE,
        register: AdjectiveRegister.FAMILIAR,
      });

      // Then
      expect(result).toBe('きれいだ');
    });

    it('when conjugating きれい familiar negative, then returns きれいじゃない', () => {
      // Given
      const adj = new Adjective('きれい', 'na', 'clean/pretty');

      // When
      const result = adj.conjugate({
        polarity: AdjectivePolarity.NEGATIVE,
        register: AdjectiveRegister.FAMILIAR,
      });

      // Then
      expect(result).toBe('きれいじゃない');
    });

    it('when conjugating たかい polite affirmative, then returns たかいです', () => {
      // Given
      const adj = new Adjective('たかい', 'i', 'high/expensive');

      // When
      const result = adj.conjugate({
        polarity: AdjectivePolarity.AFFIRMATIVE,
        register: AdjectiveRegister.POLITE,
      });

      // Then
      expect(result).toBe('たかいです');
    });

    it('when conjugating たかい polite negative, then returns たかくありません', () => {
      // Given
      const adj = new Adjective('たかい', 'i', 'high/expensive');

      // When
      const result = adj.conjugate({
        polarity: AdjectivePolarity.NEGATIVE,
        register: AdjectiveRegister.POLITE,
      });

      // Then
      expect(result).toBe('たかくありません');
    });

    it('when conjugating special いい polite negative, then returns よくありません', () => {
      // Given
      const adj = new Adjective('いい', 'i', 'good');

      // When
      const result = adj.conjugate({
        polarity: AdjectivePolarity.NEGATIVE,
        register: AdjectiveRegister.POLITE,
      });

      // Then
      expect(result).toBe('よくありません');
    });

    it('when conjugating きれい polite affirmative, then returns きれいです', () => {
      // Given
      const adj = new Adjective('きれい', 'na', 'clean/pretty');

      // When
      const result = adj.conjugate({
        polarity: AdjectivePolarity.AFFIRMATIVE,
        register: AdjectiveRegister.POLITE,
      });

      // Then
      expect(result).toBe('きれいです');
    });

    it('when conjugating きれい polite negative, then returns きれいではありません', () => {
      // Given
      const adj = new Adjective('きれい', 'na', 'clean/pretty');

      // When
      const result = adj.conjugate({
        polarity: AdjectivePolarity.NEGATIVE,
        register: AdjectiveRegister.POLITE,
      });

      // Then
      expect(result).toBe('きれいではありません');
    });

    it('when conjugating multiple i-adjectives familiar, then all conjugate correctly', () => {
      // Given
      const delicious = new Adjective('おいしい', 'i', 'delicious');
      const difficult = new Adjective('むずかしい', 'i', 'difficult');

      // When / Then
      expect(
        delicious.conjugate({
          polarity: AdjectivePolarity.NEGATIVE,
          register: AdjectiveRegister.FAMILIAR,
        })
      ).toBe('おいしくない');
      expect(
        difficult.conjugate({
          polarity: AdjectivePolarity.AFFIRMATIVE,
          register: AdjectiveRegister.FAMILIAR,
        })
      ).toBe('むずかしい');
    });

    it('when conjugating multiple na-adjectives familiar, then all conjugate correctly', () => {
      // Given
      const quiet = new Adjective('しずか', 'na', 'quiet');
      const energetic = new Adjective('げんき', 'na', 'energetic');

      // When / Then
      expect(
        quiet.conjugate({
          polarity: AdjectivePolarity.AFFIRMATIVE,
          register: AdjectiveRegister.FAMILIAR,
        })
      ).toBe('しずかだ');
      expect(
        energetic.conjugate({
          polarity: AdjectivePolarity.NEGATIVE,
          register: AdjectiveRegister.FAMILIAR,
        })
      ).toBe('げんきじゃない');
    });
  });
});
