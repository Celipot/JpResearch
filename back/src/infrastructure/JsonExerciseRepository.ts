import { Exercise } from '../domain/entities/Exercise';
import { IExerciseRepository } from '../domain/repositories/IExerciseRepository';
import { waExercises } from '../domain/data/waExercises';
import { woExercises } from '../domain/data/woExercises';
import { gaExercises } from '../domain/data/gaExercises';
import { niExercises } from '../domain/data/niExercises';
import { deExercises } from '../domain/data/deExercises';
import { karaExercises } from '../domain/data/karaExercises';
import { madeExercises } from '../domain/data/madeExercises';
import { moExercises } from '../domain/data/moExercises';
import { noExercises } from '../domain/data/noExercises';
import { heExercises } from '../domain/data/heExercises';
import { toExercises } from '../domain/data/toExercises';
import { yaExercises } from '../domain/data/yaExercises';
import { yoriExercises } from '../domain/data/yoriExercises';
import { dakeExercises } from '../domain/data/dakeExercises';

const exercisesByRule: Record<string, Exercise[]> = {
  wa: waExercises,
  wo: woExercises,
  ga: gaExercises,
  ni: niExercises,
  de: deExercises,
  kara: karaExercises,
  made: madeExercises,
  mo: moExercises,
  no: noExercises,
  he: heExercises,
  to: toExercises,
  ya: yaExercises,
  yori: yoriExercises,
  dake: dakeExercises,
};

export class JsonExerciseRepository implements IExerciseRepository {
  findByRule(ruleId: string): Exercise[] {
    return exercisesByRule[ruleId] ?? [];
  }
}
