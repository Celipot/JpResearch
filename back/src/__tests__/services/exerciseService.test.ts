import { describe, it, expect } from 'vitest';
import { getRandomExercise } from '../../services/exerciseService';
import { Exercise } from '../../domain/entities/Exercise';
import { IExerciseRepository } from '../../domain/repositories/IExerciseRepository';
import { GrammarRule } from '../../domain/entities/GrammarRule';

type RuleTestData = {
  ruleId: string;
  rule: GrammarRule;
  exercises: Exercise[];
};

const createTestData = (ruleId: string, particle: string): RuleTestData => {
  const rule = new GrammarRule(ruleId, particle, `Test ${ruleId}`, `Description ${ruleId}`);
  return {
    ruleId,
    rule,
    exercises: [
      new Exercise({
        type: 'fill-in-the-blank',
        rule,
        question: 'Test question 1',
        correctAnswers: [particle],
        explanation: 'Test explanation 1',
      }),
      new Exercise({
        type: 'multiple-choice',
        rule,
        question: 'Test question 2',
        correctAnswers: [particle],
        options: [particle, 'が', 'を', 'に', 'で'],
        explanation: 'Test explanation 2',
      }),
    ],
  };
};

const createStubRepository = (testDataMap: Map<string, RuleTestData>): IExerciseRepository => ({
  findByRule: (ruleId: string) => testDataMap.get(ruleId)?.exercises ?? [],
});

describe('getRandomExercise', () => {
  const testCases = [
    createTestData('wa', 'は'),
    createTestData('wo', 'を'),
    createTestData('ga', 'が'),
  ];

  testCases.forEach(({ ruleId, rule, exercises }) => {
    const testDataMap = new Map([[ruleId, { ruleId, rule, exercises }]]);
    const repository = createStubRepository(testDataMap);

    describe(`rule="${ruleId}"`, () => {
      it('then returns an Exercise instance', () => {
        // When
        const exercise = getRandomExercise(ruleId, repository);

        // Then
        expect(exercise).toBeInstanceOf(Exercise);
      });

      it(`then exercise rule particle is ${rule.particle}`, () => {
        // When
        const exercise = getRandomExercise(ruleId, repository);

        // Then
        expect(exercise.rule.particle).toBe(rule.particle);
      });

      it('then returns one of the available exercises', () => {
        // When / Then
        for (let i = 0; i < 20; i++) {
          const exercise = getRandomExercise(ruleId, repository);
          expect(exercises).toContain(exercise);
        }
      });

      it('then multiple calls can return different exercises', () => {
        // When
        const questions = new Set<string>();
        for (let i = 0; i < 50; i++) {
          questions.add(getRandomExercise(ruleId, repository).question);
        }

        // Then
        expect(questions.size).toBeGreaterThan(1);
      });
    });
  });

  it('given an unknown rule, then throws an error', () => {
    // When / Then
    const emptyRepository = createStubRepository(new Map());
    expect(() => getRandomExercise('unknown', emptyRepository)).toThrow();
  });
});
