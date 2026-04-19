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
    if (form === AdjectiveForm.PRESENT_AFFIRMATIVE) {
      return this.hiragana;
    }

    return this.conjugateIAdjectiveNegative();
  }

  private conjugateIAdjectiveNegative(): string {
    if (this.isIrregularIi()) {
      return this.irregularIiNegative();
    }

    return this.regularIAdjectiveNegative();
  }

  private isIrregularIi(): boolean {
    return this.hiragana === 'いい';
  }

  private irregularIiNegative(): string {
    return 'よくない';
  }

  private regularIAdjectiveNegative(): string {
    const stem = this.hiragana.slice(0, -1);
    return stem + 'くない';
  }

  private conjugateNaAdjective(form: `${AdjectiveForm}`): string {
    if (form === AdjectiveForm.PRESENT_AFFIRMATIVE) {
      return this.hiragana + 'だ';
    }

    return this.hiragana + 'じゃない';
  }
}

export { AdjectiveForm };
