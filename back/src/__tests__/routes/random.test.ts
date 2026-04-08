import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../index';

describe('GET /api/random', () => {
  it('given a GET request to /api/random, then returns status 200 with a number, hiragana and romaji', async () => {
    // When
    const response = await request(app).get('/api/random');

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('number');
    expect(response.body).toHaveProperty('hiragana');
    expect(response.body).toHaveProperty('romaji');

    const number = response.body.number;
    expect(typeof number).toBe('number');
    expect(number).toBeGreaterThanOrEqual(1);
    expect(number).toBeLessThanOrEqual(10000);

    const hiragana = response.body.hiragana;
    expect(typeof hiragana).toBe('string');
    expect(hiragana.length).toBeGreaterThan(0);
    expect(/[\u3040-\u309F]+/.test(hiragana)).toBe(true);

    const romaji = response.body.romaji;
    expect(typeof romaji).toBe('string');
    expect(romaji.length).toBeGreaterThan(0);
  });
});
