import { Adjective, AdjectiveType } from '../domain/entities/Adjective';
import { AdjectiveForm, getRandomAdjectiveForm } from '../domain/entities/AdjectiveForm';
import { IAdjectiveRepository } from '../infrastructure/repositories/AdjectiveRepository';

export interface RandomAdjectiveResult {
  hiragana: string;
  type: AdjectiveType;
  translation: string;
  form: AdjectiveForm;
  answer: string;
}

export const generateRandomAdjective = (
  repository: IAdjectiveRepository
): RandomAdjectiveResult => {
  const adjectiveData = repository.getRandomAdjective();
  const adjective = new Adjective(
    adjectiveData.hiragana,
    adjectiveData.type,
    adjectiveData.translation
  );
  const form = getRandomAdjectiveForm();
  const answer = adjective.conjugate(form);

  return {
    hiragana: adjectiveData.hiragana,
    type: adjectiveData.type,
    translation: adjectiveData.translation,
    form,
    answer,
  };
};
