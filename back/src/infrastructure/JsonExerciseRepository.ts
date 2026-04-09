import { Exercise } from '../domain/entities/Exercise';
import { IExerciseRepository } from '../domain/repositories/IExerciseRepository';
import { waExercises } from '../domain/data/waExercises';
import { woExercises } from '../domain/data/woExercises';
import { gaExercises } from '../domain/data/gaExercises';

const exercisesByRule: Record<string, Exercise[]> = {
  wa: waExercises,
  wo: woExercises,
  ga: gaExercises,
};

export class JsonExerciseRepository implements IExerciseRepository {
  findByRule(ruleId: string): Exercise[] {
    return exercisesByRule[ruleId] ?? [];
  }
}
