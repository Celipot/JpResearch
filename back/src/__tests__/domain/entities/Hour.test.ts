import { describe, it, expect } from 'vitest';
import { Hour } from '../../../domain/entities/Hour';

describe('Hour', () => {
  describe('factoryRandom()', () => {
    it('given a call to factoryRandom, then returns an hour between 0 and 23', () => {
      for (let i = 0; i < 100; i++) {
        // When
        const hour = Hour.factoryRandom();

        // Then
        expect(hour.hour).toBeGreaterThanOrEqual(0);
        expect(hour.hour).toBeLessThanOrEqual(23);
      }
    });

    it('given a call to factoryRandom, then returns a minute between 0 and 59', () => {
      for (let i = 0; i < 100; i++) {
        // When
        const hour = Hour.factoryRandom();

        // Then
        expect(hour.minute).toBeGreaterThanOrEqual(0);
        expect(hour.minute).toBeLessThanOrEqual(59);
      }
    });

    it('given 50 calls, then produces different values', () => {
      // Given
      const results = new Set<string>();

      // When
      for (let i = 0; i < 50; i++) {
        const hour = Hour.factoryRandom();
        results.add(`${hour.hour}:${hour.minute}`);
      }

      // Then
      expect(results.size).toBeGreaterThan(1);
    });
  });

  describe('hiragana and romaji', () => {
    it('given an hour with minutes, then stores hiragana and romaji', () => {
      // Given
      const hour = new Hour(1, 0);

      // Then
      expect(hour).toHaveProperty('hiragana');
      expect(hour).toHaveProperty('romaji');
    });

    it('given 1h00, then returns correct hiragana and romaji', () => {
      // Given
      const hour = new Hour(1, 0);

      // Then
      expect(hour.hiragana).toBe('いちじ');
      expect(hour.romaji).toBe('ichiji');
    });

    it('given 5h30, then returns correct hiragana and romaji', () => {
      // Given
      const hour = new Hour(5, 30);

      // Then
      expect(hour.hiragana).toBe('ごじさんじゅっぷん');
      expect(hour.romaji).toBe('gojisanjuppun');
    });

    it('given 12h15, then returns correct hiragana and romaji', () => {
      // Given
      const hour = new Hour(12, 15);

      // Then
      expect(hour.hiragana).toBe('じゅうにじじゅうごふん');
      expect(hour.romaji).toBe('jūnijijūgofun');
    });

    it('given 0h00, then returns correct hiragana and romaji', () => {
      // Given
      const hour = new Hour(0, 0);

      // Then
      expect(hour.hiragana).toBe('れいじ');
      expect(hour.romaji).toBe('reiji');
    });

    it('given 3h05, then returns correct hiragana and romaji', () => {
      // Given
      const hour = new Hour(3, 5);

      // Then
      expect(hour.hiragana).toBe('さんじごふん');
      expect(hour.romaji).toBe('sanjigofun');
    });

    it('given 1h46, then returns correct hiragana and romaji', () => {
      // Given
      const hour = new Hour(1, 46);

      // Then
      expect(hour.hiragana).toBe('いちじよんじゅうろっぷん');
      expect(hour.romaji).toBe('ichijiyonjūroppun');
    });

    it('given a call to factoryRandom, then returns valid hiragana', () => {
      for (let i = 0; i < 50; i++) {
        // When
        const hour = Hour.factoryRandom();

        // Then
        expect(hour.hiragana.length).toBeGreaterThan(0);
        expect(/[\u3040-\u309F]+$/.test(hour.hiragana)).toBe(true);
      }
    });

    it('given a call to factoryRandom, then returns valid romaji', () => {
      for (let i = 0; i < 50; i++) {
        // When
        const hour = Hour.factoryRandom();

        // Then
        expect(hour.romaji.length).toBeGreaterThan(0);
        expect(/[a-zū]+$/.test(hour.romaji)).toBe(true);
      }
    });
  });
});
