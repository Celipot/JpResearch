import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('POST /api/check-answer', () => {
  it('when submitting correct hiragana answer, then returns correct true', async () => {
    // Given
    const payload = {
      userAnswer: 'たかくない',
      expectedAnswer: 'たかくない',
    };

    // When
    const response = await request(app).post('/api/check-answer').send(payload);

    // Then
    expect(response.status).toBe(200);
    expect(response.body.correct).toBe(true);
  });

  it('when submitting correct romaji answer, then returns correct true', async () => {
    // Given
    const payload = {
      userAnswer: 'takakunai',
      expectedAnswer: 'たかくない',
    };

    // When
    const response = await request(app).post('/api/check-answer').send(payload);

    // Then
    expect(response.status).toBe(200);
    expect(response.body.correct).toBe(true);
  });

  it('when submitting incorrect answer, then returns correct false', async () => {
    // Given
    const payload = {
      userAnswer: 'ちがう',
      expectedAnswer: 'たかくない',
    };

    // When
    const response = await request(app).post('/api/check-answer').send(payload);

    // Then
    expect(response.status).toBe(200);
    expect(response.body.correct).toBe(false);
  });

  it('when submitting na-adjective answer, then returns correct true', async () => {
    // Given
    const payload = {
      userAnswer: 'kireida',
      expectedAnswer: 'きれいだ',
    };

    // When
    const response = await request(app).post('/api/check-answer').send(payload);

    // Then
    expect(response.status).toBe(200);
    expect(response.body.correct).toBe(true);
  });
});
