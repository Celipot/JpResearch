import { describe, it, expect } from 'vitest';
import { Exercise } from '../../../domain/entities/Exercise';
import { GrammarRule } from '../../../domain/entities/GrammarRule';

const waRule = new GrammarRule('wa', 'は', 'Topic', 'Marque le sujet du discours');

describe('Exercise', () => {
  describe('fill-in-the-blank', () => {
    it('given a fill-in-the-blank exercise, then stores all properties', () => {
      // Given / When
      const exercise = new Exercise({
        type: 'fill-in-the-blank',
        rule: waRule,
        question: 'わたし___がくせいです。',
        correctAnswers: ['は'],
        explanation: 'は marque le topic : ce dont on parle.',
      });

      // Then
      expect(exercise.type).toBe('fill-in-the-blank');
      expect(exercise.rule).toBe(waRule);
      expect(exercise.question).toBe('わたし___がくせいです。');
      expect(exercise.correctAnswers).toEqual(['は']);
      expect(exercise.explanation).toBe('は marque le topic : ce dont on parle.');
      expect(exercise.options).toBeUndefined();
    });
  });

  describe('multiple-choice', () => {
    it('given a multiple-choice exercise, then stores options', () => {
      // Given / When
      const exercise = new Exercise({
        type: 'multiple-choice',
        rule: waRule,
        question: 'わたし___がくせいです。',
        correctAnswers: ['は'],
        options: ['は', 'が', 'を', 'に', 'で'],
        explanation: 'は marque le topic.',
      });

      // Then
      expect(exercise.type).toBe('multiple-choice');
      expect(exercise.options).toEqual(['は', 'が', 'を', 'に', 'で']);
    });
  });

  describe('translation', () => {
    it('given a translation exercise, then stores question in french and answers in japanese', () => {
      // Given / When
      const exercise = new Exercise({
        type: 'translation',
        rule: waRule,
        question: 'Je suis étudiant.',
        correctAnswers: ['わたしはがくせいです', 'watashi wa gakusei desu'],
        explanation: 'は marque le topic.',
      });

      // Then
      expect(exercise.type).toBe('translation');
      expect(exercise.correctAnswers).toContain('わたしはがくせいです');
      expect(exercise.correctAnswers).toContain('watashi wa gakusei desu');
      expect(exercise.options).toBeUndefined();
    });
  });
});
