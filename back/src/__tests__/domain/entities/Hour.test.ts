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

  describe('allPronunciations', () => {
    it('given an hour without alternative digits, then returns only one pronunciation', () => {
      // Given
      const hour = new Hour(5, 30);

      // When
      const pronunciations = hour.allPronunciations;

      // Then
      expect(pronunciations).toHaveLength(1);
      expect(pronunciations[0]).toEqual({
        hiragana: 'ごじさんじゅっぷん',
        romaji: 'gojisanjuppun',
        isStandard: true,
      });
    });

    it('given 4h00, then returns all pronunciations (よじ and しじ)', () => {
      // Given
      const hour = new Hour(4, 0);

      // When
      const pronunciations = hour.allPronunciations;

      // Then
      expect(pronunciations).toHaveLength(2);
      const hiraganas = pronunciations.map(p => p.hiragana);
      expect(hiraganas).toContain('よじ');
      expect(hiraganas).toContain('しじ');
    });

    it('given 7h00, then returns all pronunciations (しちじ and ななじ)', () => {
      // Given
      const hour = new Hour(7, 0);

      // When
      const pronunciations = hour.allPronunciations;

      // Then
      expect(pronunciations).toHaveLength(2);
      const hiraganas = pronunciations.map(p => p.hiragana);
      expect(hiraganas).toContain('しちじ');
      expect(hiraganas).toContain('ななじ');
    });

    it('given 9h00, then returns all pronunciations (きゅうじ and くじ)', () => {
      // Given
      const hour = new Hour(9, 0);

      // When
      const pronunciations = hour.allPronunciations;

      // Then
      expect(pronunciations).toHaveLength(2);
      const hiraganas = pronunciations.map(p => p.hiragana);
      expect(hiraganas).toContain('きゅうじ');
      expect(hiraganas).toContain('くじ');
    });

    it('given 4h04, then returns all combinations (2×2=4 pronunciations)', () => {
      // Given
      const hour = new Hour(4, 4);

      // When
      const pronunciations = hour.allPronunciations;

      // Then
      expect(pronunciations).toHaveLength(4);
      const hiraganas = pronunciations.map(p => p.hiragana);
      expect(hiraganas).toContain('よじよんぷん');
      expect(hiraganas).toContain('よじしぷん');
      expect(hiraganas).toContain('しじよんぷん');
      expect(hiraganas).toContain('しじしぷん');
    });

    it('given 7h07, then returns all combinations (2×2=4 pronunciations)', () => {
      // Given
      const hour = new Hour(7, 7);

      // When
      const pronunciations = hour.allPronunciations;

      // Then
      expect(pronunciations).toHaveLength(4);
      const hiraganas = pronunciations.map(p => p.hiragana);
      expect(hiraganas).toContain('しちじななふん');
      expect(hiraganas).toContain('しちじしちふん');
      expect(hiraganas).toContain('ななじななふん');
      expect(hiraganas).toContain('ななじしちふん');
    });

    it('given 9h09, then returns all combinations (2×2=4 pronunciations)', () => {
      // Given
      const hour = new Hour(9, 9);

      // When
      const pronunciations = hour.allPronunciations;

      // Then
      expect(pronunciations).toHaveLength(4);
      const hiraganas = pronunciations.map(p => p.hiragana);
      expect(hiraganas).toContain('きゅうじきゅうふん');
      expect(hiraganas).toContain('きゅうじくふん');
      expect(hiraganas).toContain('くじきゅうふん');
      expect(hiraganas).toContain('くじくふん');
    });

    it('given 4h40, then returns all combinations (2×2=4 pronunciations)', () => {
      // Given
      const hour = new Hour(4, 40);

      // When
      const pronunciations = hour.allPronunciations;

      // Then
      expect(pronunciations).toHaveLength(4);
      const hiraganas = pronunciations.map(p => p.hiragana);
      expect(hiraganas).toContain('よじよんじゅっぷん');
      expect(hiraganas).toContain('よじしじゅっぷん');
      expect(hiraganas).toContain('しじよんじゅっぷん');
      expect(hiraganas).toContain('しじしじゅっぷん');
    });

    it('given 4h44, then returns all combinations (2×2=4 pronunciations)', () => {
      // Given
      const hour = new Hour(4, 44);

      // When
      const pronunciations = hour.allPronunciations;

      // Then
      expect(pronunciations).toHaveLength(4);
      const hiraganas = pronunciations.map(p => p.hiragana);
      expect(hiraganas).toContain('よじよんじゅうよんぷん');
      expect(hiraganas).toContain('しじよんじゅうしぷん');
    });

    it('given an hour with alternative digits, then each pronunciation has correct isStandard flag', () => {
      // Given
      const hour = new Hour(4, 4);

      // When
      const pronunciations = hour.allPronunciations;

      // Then
      expect(pronunciations).toHaveLength(4);
      expect(pronunciations.filter(p => p.isStandard)).toHaveLength(1);
      expect(pronunciations.filter(p => !p.isStandard)).toHaveLength(3);
    });
  });
});
