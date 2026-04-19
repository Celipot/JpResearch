import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../index';

const VALID_ADJECTIVE_TYPES = ['i', 'na'];
const VALID_POLARITIES = ['affirmative', 'negative'];
const VALID_REGISTERS = ['familiar', 'polite'];
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
    expect(response.body).toHaveProperty('polarity');
    expect(response.body).toHaveProperty('register');
    expect(response.body).toHaveProperty('answer');
  });

  it('when sending request to endpoint, then response type is valid', async () => {
    // When
    const response = await request(app).get('/api/random-adjective');

    // Then
    expect(VALID_ADJECTIVE_TYPES).toContain(response.body.type);
  });

  it('when sending request to endpoint, then response polarity is valid', async () => {
    // When
    const response = await request(app).get('/api/random-adjective');

    // Then
    expect(VALID_POLARITIES).toContain(response.body.polarity);
  });

  it('when sending request to endpoint, then response register is valid', async () => {
    // When
    const response = await request(app).get('/api/random-adjective');

    // Then
    expect(VALID_REGISTERS).toContain(response.body.register);
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
      adjectives.add(
        `${response.body.hiragana}:${response.body.polarity}:${response.body.register}`
      );
    }

    // Then
    expect(adjectives.size).toBeGreaterThan(1);
  });
});

function isValidConjugation(body: {
  hiragana: string;
  type: string;
  polarity: string;
  register: string;
  answer: string;
}): boolean {
  const { hiragana, type, polarity, register, answer } = body;
  const stem = hiragana === '\u3044\u3044' ? '\u3088\u304f' : hiragana.slice(0, -1) + '\u304f';
  const isAffirmative = polarity === 'affirmative';
  const isPolite = register === 'polite';

  if (type === 'i') {
    if (isAffirmative && !isPolite) return answer === hiragana;
    if (isAffirmative && isPolite) return answer === hiragana + '\u3067\u3059';
    if (isPolite) return answer === stem + '\u3042\u308a\u307e\u305b\u3093';
    return answer === stem + '\u306a\u3044';
  }

  if (isAffirmative && !isPolite) return answer === hiragana + '\u3060';
  if (isAffirmative && isPolite) return answer === hiragana + '\u3067\u3059';
  if (isPolite) return answer === hiragana + '\u3067\u306f\u3042\u308a\u307e\u305b\u3093';
  return answer === hiragana + '\u3058\u3083\u306a\u3044';
}
