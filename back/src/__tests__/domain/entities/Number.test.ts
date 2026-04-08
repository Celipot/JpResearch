import { describe, it, expect } from 'vitest';
import { Number } from '../../../domain/entities/Number';

describe('Number', () => {
  describe('constructor', () => {
    it('given a number, then stores the value, hiragana and romaji', () => {
      // Given
      const value = 42;

      // When
      const number = new Number(value);

      // Then
      expect(number.value).toBe(42);
      expect(number.hiragana).toBe('よんじゅうに');
      expect(number.romaji).toBe('yonjūni');
    });
  });

  describe('single digits', () => {
    it('given 1, then returns correct hiragana and romaji', () => {
      // Given
      const value = 1;

      // When
      const number = new Number(value);

      // Then
      expect(number.hiragana).toBe('いち');
      expect(number.romaji).toBe('ichi');
    });

    it('given 5, then returns correct hiragana and romaji', () => {
      // Given
      const value = 5;

      // When
      const number = new Number(value);

      // Then
      expect(number.hiragana).toBe('ご');
      expect(number.romaji).toBe('go');
    });

    it('given 9, then returns valid hiragana and romaji (alternative pronunciations)', () => {
      // Given
      const value = 9;

      // When
      const number = new Number(value);

      // Then
      expect(['きゅう', 'く']).toContain(number.hiragana);
      expect(['kyū', 'ku']).toContain(number.romaji);
    });
  });

  describe('tens', () => {
    it('given 10, then returns correct hiragana and romaji', () => {
      // Given
      const value = 10;

      // When
      const number = new Number(value);

      // Then
      expect(number.hiragana).toBe('じゅう');
      expect(number.romaji).toBe('jū');
    });

    it('given 30, then returns correct hiragana and romaji', () => {
      // Given
      const value = 30;

      // When
      const number = new Number(value);

      // Then
      expect(number.hiragana).toBe('さんじゅう');
      expect(number.romaji).toBe('sanjū');
    });
  });

  describe('hundreds', () => {
    it('given 100, then returns correct hiragana and romaji', () => {
      // Given
      const value = 100;

      // When
      const number = new Number(value);

      // Then
      expect(number.hiragana).toBe('ひゃく');
      expect(number.romaji).toBe('hyaku');
    });

    it('given 300, then returns correct hiragana and romaji (rendaku)', () => {
      // Given
      const value = 300;

      // When
      const number = new Number(value);

      // Then
      expect(number.hiragana).toBe('さんびゃく');
      expect(number.romaji).toBe('sanbyaku');
    });

    it('given 600, then returns correct hiragana and romaji (sokuon)', () => {
      // Given
      const value = 600;

      // When
      const number = new Number(value);

      // Then
      expect(number.hiragana).toBe('ろっぴゃく');
      expect(number.romaji).toBe('roppyaku');
    });

    it('given 800, then returns correct hiragana and romaji (sokuon)', () => {
      // Given
      const value = 800;

      // When
      const number = new Number(value);

      // Then
      expect(number.hiragana).toBe('はっぴゃく');
      expect(number.romaji).toBe('happyaku');
    });
  });

  describe('thousands', () => {
    it('given 1000, then returns correct hiragana and romaji', () => {
      // Given
      const value = 1000;

      // When
      const number = new Number(value);

      // Then
      expect(number.hiragana).toBe('せん');
      expect(number.romaji).toBe('sen');
    });

    it('given 3000, then returns correct hiragana and romaji (dakuon)', () => {
      // Given
      const value = 3000;

      // When
      const number = new Number(value);

      // Then
      expect(number.hiragana).toBe('さんぜん');
      expect(number.romaji).toBe('sanzen');
    });

    it('given 8000, then returns correct hiragana and romaji (sokuon)', () => {
      // Given
      const value = 8000;

      // When
      const number = new Number(value);

      // Then
      expect(number.hiragana).toBe('はっせん');
      expect(number.romaji).toBe('hassen');
    });
  });

  describe('complex numbers', () => {
    it('given 9999, then returns correct hiragana and romaji', () => {
      // Given
      const value = 9999;

      // When
      const number = new Number(value);

      // Then
      expect(number.hiragana).toBe('きゅうせんきゅうひゃくきゅうじゅうきゅう');
      expect(number.romaji).toBe('kyūsenkyūhyakukyūjūkyū');
    });
  });

  describe('allPronunciations', () => {
    it('given a number without alternative digits, then returns only one pronunciation', () => {
      // Given
      const value = 5;

      // When
      const number = new Number(value);

      // Then
      expect(number.allPronunciations).toHaveLength(1);
      expect(number.allPronunciations[0]).toEqual({
        hiragana: 'ご',
        romaji: 'go',
        isStandard: true,
      });
    });

    it('given 4, then returns all pronunciations (よん and し)', () => {
      // Given
      const value = 4;

      // When
      const number = new Number(value);

      // Then
      expect(number.allPronunciations).toHaveLength(2);
      const hiraganas = number.allPronunciations.map((p) => p.hiragana);
      const romajis = number.allPronunciations.map((p) => p.romaji);
      expect(hiraganas).toContain('よん');
      expect(hiraganas).toContain('し');
      expect(romajis).toContain('yon');
      expect(romajis).toContain('shi');
    });

    it('given 7, then returns all pronunciations (なな and しち)', () => {
      // Given
      const value = 7;

      // When
      const number = new Number(value);

      // Then
      expect(number.allPronunciations).toHaveLength(2);
      const hiraganas = number.allPronunciations.map((p) => p.hiragana);
      const romajis = number.allPronunciations.map((p) => p.romaji);
      expect(hiraganas).toContain('なな');
      expect(hiraganas).toContain('しち');
      expect(romajis).toContain('nana');
      expect(romajis).toContain('shichi');
    });

    it('given 9, then returns all pronunciations (きゅう and く)', () => {
      // Given
      const value = 9;

      // When
      const number = new Number(value);

      // Then
      expect(number.allPronunciations).toHaveLength(2);
      const hiraganas = number.allPronunciations.map((p) => p.hiragana);
      const romajis = number.allPronunciations.map((p) => p.romaji);
      expect(hiraganas).toContain('きゅう');
      expect(hiraganas).toContain('く');
      expect(romajis).toContain('kyū');
      expect(romajis).toContain('ku');
    });

    it('given 44, then returns all combinations (4×4=4 pronunciations)', () => {
      // Given
      const value = 44;

      // When
      const number = new Number(value);

      // Then
      expect(number.allPronunciations).toHaveLength(4);
      const hiraganas = number.allPronunciations.map((p) => p.hiragana);
      expect(hiraganas).toContain('よんじゅうよん');
      expect(hiraganas).toContain('よんじゅうし');
      expect(hiraganas).toContain('しじゅうよん');
      expect(hiraganas).toContain('しじゅうし');
    });

    it('given 47, then returns all combinations (2×2=4 pronunciations)', () => {
      // Given
      const value = 47;

      // When
      const number = new Number(value);

      // Then
      expect(number.allPronunciations).toHaveLength(4);
      const hiraganas = number.allPronunciations.map((p) => p.hiragana);
      expect(hiraganas).toContain('よんじゅうなな');
      expect(hiraganas).toContain('よんじゅうしち');
      expect(hiraganas).toContain('しじゅうなな');
      expect(hiraganas).toContain('しじゅうしち');
    });

    it('given 474, then returns all combinations (2×2×2=8 pronunciations)', () => {
      // Given
      const value = 474;

      // When
      const number = new Number(value);

      // Then
      expect(number.allPronunciations).toHaveLength(8);
      const hiraganas = number.allPronunciations.map((p) => p.hiragana);
      expect(hiraganas).toContain('よんひゃくななじゅうよん');
      expect(hiraganas).toContain('よんひゃくななじゅうし');
      expect(hiraganas).toContain('しひゃくななじゅうよん');
      expect(hiraganas).toContain('しひゃくしちじゅうし');
    });

    it('given 9999, then returns all combinations (2^4=16 pronunciations)', () => {
      // Given
      const value = 9999;

      // When
      const number = new Number(value);

      // Then
      expect(number.allPronunciations).toHaveLength(16);
      const hiraganas = number.allPronunciations.map((p) => p.hiragana);
      expect(hiraganas).toContain('きゅうせんきゅうひゃくきゅうじゅうきゅう');
      expect(hiraganas).toContain('きゅうせんきゅうひゃくきゅうじゅうく');
      expect(hiraganas).toContain('くせんくひゃくくじゅうきゅう');
      expect(hiraganas).toContain('くせんくひゃくくじゅうく');
    });

    it('given a number with alternative digits, then each pronunciation has correct isStandard flag', () => {
      // Given
      const value = 44;

      // When
      const number = new Number(value);

      // Then
      expect(number.allPronunciations).toHaveLength(4);
      expect(number.allPronunciations.filter((p) => p.isStandard)).toHaveLength(1);
      expect(number.allPronunciations.filter((p) => !p.isStandard)).toHaveLength(3);
    });
  });
});
