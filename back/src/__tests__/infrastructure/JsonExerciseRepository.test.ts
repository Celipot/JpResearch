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
  });
});
