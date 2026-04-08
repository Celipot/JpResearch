import { Pronunciation, cartesianProduct } from '../shared/pronunciation';
import { Number as JapaneseNumber } from './Number';

interface DayConfig {
  day: number;
}

interface MonthConfig {
  month: number;
}

interface YearConfig {
  year: number;
}

interface FullDateConfig {
  year: number;
  month: number;
  day: number;
}

type DateConfig = DayConfig | MonthConfig | YearConfig | FullDateConfig;

const DAY_PRONUNCIATIONS: Record<number, { hiragana: string; romaji: string }> = {
  1: { hiragana: 'ついたち', romaji: 'tsuitachi' },
  2: { hiragana: 'ふつか', romaji: 'futsuka' },
  3: { hiragana: 'みっか', romaji: 'mikka' },
  4: { hiragana: 'よっか', romaji: 'yokka' },
  5: { hiragana: 'いつか', romaji: 'itsuka' },
  6: { hiragana: 'むいか', romaji: 'muika' },
  7: { hiragana: 'なのか', romaji: 'nanoka' },
  8: { hiragana: 'ようか', romaji: 'yōka' },
  9: { hiragana: 'ここのか', romaji: 'kokonoka' },
  10: { hiragana: 'とおか', romaji: 'tōka' },
  17: { hiragana: 'じゅうしちにち', romaji: 'jūshichinichi' },
  14: { hiragana: 'じゅうよっか', romaji: 'jūyokka' },
  20: { hiragana: 'はつか', romaji: 'hatsuka' },
  24: { hiragana: 'にじゅうよっか', romaji: 'nijūyokka' },
};

const MONTH_PRONUNCIATIONS: Record<number, { hiragana: string; romaji: string }> = {
  1: { hiragana: 'いちがつつ', romaji: 'ichigatsu' },
  2: { hiragana: 'にがつつ', romaji: 'nigatsu' },
  3: { hiragana: 'さんがつつ', romaji: 'sangatsu' },
  4: { hiragana: 'しーがつつ', romaji: 'shigatsu' },
  5: { hiragana: 'ごがつつ', romaji: 'gogatsu' },
  6: { hiragana: 'ろくがつつ', romaji: 'rokugatsu' },
  7: { hiragana: 'しちがつつ', romaji: 'shichigatsu' },
  8: { hiragana: 'はちがつつ', romaji: 'hachigatsu' },
  9: { hiragana: 'きゅうがつつ', romaji: 'kūgatsu' },
  10: { hiragana: 'じゅうがつつ', romaji: 'jūgatsu' },
  11: { hiragana: 'じゅういちがつつ', romaji: 'jūichigatsu' },
  12: { hiragana: 'じゅうにがつつ', romaji: 'jūnigatsu' },
};

export class Date {
  readonly hiragana: string;
  readonly romaji: string;
  readonly japaneseFormat: string;
  readonly allPronunciations: Pronunciation[];

  constructor(config: DateConfig) {
    if ('day' in config && 'month' in config && 'year' in config) {
      this.japaneseFormat = config.year + '年' + config.month + '月' + config.day + '日';
      const { hiragana, romaji, all } = this.buildFullDatePronunciations(
        config.year,
        config.month,
        config.day
      );
      this.hiragana = hiragana;
      this.romaji = romaji;
      this.allPronunciations = all;
    } else if ('day' in config) {
      this.japaneseFormat = config.day + '日';
      const { hiragana, romaji, all } = this.buildDayPronunciations(config.day);
      this.hiragana = hiragana;
      this.romaji = romaji;
      this.allPronunciations = all;
    } else if ('month' in config) {
      this.japaneseFormat = config.month + '月';
      const { hiragana, romaji, all } = this.buildMonthPronunciations(config.month);
      this.hiragana = hiragana;
      this.romaji = romaji;
      this.allPronunciations = all;
    } else if ('year' in config) {
      this.japaneseFormat = config.year + '年';
      const { hiragana, romaji, all } = this.buildYearPronunciations(config.year);
      this.hiragana = hiragana;
      this.romaji = romaji;
      this.allPronunciations = all;
    } else {
      throw new Error('Invalid date config');
    }
  }

  private buildDayPronunciations(day: number): {
    hiragana: string;
    romaji: string;
    all: Pronunciation[];
  } {
    const specialDay = DAY_PRONUNCIATIONS[day];
    if (specialDay) {
      const all: Pronunciation[] = [
        { hiragana: specialDay.hiragana, romaji: specialDay.romaji, isStandard: true },
      ];
      if (day === 1) {
        all.push({ hiragana: 'いちにち', romaji: 'ichinichi', isStandard: false });
      } else if (day === 17) {
        all.push({ hiragana: 'じゅうななにち', romaji: 'jūnananichi', isStandard: false });
      }
      return { hiragana: all[0].hiragana, romaji: all[0].romaji, all };
    }
    const num = new JapaneseNumber(day);
    return {
      hiragana: num.hiragana + 'にち',
      romaji: num.romaji + 'nichi',
      all: num.allPronunciations.map((p) => ({
        hiragana: p.hiragana + 'にち',
        romaji: p.romaji + 'nichi',
        isStandard: p.isStandard,
      })),
    };
  }

  private buildMonthPronunciations(month: number): {
    hiragana: string;
    romaji: string;
    all: Pronunciation[];
  } {
    const monthPron = MONTH_PRONUNCIATIONS[month];
    const all: Pronunciation[] = [
      { hiragana: monthPron.hiragana, romaji: monthPron.romaji, isStandard: true },
    ];

    if (month === 7) {
      all.push({ hiragana: 'なながつつ', romaji: 'nanagatsu', isStandard: false });
    }

    return { hiragana: all[0].hiragana, romaji: all[0].romaji, all };
  }

  private buildYearPronunciations(year: number): {
    hiragana: string;
    romaji: string;
    all: Pronunciation[];
  } {
    const num = new JapaneseNumber(year);
    return {
      hiragana: num.hiragana + 'ねん',
      romaji: num.romaji + 'nen',
      all: num.allPronunciations.map((p) => ({
        hiragana: p.hiragana + 'ねん',
        romaji: p.romaji + 'nen',
        isStandard: p.isStandard,
      })),
    };
  }

  private buildFullDatePronunciations(
    year: number,
    month: number,
    day: number
  ): {
    hiragana: string;
    romaji: string;
    all: Pronunciation[];
  } {
    const yearAll = this.buildYearPronunciations(year).all;
    const monthAll = this.buildMonthPronunciations(month).all;
    const dayAll = this.buildDayPronunciations(day).all;

    const combinations = cartesianProduct([yearAll, monthAll, dayAll]);

    const all = combinations.map((variants) => ({
      hiragana: variants[0].hiragana + variants[1].hiragana + variants[2].hiragana,
      romaji: variants[0].romaji + variants[1].romaji + variants[2].romaji,
      isStandard: variants.every((v) => v.isStandard),
    }));

    return {
      hiragana: all[0].hiragana,
      romaji: all[0].romaji,
      all,
    };
  }
}
