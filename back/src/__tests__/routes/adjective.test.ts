import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../index';

const VALID_ADJECTIVE_TYPES = ['i', 'na'];
const VALID_FORMS = [
  'present_affirmative',
  'present_negative',
  'present_affirmative_polite',
  'present_negative_polite',
];
const HIRAGANA_REGEX = /[\u3040-\u309F]+$/;

describe('GET /api/random-adjective', () => {
  it('when sending request to endpoint, then returns 200 with all properties', async () => {
    // When
    const response = await request(app).get('/api/random-adjective');

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('hiragana');
    expect(response.body).toHaveProperty('type');
    expect(response.body).toHaveProperty('translation');
    expect(response.body).toHaveProperty('form');
    expect(response.body).toHaveProperty('answer');
  });

  it('when sending request to endpoint, then response type is valid', async () => {
    // When
    const response = await request(app).get('/api/random-adjective');

    // Then
    expect(VALID_ADJECTIVE_TYPES).toContain(response.body.type);
  });

  it('when sending request to endpoint, then response form is valid', async () => {
    // When
    const response = await request(app).get('/api/random-adjective');

    // Then
    expect(VALID_FORMS).toContain(response.body.form);
  });

  it('when sending request to endpoint, then hiragana is valid Japanese string', async () => {
    // When
    const response = await request(app).get('/api/random-adjective');
    const { hiragana } = response.body;

    // Then
    expect(typeof hiragana).toBe('string');
    expect(hiragana.length).toBeGreaterThan(0);
    expect(HIRAGANA_REGEX.test(hiragana)).toBe(true);
  });

  it('when sending request to endpoint, then translation is non-empty string', async () => {
    // When
    const response = await request(app).get('/api/random-adjective');
    const { translation } = response.body;

    // Then
    expect(typeof translation).toBe('string');
    expect(translation.length).toBeGreaterThan(0);
  });

  it('when sending request to endpoint, then answer is valid Japanese string', async () => {
    // When
    const response = await request(app).get('/api/random-adjective');
    const { answer } = response.body;

    // Then
    expect(typeof answer).toBe('string');
    expect(answer.length).toBeGreaterThan(0);
    expect(HIRAGANA_REGEX.test(answer)).toBe(true);
  });

  it('when sending request to endpoint, then answer matches correct conjugation', async () => {
    // When
    const response = await request(app).get('/api/random-adjective');

    // Then
    expect(isValidConjugation(response.body)).toBe(true);
  });

  it('when sending multiple requests to endpoint, then responses vary', async () => {
    // When
    const adjectives = new Set<string>();
    for (let i = 0; i < 20; i++) {
      const response = await request(app).get('/api/random-adjective');
      adjectives.add(`${response.body.hiragana}:${response.body.form}`);
    }

    // Then
    expect(adjectives.size).toBeGreaterThan(1);
  });
});

function isValidConjugation(body: {
  hiragana: string;
  type: string;
  form: string;
  answer: string;
}): boolean {
  const { hiragana, type, form, answer } = body;
  const stem = hiragana === 'いい' ? 'よく' : hiragana.slice(0, -1) + 'く';

  if (type === 'i') {
    if (form === 'present_affirmative') return answer === hiragana;
    if (form === 'present_affirmative_polite') return answer === hiragana + 'です';
    if (form === 'present_negative_polite') return answer === stem + 'ありません';
    return answer === stem + 'ない';
  }

  if (form === 'present_affirmative') return answer === hiragana + 'だ';
  if (form === 'present_affirmative_polite') return answer === hiragana + 'です';
  if (form === 'present_negative_polite') return answer === hiragana + 'ではありません';
  return answer === hiragana + 'じゃない';
}
