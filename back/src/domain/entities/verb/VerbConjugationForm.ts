import { VerbTense } from './VerbTense';
import { VerbPolarity } from './VerbPolarity';
import { VerbRegister } from './VerbRegister';

export type VerbConjugationForm =
  | { kind: 'indicative'; tense: VerbTense; polarity: VerbPolarity; register: VerbRegister }
  | { kind: 'potential'; tense: VerbTense; polarity: VerbPolarity; register: VerbRegister }
  | { kind: 'passive'; tense: VerbTense; polarity: VerbPolarity; register: VerbRegister }
  | { kind: 'te'; polarity: VerbPolarity }
  | { kind: 'volitional'; register: VerbRegister };

const FULL_KINDS = ['indicative', 'potential', 'passive'] as const;

export class VerbConjugationFormUtils {
  private static readonly FORMS: VerbConjugationForm[] = [
    ...FULL_KINDS.flatMap((kind) =>
      Object.values(VerbTense).flatMap((tense) =>
        Object.values(VerbPolarity).flatMap((polarity) =>
          Object.values(VerbRegister).map((register) => ({ kind, tense, polarity, register }))
        )
      )
    ),
    { kind: 'te', polarity: VerbPolarity.AFFIRMATIVE },
    { kind: 'te', polarity: VerbPolarity.NEGATIVE },
    { kind: 'volitional', register: VerbRegister.PLAIN },
    { kind: 'volitional', register: VerbRegister.POLITE },
  ];

  static getRandomForm(): VerbConjugationForm {
    return this.FORMS[Math.floor(Math.random() * this.FORMS.length)];
  }
}
