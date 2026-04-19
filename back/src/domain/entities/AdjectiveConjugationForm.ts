import { AdjectivePolarity } from './AdjectivePolarity';
import { AdjectiveRegister } from './AdjectiveRegister';

export interface AdjectiveConjugationForm {
  polarity: AdjectivePolarity;
  register: AdjectiveRegister;
}

export class AdjectiveConjugationFormUtils {
  private static readonly FORMS: AdjectiveConjugationForm[] = [
    { polarity: AdjectivePolarity.AFFIRMATIVE, register: AdjectiveRegister.FAMILIAR },
    { polarity: AdjectivePolarity.NEGATIVE, register: AdjectiveRegister.FAMILIAR },
    { polarity: AdjectivePolarity.AFFIRMATIVE, register: AdjectiveRegister.POLITE },
    { polarity: AdjectivePolarity.NEGATIVE, register: AdjectiveRegister.POLITE },
  ];

  static getRandomForm(): AdjectiveConjugationForm {
    return this.FORMS[Math.floor(Math.random() * this.FORMS.length)];
  }
}
