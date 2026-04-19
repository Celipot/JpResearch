import { VerbTense } from './VerbTense';
import { VerbPolarity } from './VerbPolarity';
import { VerbRegister } from './VerbRegister';

export type VerbConjugationForm =
  | { kind: 'indicative'; tense: VerbTense; polarity: VerbPolarity; register: VerbRegister }
  | { kind: 'potential'; tense: VerbTense; polarity: VerbPolarity; register: VerbRegister }
  | { kind: 'passive'; tense: VerbTense; polarity: VerbPolarity; register: VerbRegister }
  | { kind: 'causative'; tense: VerbTense; polarity: VerbPolarity; register: VerbRegister }
  | { kind: 'imperative'; polarity: VerbPolarity; register: VerbRegister }
  | { kind: 'tara'; polarity: VerbPolarity }
  | { kind: 'ba'; polarity: VerbPolarity }
  | { kind: 'te'; polarity: VerbPolarity }
  | { kind: 'volitional'; register: VerbRegister };

const FULL_KINDS = ['indicative', 'potential', 'passive', 'causative'] as const;

export class VerbConjugationFormUtils {
  private static readonly FORMS: VerbConjugationForm[] = [
    ...FULL_KINDS.flatMap((kind) =>
      Object.values(VerbTense).flatMap((tense) =>
        Object.values(VerbPolarity).flatMap((polarity) =>
          Object.values(VerbRegister).map((register) => ({ kind, tense, polarity, register }))
        )
      )
    ),
    { kind: 'imperative', polarity: VerbPolarity.AFFIRMATIVE, register: VerbRegister.PLAIN },
    { kind: 'imperative', polarity: VerbPolarity.NEGATIVE, register: VerbRegister.PLAIN },
    { kind: 'imperative', polarity: VerbPolarity.AFFIRMATIVE, register: VerbRegister.POLITE },
    { kind: 'imperative', polarity: VerbPolarity.NEGATIVE, register: VerbRegister.POLITE },
    { kind: 'tara', polarity: VerbPolarity.AFFIRMATIVE },
    { kind: 'tara', polarity: VerbPolarity.NEGATIVE },
    { kind: 'ba', polarity: VerbPolarity.AFFIRMATIVE },
    { kind: 'ba', polarity: VerbPolarity.NEGATIVE },
    { kind: 'te', polarity: VerbPolarity.AFFIRMATIVE },
    { kind: 'te', polarity: VerbPolarity.NEGATIVE },
    { kind: 'volitional', register: VerbRegister.PLAIN },
    { kind: 'volitional', register: VerbRegister.POLITE },
  ];

  static getRandomForm(): VerbConjugationForm {
    return this.FORMS[Math.floor(Math.random() * this.FORMS.length)];
  }
}
