import { Verb } from '../domain/entities/verb/Verb';
import { VerbType } from '../domain/entities/verb/VerbType';
import {
  VerbConjugationForm,
  VerbConjugationFormUtils,
  VerbFormKind,
  VerbTense,
} from '../domain/entities/verb/VerbConjugationForm';
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
  tenses?: VerbTense[]
): RandomVerbResult => {
  const verbData = repository.getRandomVerb();
  const verb = new Verb(verbData.kanji, verbData.hiragana, verbData.type, verbData.translation);
  const form = VerbConjugationFormUtils.getRandomFormFor(kinds, tenses);
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
