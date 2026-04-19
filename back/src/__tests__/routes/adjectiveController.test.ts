import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../index';

const VALID_ADJECTIVE_TYPES = ['i', 'na'];
const VALID_TENSES = ['present', 'past'];
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
    expect(response.body).toHaveProperty('tense');
    expect(response.body).toHaveProperty('polarity');
    expect(response.body).toHaveProperty('register');
    expect(response.body).toHaveProperty('answers');
  });

  it('when sending request to endpoint, then response type is valid', async () => {
    // When
    const response = await request(app).get('/api/random-adjective');

    // Then
    expect(VALID_ADJECTIVE_TYPES).toContain(response.body.type);
  });

  it('when sending request to endpoint, then response tense is valid', async () => {
    // When
    const response = await request(app).get('/api/random-adjective');

    // Then
    expect(VALID_TENSES).toContain(response.body.tense);
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

  it('when sending request to endpoint, then answers is non-empty array of Japanese strings', async () => {
    // When
    const response = await request(app).get('/api/random-adjective');
    const { answers } = response.body;

    // Then
    expect(Array.isArray(answers)).toBe(true);
    expect(answers.length).toBeGreaterThan(0);
    expect(HIRAGANA_REGEX.test(answers[0])).toBe(true);
  });

  it('when sending request to endpoint, then answers[0] matches correct conjugation', async () => {
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
        `${response.body.hiragana}:${response.body.tense}:${response.body.polarity}:${response.body.register}`
      );
    }

    // Then
    expect(adjectives.size).toBeGreaterThan(1);
  });
});

function isValidConjugation(body: {
  hiragana: string;
  type: string;
  tense: string;
  polarity: string;
  register: string;
  answers: string[];
}): boolean {
  const { hiragana, type, tense, polarity, register, answers } = body;
  const answer = answers[0];
  const negativeStem =
    hiragana === '\u3044\u3044' ? '\u3088\u304f' : hiragana.slice(0, -1) + '\u304f';
  const pastStem =
    hiragana === '\u3044\u3044' ? '\u3088\u304b\u3063' : hiragana.slice(0, -1) + '\u304b\u3063';
  const isAffirmative = polarity === 'affirmative';
  const isPolite = register === 'polite';
  const isPast = tense === 'past';

  if (type === 'i') {
    if (isAffirmative && !isPast)
      return answer === (isPolite ? hiragana + '\u3067\u3059' : hiragana);
    if (isAffirmative && isPast)
      return answer === (isPolite ? pastStem + '\u305f\u3067\u3059' : pastStem + '\u305f');
    if (isPast)
      return (
        answer ===
        (isPolite
          ? negativeStem + '\u3042\u308a\u307e\u305b\u3093\u3067\u3057\u305f'
          : negativeStem + '\u306a\u304b\u3063\u305f')
      );
    return (
      answer ===
      (isPolite ? negativeStem + '\u3042\u308a\u307e\u305b\u3093' : negativeStem + '\u306a\u3044')
    );
  }

  if (isAffirmative && !isPast)
    return answer === (isPolite ? hiragana + '\u3067\u3059' : hiragana + '\u3060');
  if (isAffirmative && isPast)
    return (
      answer === (isPolite ? hiragana + '\u3067\u3057\u305f' : hiragana + '\u3060\u3063\u305f')
    );
  if (isPast)
    return (
      answer ===
      (isPolite
        ? hiragana + '\u3067\u306f\u3042\u308a\u307e\u305b\u3093\u3067\u3057\u305f'
        : hiragana + '\u3058\u3083\u306a\u304b\u3063\u305f')
    );
  return (
    answer ===
    (isPolite
      ? hiragana + '\u3067\u306f\u3042\u308a\u307e\u305b\u3093'
      : hiragana + '\u3058\u3083\u306a\u3044')
  );
}
