import {
  Pronunciation,
  PronunciationVariant,
  getDigitVariants,
  cartesianProduct,
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

  private buildAllPronunciations(number: number): {
    hiragana: string;
    romaji: string;
    all: Pronunciation[];
  } {
    const allCombinations = this.buildAllPronunciationsCombinations(number);
    const standardPronunciation = allCombinations.find((p) => p.isStandard) || allCombinations[0];

    return {
      hiragana: standardPronunciation.hiragana,
      romaji: standardPronunciation.romaji,
      all: allCombinations,
    };
  }

  private buildAllPronunciationsCombinations(number: number): Pronunciation[] {
    const thousandsCount = Math.floor(number / 1000);
    const remainderAfterThousands = number % 1000;
    const hundredsCount = Math.floor(remainderAfterThousands / 100);
    const remainderAfterHundreds = remainderAfterThousands % 100;
    const tensCount = Math.floor(remainderAfterHundreds / 10);
    const unitsCount = remainderAfterHundreds % 10;

    const thousandsVariants = this.getThousandsVariants(thousandsCount);
    const hundredsVariants = this.getHundredsVariants(hundredsCount);
    const tensVariants = this.getTensVariants(tensCount);
    const unitsVariants = this.getUnitsVariants(unitsCount);

    const allDigitVariants = [thousandsVariants, hundredsVariants, tensVariants, unitsVariants];
    const combinations = cartesianProduct(allDigitVariants);

    return combinations.map((variants) => {
      const hiragana = variants.map((v) => v.hiragana).join('');
      const romaji = variants.map((v) => v.romaji).join('');
      const isStandard = variants.every((v) => v.isStandard);
      return { hiragana, romaji, isStandard };
    });
  }

  private getThousandsVariants(
    count: number
  ): { hiragana: string; romaji: string; isStandard: boolean }[] {
    if (count === 0) {
      return [{ hiragana: '', romaji: '', isStandard: true }];
    }

    const isIrregular = THOUSANDS_PRONUNCIATIONS[count] !== undefined;
    if (isIrregular) {
      return [
        {
          hiragana: THOUSANDS_PRONUNCIATIONS[count].standardHiragana,
          romaji: THOUSANDS_PRONUNCIATIONS[count].standardRomaji,
          isStandard: true,
        },
      ];
    }

    const digitVariants = getDigitVariants(count);
    return digitVariants.map((v) => ({
      hiragana: v.hiragana + THOUSANDS_SUFFIX.standardHiragana,
      romaji: v.romaji + THOUSANDS_SUFFIX.standardRomaji,
      isStandard: v.isStandard,
    }));
  }

  private getHundredsVariants(
    count: number
  ): { hiragana: string; romaji: string; isStandard: boolean }[] {
    if (count === 0) {
      return [{ hiragana: '', romaji: '', isStandard: true }];
    }

    const isIrregular = HUNDREDS_PRONUNCIATIONS[count] !== undefined;
    if (isIrregular) {
      return [
        {
          hiragana: HUNDREDS_PRONUNCIATIONS[count].standardHiragana,
          romaji: HUNDREDS_PRONUNCIATIONS[count].standardRomaji,
          isStandard: true,
        },
      ];
    }

    const digitVariants = getDigitVariants(count);
    return digitVariants.map((v) => ({
      hiragana: v.hiragana + HUNDREDS_SUFFIX.standardHiragana,
      romaji: v.romaji + HUNDREDS_SUFFIX.standardRomaji,
      isStandard: v.isStandard,
    }));
  }

  private getTensVariants(
    count: number
  ): { hiragana: string; romaji: string; isStandard: boolean }[] {
    if (count === 0) {
      return [{ hiragana: '', romaji: '', isStandard: true }];
    }

    if (count === 1) {
      return [
        {
          hiragana: TENS_SUFFIX.standardHiragana,
          romaji: TENS_SUFFIX.standardRomaji,
          isStandard: true,
        },
      ];
    }

    const digitVariants = getDigitVariants(count);
    return digitVariants.map((v) => ({
      hiragana: v.hiragana + TENS_SUFFIX.standardHiragana,
      romaji: v.romaji + TENS_SUFFIX.standardRomaji,
      isStandard: v.isStandard,
    }));
  }

  private getUnitsVariants(
    count: number
  ): { hiragana: string; romaji: string; isStandard: boolean }[] {
    if (count === 0) {
      return [{ hiragana: '', romaji: '', isStandard: true }];
    }

    return getDigitVariants(count);
  }
}
