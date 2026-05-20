import { describe, it, expect } from 'vitest';
import { Adjective } from '../../../domain/entities/adjective/Adjective';
import { AdjectivePolarity } from '../../../domain/entities/adjective/AdjectivePolarity';
import { AdjectiveRegister } from '../../../domain/entities/adjective/AdjectiveRegister';
import { AdjectiveTense } from '../../../domain/entities/adjective/AdjectiveTense';
import { AdjectiveConjugationFormUtils } from '../../../domain/entities/adjective/AdjectiveConjugationForm';

describe('Adjective', () => {
  describe('conjugate()', () => {
    it('when conjugating たかい familiar affirmative, then returns たかい', () => {
      // Given
      const adj = new Adjective('たかい', 'i', 'high/expensive');

      // When
      const result = adj.conjugate({
        tense: AdjectiveTense.PRESENT,
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
        tense: AdjectiveTense.PRESENT,
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
        tense: AdjectiveTense.PRESENT,
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
        tense: AdjectiveTense.PRESENT,
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
        tense: AdjectiveTense.PRESENT,
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
        tense: AdjectiveTense.PRESENT,
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
        tense: AdjectiveTense.PRESENT,
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
        tense: AdjectiveTense.PRESENT,
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
        tense: AdjectiveTense.PRESENT,
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
        tense: AdjectiveTense.PRESENT,
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
          tense: AdjectiveTense.PRESENT,
          polarity: AdjectivePolarity.NEGATIVE,
          register: AdjectiveRegister.FAMILIAR,
        })
      ).toBe('おいしくない');
      expect(
        difficult.conjugate({
          tense: AdjectiveTense.PRESENT,
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
          tense: AdjectiveTense.PRESENT,
          polarity: AdjectivePolarity.AFFIRMATIVE,
          register: AdjectiveRegister.FAMILIAR,
        })
      ).toBe('しずかだ');
      expect(
        energetic.conjugate({
          tense: AdjectiveTense.PRESENT,
          polarity: AdjectivePolarity.NEGATIVE,
          register: AdjectiveRegister.FAMILIAR,
        })
      ).toBe('げんきじゃない');
    });
  });

  describe('conjugate() past tense', () => {
    it('when conjugating たかい past familiar affirmative, then returns たかかった', () => {
      // Given
      const adj = new Adjective('たかい', 'i', 'high/expensive');

      // When
      const result = adj.conjugate({
        tense: AdjectiveTense.PAST,
        polarity: AdjectivePolarity.AFFIRMATIVE,
        register: AdjectiveRegister.FAMILIAR,
      });

      // Then
      expect(result).toBe('たかかった');
    });

    it('when conjugating たかい past familiar negative, then returns たかくなかった', () => {
      // Given
      const adj = new Adjective('たかい', 'i', 'high/expensive');

      // When
      const result = adj.conjugate({
        tense: AdjectiveTense.PAST,
        polarity: AdjectivePolarity.NEGATIVE,
        register: AdjectiveRegister.FAMILIAR,
      });

      // Then
      expect(result).toBe('たかくなかった');
    });

    it('when conjugating たかい past polite affirmative, then returns たかかったです', () => {
      // Given
      const adj = new Adjective('たかい', 'i', 'high/expensive');

      // When
      const result = adj.conjugate({
        tense: AdjectiveTense.PAST,
        polarity: AdjectivePolarity.AFFIRMATIVE,
        register: AdjectiveRegister.POLITE,
      });

      // Then
      expect(result).toBe('たかかったです');
    });

    it('when conjugating たかい past polite negative, then returns たかくありませんでした', () => {
      // Given
      const adj = new Adjective('たかい', 'i', 'high/expensive');

      // When
      const result = adj.conjugate({
        tense: AdjectiveTense.PAST,
        polarity: AdjectivePolarity.NEGATIVE,
        register: AdjectiveRegister.POLITE,
      });

      // Then
      expect(result).toBe('たかくありませんでした');
    });

    it('when conjugating special いい past familiar affirmative, then returns よかった', () => {
      // Given
      const adj = new Adjective('いい', 'i', 'good');

      // When
      const result = adj.conjugate({
        tense: AdjectiveTense.PAST,
        polarity: AdjectivePolarity.AFFIRMATIVE,
        register: AdjectiveRegister.FAMILIAR,
      });

      // Then
      expect(result).toBe('よかった');
    });

    it('when conjugating special いい past familiar negative, then returns よくなかった', () => {
      // Given
      const adj = new Adjective('いい', 'i', 'good');

      // When
      const result = adj.conjugate({
        tense: AdjectiveTense.PAST,
        polarity: AdjectivePolarity.NEGATIVE,
        register: AdjectiveRegister.FAMILIAR,
      });

      // Then
      expect(result).toBe('よくなかった');
    });

    it('when conjugating きれい past familiar affirmative, then returns きれいだった', () => {
      // Given
      const adj = new Adjective('きれい', 'na', 'clean/pretty');

      // When
      const result = adj.conjugate({
        tense: AdjectiveTense.PAST,
        polarity: AdjectivePolarity.AFFIRMATIVE,
        register: AdjectiveRegister.FAMILIAR,
      });

      // Then
      expect(result).toBe('きれいだった');
    });

    it('when conjugating きれい past familiar negative, then returns きれいじゃなかった', () => {
      // Given
      const adj = new Adjective('きれい', 'na', 'clean/pretty');

      // When
      const result = adj.conjugate({
        tense: AdjectiveTense.PAST,
        polarity: AdjectivePolarity.NEGATIVE,
        register: AdjectiveRegister.FAMILIAR,
      });

      // Then
      expect(result).toBe('きれいじゃなかった');
    });

    it('when conjugating きれい past polite affirmative, then returns きれいでした', () => {
      // Given
      const adj = new Adjective('きれい', 'na', 'clean/pretty');

      // When
      const result = adj.conjugate({
        tense: AdjectiveTense.PAST,
        polarity: AdjectivePolarity.AFFIRMATIVE,
        register: AdjectiveRegister.POLITE,
      });

      // Then
      expect(result).toBe('きれいでした');
    });

    it('when conjugating きれい past polite negative, then returns きれいではありませんでした', () => {
      // Given
      const adj = new Adjective('きれい', 'na', 'clean/pretty');

      // When
      const result = adj.conjugate({
        tense: AdjectiveTense.PAST,
        polarity: AdjectivePolarity.NEGATIVE,
        register: AdjectiveRegister.POLITE,
      });

      // Then
      expect(result).toBe('きれいではありませんでした');
    });
  });

  describe('acceptableAnswers()', () => {
    it('when i-adj polite present negative, then returns たかくありません and たかくないです', () => {
      // Given
      const adj = new Adjective('たかい', 'i', 'high/expensive');

      // When
      const result = adj.acceptableAnswers({
        tense: AdjectiveTense.PRESENT,
        polarity: AdjectivePolarity.NEGATIVE,
        register: AdjectiveRegister.POLITE,
      });

      // Then
      expect(result).toEqual(['たかくありません', 'たかくないです']);
    });

    it('when i-adj polite past negative, then returns たかくありませんでした and たかくなかったです', () => {
      // Given
      const adj = new Adjective('たかい', 'i', 'high/expensive');

      // When
      const result = adj.acceptableAnswers({
        tense: AdjectiveTense.PAST,
        polarity: AdjectivePolarity.NEGATIVE,
        register: AdjectiveRegister.POLITE,
      });

      // Then
      expect(result).toEqual(['たかくありませんでした', 'たかくなかったです']);
    });

    it('when i-adj polite present affirmative, then returns single answer', () => {
      // Given
      const adj = new Adjective('たかい', 'i', 'high/expensive');

      // When
      const result = adj.acceptableAnswers({
        tense: AdjectiveTense.PRESENT,
        polarity: AdjectivePolarity.AFFIRMATIVE,
        register: AdjectiveRegister.POLITE,
      });

      // Then
      expect(result).toEqual(['たかいです']);
    });

    it('when i-adj familiar present negative, then returns single answer', () => {
      // Given
      const adj = new Adjective('たかい', 'i', 'high/expensive');

      // When
      const result = adj.acceptableAnswers({
        tense: AdjectiveTense.PRESENT,
        polarity: AdjectivePolarity.NEGATIVE,
        register: AdjectiveRegister.FAMILIAR,
      });

      // Then
      expect(result).toEqual(['たかくない']);
    });

    it('when na-adj polite present negative, then returns きれいではありません and きれいじゃないです', () => {
      // Given
      const adj = new Adjective('きれい', 'na', 'clean/pretty');

      // When
      const result = adj.acceptableAnswers({
        tense: AdjectiveTense.PRESENT,
        polarity: AdjectivePolarity.NEGATIVE,
        register: AdjectiveRegister.POLITE,
      });

      // Then
      expect(result).toEqual(['きれいではありません', 'きれいじゃないです']);
    });

    it('when na-adj polite past negative, then returns きれいではありませんでした and きれいじゃなかったです', () => {
      // Given
      const adj = new Adjective('きれい', 'na', 'clean/pretty');

      // When
      const result = adj.acceptableAnswers({
        tense: AdjectiveTense.PAST,
        polarity: AdjectivePolarity.NEGATIVE,
        register: AdjectiveRegister.POLITE,
      });

      // Then
      expect(result).toEqual(['きれいではありませんでした', 'きれいじゃなかったです']);
    });

    it('when na-adj polite present affirmative, then returns single answer', () => {
      // Given
      const adj = new Adjective('きれい', 'na', 'clean/pretty');

      // When
      const result = adj.acceptableAnswers({
        tense: AdjectiveTense.PRESENT,
        polarity: AdjectivePolarity.AFFIRMATIVE,
        register: AdjectiveRegister.POLITE,
      });

      // Then
      expect(result).toEqual(['きれいです']);
    });

    it('when na-adj familiar present negative, then returns single answer', () => {
      // Given
      const adj = new Adjective('きれい', 'na', 'clean/pretty');

      // When
      const result = adj.acceptableAnswers({
        tense: AdjectiveTense.PRESENT,
        polarity: AdjectivePolarity.NEGATIVE,
        register: AdjectiveRegister.FAMILIAR,
      });

      // Then
      expect(result).toEqual(['きれいじゃない']);
    });

    it('when na-adj familiar present affirmative, then returns きれいだ and きれい', () => {
      // Given
      const adj = new Adjective('きれい', 'na', 'clean/pretty');

      // When
      const result = adj.acceptableAnswers({
        tense: AdjectiveTense.PRESENT,
        polarity: AdjectivePolarity.AFFIRMATIVE,
        register: AdjectiveRegister.FAMILIAR,
      });

      // Then
      expect(result).toEqual(['きれいだ', 'きれい']);
    });
  });
});

