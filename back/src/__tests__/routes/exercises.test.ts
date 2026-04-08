import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../index';

describe('GET /api/exercises/random', () => {
  it('given rule=wa, then returns status 200 with an exercise', async () => {
    // When
    const response = await request(app).get('/api/exercises/random?rule=wa');

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('type');
    expect(response.body).toHaveProperty('question');
    expect(response.body).toHaveProperty('correctAnswers');
    expect(response.body).toHaveProperty('explanation');
    expect(response.body).toHaveProperty('rule');
  });

  it('given rule=wa, then rule has particle は', async () => {
    // When
    const response = await request(app).get('/api/exercises/random?rule=wa');

    // Then
    expect(response.body.rule.particle).toBe('は');
  });

  it('given rule=wa, then correctAnswers is a non-empty array', async () => {
    // When
    const response = await request(app).get('/api/exercises/random?rule=wa');

    // Then
    expect(Array.isArray(response.body.correctAnswers)).toBe(true);
    expect(response.body.correctAnswers.length).toBeGreaterThan(0);
  });

  it('given rule=wa and type multiple-choice, then response has options', async () => {
    // When — retry until we get a multiple-choice
    let found = false;
    for (let i = 0; i < 50; i++) {
      const response = await request(app).get('/api/exercises/random?rule=wa');
      if (response.body.type === 'multiple-choice') {
        expect(Array.isArray(response.body.options)).toBe(true);
        expect(response.body.options.length).toBeGreaterThan(1);
        found = true;
        break;
      }
    }
    expect(found).toBe(true);
  });

  it('given no rule param, then returns status 400', async () => {
    // When
    const response = await request(app).get('/api/exercises/random');

    // Then
    expect(response.status).toBe(400);
  });

  it('given an unknown rule, then returns status 404', async () => {
    // When
    const response = await request(app).get('/api/exercises/random?rule=unknown');

    // Then
    expect(response.status).toBe(404);
  });
});
