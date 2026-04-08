import {
  Pronunciation,
  PronunciationVariant,
  DIGIT_PRONUNCIATIONS,
  cartesianProduct,
} from '../shared/pronunciation';

const HOUR_PRONUNCIATIONS: Record<number, PronunciationVariant> = {
  0: { standardHiragana: 'れいじ', standardRomaji: 'reiji' },
  1: { standardHiragana: 'いちじ', standardRomaji: 'ichiji' },
  2: { standardHiragana: 'にじ', standardRomaji: 'niji' },
  3: { standardHiragana: 'さんじ', standardRomaji: 'sanji' },
  4: {
    standardHiragana: 'よじ',
    standardRomaji: 'yoji',
    alternativeHiragana: 'しじ',
    alternativeRomaji: 'shiji',
  },
  5: { standardHiragana: 'ごじ', standardRomaji: 'goji' },
  6: { standardHiragana: 'ろくじ', standardRomaji: 'rokuji' },
  7: {
    standardHiragana: 'しちじ',
    standardRomaji: 'shichiji',
    alternativeHiragana: 'ななじ',
    alternativeRomaji: 'nanaji',
  },
  8: { standardHiragana: 'はちじ', standardRomaji: 'hachiji' },
  9: {
    standardHiragana: 'きゅうじ',
    standardRomaji: 'kyūji',
    alternativeHiragana: 'くじ',
    alternativeRomaji: 'kuji',
  },
  10: { standardHiragana: 'じゅうじ', standardRomaji: 'jūji' },
  11: { standardHiragana: 'じゅういちじ', standardRomaji: 'jūichiji' },
  12: { standardHiragana: 'じゅうにじ', standardRomaji: 'jūniji' },
  13: { standardHiragana: 'じゅうさんじ', standardRomaji: 'jūsanji' },
  14: {
    standardHiragana: 'じゅうよじ',
    standardRomaji: 'jūyoji',
    alternativeHiragana: 'じゅうしじ',
    alternativeRomaji: 'jūshiji',
  },
  15: { standardHiragana: 'じゅうごじ', standardRomaji: 'jūgoji' },
  16: { standardHiragana: 'じゅうろくじ', standardRomaji: 'jūrokuji' },
  17: {
    standardHiragana: 'じゅうしちじ',
    standardRomaji: 'jūshichiji',
    alternativeHiragana: 'じゅうななじ',
    alternativeRomaji: 'jūnanaji',
  },
  18: { standardHiragana: 'じゅうはちじ', standardRomaji: 'jūhachiji' },
  19: {
    standardHiragana: 'じゅうきゅうじ',
    standardRomaji: 'jūkyūji',
    alternativeHiragana: 'じゅうくじ',
    alternativeRomaji: 'jūkuji',
  },
  20: { standardHiragana: 'にじゅうじ', standardRomaji: 'nijūji' },
  21: { standardHiragana: 'にじゅういちじ', standardRomaji: 'nijūichiji' },
  22: { standardHiragana: 'にじゅうにじ', standardRomaji: 'nijūniji' },
  23: { standardHiragana: 'にじゅうさんじ', standardRomaji: 'nijūsanji' },
};

const MINUTE_SINGLE_DIGIT: PronunciationVariant[] = [
  { standardHiragana: '', standardRomaji: '' },
  { standardHiragana: 'いっぷん', standardRomaji: 'ippun' },
  { standardHiragana: 'にふん', standardRomaji: 'nifun' },
  { standardHiragana: 'さんぷん', standardRomaji: 'sanpun' },
  {
    standardHiragana: 'よんぷん',
    standardRomaji: 'yonpun',
    alternativeHiragana: 'しぷん',
    alternativeRomaji: 'shipun',
  },
  { standardHiragana: 'ごふん', standardRomaji: 'gofun' },
  { standardHiragana: 'ろっぷん', standardRomaji: 'roppun' },
  {
    standardHiragana: 'ななふん',
    standardRomaji: 'nanafun',
    alternativeHiragana: 'しちふん',
    alternativeRomaji: 'shichifun',
  },
  { standardHiragana: 'はっぷん', standardRomaji: 'happun' },
  {
    standardHiragana: 'きゅうふん',
    standardRomaji: 'kyūfun',
    alternativeHiragana: 'くふん',
    alternativeRomaji: 'kufun',
  },
];

const MINUTE_TEN_PREFIX: PronunciationVariant[] = [
  { standardHiragana: '', standardRomaji: '' },
  { standardHiragana: 'じゅう', standardRomaji: 'jū' },
  { standardHiragana: 'にじゅう', standardRomaji: 'nijū' },
  { standardHiragana: 'さんじゅう', standardRomaji: 'sanjū' },
  { standardHiragana: 'よんじゅう', standardRomaji: 'yonjū' },
  { standardHiragana: 'ごじゅう', standardRomaji: 'gojū' },
];

const MINUTE_TENS_SUFFIX: PronunciationVariant = {
  standardHiragana: 'じゅっぷん',
  standardRomaji: 'juppun',
};

interface PronunciationPart {
  hiragana: string;
  romaji: string;
  isStandard: boolean;
}

export class Hour {
  readonly hour: number;
  readonly minute: number;
  readonly hiragana: string;
  readonly romaji: string;
  readonly allPronunciations: Pronunciation[];

