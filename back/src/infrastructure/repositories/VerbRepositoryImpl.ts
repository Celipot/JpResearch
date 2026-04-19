import { VERBS, VerbData } from '../data/verbs';
import { IVerbRepository } from './VerbRepository';

export class VerbRepositoryImpl implements IVerbRepository {
  private verbs: VerbData[] = VERBS;

  getRandomVerb(): VerbData {
    const randomIndex = Math.floor(Math.random() * this.verbs.length);
    return this.verbs[randomIndex];
  }
}
