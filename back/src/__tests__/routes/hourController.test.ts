import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../index';

describe('GET /api/random-hour', () => {
  it('given a GET request to /api/random-hour, then returns status 200 with hour, minute, hiragana and romaji', async () => {
    // When
    const response = await request(app).get('/api/random-hour');

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('hour');
    expect(response.body).toHaveProperty('minute');
    expect(response.body).toHaveProperty('hiragana');
    expect(response.body).toHaveProperty('romaji');

    const hour = response.body.hour;
    expect(typeof hour).toBe('number');
    expect(hour).toBeGreaterThanOrEqual(0);
    expect(hour).toBeLessThanOrEqual(23);

    const minute = response.body.minute;
    expect(typeof minute).toBe('number');
    expect(minute).toBeGreaterThanOrEqual(0);
    expect(minute).toBeLessThanOrEqual(59);

    const hiragana = response.body.hiragana;
    expect(typeof hiragana).toBe('string');
    expect(hiragana.length).toBeGreaterThan(0);
    expect(/[\u3040-\u309F]+$/.test(hiragana)).toBe(true);

    const romaji = response.body.romaji;
    expect(typeof romaji).toBe('string');
    expect(romaji.length).toBeGreaterThan(0);
  });
});
