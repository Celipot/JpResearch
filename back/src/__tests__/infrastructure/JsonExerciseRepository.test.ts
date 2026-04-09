import { describe, it, expect } from 'vitest';
import { JsonExerciseRepository } from '../../infrastructure/JsonExerciseRepository';
import { Exercise } from '../../domain/entities/Exercise';

describe('JsonExerciseRepository', () => {
  describe('findByRule', () => {
    it('given rule "wa", then returns a non-empty array of Exercise instances', () => {
      // Given
      const repository = new JsonExerciseRepository();

      // When
      const exercises = repository.findByRule('wa');

      // Then
      expect(exercises.length).toBeGreaterThan(0);
      exercises.forEach((e) => expect(e).toBeInstanceOf(Exercise));
    });

    it('given rule "wa", then all exercises have particle は', () => {
      // Given
      const repository = new JsonExerciseRepository();

      // When
      const exercises = repository.findByRule('wa');

      // Then
      exercises.forEach((e) => expect(e.rule.particle).toBe('は'));
    });

    it('given rule "wo", then returns a non-empty array of Exercise instances', () => {
      // Given
      const repository = new JsonExerciseRepository();

      // When
      const exercises = repository.findByRule('wo');

      // Then
      expect(exercises.length).toBeGreaterThan(0);
      exercises.forEach((e) => expect(e).toBeInstanceOf(Exercise));
    });

    it('given rule "wo", then all exercises have particle を', () => {
      // Given
      const repository = new JsonExerciseRepository();

      // When
      const exercises = repository.findByRule('wo');

      // Then
      exercises.forEach((e) => expect(e.rule.particle).toBe('を'));
    });

    it('given an unknown rule, then returns an empty array', () => {
      // Given
      const repository = new JsonExerciseRepository();

      // When
      const exercises = repository.findByRule('unknown');

      // Then
      expect(exercises).toEqual([]);
    });

    it('given rule "wa", then at least one exercise has a non-empty vocabulary', () => {
      // Given
      const repository = new JsonExerciseRepository();

      // When
      const exercises = repository.findByRule('wa');

      // Then
      const hasVocabulary = exercises.some((e) => e.vocabulary && e.vocabulary.length > 0);
      expect(hasVocabulary).toBe(true);
    });

    it('given rule "wa", then vocabulary entries have word, reading and meaning', () => {
      // Given
      const repository = new JsonExerciseRepository();

      // When
      const exercises = repository.findByRule('wa');
      const exercisesWithVocab = exercises.filter((e) => e.vocabulary && e.vocabulary.length > 0);

      // Then
      exercisesWithVocab.forEach((exercise) => {
        exercise.vocabulary?.forEach((entry) => {
          expect(entry).toHaveProperty('word');
          expect(entry).toHaveProperty('reading');
          expect(entry).toHaveProperty('meaning');
          expect(typeof entry.word).toBe('string');
          expect(typeof entry.reading).toBe('string');
          expect(typeof entry.meaning).toBe('string');
        });
      });
    });
  });
});
