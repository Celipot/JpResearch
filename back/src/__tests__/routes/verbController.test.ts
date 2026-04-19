import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../index';

const VALID_TYPES = ['ichidan', 'godan', 'irregular'];
const VALID_KINDS = ['indicative', 'potential', 'passive', 'te', 'volitional'];

describe('GET /api/random-verb', () => {
  it('when sending request, then returns 200 with all properties', async () => {
    // When
    const response = await request(app).get('/api/random-verb');

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('kanji');
    expect(response.body).toHaveProperty('hiragana');
    expect(response.body).toHaveProperty('type');
    expect(response.body).toHaveProperty('translation');
    expect(response.body).toHaveProperty('form');
    expect(response.body).toHaveProperty('answers');
  });

  it('when sending request, then type is valid', async () => {
    // When
    const response = await request(app).get('/api/random-verb');

    // Then
    expect(VALID_TYPES).toContain(response.body.type);
  });

  it('when sending request, then form has valid kind', async () => {
    // When
    const response = await request(app).get('/api/random-verb');

    // Then
    expect(VALID_KINDS).toContain(response.body.form.kind);
  });

  it('when sending request, then answers is non-empty array', async () => {
    // When
    const response = await request(app).get('/api/random-verb');

    // Then
    expect(Array.isArray(response.body.answers)).toBe(true);
    expect(response.body.answers.length).toBeGreaterThan(0);
  });

  it('when sending multiple requests, then responses vary', async () => {
    // When
    const combinations = new Set<string>();
    for (let i = 0; i < 20; i++) {
      const response = await request(app).get('/api/random-verb');
      combinations.add(`${response.body.kanji}:${response.body.form.kind}`);
    }

    // Then
    expect(combinations.size).toBeGreaterThan(1);
  });
});
