import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../index';

describe('GET /api/random', () => {
  it('given a GET request to /api/random, then returns status 200 with a number, hiragana and romaji', async () => {
    const response = await request(app).get('/api/random');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('number');
    expect(response.body).toHaveProperty('hiragana');
    expect(response.body).toHaveProperty('romaji');

    const number = response.body.number;
    expect(typeof number).toBe('number');
    expect(number).toBeGreaterThanOrEqual(1);
    expect(number).toBeLessThanOrEqual(1000000000);

    const hiragana = response.body.hiragana;
    expect(typeof hiragana).toBe('string');
    expect(hiragana.length).toBeGreaterThan(0);
    expect(/[\u3040-\u309F]+/.test(hiragana)).toBe(true);

    const romaji = response.body.romaji;
    expect(typeof romaji).toBe('string');
    expect(romaji.length).toBeGreaterThan(0);
  });

  describe('with min and max query params', () => {
    it('given min=100 and max=200, then returns number between 100 and 200', async () => {
      for (let i = 0; i < 50; i++) {
        const response = await request(app).get('/api/random?min=100&max=200');

        expect(response.body.number).toBeGreaterThanOrEqual(100);
        expect(response.body.number).toBeLessThanOrEqual(200);
      }
    });

    it('given min=5000 and max=5000, then always returns 5000', async () => {
      const response = await request(app).get('/api/random?min=5000&max=5000');

      expect(response.body.number).toBe(5000);
    });

    it('given min=0 (below 1), then clamps to 1', async () => {
      const response = await request(app).get('/api/random?min=0&max=100');

      expect(response.body.number).toBeGreaterThanOrEqual(1);
    });

    it('given max=2000000000 (above 1000000000), then clamps to 1000000000', async () => {
      const response = await request(app).get('/api/random?min=900000000&max=2000000000');

      expect(response.body.number).toBeLessThanOrEqual(1000000000);
    });

    it('given min > max, then still works correctly', async () => {
      const response = await request(app).get('/api/random?min=200&max=100');

      expect(response.body.number).toBeGreaterThanOrEqual(100);
      expect(response.body.number).toBeLessThanOrEqual(200);
    });
  });
});
