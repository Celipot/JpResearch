import { describe, it, expect } from 'vitest';
import { generateRandomHour } from '../../services/hourService';
import { Hour } from '../../domain/entities/Hour';

describe('generateRandomHour', () => {
  it('given a call to generateRandomHour, then returns an Hour instance', () => {
    // When
    const result = generateRandomHour();

    // Then
    expect(result).toBeInstanceOf(Hour);
  });

  it('given multiple calls, then each result has valid hour and minute', () => {
    // When
    for (let i = 0; i < 100; i++) {
      const result = generateRandomHour();

      // Then
      expect(result.hour).toBeGreaterThanOrEqual(0);
      expect(result.hour).toBeLessThanOrEqual(23);
      expect(result.minute).toBeGreaterThanOrEqual(0);
      expect(result.minute).toBeLessThanOrEqual(59);
    }
  });

  it('given multiple calls, then each hiragana is valid', () => {
    // When
    for (let i = 0; i < 100; i++) {
      const result = generateRandomHour();

      // Then
      expect(result.hiragana.length).toBeGreaterThan(0);
      expect(/[\u3040-\u309F]+$/.test(result.hiragana)).toBe(true);
    }
  });

  it('given 50 calls, then produces different values', () => {
    // Given
    const results = new Set<string>();

    // When
    for (let i = 0; i < 50; i++) {
      const hour = generateRandomHour();
      results.add(`${hour.hour}:${hour.minute}`);
    }

    // Then
    expect(results.size).toBeGreaterThan(1);
  });
});
