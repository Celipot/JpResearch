import { AdjectiveForm } from './AdjectiveForm';

export enum AdjectiveType {
  I = 'i',
  NA = 'na',
}

export class Adjective {
  readonly hiragana: string;
  readonly type: `${AdjectiveType}`;
  readonly translation: string;

  constructor(hiragana: string, type: `${AdjectiveType}`, translation: string) {
    this.hiragana = hiragana;
    this.type = type;
    this.translation = translation;
  }

  conjugate(form: `${AdjectiveForm}`): string {
    if (this.type === AdjectiveType.I) {
      return this.conjugateIAdjective(form);
    } else {
      return this.conjugateNaAdjective(form);
    }
  }

  private conjugateIAdjective(form: `${AdjectiveForm}`): string {
    if (form === AdjectiveForm.PRESENT_AFFIRMATIVE) return this.hiragana;
    if (form === AdjectiveForm.PRESENT_AFFIRMATIVE_POLITE) return this.hiragana + 'です';
    if (form === AdjectiveForm.PRESENT_NEGATIVE_POLITE) return this.iNegativeStem() + 'ありません';
    return this.iNegativeStem() + 'ない';
  }

  private iNegativeStem(): string {
    if (this.hiragana === 'いい') return 'よく';
    return this.hiragana.slice(0, -1) + 'く';
  }

  private conjugateNaAdjective(form: `${AdjectiveForm}`): string {
    if (form === AdjectiveForm.PRESENT_AFFIRMATIVE) return this.hiragana + 'だ';
    if (form === AdjectiveForm.PRESENT_AFFIRMATIVE_POLITE) return this.hiragana + 'です';
    if (form === AdjectiveForm.PRESENT_NEGATIVE_POLITE) return this.hiragana + 'ではありません';
    return this.hiragana + 'じゃない';
  }
}

export { AdjectiveForm };
