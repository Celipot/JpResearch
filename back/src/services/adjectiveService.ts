import { Adjective } from '../domain/entities/Adjective';
import { AdjectiveType } from '../domain/entities/AdjectiveType';
import { AdjectivePolarity } from '../domain/entities/AdjectivePolarity';
import { AdjectiveRegister } from '../domain/entities/AdjectiveRegister';
import { AdjectiveConjugationFormUtils } from '../domain/entities/AdjectiveConjugationForm';
import { IAdjectiveRepository } from '../infrastructure/repositories/AdjectiveRepository';

export interface RandomAdjectiveResult {
  hiragana: string;
  type: `${AdjectiveType}`;
  translation: string;
  polarity: AdjectivePolarity;
  register: AdjectiveRegister;
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
  const form = AdjectiveConjugationFormUtils.getRandomForm();
  const answer = adjective.conjugate(form);

  return {
    hiragana: adjectiveData.hiragana,
    type: adjectiveData.type,
    translation: adjectiveData.translation,
    polarity: form.polarity,
    register: form.register,
    answer,
  };
};
