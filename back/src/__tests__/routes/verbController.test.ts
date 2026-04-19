import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../index';

const VALID_TYPES = ['ichidan', 'godan', 'irregular'];
const VALID_TENSES = ['present', 'past'];
const VALID_POLARITIES = ['affirmative', 'negative'];
const VALID_REGISTERS = ['plain', 'polite'];

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
    expect(response.body).toHaveProperty('tense');
    expect(response.body).toHaveProperty('polarity');
    expect(response.body).toHaveProperty('register');
    expect(response.body).toHaveProperty('answers');
  });

  it('when sending request, then type is valid', async () => {
    // When
    const response = await request(app).get('/api/random-verb');

    // Then
    expect(VALID_TYPES).toContain(response.body.type);
  });

  it('when sending request, then tense is valid', async () => {
    // When
    const response = await request(app).get('/api/random-verb');

    // Then
    expect(VALID_TENSES).toContain(response.body.tense);
  });

  it('when sending request, then polarity is valid', async () => {
    // When
    const response = await request(app).get('/api/random-verb');

    // Then
    expect(VALID_POLARITIES).toContain(response.body.polarity);
  });

  it('when sending request, then register is valid', async () => {
    // When
    const response = await request(app).get('/api/random-verb');

    // Then
    expect(VALID_REGISTERS).toContain(response.body.register);
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
    const verbs = new Set<string>();
    for (let i = 0; i < 20; i++) {
      const response = await request(app).get('/api/random-verb');
      const { kanji, tense, polarity, register } = response.body;
      verbs.add(`${kanji}:${tense}:${polarity}:${register}`);
    }

    // Then
    expect(verbs.size).toBeGreaterThan(1);
  });
});
