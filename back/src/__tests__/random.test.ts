import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('GET /api/random', () => {
  it('given a GET request to /api/random, then returns status 200 with a random number and hiragana', async () => {
    const response = await request(app).get('/api/random');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('random');
    expect(response.body).toHaveProperty('hiragana');

    const random = response.body.random;
    expect(typeof random).toBe('number');
    expect(random).toBeGreaterThanOrEqual(1);
    expect(random).toBeLessThanOrEqual(10000);

    const hiragana = response.body.hiragana;
    expect(typeof hiragana).toBe('string');
    expect(hiragana.length).toBeGreaterThan(0);
    expect(/[\u3040-\u309F]+/.test(hiragana)).toBe(true);
  });
});
