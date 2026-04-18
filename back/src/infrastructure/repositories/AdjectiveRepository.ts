import { AdjectiveData } from '../data/adjectives';

export interface IAdjectiveRepository {
  getRandomAdjective(): AdjectiveData;
}
