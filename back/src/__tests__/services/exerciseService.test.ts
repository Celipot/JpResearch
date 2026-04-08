import { describe, it, expect } from 'vitest';
import { getRandomExercise } from '../../services/exerciseService';
import { Exercise } from '../../domain/entities/Exercise';
import { IExerciseRepository } from '../../domain/repositories/IExerciseRepository';
import { GrammarRule } from '../../domain/entities/GrammarRule';

const waRule = new GrammarRule('wa', 'は', 'Topic', 'Marque le sujet du discours');

const stubExercises: Exercise[] = [
  new Exercise({
    type: 'fill-in-the-blank',
    rule: waRule,
    question: 'わたし___がくせいです。',
    correctAnswers: ['は'],
    explanation: 'は marque le topic.',
  }),
  new Exercise({
    type: 'multiple-choice',
    rule: waRule,
    question: 'これ___ほんです。',
    correctAnswers: ['は'],
    options: ['は', 'が', 'を', 'に', 'で'],
    explanation: 'は marque le topic.',
  }),
];

const stubRepository: IExerciseRepository = {
  findByRule: (ruleId: string) => (ruleId === 'wa' ? stubExercises : []),
};

describe('getRandomExercise', () => {
  it('given rule "wa", then returns an Exercise instance', () => {
    // When
    const exercise = getRandomExercise('wa', stubRepository);

    // Then
    expect(exercise).toBeInstanceOf(Exercise);
  });

  it('given rule "wa", then the exercise rule particle is は', () => {
    // When
    const exercise = getRandomExercise('wa', stubRepository);

    // Then
    expect(exercise.rule.particle).toBe('は');
  });

  it('given rule "wa", then returns one of the available exercises', () => {
    // When / Then
    for (let i = 0; i < 20; i++) {
      const exercise = getRandomExercise('wa', stubRepository);
      expect(stubExercises).toContain(exercise);
    }
  });

  it('given multiple calls, then can return different exercises', () => {
    // When
    const questions = new Set<string>();
    for (let i = 0; i < 50; i++) {
      questions.add(getRandomExercise('wa', stubRepository).question);
    }

    // Then
    expect(questions.size).toBeGreaterThan(1);
  });

  it('given an unknown rule, then throws an error', () => {
    // When / Then
    expect(() => getRandomExercise('unknown', stubRepository)).toThrow();
  });
});
