import { Exercise } from '../domain/entities/Exercise';
import { IExerciseRepository } from '../domain/repositories/IExerciseRepository';
import { JsonExerciseRepository } from '../infrastructure/JsonExerciseRepository';

const defaultRepository = new JsonExerciseRepository();

export const getRandomExercise = (
  ruleId: string,
  repository: IExerciseRepository = defaultRepository
): Exercise => {
  const exercises = repository.findByRule(ruleId);
  if (exercises.length === 0) {
    throw new Error(`Unknown grammar rule: ${ruleId}`);
  }
  const index = Math.floor(Math.random() * exercises.length);
  return exercises[index];
};