  constructor(hour: number, minute: number) {
    this.hour = hour;
    this.minute = minute;
    const { hiragana, romaji, all } = this.buildAllPronunciations(hour, minute);
    this.hiragana = hiragana;
    this.romaji = romaji;
    this.allPronunciations = all;
  }

  static factoryRandom(): Hour {
    const randomHour = Math.floor(Math.random() * 24);
    const randomMinute = Math.floor(Math.random() * 60);
    return new Hour(randomHour, randomMinute);
  }

  private buildAllPronunciations(
    hour: number,
    minute: number
  ): { hiragana: string; romaji: string; all: Pronunciation[] } {
    const allCombinations = this.buildAllPronunciationsCombinations(hour, minute);
    const standardPronunciation = allCombinations.find((p) => p.isStandard) || allCombinations[0];

    return {
      hiragana: standardPronunciation.hiragana,
      romaji: standardPronunciation.romaji,
      all: allCombinations,
    };
  }

  private buildAllPronunciationsCombinations(hour: number, minute: number): Pronunciation[] {
    const hourVariants = this.getHourVariants(hour);
    const minuteVariants = this.getMinuteVariants(minute);

    const allVariants = [hourVariants, minuteVariants];
    const combinations = cartesianProduct(allVariants);

    return combinations.map((variants) => {
      const hiragana = variants.map((v) => v.hiragana).join('');
      const romaji = variants.map((v) => v.romaji).join('');
      const isStandard = variants.every((v) => v.isStandard);
      return { hiragana, romaji, isStandard };
    });
  }

  private getHourVariants(hour: number): PronunciationPart[] {
    const hourVariant = HOUR_PRONUNCIATIONS[hour];
    const variants: PronunciationPart[] = [
      {
        hiragana: hourVariant.standardHiragana,
        romaji: hourVariant.standardRomaji,
        isStandard: true,
      },
    ];
    if (hourVariant.alternativeHiragana && hourVariant.alternativeRomaji) {
      variants.push({
        hiragana: hourVariant.alternativeHiragana,
        romaji: hourVariant.alternativeRomaji,
        isStandard: false,
      });
    }
    return variants;
  }

  private getMinuteVariants(minute: number): PronunciationPart[] {
    if (minute === 0) {
      return [{ hiragana: '', romaji: '', isStandard: true }];
    }

    if (minute === 10) {
      return [
        {
          hiragana: MINUTE_TENS_SUFFIX.standardHiragana,
          romaji: MINUTE_TENS_SUFFIX.standardRomaji,
          isStandard: true,
        },
      ];
    }

    const tensDigit = Math.floor(minute / 10);
    const unitDigit = minute % 10;

    if (unitDigit === 0) {
      const digitVariants = this.getDigitVariants(tensDigit);
      return digitVariants.map((v) => ({
        hiragana: v.hiragana + MINUTE_TENS_SUFFIX.standardHiragana,
        romaji: v.romaji + MINUTE_TENS_SUFFIX.standardRomaji,
        isStandard: v.isStandard,
      }));
    }

    const tensVariants = this.getMinuteTensPrefixVariants(tensDigit);
    const unitVariants = this.getMinuteSingleDigitVariants(unitDigit);

    const tensProduct = cartesianProduct([tensVariants, unitVariants]);
    return tensProduct.map(([t, u]) => ({
      hiragana: t.hiragana + u.hiragana,
      romaji: t.romaji + u.romaji,
      isStandard: t.isStandard && u.isStandard,
    }));
  }

  private getDigitVariants(digit: number): PronunciationPart[] {
    const variant = DIGIT_PRONUNCIATIONS[digit];
    if (!variant) return [{ hiragana: '', romaji: '', isStandard: true }];

    const variants: PronunciationPart[] = [
      { hiragana: variant.standardHiragana, romaji: variant.standardRomaji, isStandard: true },
    ];
    if (variant.alternativeHiragana && variant.alternativeRomaji) {
      variants.push({
        hiragana: variant.alternativeHiragana,
        romaji: variant.alternativeRomaji,
        isStandard: false,
      });
    }
    return variants;
  }

  private getMinuteTensPrefixVariants(tensDigit: number): PronunciationPart[] {
    const variant = MINUTE_TEN_PREFIX[tensDigit];
    const variants: PronunciationPart[] = [
      { hiragana: variant.standardHiragana, romaji: variant.standardRomaji, isStandard: true },
    ];
    if (variant.alternativeHiragana && variant.alternativeRomaji) {
      variants.push({
        hiragana: variant.alternativeHiragana,
        romaji: variant.alternativeRomaji,
        isStandard: false,
      });
    }
    return variants;
  }

  private getMinuteSingleDigitVariants(digit: number): PronunciationPart[] {
    const variant = MINUTE_SINGLE_DIGIT[digit];
    const variants: PronunciationPart[] = [
      { hiragana: variant.standardHiragana, romaji: variant.standardRomaji, isStandard: true },
    ];
    if (variant.alternativeHiragana && variant.alternativeRomaji) {
      variants.push({
        hiragana: variant.alternativeHiragana,
        romaji: variant.alternativeRomaji,
        isStandard: false,
      });
    }
    return variants;
  }
}
