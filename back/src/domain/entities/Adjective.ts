import { AdjectiveType } from './AdjectiveType';
import { AdjectivePolarity } from './AdjectivePolarity';
import { AdjectiveRegister } from './AdjectiveRegister';
import { AdjectiveConjugationForm } from './AdjectiveConjugationForm';

export class Adjective {
  readonly hiragana: string;
  readonly type: `${AdjectiveType}`;
  readonly translation: string;

  constructor(hiragana: string, type: `${AdjectiveType}`, translation: string) {
    this.hiragana = hiragana;
    this.type = type;
    this.translation = translation;
  }

  conjugate(form: AdjectiveConjugationForm): string {
    if (this.type === AdjectiveType.I) {
      return this.conjugateIAdjective(form);
    }
    return this.conjugateNaAdjective(form);
  }

  private conjugateIAdjective(form: AdjectiveConjugationForm): string {
    if (
      form.polarity === AdjectivePolarity.AFFIRMATIVE &&
      form.register === AdjectiveRegister.FAMILIAR
    )
      return this.hiragana;
    if (
      form.polarity === AdjectivePolarity.AFFIRMATIVE &&
      form.register === AdjectiveRegister.POLITE
    )
      return this.hiragana + 'です';
    if (form.register === AdjectiveRegister.POLITE) return this.iNegativeStem() + 'ありません';
    return this.iNegativeStem() + 'ない';
  }

  private iNegativeStem(): string {
    if (this.hiragana === 'いい') return 'よく';
    return this.hiragana.slice(0, -1) + 'く';
  }

  private conjugateNaAdjective(form: AdjectiveConjugationForm): string {
    if (
      form.polarity === AdjectivePolarity.AFFIRMATIVE &&
      form.register === AdjectiveRegister.FAMILIAR
    )
      return this.hiragana + 'だ';
    if (
      form.polarity === AdjectivePolarity.AFFIRMATIVE &&
      form.register === AdjectiveRegister.POLITE
    )
      return this.hiragana + 'です';
    if (form.register === AdjectiveRegister.POLITE) return this.hiragana + 'ではありません';
    return this.hiragana + 'じゃない';
  }
}
