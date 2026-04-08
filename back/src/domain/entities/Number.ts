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

const MAN_PRONUNCIATIONS: Record<number, PronunciationVariant> = {
  1: { standardHiragana: 'いちまん', standardRomaji: 'ichiman' },
  3: { standardHiragana: 'さんまん', standardRomaji: 'sanman' },
  6: { standardHiragana: 'ろくまん', standardRomaji: 'rokuman' },
  8: { standardHiragana: 'はちまん', standardRomaji: 'hachiman' },
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
    if (number >= 100000000) {
      return this.buildOkuCombinations(number);
    }

    if (number >= 1000000) {
      return this.buildLargeNumberCombinations(number);
    }

    const manCount = Math.floor(number / 10000);
    const remainderAfterMan = number % 10000;
    const thousandsCount = Math.floor(remainderAfterMan / 1000);
    const remainderAfterThousands = remainderAfterMan % 1000;
    const hundredsCount = Math.floor(remainderAfterThousands / 100);
    const remainderAfterHundreds = remainderAfterThousands % 100;
    const tensCount = Math.floor(remainderAfterHundreds / 10);
    const unitsCount = remainderAfterHundreds % 10;

    const manVariants = this.getManVariants(manCount);
    const thousandsVariants = this.getThousandsVariants(thousandsCount);
    const hundredsVariants = this.getHundredsVariants(hundredsCount);
    const tensVariants = this.getTensVariants(tensCount);
    const unitsVariants = this.getUnitsVariants(unitsCount);

    const allDigitVariants = [
      manVariants,
      thousandsVariants,
      hundredsVariants,
      tensVariants,
      unitsVariants,
    ];
    const combinations = cartesianProduct(allDigitVariants);

    return combinations.map((variants) => {
      const hiragana = variants.map((v) => v.hiragana).join('');
      const romaji = variants.map((v) => v.romaji).join('');
      const isStandard = variants.every((v) => v.isStandard);
      return { hiragana, romaji, isStandard };
    });
  }

  private buildLargeNumberCombinations(number: number): Pronunciation[] {
    if (number >= 10000000) {
      return this.buildSenmanCombinations(number);
    }

    const hyakumanCount = Math.floor(number / 1000000);
    const remainder = number % 1000000;

    const hyakumanVariants: { hiragana: string; romaji: string; isStandard: boolean }[] = [];

    if (hyakumanCount === 0) {
      hyakumanVariants.push({ hiragana: '', romaji: '', isStandard: true });
    } else if (hyakumanCount === 1) {
      hyakumanVariants.push({ hiragana: 'ひゃくまん', romaji: 'hyakuman', isStandard: true });
    } else {
      const digitVariants = getDigitVariants(hyakumanCount);
      for (const v of digitVariants) {
        hyakumanVariants.push({
          hiragana: v.hiragana + 'ひゃくまん',
          romaji: v.romaji + 'hyakuman',
          isStandard: v.isStandard,
        });
      }
    }

    const manCount = Math.floor(remainder / 10000);
    const remainderAfterMan = remainder % 10000;
    const thousandsCount = Math.floor(remainderAfterMan / 1000);
    const remainderAfterThousands = remainderAfterMan % 1000;
    const hundredsCount = Math.floor(remainderAfterThousands / 100);
    const remainderAfterHundreds = remainderAfterThousands % 100;
    const tensCount = Math.floor(remainderAfterHundreds / 10);
    const unitsCount = remainderAfterHundreds % 10;

    const manVariants = this.getManVariants(manCount);
    const thousandsVariants = this.getThousandsVariants(thousandsCount);
    const hundredsVariants = this.getHundredsVariants(hundredsCount);
    const tensVariants = this.getTensVariants(tensCount);
    const unitsVariants = this.getUnitsVariants(unitsCount);

    const allDigitVariants = [
      manVariants,
      thousandsVariants,
      hundredsVariants,
      tensVariants,
      unitsVariants,
    ];
    const remainderCombinations = cartesianProduct(allDigitVariants).map((variants) => {
      const hiragana = variants.map((v) => v.hiragana).join('');
      const romaji = variants.map((v) => v.romaji).join('');
      const isStandard = variants.every((v) => v.isStandard);
      return { hiragana, romaji, isStandard };
    });

    const combinations: Pronunciation[] = [];
    for (const hyakuman of hyakumanVariants) {
      for (const remainder of remainderCombinations) {
        combinations.push({
          hiragana: hyakuman.hiragana + remainder.hiragana,
          romaji: hyakuman.romaji + remainder.romaji,
          isStandard: hyakuman.isStandard && remainder.isStandard,
        });
      }
    }

    return combinations;
  }

  private buildSenmanCombinations(number: number): Pronunciation[] {
    const senmanCount = Math.floor(number / 10000000);
    const remainder = number % 10000000;

    const senmanVariants: { hiragana: string; romaji: string; isStandard: boolean }[] = [];

    if (senmanCount === 0) {
      senmanVariants.push({ hiragana: '', romaji: '', isStandard: true });
    } else if (senmanCount === 1) {
      senmanVariants.push({ hiragana: 'いっせんまん', romaji: 'issenman', isStandard: true });
    } else if (senmanCount === 8) {
      senmanVariants.push({ hiragana: 'はっせんまん', romaji: 'hassenman', isStandard: true });
    } else {
      const digitVariants = getDigitVariants(senmanCount);
      for (const v of digitVariants) {
        senmanVariants.push({
          hiragana: v.hiragana + 'せん',
          romaji: v.romaji + 'sen',
          isStandard: v.isStandard,
        });
      }
    }

    const hyakumanCount = Math.floor(remainder / 1000000);
    const remainderAfterHyakuman = remainder % 1000000;

    const hyakumanVariants: { hiragana: string; romaji: string; isStandard: boolean }[] = [];

    if (hyakumanCount === 0) {
      hyakumanVariants.push({ hiragana: '', romaji: '', isStandard: true });
    } else if (hyakumanCount === 1) {
      hyakumanVariants.push({ hiragana: 'ひゃくまん', romaji: 'hyakuman', isStandard: true });
    } else {
      const digitVariants = getDigitVariants(hyakumanCount);
      for (const v of digitVariants) {
        hyakumanVariants.push({
          hiragana: v.hiragana + 'ひゃくまん',
          romaji: v.romaji + 'hyakuman',
          isStandard: v.isStandard,
        });
      }
    }

    const manCount = Math.floor(remainderAfterHyakuman / 10000);
    const remainderAfterMan = remainderAfterHyakuman % 10000;
    const thousandsCount = Math.floor(remainderAfterMan / 1000);
    const remainderAfterThousands = remainderAfterMan % 1000;
    const hundredsCount = Math.floor(remainderAfterThousands / 100);
    const remainderAfterHundreds = remainderAfterThousands % 100;
    const tensCount = Math.floor(remainderAfterHundreds / 10);
    const unitsCount = remainderAfterHundreds % 10;

    const manVariants = this.getManVariants(manCount);
    const thousandsVariants = this.getThousandsVariants(thousandsCount);
    const hundredsVariants = this.getHundredsVariants(hundredsCount);
    const tensVariants = this.getTensVariants(tensCount);
    const unitsVariants = this.getUnitsVariants(unitsCount);

    const allDigitVariants = [
      manVariants,
      thousandsVariants,
      hundredsVariants,
      tensVariants,
      unitsVariants,
    ];
    const lastCombinations = cartesianProduct(allDigitVariants).map((variants) => {
      const hiragana = variants.map((v) => v.hiragana).join('');
      const romaji = variants.map((v) => v.romaji).join('');
      const isStandard = variants.every((v) => v.isStandard);
      return { hiragana, romaji, isStandard };
    });

    const combinations: Pronunciation[] = [];
    for (const senman of senmanVariants) {
      for (const hyakuman of hyakumanVariants) {
        for (const last of lastCombinations) {
          combinations.push({
            hiragana: senman.hiragana + hyakuman.hiragana + last.hiragana,
            romaji: senman.romaji + hyakuman.romaji + last.romaji,
            isStandard: senman.isStandard && hyakuman.isStandard && last.isStandard,
          });
        }
      }
    }

    return combinations;
  }

  private getManVariants(
    count: number
  ): { hiragana: string; romaji: string; isStandard: boolean }[] {
    if (count === 0) {
      return [{ hiragana: '', romaji: '', isStandard: true }];
    }

    if (count >= 10) {
      const tensCount = Math.floor(count / 10);
      const unitsCount = count % 10;
      const tensVariants = this.getTensVariants(tensCount);
      const unitsVariants =
        unitsCount === 0
          ? [{ hiragana: '', romaji: '', isStandard: true }]
          : getDigitVariants(unitsCount);

      const combinations: { hiragana: string; romaji: string; isStandard: boolean }[] = [];
      for (const tens of tensVariants) {
        for (const units of unitsVariants) {
          combinations.push({
            hiragana: tens.hiragana + units.hiragana + 'まん',
            romaji: tens.romaji + units.romaji + 'man',
            isStandard: tens.isStandard && units.isStandard,
          });
        }
      }
      return combinations;
    }

    const isIrregular = MAN_PRONUNCIATIONS[count] !== undefined;
    if (isIrregular) {
      return [
        {
          hiragana: MAN_PRONUNCIATIONS[count].standardHiragana,
          romaji: MAN_PRONUNCIATIONS[count].standardRomaji,
          isStandard: true,
        },
      ];
    }

    const digitVariants = getDigitVariants(count);
    return digitVariants.map((v) => ({
      hiragana: v.hiragana + 'まん',
      romaji: v.romaji + 'man',
      isStandard: v.isStandard,
    }));
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

  private buildOkuCombinations(number: number): Pronunciation[] {
    const okuCount = Math.floor(number / 100000000);
    const remainder = number % 100000000;

    const okuVariants: { hiragana: string; romaji: string; isStandard: boolean }[] = [];

    if (okuCount >= 10) {
      const tensCount = Math.floor(okuCount / 10);
      const unitsCount = okuCount % 10;
      const tensVariants = this.getTensVariants(tensCount);
      const unitsVariants =
        unitsCount === 0
          ? [{ hiragana: '', romaji: '', isStandard: true }]
          : getDigitVariants(unitsCount);
      for (const t of tensVariants) {
        for (const u of unitsVariants) {
          okuVariants.push({
            hiragana: t.hiragana + u.hiragana + 'おく',
            romaji: t.romaji + u.romaji + 'oku',
            isStandard: t.isStandard && u.isStandard,
          });
        }
      }
    } else {
      for (const v of getDigitVariants(okuCount)) {
        okuVariants.push({
          hiragana: v.hiragana + 'おく',
          romaji: v.romaji + 'oku',
          isStandard: v.isStandard,
        });
      }
    }

    if (remainder === 0) {
      return okuVariants;
    }

    const manCount = Math.floor(remainder / 10000);
    const subRemainder = remainder % 10000;

    const manGroupVariants: { hiragana: string; romaji: string; isStandard: boolean }[] =
      manCount === 0
        ? [{ hiragana: '', romaji: '', isStandard: true }]
        : this.buildManGroupVariants(manCount);

    const subVariants = this.buildSubThousandVariants(subRemainder);

    const combinations: Pronunciation[] = [];
    for (const oku of okuVariants) {
      for (const man of manGroupVariants) {
        for (const sub of subVariants) {
          combinations.push({
            hiragana: oku.hiragana + man.hiragana + sub.hiragana,
            romaji: oku.romaji + man.romaji + sub.romaji,
            isStandard: oku.isStandard && man.isStandard && sub.isStandard,
          });
        }
      }
    }
    return combinations;
  }

  private buildManGroupVariants(
    manCount: number
  ): { hiragana: string; romaji: string; isStandard: boolean }[] {
    const thousandsCount = Math.floor(manCount / 1000);
    const hundredsCount = Math.floor((manCount % 1000) / 100);
    const tensCount = Math.floor((manCount % 100) / 10);
    const unitsCount = manCount % 10;

    const allDigitVariants = [
      this.getThousandsVariants(thousandsCount),
      this.getHundredsVariants(hundredsCount),
      this.getTensVariants(tensCount),
      this.getUnitsVariants(unitsCount),
    ];

    return cartesianProduct(allDigitVariants).map((variants) => ({
      hiragana: variants.map((v) => v.hiragana).join('') + 'まん',
      romaji: variants.map((v) => v.romaji).join('') + 'man',
      isStandard: variants.every((v) => v.isStandard),
    }));
  }

  private buildSubThousandVariants(
    number: number
  ): { hiragana: string; romaji: string; isStandard: boolean }[] {
    if (number === 0) {
      return [{ hiragana: '', romaji: '', isStandard: true }];
    }

    const thousandsCount = Math.floor(number / 1000);
    const hundredsCount = Math.floor((number % 1000) / 100);
    const tensCount = Math.floor((number % 100) / 10);
    const unitsCount = number % 10;

    const allDigitVariants = [
      this.getThousandsVariants(thousandsCount),
      this.getHundredsVariants(hundredsCount),
      this.getTensVariants(tensCount),
      this.getUnitsVariants(unitsCount),
    ];

    return cartesianProduct(allDigitVariants).map((variants) => ({
      hiragana: variants.map((v) => v.hiragana).join(''),
      romaji: variants.map((v) => v.romaji).join(''),
      isStandard: variants.every((v) => v.isStandard),
    }));
  }
}
