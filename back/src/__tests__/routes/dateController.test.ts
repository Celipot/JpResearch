import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../index';

describe('GET /api/random-date', () => {
  it('given a GET request to /api/random-date, then returns status 200 with year, month, day, hiragana, romaji and japaneseFormat', async () => {
    const response = await request(app).get('/api/random-date');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('year');
    expect(response.body).toHaveProperty('month');
    expect(response.body).toHaveProperty('day');
    expect(response.body).toHaveProperty('hiragana');
    expect(response.body).toHaveProperty('romaji');
    expect(response.body).toHaveProperty('japaneseFormat');

    const year = response.body.year;
    expect(typeof year).toBe('number');
    expect(year).toBeGreaterThanOrEqual(2000);
    expect(year).toBeLessThanOrEqual(2030);

    const month = response.body.month;
    expect(typeof month).toBe('number');
    expect(month).toBeGreaterThanOrEqual(1);
    expect(month).toBeLessThanOrEqual(12);

    const day = response.body.day;
    expect(typeof day).toBe('number');
    expect(day).toBeGreaterThanOrEqual(1);
    expect(day).toBeLessThanOrEqual(31);

    const hiragana = response.body.hiragana;
    expect(typeof hiragana).toBe('string');
    expect(hiragana.length).toBeGreaterThan(0);
    expect(/[\u3040-\u309F]+$/.test(hiragana)).toBe(true);

    const romaji = response.body.romaji;
    expect(typeof romaji).toBe('string');
    expect(romaji.length).toBeGreaterThan(0);

    const japaneseFormat = response.body.japaneseFormat;
    expect(typeof japaneseFormat).toBe('string');
    expect(japaneseFormat).toMatch(/^\d+年\d+月\d+日$/);
  });

  it('given multiple calls, then returns different dates', async () => {
    const dates = new Set<string>();

    for (let i = 0; i < 10; i++) {
      const response = await request(app).get('/api/random-date');
      dates.add(response.body.japaneseFormat);
    }

    expect(dates.size).toBeGreaterThan(1);
  });
});
