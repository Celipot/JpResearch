import { VerbTense } from './VerbTense';
import { VerbPolarity } from './VerbPolarity';
import { VerbRegister } from './VerbRegister';

export type VerbConjugationForm =
  | { kind: 'indicative'; tense: VerbTense; polarity: VerbPolarity; register: VerbRegister }
  | { kind: 'te'; polarity: VerbPolarity }
  | { kind: 'volitional'; register: VerbRegister };

export class VerbConjugationFormUtils {
  private static readonly FORMS: VerbConjugationForm[] = [
    {
      kind: 'indicative',
      tense: VerbTense.PRESENT,
      polarity: VerbPolarity.AFFIRMATIVE,
      register: VerbRegister.PLAIN,
    },
    {
      kind: 'indicative',
      tense: VerbTense.PRESENT,
      polarity: VerbPolarity.AFFIRMATIVE,
      register: VerbRegister.POLITE,
    },
    {
      kind: 'indicative',
      tense: VerbTense.PRESENT,
      polarity: VerbPolarity.NEGATIVE,
      register: VerbRegister.PLAIN,
    },
    {
      kind: 'indicative',
      tense: VerbTense.PRESENT,
      polarity: VerbPolarity.NEGATIVE,
      register: VerbRegister.POLITE,
    },
    {
      kind: 'indicative',
      tense: VerbTense.PAST,
      polarity: VerbPolarity.AFFIRMATIVE,
      register: VerbRegister.PLAIN,
    },
    {
      kind: 'indicative',
      tense: VerbTense.PAST,
      polarity: VerbPolarity.AFFIRMATIVE,
      register: VerbRegister.POLITE,
    },
    {
      kind: 'indicative',
      tense: VerbTense.PAST,
      polarity: VerbPolarity.NEGATIVE,
      register: VerbRegister.PLAIN,
    },
    {
      kind: 'indicative',
      tense: VerbTense.PAST,
      polarity: VerbPolarity.NEGATIVE,
      register: VerbRegister.POLITE,
    },
    { kind: 'te', polarity: VerbPolarity.AFFIRMATIVE },
    { kind: 'te', polarity: VerbPolarity.NEGATIVE },
    { kind: 'volitional', register: VerbRegister.PLAIN },
    { kind: 'volitional', register: VerbRegister.POLITE },
  ];

  static getRandomForm(): VerbConjugationForm {
    return this.FORMS[Math.floor(Math.random() * this.FORMS.length)];
  }
}
