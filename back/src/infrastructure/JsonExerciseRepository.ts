import { Exercise } from '../domain/entities/Exercise';
import { IExerciseRepository } from '../domain/repositories/IExerciseRepository';
import { waExercises } from '../domain/data/waExercises';
import { woExercises } from '../domain/data/woExercises';

const exercisesByRule: Record<string, Exercise[]> = {
  wa: waExercises,
  wo: woExercises,
};

export class JsonExerciseRepository implements IExerciseRepository {
  findByRule(ruleId: string): Exercise[] {
    return exercisesByRule[ruleId] ?? [];
  }
}
