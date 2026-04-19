import { AdjectivePolarity } from './AdjectivePolarity';
import { AdjectiveRegister } from './AdjectiveRegister';
import { AdjectiveTense } from './AdjectiveTense';

export interface AdjectiveConjugationForm {
  tense: AdjectiveTense;
  polarity: AdjectivePolarity;
  register: AdjectiveRegister;
}

export class AdjectiveConjugationFormUtils {
  private static readonly FORMS: AdjectiveConjugationForm[] = [
    {
      tense: AdjectiveTense.PRESENT,
      polarity: AdjectivePolarity.AFFIRMATIVE,
      register: AdjectiveRegister.FAMILIAR,
    },
    {
      tense: AdjectiveTense.PRESENT,
      polarity: AdjectivePolarity.NEGATIVE,
      register: AdjectiveRegister.FAMILIAR,
    },
    {
      tense: AdjectiveTense.PRESENT,
      polarity: AdjectivePolarity.AFFIRMATIVE,
      register: AdjectiveRegister.POLITE,
    },
    {
      tense: AdjectiveTense.PRESENT,
      polarity: AdjectivePolarity.NEGATIVE,
      register: AdjectiveRegister.POLITE,
    },
    {
      tense: AdjectiveTense.PAST,
      polarity: AdjectivePolarity.AFFIRMATIVE,
      register: AdjectiveRegister.FAMILIAR,
    },
    {
      tense: AdjectiveTense.PAST,
      polarity: AdjectivePolarity.NEGATIVE,
      register: AdjectiveRegister.FAMILIAR,
    },
    {
      tense: AdjectiveTense.PAST,
      polarity: AdjectivePolarity.AFFIRMATIVE,
      register: AdjectiveRegister.POLITE,
    },
    {
      tense: AdjectiveTense.PAST,
      polarity: AdjectivePolarity.NEGATIVE,
      register: AdjectiveRegister.POLITE,
    },
  ];

  static getRandomForm(): AdjectiveConjugationForm {
    return this.FORMS[Math.floor(Math.random() * this.FORMS.length)];
  }
}