describe('AdjectiveConjugationFormUtils.getRandomFormFor', () => {
  it('when given affirmative only, then never returns a negative form', () => {
    // Given
    const polarities = [AdjectivePolarity.AFFIRMATIVE];

    // When
    const forms = Array.from({ length: 50 }, () =>
      AdjectiveConjugationFormUtils.getRandomFormFor(polarities)
    );

    // Then
    forms.forEach((form) => expect(form.polarity).toBe(AdjectivePolarity.AFFIRMATIVE));
  });

  it('when given negative only, then never returns an affirmative form', () => {
    // Given
    const polarities = [AdjectivePolarity.NEGATIVE];

    // When
    const forms = Array.from({ length: 50 }, () =>
      AdjectiveConjugationFormUtils.getRandomFormFor(polarities)
    );

    // Then
    forms.forEach((form) => expect(form.polarity).toBe(AdjectivePolarity.NEGATIVE));
  });

  it('when given familiar only, then never returns a polite form', () => {
    // Given
    const registers = [AdjectiveRegister.FAMILIAR];

    // When
    const forms = Array.from({ length: 50 }, () =>
      AdjectiveConjugationFormUtils.getRandomFormFor(undefined, registers)
    );

    // Then
    forms.forEach((form) => expect(form.register).toBe(AdjectiveRegister.FAMILIAR));
  });

  it('when given polite only, then never returns a familiar form', () => {
    // Given
    const registers = [AdjectiveRegister.POLITE];

    // When
    const forms = Array.from({ length: 50 }, () =>
      AdjectiveConjugationFormUtils.getRandomFormFor(undefined, registers)
    );

    // Then
    forms.forEach((form) => expect(form.register).toBe(AdjectiveRegister.POLITE));
  });

  it('when both polarities and both registers given, then all combinations can be returned', () => {
    // Given
    const polarities = [AdjectivePolarity.AFFIRMATIVE, AdjectivePolarity.NEGATIVE];
    const registers = [AdjectiveRegister.FAMILIAR, AdjectiveRegister.POLITE];

    // When
    const returnedCombinations = new Set(
      Array.from({ length: 100 }, () => {
        const form = AdjectiveConjugationFormUtils.getRandomFormFor(polarities, registers);
        return `${form.polarity}:${form.register}`;
      })
    );

    // Then
    expect(returnedCombinations.size).toBeGreaterThan(1);
  });
});
