import { VerbTense } from './VerbTense';
import { VerbPolarity } from './VerbPolarity';
import { VerbRegister } from './VerbRegister';

export interface VerbConjugationForm {
  tense: VerbTense;
  polarity: VerbPolarity;
  register: VerbRegister;
}

export class VerbConjugationFormUtils {
  private static readonly FORMS: VerbConjugationForm[] = [
    { tense: VerbTense.PRESENT, polarity: VerbPolarity.AFFIRMATIVE, register: VerbRegister.PLAIN },
    { tense: VerbTense.PRESENT, polarity: VerbPolarity.AFFIRMATIVE, register: VerbRegister.POLITE },
    { tense: VerbTense.PRESENT, polarity: VerbPolarity.NEGATIVE, register: VerbRegister.PLAIN },
    { tense: VerbTense.PRESENT, polarity: VerbPolarity.NEGATIVE, register: VerbRegister.POLITE },
    { tense: VerbTense.PAST, polarity: VerbPolarity.AFFIRMATIVE, register: VerbRegister.PLAIN },
    { tense: VerbTense.PAST, polarity: VerbPolarity.AFFIRMATIVE, register: VerbRegister.POLITE },
    { tense: VerbTense.PAST, polarity: VerbPolarity.NEGATIVE, register: VerbRegister.PLAIN },
    { tense: VerbTense.PAST, polarity: VerbPolarity.NEGATIVE, register: VerbRegister.POLITE },
  ];

  static getRandomForm(): VerbConjugationForm {
    return this.FORMS[Math.floor(Math.random() * this.FORMS.length)];
  }
}
