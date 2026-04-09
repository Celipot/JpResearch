import { describe, it, expect } from 'vitest';
import waExercises from '../../../domain/data/waExercises.json';
import woExercises from '../../../domain/data/woExercises.json';
import gaExercises from '../../../domain/data/gaExercises.json';

type ExerciseData = {
  rule: { id: string; particle: string; name: string; description: string };
  exercises: Array<{
    type: 'fill-in-the-blank' | 'multiple-choice' | 'translation';
    question: string;
    correctAnswers: string[];
    explanation: string;
    vocabulary: Array<{ word: string; reading: string; meaning: string }>;
    options?: string[];
  }>;
};

const validateExerciseStructure = (data: ExerciseData, particleId: string) => {
  describe(`${particleId} (${data.rule.particle})`, () => {
    it('should have exactly 30 exercises', () => {
      expect(data.exercises).toHaveLength(30);
    });

    it('should have 8 fill-in-the-blank exercises', () => {
      const count = data.exercises.filter((e) => e.type === 'fill-in-the-blank').length;
      expect(count).toBe(8);
    });

    it('should have 7 multiple-choice exercises', () => {
      const count = data.exercises.filter((e) => e.type === 'multiple-choice').length;
      expect(count).toBe(7);
    });

    it('should have 15 translation exercises', () => {
      const count = data.exercises.filter((e) => e.type === 'translation').length;
      expect(count).toBe(15);
    });

    it('should have correct answers for each exercise', () => {
      data.exercises.forEach((exercise, _index) => {
        expect(exercise.correctAnswers).toBeDefined();
        expect(Array.isArray(exercise.correctAnswers)).toBe(true);
        expect(exercise.correctAnswers.length).toBeGreaterThan(0);
      });
    });

    it('should have explanation for each exercise', () => {
      data.exercises.forEach((exercise) => {
        expect(exercise.explanation).toBeTruthy();
        expect(typeof exercise.explanation).toBe('string');
      });
    });

    it('multiple-choice exercises should have options', () => {
      data.exercises
        .filter((e) => e.type === 'multiple-choice')
        .forEach((exercise) => {
          expect(exercise.options).toBeDefined();
          expect(Array.isArray(exercise.options)).toBe(true);
          expect(exercise.options!.length).toBeGreaterThanOrEqual(3);
        });
    });
  });
};

describe('Exercise Structure Validation', () => {
  validateExerciseStructure(waExercises as ExerciseData, 'wa');
  validateExerciseStructure(woExercises as ExerciseData, 'wo');
  validateExerciseStructure(gaExercises as ExerciseData, 'ga');
});
