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

  static getRandomFormFor(
    polarities?: AdjectivePolarity[],
    registers?: AdjectiveRegister[]
  ): AdjectiveConjugationForm {
    const filtered = this.FORMS.filter((f) => {
      if (polarities && !polarities.includes(f.polarity)) return false;
      if (registers && !registers.includes(f.register)) return false;
      return true;
    });
    return filtered[Math.floor(Math.random() * filtered.length)];
  }
}
