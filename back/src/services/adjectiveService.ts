import { Adjective } from '../domain/entities/Adjective';
import { AdjectiveType } from '../domain/entities/AdjectiveType';
import { AdjectiveTense } from '../domain/entities/AdjectiveTense';
import { AdjectivePolarity } from '../domain/entities/AdjectivePolarity';
import { AdjectiveRegister } from '../domain/entities/AdjectiveRegister';
import { AdjectiveConjugationFormUtils } from '../domain/entities/AdjectiveConjugationForm';
import { IAdjectiveRepository } from '../infrastructure/repositories/AdjectiveRepository';

export interface RandomAdjectiveResult {
  hiragana: string;
  type: `${AdjectiveType}`;
  translation: string;
  tense: AdjectiveTense;
  polarity: AdjectivePolarity;
  register: AdjectiveRegister;
  answers: string[];
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
  const answers = adjective.acceptableAnswers(form);

  return {
    hiragana: adjectiveData.hiragana,
    type: adjectiveData.type,
    translation: adjectiveData.translation,
    tense: form.tense,
    polarity: form.polarity,
    register: form.register,
    answers,
  };
};
