import { VerbType } from './VerbType';
import { VerbPolarity } from './VerbPolarity';
import { VerbRegister } from './VerbRegister';
import { VerbTense } from './VerbTense';
import { VerbConjugationForm } from './VerbConjugationForm';

export class Verb {
  readonly kanji: string;
  readonly hiragana: string;
  readonly type: `${VerbType}`;
  readonly translation: string;

  constructor(kanji: string, hiragana: string, type: `${VerbType}`, translation: string) {
    this.kanji = kanji;
    this.hiragana = hiragana;
    this.type = type;
    this.translation = translation;
  }

  conjugate(form: VerbConjugationForm): string {
    if (this.type === VerbType.ICHIDAN) return this.conjugateIchidan(form);
    if (this.type === VerbType.GODAN) return this.conjugateGodan(form);
    return this.conjugateIrregular(form);
  }

  acceptableAnswers(form: VerbConjugationForm): string[] {
    const primary = this.conjugate(form);
    const variant = this.politeNegativeVariant(form);
    return variant ? [primary, variant] : [primary];
  }

  private stem(): string {
    return this.kanji.slice(0, -1);
  }

  private conjugateIchidan(form: VerbConjugationForm): string {
    const stem = this.stem();
    const isAffirmative = form.polarity === VerbPolarity.AFFIRMATIVE;
    const isPolite = form.register === VerbRegister.POLITE;
    const isPast = form.tense === VerbTense.PAST;

    if (isAffirmative && !isPast) return isPolite ? stem + 'ます' : this.kanji;
    if (isAffirmative && isPast) return isPolite ? stem + 'ました' : stem + 'た';
    if (isPast) return isPolite ? stem + 'ませんでした' : stem + 'なかった';
    return isPolite ? stem + 'ません' : stem + 'ない';
  }

  private conjugateGodan(form: VerbConjugationForm): string {
    const isAffirmative = form.polarity === VerbPolarity.AFFIRMATIVE;
    const isPolite = form.register === VerbRegister.POLITE;
    const isPast = form.tense === VerbTense.PAST;

    if (isAffirmative && !isPast) return isPolite ? this.godanStemPolite() + 'ます' : this.kanji;
    if (isAffirmative && isPast)
      return isPolite ? this.godanStemPolite() + 'ました' : this.godanStemPast();
    if (isPast)
      return isPolite
        ? this.godanStemPolite() + 'ませんでした'
        : this.godanStemNegative() + 'なかった';
    return isPolite ? this.godanStemPolite() + 'ません' : this.godanStemNegative() + 'ない';
  }

  private conjugateIrregular(form: VerbConjugationForm): string {
    if (this.kanji === 'する') return this.conjugateSuru(form);
    if (this.kanji === 'くる' || this.kanji === '来る') return this.conjugateKuru(form);
    return this.conjugateGodan(form);
  }

  private conjugateSuru(form: VerbConjugationForm): string {
    const isAffirmative = form.polarity === VerbPolarity.AFFIRMATIVE;
    const isPolite = form.register === VerbRegister.POLITE;
    const isPast = form.tense === VerbTense.PAST;

    if (isAffirmative && !isPast) return isPolite ? 'します' : 'する';
    if (isAffirmative && isPast) return isPolite ? 'しました' : 'した';
    if (isPast) return isPolite ? 'しませんでした' : 'しなかった';
    return isPolite ? 'しません' : 'しない';
  }

  private conjugateKuru(form: VerbConjugationForm): string {
    const isAffirmative = form.polarity === VerbPolarity.AFFIRMATIVE;
    const isPolite = form.register === VerbRegister.POLITE;
    const isPast = form.tense === VerbTense.PAST;

    if (isAffirmative && !isPast) return isPolite ? 'きます' : 'くる';
    if (isAffirmative && isPast) return isPolite ? 'きました' : 'きた';
    if (isPast) return isPolite ? 'きませんでした' : 'こなかった';
    return isPolite ? 'きません' : 'こない';
  }

  private godanStemPolite(): string {
    return this.stem() + GODAN_POLITE_SUFFIX[this.ending()];
  }

  private godanStemNegative(): string {
    return this.stem() + GODAN_NEGATIVE_SUFFIX[this.ending()];
  }

  private godanStemPast(): string {
    return this.stem() + GODAN_PAST_SUFFIX[this.ending()];
  }

  private ending(): string {
    return this.kanji.slice(-1);
  }

  private politeNegativeVariant(form: VerbConjugationForm): string | null {
    const isPoliteNegative =
      form.polarity === VerbPolarity.NEGATIVE && form.register === VerbRegister.POLITE;
    if (!isPoliteNegative) return null;

    const negativeStem = this.type === VerbType.ICHIDAN ? this.stem() : this.godanStemNegative();
    return form.tense === VerbTense.PAST
      ? negativeStem + 'なかったです'
      : negativeStem + 'ないです';
  }
}

const GODAN_POLITE_SUFFIX: Record<string, string> = {
  う: 'い',
  つ: 'ち',
  る: 'り',
  く: 'き',
  ぐ: 'ぎ',
  す: 'し',
  ぬ: 'に',
  ぶ: 'び',
  む: 'み',
};

const GODAN_NEGATIVE_SUFFIX: Record<string, string> = {
  う: 'わ',
  つ: 'た',
  る: 'ら',
  く: 'か',
  ぐ: 'が',
  す: 'さ',
  ぬ: 'な',
  ぶ: 'ば',
  む: 'ま',
};

const GODAN_PAST_SUFFIX: Record<string, string> = {
  う: 'った',
  つ: 'った',
  る: 'った',
  く: 'いた',
  ぐ: 'いだ',
  す: 'した',
  ぬ: 'んだ',
  ぶ: 'んだ',
  む: 'んだ',
};
