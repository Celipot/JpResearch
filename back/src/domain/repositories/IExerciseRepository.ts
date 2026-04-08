import { Exercise } from '../entities/Exercise';

export interface IExerciseRepository {
  findByRule(ruleId: string): Exercise[];
}
