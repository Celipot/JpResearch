import { describe, it, expect } from 'vitest';
import { generateRandomDate, getMaxDayInMonth } from '../../services/dateService';
import { Date } from '../../domain/entities/Date';

describe('generateRandomDate', () => {
  it('given a call to generateRandomDate, then returns a Date instance', () => {
    const result = generateRandomDate();

    expect(result).toBeInstanceOf(Date);
  });

  it('given multiple calls, then each result has valid japanese format (年、月、日)', () => {
    for (let i = 0; i < 100; i++) {
      const result = generateRandomDate();

      expect(result.japaneseFormat).toMatch(/^\d+年\d+月\d+日$/);
    }
  });

  it('given multiple calls, then each hiragana is valid (contains only hiragana characters)', () => {
    for (let i = 0; i < 100; i++) {
      const result = generateRandomDate();

      expect(result.hiragana.length).toBeGreaterThan(0);
      expect(/[\u3040-\u309F]+$/.test(result.hiragana)).toBe(true);
    }
  });

  it('given 50 calls, then produces different values', () => {
    const results = new Set<string>();

    for (let i = 0; i < 50; i++) {
      results.add(generateRandomDate().japaneseFormat);
    }

    expect(results.size).toBeGreaterThan(1);
  });

  it('given 1000 calls, then generates only valid dates (no Feb 30, Apr 31, etc.)', () => {
    const invalidDates = new Set<string>();

    for (let i = 0; i < 1000; i++) {
      const result = generateRandomDate();
      const format = result.japaneseFormat;
      const match = format.match(/^(\d+)年(\d+)月(\d+)日$/);

      if (match) {
        const year = parseInt(match[1]);
        const month = parseInt(match[2]);
        const day = parseInt(match[3]);

        const maxDay = getMaxDayInMonth(year, month);
        if (day > maxDay) {
          invalidDates.add(format);
        }
      }
    }

    expect(invalidDates.size).toBe(0);
  });
});
