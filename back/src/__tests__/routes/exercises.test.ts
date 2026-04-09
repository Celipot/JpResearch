import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../index';

type RuleTestCase = {
  ruleId: string;
  particle: string;
};

const SUPPORTED_RULES: RuleTestCase[] = [
  { ruleId: 'wa', particle: 'は' },
  { ruleId: 'wo', particle: 'を' },
  { ruleId: 'ga', particle: 'が' },
];

const assertValidExerciseResponse = (body: any) => {
  expect(body).toHaveProperty('type');
  expect(body).toHaveProperty('question');
  expect(body).toHaveProperty('correctAnswers');
  expect(body).toHaveProperty('explanation');
  expect(body).toHaveProperty('rule');
};

const assertValidCorrectAnswers = (body: any) => {
  expect(Array.isArray(body.correctAnswers)).toBe(true);
  expect(body.correctAnswers.length).toBeGreaterThan(0);
};

const findMultipleChoiceExercise = async (ruleId: string) => {
  for (let i = 0; i < 50; i++) {
    const response = await request(app).get(`/api/exercises/random?rule=${ruleId}`);
    if (response.body.type === 'multiple-choice') {
      return response;
    }
  }
  return null;
};

describe('GET /api/exercises/random', () => {
  describe('for each supported rule', () => {
    SUPPORTED_RULES.forEach(({ ruleId, particle }) => {
      describe(`rule=${ruleId}`, () => {
        it('then returns status 200 with a valid exercise', async () => {
          // When
          const response = await request(app).get(`/api/exercises/random?rule=${ruleId}`);

          // Then
          expect(response.status).toBe(200);
          assertValidExerciseResponse(response.body);
        });

        it(`then rule has particle ${particle}`, async () => {
          // When
          const response = await request(app).get(`/api/exercises/random?rule=${ruleId}`);

          // Then
          expect(response.body.rule.particle).toBe(particle);
        });

        it('then correctAnswers is a non-empty array', async () => {
          // When
          const response = await request(app).get(`/api/exercises/random?rule=${ruleId}`);

          // Then
          assertValidCorrectAnswers(response.body);
        });

        it('and type multiple-choice, then response has options', async () => {
          // When
          const response = await findMultipleChoiceExercise(ruleId);

          // Then
          expect(response).not.toBeNull();
          expect(Array.isArray(response!.body.options)).toBe(true);
          expect(response!.body.options.length).toBeGreaterThan(1);
        });
      });
    });
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
