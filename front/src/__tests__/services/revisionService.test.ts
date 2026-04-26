import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getRandomVerb,
  getRandomAdjective,
  getRandomNumber,
  getRandomHour,
  getRandomDate,
  checkAnswer,
} from '../../services/revisionService';

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('revisionService', () => {
  describe('getRandomVerb', () => {
    it('when called without kinds, then fetches from /api/random-verb', async () => {
      // Given
      global.fetch = vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
      ) as unknown as typeof fetch;

      // When
      await getRandomVerb();

      // Then
      expect(fetch).toHaveBeenCalledWith('/api/random-verb');
    });

    it('when called with kinds, then fetches with kinds query param', async () => {
      // Given
      global.fetch = vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
      ) as unknown as typeof fetch;

      // When
      await getRandomVerb(['te', 'tara']);

      // Then
      expect(fetch).toHaveBeenCalledWith('/api/random-verb?kinds=te%2Ctara');
    });
  });

  describe('getRandomAdjective', () => {
    it('when called, then fetches from /api/random-adjective', async () => {
      // Given
      const mockResponse = {
        hiragana: 'たかい',
        type: 'i',
        translation: 'expensive',
        form: 'present_negative',
        answer: 'たかくない',
      };
      global.fetch = vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve(mockResponse) })
      ) as unknown as typeof fetch;

      // When
      const result = await getRandomAdjective();

      // Then
      expect(fetch).toHaveBeenCalledWith('/api/random-adjective');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getRandomNumber', () => {
    it('when called with min and max, then fetches with correct query params', async () => {
      // Given
      const mockResponse = {
        number: 42,
        hiragana: 'よんじゅうに',
        romaji: 'yonjuuni',
        allPronunciations: [],
      };
      global.fetch = vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve(mockResponse) })
      ) as unknown as typeof fetch;

      // When
      const result = await getRandomNumber(1, 100);

      // Then
      expect(fetch).toHaveBeenCalledWith('/api/random?min=1&max=100');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getRandomHour', () => {
    it('when called, then fetches from /api/random-hour', async () => {
      // Given
      const mockResponse = {
        hour: 12,
        minute: 30,
        hiragana: 'じゅうにじさんじゅっぷん',
        romaji: 'jūnijisanjuppun',
        allPronunciations: [],
      };
      global.fetch = vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve(mockResponse) })
      ) as unknown as typeof fetch;

      // When
      const result = await getRandomHour();

      // Then
      expect(fetch).toHaveBeenCalledWith('/api/random-hour');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getRandomDate', () => {
    it('when called, then fetches from /api/random-date', async () => {
      // Given
      const mockResponse = {
        year: 2024,
        month: 6,
        day: 20,
        hiragana: 'にせんにじゅうよんねん',
        romaji: 'nisennijūyonen',
        japaneseFormat: '2024年6月20日',
        allPronunciations: [],
      };
      global.fetch = vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve(mockResponse) })
      ) as unknown as typeof fetch;

      // When
      const result = await getRandomDate();

      // Then
      expect(fetch).toHaveBeenCalledWith('/api/random-date');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('checkAnswer', () => {
    it('when called with one expected answer, then posts to /api/check-answer and returns correct', async () => {
      // Given
      global.fetch = vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve({ correct: true }) })
      ) as unknown as typeof fetch;

      // When
      const result = await checkAnswer('takakunai', ['たかくない']);

      // Then
      expect(fetch).toHaveBeenCalledWith('/api/check-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userAnswer: 'takakunai', expectedAnswers: ['たかくない'] }),
      });
      expect(result).toBe(true);
    });

    it('when called with multiple expected answers, then posts all to /api/check-answer', async () => {
      // Given
      global.fetch = vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve({ correct: false }) })
      ) as unknown as typeof fetch;

      // When
      const result = await checkAnswer('wrong', ['じゅう', 'とお']);

      // Then
      expect(fetch).toHaveBeenCalledWith('/api/check-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userAnswer: 'wrong', expectedAnswers: ['じゅう', 'とお'] }),
      });
      expect(result).toBe(false);
    });
  });
});
