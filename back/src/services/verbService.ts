import { Verb } from '../domain/entities/verb/Verb';
import { VerbType } from '../domain/entities/verb/VerbType';
import { VerbTense } from '../domain/entities/verb/VerbTense';
import { VerbPolarity } from '../domain/entities/verb/VerbPolarity';
import { VerbRegister } from '../domain/entities/verb/VerbRegister';
import { VerbConjugationFormUtils } from '../domain/entities/verb/VerbConjugationForm';
import { IVerbRepository } from '../infrastructure/repositories/VerbRepository';

export interface RandomVerbResult {
  kanji: string;
  hiragana: string;
  type: `${VerbType}`;
  translation: string;
  tense: VerbTense;
  polarity: VerbPolarity;
  register: VerbRegister;
  answers: string[];
}

export const generateRandomVerb = (repository: IVerbRepository): RandomVerbResult => {
  const verbData = repository.getRandomVerb();
  const verb = new Verb(verbData.kanji, verbData.hiragana, verbData.type, verbData.translation);
  const form = VerbConjugationFormUtils.getRandomForm();
  const answers = verb.acceptableAnswers(form);

  return {
    kanji: verbData.kanji,
    hiragana: verbData.hiragana,
    type: verbData.type,
    translation: verbData.translation,
    tense: form.tense,
    polarity: form.polarity,
    register: form.register,
    answers,
  };
};
