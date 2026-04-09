import { Exercise, ExerciseType, VocabularyEntry } from '../entities/Exercise';
import { GrammarRule } from '../entities/GrammarRule';
import data from './woExercises.json';

const rule = new GrammarRule(
  data.rule.id,
  data.rule.particle,
  data.rule.name,
  data.rule.description
);

export const woExercises: Exercise[] = data.exercises.map(
  (e) =>
    new Exercise({
      type: e.type as ExerciseType,
      rule,
      question: e.question,
      correctAnswers: e.correctAnswers,
      options: 'options' in e ? (e.options as string[]) : undefined,
      explanation: e.explanation,
      vocabulary: 'vocabulary' in e ? (e.vocabulary as VocabularyEntry[]) : undefined,
    })
);
