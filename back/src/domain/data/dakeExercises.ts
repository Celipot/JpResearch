import { Exercise, ExerciseType } from '../entities/Exercise';
import { GrammarRule } from '../entities/GrammarRule';
import data from './dakeExercises.json';

type ExerciseData = {
  type: string;
  question: string;
  correctAnswers: string[];
  explanation: string;
  options?: string[];
};

const rule = new GrammarRule(
  data.rule.id,
  data.rule.particle,
  data.rule.name,
  data.rule.description
);

export const dakeExercises = data.exercises.map(
  (exercise: ExerciseData) =>
    new Exercise({
      type: exercise.type as ExerciseType,
      rule,
      question: exercise.question,
      correctAnswers: exercise.correctAnswers,
      explanation: exercise.explanation,
      options: exercise.options,
    })
);
