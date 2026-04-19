import { AdjectiveType } from './AdjectiveType';
import { AdjectivePolarity } from './AdjectivePolarity';
import { AdjectiveRegister } from './AdjectiveRegister';
import { AdjectiveTense } from './AdjectiveTense';
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

  acceptableAnswers(form: AdjectiveConjugationForm): string[] {
    const primary = this.conjugate(form);
    const variant =
      this.politeNegativeVariant(form) ?? this.familiarPresentAffirmativeVariant(form);
    return variant ? [primary, variant] : [primary];
  }

  private familiarPresentAffirmativeVariant(form: AdjectiveConjugationForm): string | null {
    const isFamiliarPresentAffirmative =
      this.type === AdjectiveType.NA &&
      form.register === AdjectiveRegister.FAMILIAR &&
      form.tense === AdjectiveTense.PRESENT &&
      form.polarity === AdjectivePolarity.AFFIRMATIVE;
    return isFamiliarPresentAffirmative ? this.hiragana : null;
  }

  private politeNegativeVariant(form: AdjectiveConjugationForm): string | null {
    const isPoliteNegative =
      form.polarity === AdjectivePolarity.NEGATIVE && form.register === AdjectiveRegister.POLITE;
    if (!isPoliteNegative) return null;

    const isPast = form.tense === AdjectiveTense.PAST;
    if (this.type === AdjectiveType.I) {
      return isPast ? this.iNegativeStem() + 'なかったです' : this.iNegativeStem() + 'ないです';
    }
    return isPast ? this.hiragana + 'じゃなかったです' : this.hiragana + 'じゃないです';
  }

  conjugate(form: AdjectiveConjugationForm): string {
    if (this.type === AdjectiveType.I) {
      return this.conjugateIAdjective(form);
    }
    return this.conjugateNaAdjective(form);
  }

  private conjugateIAdjective(form: AdjectiveConjugationForm): string {
    const isPast = form.tense === AdjectiveTense.PAST;
    const isAffirmative = form.polarity === AdjectivePolarity.AFFIRMATIVE;
    const isPolite = form.register === AdjectiveRegister.POLITE;

    if (isAffirmative && !isPast) return isPolite ? this.hiragana + 'です' : this.hiragana;
    if (isAffirmative && isPast)
      return isPolite ? this.iPastStem() + 'たです' : this.iPastStem() + 'た';
    if (isPast)
      return isPolite
        ? this.iNegativeStem() + 'ありませんでした'
        : this.iNegativeStem() + 'なかった';
    return isPolite ? this.iNegativeStem() + 'ありません' : this.iNegativeStem() + 'ない';
  }

  private iPastStem(): string {
    if (this.hiragana === 'いい') return 'よかっ';
    return this.hiragana.slice(0, -1) + 'かっ';
  }

  private iNegativeStem(): string {
    if (this.hiragana === 'いい') return 'よく';
    return this.hiragana.slice(0, -1) + 'く';
  }

  private conjugateNaAdjective(form: AdjectiveConjugationForm): string {
    const isPast = form.tense === AdjectiveTense.PAST;
    const isAffirmative = form.polarity === AdjectivePolarity.AFFIRMATIVE;
    const isPolite = form.register === AdjectiveRegister.POLITE;

    if (isAffirmative && !isPast) return isPolite ? this.hiragana + 'です' : this.hiragana + 'だ';
    if (isAffirmative && isPast)
      return isPolite ? this.hiragana + 'でした' : this.hiragana + 'だった';
    if (isPast)
      return isPolite ? this.hiragana + 'ではありませんでした' : this.hiragana + 'じゃなかった';
    return isPolite ? this.hiragana + 'ではありません' : this.hiragana + 'じゃない';
  }
}
