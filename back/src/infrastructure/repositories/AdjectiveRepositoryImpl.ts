import { ADJECTIVES, AdjectiveData } from '../data/adjectives';
import { IAdjectiveRepository } from './AdjectiveRepository';

export class AdjectiveRepositoryImpl implements IAdjectiveRepository {
  private adjectives: AdjectiveData[] = ADJECTIVES;

  getRandomAdjective(): AdjectiveData {
    const randomIndex = Math.floor(Math.random() * this.adjectives.length);
    return this.adjectives[randomIndex];
  }
}
