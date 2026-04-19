import { VerbData } from '../data/verbs';

export interface IVerbRepository {
  getRandomVerb(): VerbData;
}
