import { Verb } from '../domain/entities/verb/Verb';
import { VerbType } from '../domain/entities/verb/VerbType';
import {
  VerbConjugationForm,
  VerbConjugationFormUtils,
  VerbFormKind,
  VerbTense,
  VerbRegister,
} from '../domain/entities/verb/VerbConjugationForm';
import { VerbPolarity } from '../domain/entities/verb/VerbPolarity';
import { IVerbRepository } from '../infrastructure/repositories/VerbRepository';

export interface RandomVerbResult {
  kanji: string;
  hiragana: string;
  type: `${VerbType}`;
  translation: string;
  form: VerbConjugationForm;
  answers: string[];
}

export const generateRandomVerb = (
  repository: IVerbRepository,
  kinds?: VerbFormKind[],
  tenses?: VerbTense[],
  registers?: VerbRegister[],
  polarities?: VerbPolarity[]
): RandomVerbResult => {
  const verbData = repository.getRandomVerb();
  const verb = new Verb(verbData.kanji, verbData.hiragana, verbData.type, verbData.translation);
  const form = VerbConjugationFormUtils.getRandomFormFor(kinds, tenses, registers, polarities);
  const answers = verb.acceptableAnswers(form);

  return {
    kanji: verbData.kanji,
    hiragana: verbData.hiragana,
    type: verbData.type,
    translation: verbData.translation,
    form,
    answers,
  };
};
