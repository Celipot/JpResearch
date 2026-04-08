import {
  Pronunciation,
  PronunciationVariant,
  selectVariant,
  DIGIT_PRONUNCIATIONS,
  ALTERNATIVE_DIGITS,
  buildAllPronunciations,
} from '../shared/pronunciation';

const HOUR_PRONUNCIATIONS: Record<number, PronunciationVariant> = {
  0: { standardHiragana: 'れいじ', standardRomaji: 'reiji' },
  1: { standardHiragana: 'いちじ', standardRomaji: 'ichiji' },
  2: { standardHiragana: 'にじ', standardRomaji: 'niji' },
  3: { standardHiragana: 'さんじ', standardRomaji: 'sanji' },
  4: { standardHiragana: 'よじ', standardRomaji: 'yoji', alternativeHiragana: 'しじ', alternativeRomaji: 'shiji' },
  5: { standardHiragana: 'ごじ', standardRomaji: 'goji' },
  6: { standardHiragana: 'ろくじ', standardRomaji: 'rokuji' },
  7: { standardHiragana: 'しちじ', standardRomaji: 'shichiji', alternativeHiragana: 'ななじ', alternativeRomaji: 'nanaji' },
  8: { standardHiragana: 'はちじ', standardRomaji: 'hachiji' },
  9: { standardHiragana: 'きゅうじ', standardRomaji: 'kyūji', alternativeHiragana: 'くじ', alternativeRomaji: 'kuji' },
  10: { standardHiragana: 'じゅうじ', standardRomaji: 'jūji' },
  11: { standardHiragana: 'じゅういちじ', standardRomaji: 'jūichiji' },
  12: { standardHiragana: 'じゅうにじ', standardRomaji: 'jūniji' },
  13: { standardHiragana: 'じゅうさんじ', standardRomaji: 'jūsanji' },
  14: { standardHiragana: 'じゅうよじ', standardRomaji: 'jūyoji', alternativeHiragana: 'じゅうしじ', alternativeRomaji: 'jūshiji' },
  15: { standardHiragana: 'じゅうごじ', standardRomaji: 'jūgoji' },
  16: { standardHiragana: 'じゅうろくじ', standardRomaji: 'jūrokuji' },
  17: { standardHiragana: 'じゅうしちじ', standardRomaji: 'jūshichiji', alternativeHiragana: 'じゅうななじ', alternativeRomaji: 'jūnanaji' },
  18: { standardHiragana: 'じゅうはちじ', standardRomaji: 'jūhachiji' },
  19: { standardHiragana: 'じゅうきゅうじ', standardRomaji: 'jūkyūji', alternativeHiragana: 'じゅうくじ', alternativeRomaji: 'jūkuji' },
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
  { standardHiragana: 'よんぷん', standardRomaji: 'yonpun', alternativeHiragana: 'しぷん', alternativeRomaji: 'shipun' },
  { standardHiragana: 'ごふん', standardRomaji: 'gofun' },
  { standardHiragana: 'ろっぷん', standardRomaji: 'roppun' },
  { standardHiragana: 'ななふん', standardRomaji: 'nanafun', alternativeHiragana: 'しちふん', alternativeRomaji: 'shichifun' },
  { standardHiragana: 'はっぷん', standardRomaji: 'happun' },
  { standardHiragana: 'きゅうふん', standardRomaji: 'kyūfun', alternativeHiragana: 'くふん', alternativeRomaji: 'kufun' },
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

  private buildAllPronunciations(hour: number, minute: number): { hiragana: string; romaji: string; all: Pronunciation[] } {
    const standardPronunciation = this.buildPronunciation(hour, minute, false);
    const alternativePronunciation = this.containsAlternativeDigit(hour, minute)
      ? this.buildPronunciation(hour, minute, true)
      : null;

    return {
      hiragana: standardPronunciation.hiragana,
      romaji: standardPronunciation.romaji,
      all: buildAllPronunciations(standardPronunciation, alternativePronunciation),
    };
  }

  private containsAlternativeDigit(hour: number, minute: number): boolean {
    const hourDigits = hour.toString();
    const minuteDigits = minute.toString().padStart(2, '0');
    return [...hourDigits, ...minuteDigits].some(digit => ALTERNATIVE_DIGITS.includes(digit));
  }

  private buildPronunciation(hour: number, minute: number, isUsingAlternative: boolean): { hiragana: string; romaji: string } {
    const hourPronunciation = selectVariant(HOUR_PRONUNCIATIONS[hour], isUsingAlternative);

    if (minute === 0) {
      return hourPronunciation;
    }

    const minutePronunciation = this.buildMinutePronunciation(minute, isUsingAlternative);

    return {
      hiragana: hourPronunciation.hiragana + minutePronunciation.hiragana,
      romaji: hourPronunciation.romaji + minutePronunciation.romaji,
    };
  }

  private buildMinutePronunciation(minute: number, isUsingAlternative: boolean): { hiragana: string; romaji: string } {
    if (minute <= 9) {
      return selectVariant(MINUTE_SINGLE_DIGIT[minute], isUsingAlternative);
    }

    if (minute === 10) {
      return { hiragana: MINUTE_TENS_SUFFIX.standardHiragana, romaji: MINUTE_TENS_SUFFIX.standardRomaji };
    }

    const tensDigit = Math.floor(minute / 10);
    const unitDigit = minute % 10;

    if (unitDigit === 0) {
      const digitPronunciation = selectVariant(DIGIT_PRONUNCIATIONS[tensDigit], isUsingAlternative);
      return {
        hiragana: digitPronunciation.hiragana + MINUTE_TENS_SUFFIX.standardHiragana,
        romaji: digitPronunciation.romaji + MINUTE_TENS_SUFFIX.standardRomaji,
      };
    }

    const tensPronunciation = selectVariant(MINUTE_TEN_PREFIX[tensDigit], isUsingAlternative);
    const unitPronunciation = selectVariant(MINUTE_SINGLE_DIGIT[unitDigit], isUsingAlternative);

    return {
      hiragana: tensPronunciation.hiragana + unitPronunciation.hiragana,
      romaji: tensPronunciation.romaji + unitPronunciation.romaji,
    };
  }
}
