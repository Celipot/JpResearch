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
    if (form.kind === 'te') return this.conjugateTe(form.polarity);
    if (form.kind === 'volitional') return this.conjugateVolitional(form.register);
    return this.conjugateIndicative(form);
  }

  acceptableAnswers(form: VerbConjugationForm): string[] {
    const primary = this.conjugate(form);
    const variant = this.politeNegativeVariant(form);
    return variant ? [primary, variant] : [primary];
  }

  private conjugateIndicative(form: Extract<VerbConjugationForm, { kind: 'indicative' }>): string {
    if (this.type === VerbType.ICHIDAN) return this.conjugateIchidan(form);
    if (this.type === VerbType.GODAN) return this.conjugateGodan(form);
    return this.conjugateIrregular(form);
  }

  private conjugateTe(polarity: VerbPolarity): string {
    if (this.type === VerbType.IRREGULAR) return this.conjugateTeIrregular(polarity);
    const negativeStem = this.type === VerbType.ICHIDAN ? this.stem() : this.godanStemNegative();
    if (polarity === VerbPolarity.NEGATIVE) return negativeStem + 'なくて';
    return this.type === VerbType.ICHIDAN ? this.stem() + 'て' : this.godanStemTe();
  }

  private conjugateTeIrregular(polarity: VerbPolarity): string {
    if (this.kanji === 'する') return polarity === VerbPolarity.NEGATIVE ? 'しなくて' : 'して';
    return polarity === VerbPolarity.NEGATIVE ? 'こなくて' : 'きて';
  }

  private conjugateVolitional(register: VerbRegister): string {
    if (this.type === VerbType.IRREGULAR) return this.conjugateVolitionalIrregular(register);
    const isPolite = register === VerbRegister.POLITE;
    if (this.type === VerbType.ICHIDAN)
      return isPolite ? this.stem() + 'ましょう' : this.stem() + 'よう';
    return isPolite
      ? this.godanStemPolite() + 'ましょう'
      : this.stem() + GODAN_VOLITIONAL_SUFFIX[this.ending()];
  }

  private conjugateVolitionalIrregular(register: VerbRegister): string {
    const isPolite = register === VerbRegister.POLITE;
    if (this.kanji === 'する') return isPolite ? 'しましょう' : 'しよう';
    return isPolite ? 'きましょう' : 'こよう';
  }

  private stem(): string {
    return this.kanji.slice(0, -1);
  }

  private conjugateIchidan(form: Extract<VerbConjugationForm, { kind: 'indicative' }>): string {
    const stem = this.stem();
    const isAffirmative = form.polarity === VerbPolarity.AFFIRMATIVE;
    const isPolite = form.register === VerbRegister.POLITE;
    const isPast = form.tense === VerbTense.PAST;

    if (isAffirmative && !isPast) return isPolite ? stem + 'ます' : this.kanji;
    if (isAffirmative && isPast) return isPolite ? stem + 'ました' : stem + 'た';
    if (isPast) return isPolite ? stem + 'ませんでした' : stem + 'なかった';
    return isPolite ? stem + 'ません' : stem + 'ない';
  }

  private conjugateGodan(form: Extract<VerbConjugationForm, { kind: 'indicative' }>): string {
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

  private conjugateIrregular(form: Extract<VerbConjugationForm, { kind: 'indicative' }>): string {
    if (this.kanji === 'する') return this.conjugateSuru(form);
    if (this.kanji === 'くる' || this.kanji === '来る') return this.conjugateKuru(form);
    return this.conjugateGodan(form);
  }

  private conjugateSuru(form: Extract<VerbConjugationForm, { kind: 'indicative' }>): string {
    const isAffirmative = form.polarity === VerbPolarity.AFFIRMATIVE;
    const isPolite = form.register === VerbRegister.POLITE;
    const isPast = form.tense === VerbTense.PAST;

    if (isAffirmative && !isPast) return isPolite ? 'します' : 'する';
    if (isAffirmative && isPast) return isPolite ? 'しました' : 'した';
    if (isPast) return isPolite ? 'しませんでした' : 'しなかった';
    return isPolite ? 'しません' : 'しない';
  }

  private conjugateKuru(form: Extract<VerbConjugationForm, { kind: 'indicative' }>): string {
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

  private godanStemTe(): string {
    return this.stem() + GODAN_TE_SUFFIX[this.ending()];
  }

  private ending(): string {
    return this.kanji.slice(-1);
  }

  private politeNegativeVariant(form: VerbConjugationForm): string | null {
    if (form.kind !== 'indicative') return null;
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

const GODAN_TE_SUFFIX: Record<string, string> = {
  う: 'って',
  つ: 'って',
  る: 'って',
  く: 'いて',
  ぐ: 'いで',
  す: 'して',
  ぬ: 'んで',
  ぶ: 'んで',
  む: 'んで',
};

const GODAN_VOLITIONAL_SUFFIX: Record<string, string> = {
  う: 'おう',
  つ: 'とう',
  る: 'ろう',
  く: 'こう',
  ぐ: 'ごう',
  す: 'そう',
  ぬ: 'のう',
  ぶ: 'ぼう',
  む: 'もう',
};
