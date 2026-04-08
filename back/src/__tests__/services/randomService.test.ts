import { describe, it, expect } from 'vitest';
import { generateRandomNumber } from '../../services/randomService';
import { Number } from '../../domain/entities/Number';

describe('generateRandomNumber', () => {
  it('given a call to generateRandomNumber, then returns a Number instance', () => {
    // When
    const result = generateRandomNumber();

    // Then
    expect(result).toBeInstanceOf(Number);
  });

  it('given multiple calls, then each result is between 1 and 10000', () => {
    // When
    for (let i = 0; i < 100; i++) {
      const result = generateRandomNumber();

      // Then
      expect(result.value).toBeGreaterThanOrEqual(1);
      expect(result.value).toBeLessThanOrEqual(10000);
    }
  });

  it('given multiple calls, then each hiragana is valid', () => {
    // When
    for (let i = 0; i < 100; i++) {
      const result = generateRandomNumber();

      // Then
      expect(result.hiragana.length).toBeGreaterThan(0);
      expect(/[\u3040-\u309F]+$/.test(result.hiragana)).toBe(true);
    }
  });

  it('given 50 calls, then produces different numbers', () => {
    // Given
    const results = new Set<number>();

    // When
    for (let i = 0; i < 50; i++) {
      results.add(generateRandomNumber().value);
    }

    // Then
    expect(results.size).toBeGreaterThan(1);
  });
});
