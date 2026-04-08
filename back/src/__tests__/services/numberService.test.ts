import { describe, it, expect } from 'vitest';
import { generateRandomNumber } from '../../services/numberService';
import { Number } from '../../domain/entities/Number';

describe('generateRandomNumber', () => {
  it('given a call to generateRandomNumber, then returns a Number instance', () => {
    const result = generateRandomNumber();

    expect(result).toBeInstanceOf(Number);
  });

  it('given no params, then each result is between 1 and 10000', () => {
    for (let i = 0; i < 100; i++) {
      const result = generateRandomNumber();

      expect(result.value).toBeGreaterThanOrEqual(1);
      expect(result.value).toBeLessThanOrEqual(10000);
    }
  });

  it('given multiple calls, then each hiragana is valid', () => {
    for (let i = 0; i < 100; i++) {
      const result = generateRandomNumber();

      expect(result.hiragana.length).toBeGreaterThan(0);
      expect(/[\u3040-\u309F]+$/.test(result.hiragana)).toBe(true);
    }
  });

  it('given 50 calls, then produces different values', () => {
    const results = new Set<number>();

    for (let i = 0; i < 50; i++) {
      results.add(generateRandomNumber().value);
    }

    expect(results.size).toBeGreaterThan(1);
  });

  describe('with min and max params', () => {
    it('given min 100 and max 200, then returns number between 100 and 200', () => {
      for (let i = 0; i < 100; i++) {
        const result = generateRandomNumber(100, 200);

        expect(result.value).toBeGreaterThanOrEqual(100);
        expect(result.value).toBeLessThanOrEqual(200);
      }
    });

    it('given min 5000 and max 5000, then always returns 5000', () => {
      for (let i = 0; i < 10; i++) {
        const result = generateRandomNumber(5000, 5000);

        expect(result.value).toBe(5000);
      }
    });

    it('given min greater than max, then swaps them', () => {
      const result = generateRandomNumber(200, 100);

      expect(result.value).toBeGreaterThanOrEqual(100);
      expect(result.value).toBeLessThanOrEqual(200);
    });

    it('given min 1 and max 100, then returns numbers in range', () => {
      const results = new Set<number>();

      for (let i = 0; i < 100; i++) {
        const result = generateRandomNumber(1, 100);
        expect(result.value).toBeGreaterThanOrEqual(1);
        expect(result.value).toBeLessThanOrEqual(100);
        results.add(result.value);
      }

      expect(results.size).toBeGreaterThan(10);
    });
  });
});
