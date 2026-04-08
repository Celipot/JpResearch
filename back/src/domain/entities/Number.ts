import {
  Pronunciation,
  PronunciationVariant,
  selectVariant,
  DIGIT_PRONUNCIATIONS,
  ALTERNATIVE_DIGITS,
  buildAllPronunciations,
} from '../shared/pronunciation';

const THOUSANDS_PRONUNCIATIONS: Record<number, PronunciationVariant> = {
  1: { standardHiragana: 'せん', standardRomaji: 'sen' },
  3: { standardHiragana: 'さんぜん', standardRomaji: 'sanzen' },
  8: { standardHiragana: 'はっせん', standardRomaji: 'hassen' },
};

const HUNDREDS_PRONUNCIATIONS: Record<number, PronunciationVariant> = {
  1: { standardHiragana: 'ひゃく', standardRomaji: 'hyaku' },
  3: { standardHiragana: 'さんびゃく', standardRomaji: 'sanbyaku' },
  6: { standardHiragana: 'ろっぴゃく', standardRomaji: 'roppyaku' },
  8: { standardHiragana: 'はっぴゃく', standardRomaji: 'happyaku' },
};

const TENS_SUFFIX: PronunciationVariant = {
  standardHiragana: 'じゅう',
  standardRomaji: 'jū',
};

const THOUSANDS_SUFFIX: PronunciationVariant = {
  standardHiragana: 'せん',
  standardRomaji: 'sen',
};

const HUNDREDS_SUFFIX: PronunciationVariant = {
  standardHiragana: 'ひゃく',
  standardRomaji: 'hyaku',
};

export class Number {
  readonly value: number;
  readonly hiragana: string;
  readonly romaji: string;
  readonly allPronunciations: Pronunciation[];

  constructor(value: number) {
    this.value = value;
    const { hiragana, romaji, all } = this.buildAllPronunciations(value);
    this.hiragana = hiragana;
    this.romaji = romaji;
    this.allPronunciations = all;
  }

  private buildAllPronunciations(number: number): { hiragana: string; romaji: string; all: Pronunciation[] } {
    const standardPronunciation = this.buildPronunciation(number, false);
    const alternativePronunciation = this.containsAlternativeDigit(number)
      ? this.buildPronunciation(number, true)
      : null;

    return {
      hiragana: standardPronunciation.hiragana,
      romaji: standardPronunciation.romaji,
      all: buildAllPronunciations(standardPronunciation, alternativePronunciation),
    };
  }

  private containsAlternativeDigit(number: number): boolean {
    return number.toString().split('').some(digit => ALTERNATIVE_DIGITS.includes(digit));
  }

  private buildPronunciation(number: number, isUsingAlternative: boolean): { hiragana: string; romaji: string } {
    const thousandsCount = Math.floor(number / 1000);
    const remainderAfterThousands = number % 1000;
    const hundredsCount = Math.floor(remainderAfterThousands / 100);
    const remainderAfterHundreds = remainderAfterThousands % 100;
    const tensCount = Math.floor(remainderAfterHundreds / 10);
    const unitsCount = remainderAfterHundreds % 10;

    const thousandsPart = this.buildThousandsPart(thousandsCount, isUsingAlternative);
    const hundredsPart = this.buildHundredsPart(hundredsCount, isUsingAlternative);
    const tensPart = this.buildTensPart(tensCount, isUsingAlternative);
    const unitsPart = this.buildUnitsPart(unitsCount, isUsingAlternative);

    return {
      hiragana: thousandsPart.hiragana + hundredsPart.hiragana + tensPart.hiragana + unitsPart.hiragana,
      romaji: thousandsPart.romaji + hundredsPart.romaji + tensPart.romaji + unitsPart.romaji,
    };
  }

  private buildThousandsPart(thousandsCount: number, isUsingAlternative: boolean): { hiragana: string; romaji: string } {
    if (thousandsCount === 0) {
      return { hiragana: '', romaji: '' };
    }

    const isIrregularPronunciation = THOUSANDS_PRONUNCIATIONS[thousandsCount] !== undefined;
    if (isIrregularPronunciation) {
      const irregularPronunciation = THOUSANDS_PRONUNCIATIONS[thousandsCount];
      return { hiragana: irregularPronunciation.standardHiragana, romaji: irregularPronunciation.standardRomaji };
    }

    const digitPronunciation = selectVariant(DIGIT_PRONUNCIATIONS[thousandsCount], isUsingAlternative);
    return {
      hiragana: digitPronunciation.hiragana + THOUSANDS_SUFFIX.standardHiragana,
      romaji: digitPronunciation.romaji + THOUSANDS_SUFFIX.standardRomaji,
    };
  }

  private buildHundredsPart(hundredsCount: number, isUsingAlternative: boolean): { hiragana: string; romaji: string } {
    if (hundredsCount === 0) {
      return { hiragana: '', romaji: '' };
    }

    const isIrregularPronunciation = HUNDREDS_PRONUNCIATIONS[hundredsCount] !== undefined;
    if (isIrregularPronunciation) {
      const irregularPronunciation = HUNDREDS_PRONUNCIATIONS[hundredsCount];
      return { hiragana: irregularPronunciation.standardHiragana, romaji: irregularPronunciation.standardRomaji };
    }

    const digitPronunciation = selectVariant(DIGIT_PRONUNCIATIONS[hundredsCount], isUsingAlternative);
    return {
      hiragana: digitPronunciation.hiragana + HUNDREDS_SUFFIX.standardHiragana,
      romaji: digitPronunciation.romaji + HUNDREDS_SUFFIX.standardRomaji,
    };
  }

  private buildTensPart(tensCount: number, isUsingAlternative: boolean): { hiragana: string; romaji: string } {
    if (tensCount === 0) {
      return { hiragana: '', romaji: '' };
    }

    if (tensCount === 1) {
      return { hiragana: TENS_SUFFIX.standardHiragana, romaji: TENS_SUFFIX.standardRomaji };
    }

    const digitPronunciation = selectVariant(DIGIT_PRONUNCIATIONS[tensCount], isUsingAlternative);
    return {
      hiragana: digitPronunciation.hiragana + TENS_SUFFIX.standardHiragana,
      romaji: digitPronunciation.romaji + TENS_SUFFIX.standardRomaji,
    };
  }

  private buildUnitsPart(unitsCount: number, isUsingAlternative: boolean): { hiragana: string; romaji: string } {
    if (unitsCount === 0) {
      return { hiragana: '', romaji: '' };
    }

    return selectVariant(DIGIT_PRONUNCIATIONS[unitsCount], isUsingAlternative);
  }
}
