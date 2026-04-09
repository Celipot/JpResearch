import { Exercise, ExerciseType } from '../entities/Exercise';
import { GrammarRule } from '../entities/GrammarRule';
import data from './niExercises.json';

const rule = new GrammarRule(
  data.rule.id,
  data.rule.particle,
  data.rule.name,
  data.rule.description
);

export const niExercises = data.exercises.map(
  (exercise: any) =>
    new Exercise({
      type: exercise.type as ExerciseType,
      rule,
      question: exercise.question,
      correctAnswers: exercise.correctAnswers,
      explanation: exercise.explanation,
      vocabulary: exercise.vocabulary,
      options: exercise.options,
    })
);
