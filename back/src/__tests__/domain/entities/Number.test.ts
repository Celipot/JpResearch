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
});
