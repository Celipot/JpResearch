import { describe, it, expect } from 'vitest';
import { Date } from '../../../domain/entities/Date';

describe('Date - Day', () => {
  describe('constructor', () => {
    it('given a day, then stores the hiragana, romaji and japanese format', () => {
      const value = 15;

      const date = new Date({ day: value });

      expect(date.hiragana).toBe('じゅうごにち');
      expect(date.romaji).toBe('jūgonichi');
      expect(date.japaneseFormat).toBe('15日');
    });
  });

  describe('day 1', () => {
    it('given day 1, returns correct hiragana and romaji (ついたち)', () => {
      const date = new Date({ day: 1 });

      expect(date.hiragana).toBe('ついたち');
      expect(date.romaji).toBe('tsuitachi');
    });
  });

  describe('day 2', () => {
    it('given day 2, returns correct hiragana and romaji (ふつか)', () => {
      const date = new Date({ day: 2 });

      expect(date.hiragana).toBe('ふつか');
      expect(date.romaji).toBe('futsuka');
    });
  });

  describe('day 3', () => {
    it('given day 3, returns correct hiragana and romaji (みっか)', () => {
      const date = new Date({ day: 3 });

      expect(date.hiragana).toBe('みっか');
      expect(date.romaji).toBe('mikka');
    });
  });

  describe('day 4', () => {
    it('given day 4, returns correct hiragana and romaji (よっか)', () => {
      const date = new Date({ day: 4 });

      expect(date.hiragana).toBe('よっか');
      expect(date.romaji).toBe('yokka');
    });
  });

  describe('day 5', () => {
    it('given day 5, returns correct hiragana and romaji (いつか)', () => {
      const date = new Date({ day: 5 });

      expect(date.hiragana).toBe('いつか');
      expect(date.romaji).toBe('itsuka');
    });
  });

  describe('day 6', () => {
    it('given day 6, returns correct hiragana and romaji (むいか)', () => {
      const date = new Date({ day: 6 });

      expect(date.hiragana).toBe('むいか');
      expect(date.romaji).toBe('muika');
    });
  });

  describe('day 7', () => {
    it('given day 7, returns correct hiragana and romaji (なのか)', () => {
      const date = new Date({ day: 7 });

      expect(date.hiragana).toBe('なのか');
      expect(date.romaji).toBe('nanoka');
    });
  });

  describe('day 8', () => {
    it('given day 8, returns correct hiragana and romaji (ようか)', () => {
      const date = new Date({ day: 8 });

      expect(date.hiragana).toBe('ようか');
      expect(date.romaji).toBe('yōka');
    });
  });

  describe('day 9', () => {
    it('given day 9, returns correct hiragana and romaji (ここのか)', () => {
      const date = new Date({ day: 9 });

      expect(date.hiragana).toBe('ここのか');
      expect(date.romaji).toBe('kokonoka');
    });
  });

  describe('day 10', () => {
    it('given day 10, returns correct hiragana and romaji (とおか)', () => {
      const date = new Date({ day: 10 });

      expect(date.hiragana).toBe('とおか');
      expect(date.romaji).toBe('tōka');
    });
  });

  describe('day 17', () => {
    it('given day 17, returns correct hiragana and romaji', () => {
      const date = new Date({ day: 17 });

      expect(date.hiragana).toBe('じゅうしちにち');
      expect(date.romaji).toBe('jūshichinichi');
    });
  });

  describe('day 14', () => {
    it('given day 14, returns correct hiragana and romaji (じゅうよっか)', () => {
      const date = new Date({ day: 14 });

      expect(date.hiragana).toBe('じゅうよっか');
      expect(date.romaji).toBe('jūyokka');
    });
  });

  describe('day 20', () => {
    it('given day 20, returns correct hiragana and romaji (はつか)', () => {
      const date = new Date({ day: 20 });

      expect(date.hiragana).toBe('はつか');
      expect(date.romaji).toBe('hatsuka');
    });
  });

  describe('day 24', () => {
    it('given day 24, returns correct hiragana and romaji (にじゅうよっか)', () => {
      const date = new Date({ day: 24 });

      expect(date.hiragana).toBe('にじゅうよっか');
      expect(date.romaji).toBe('nijūyokka');
    });
  });
});

describe('Date - Month', () => {
  describe('constructor', () => {
    it('given a month, then stores the hiragana, romaji and japanese format', () => {
      const value = 6;

      const date = new Date({ month: value });

      expect(date.hiragana).toBe('ろくがつつ');
      expect(date.romaji).toBe('rokugatsu');
      expect(date.japaneseFormat).toBe('6月');
    });
  });

  describe('month 1', () => {
    it('given month 1, returns correct hiragana and romaji (いちがつつ)', () => {
      const date = new Date({ month: 1 });

      expect(date.hiragana).toBe('いちがつつ');
      expect(date.romaji).toBe('ichigatsu');
    });
  });

  describe('month 2', () => {
    it('given month 2, returns correct hiragana and romaji (にがつつ)', () => {
      const date = new Date({ month: 2 });

      expect(date.hiragana).toBe('にがつつ');
      expect(date.romaji).toBe('nigatsu');
    });
  });

  describe('month 3', () => {
    it('given month 3, returns correct hiragana and romaji (さんがつつ)', () => {
      const date = new Date({ month: 3 });

      expect(date.hiragana).toBe('さんがつつ');
      expect(date.romaji).toBe('sangatsu');
    });
  });

  describe('month 4', () => {
    it('given month 4, returns correct hiragana and romaji (しーがつつ)', () => {
      const date = new Date({ month: 4 });

      expect(date.hiragana).toBe('しーがつつ');
      expect(date.romaji).toBe('shigatsu');
    });
  });

  describe('month 5', () => {
    it('given month 5, returns correct hiragana and romaji (ごがつつ)', () => {
      const date = new Date({ month: 5 });

      expect(date.hiragana).toBe('ごがつつ');
      expect(date.romaji).toBe('gogatsu');
    });
  });

  describe('month 6', () => {
    it('given month 6, returns correct hiragana and romaji (ろくがつつ)', () => {
      const date = new Date({ month: 6 });

      expect(date.hiragana).toBe('ろくがつつ');
      expect(date.romaji).toBe('rokugatsu');
    });
  });

  describe('month 7', () => {
    it('given month 7, returns correct hiragana and romaji (しちがつつ)', () => {
      const date = new Date({ month: 7 });

      expect(date.hiragana).toBe('しちがつつ');
      expect(date.romaji).toBe('shichigatsu');
    });
  });

  describe('month 8', () => {
    it('given month 8, returns correct hiragana and romaji (はちがつつ)', () => {
      const date = new Date({ month: 8 });

      expect(date.hiragana).toBe('はちがつつ');
      expect(date.romaji).toBe('hachigatsu');
    });
  });

  describe('month 9', () => {
    it('given month 9, returns correct hiragana and romaji (きゅうがつつ)', () => {
      const date = new Date({ month: 9 });

      expect(date.hiragana).toBe('きゅうがつつ');
      expect(date.romaji).toBe('kūgatsu');
    });
  });

  describe('month 10', () => {
    it('given month 10, returns correct hiragana and romaji (じゅうがつつ)', () => {
      const date = new Date({ month: 10 });

      expect(date.hiragana).toBe('じゅうがつつ');
      expect(date.romaji).toBe('jūgatsu');
    });
  });

  describe('month 11', () => {
    it('given month 11, returns correct hiragana and romaji (じゅういちがつつ)', () => {
      const date = new Date({ month: 11 });

      expect(date.hiragana).toBe('じゅういちがつつ');
      expect(date.romaji).toBe('jūichigatsu');
    });
  });

  describe('month 12', () => {
    it('given month 12, returns correct hiragana and romaji (じゅうにがつつ)', () => {
      const date = new Date({ month: 12 });

      expect(date.hiragana).toBe('じゅうにがつつ');
      expect(date.romaji).toBe('jūnigatsu');
    });
  });
});

describe('Date - Year', () => {
  describe('constructor', () => {
    it('given a year, then stores the hiragana, romaji and japanese format', () => {
      const value = 2024;

      const date = new Date({ year: value });

      expect(date.hiragana).toBe('にせんにじゅうよんねん');
      expect(date.romaji).toBe('nisennijūyonnen');
      expect(date.japaneseFormat).toBe('2024年');
    });
  });

  describe('year 2024', () => {
    it('given year 2024, returns correct hiragana and romaji', () => {
      const date = new Date({ year: 2024 });

      expect(date.hiragana).toBe('にせんにじゅうよんねん');
      expect(date.romaji).toBe('nisennijūyonnen');
    });
  });

  describe('year 2025', () => {
    it('given year 2025, returns correct hiragana and romaji', () => {
      const date = new Date({ year: 2025 });

      expect(date.hiragana).toBe('にせんにじゅうごねん');
      expect(date.romaji).toBe('nisennijūgonen');
    });
  });
});

describe('Date - allPronunciations', () => {
  describe('day without alternatives', () => {
    it('given day without alternatives, returns only one pronunciation', () => {
      const date = new Date({ day: 5 });

      expect(date.allPronunciations).toHaveLength(1);
      expect(date.allPronunciations[0]).toEqual({
        hiragana: 'いつか',
        romaji: 'itsuka',
        isStandard: true,
      });
    });
  });

  describe('day 1 alternatives', () => {
    it('given day 1, returns all pronunciations (ついたち/いちにち)', () => {
      const date = new Date({ day: 1 });

      expect(date.allPronunciations).toHaveLength(2);
      const hiraganas = date.allPronunciations.map((p) => p.hiragana);
      const romajis = date.allPronunciations.map((p) => p.romaji);
      expect(hiraganas).toContain('ついたち');
      expect(hiraganas).toContain('いちにち');
      expect(romajis).toContain('tsuitachi');
      expect(romajis).toContain('ichinichi');
    });
  });

  describe('day 17 alternatives', () => {
    it('given day 17, returns all pronunciations (じゅうしち/じゅうなな)', () => {
      const date = new Date({ day: 17 });

      expect(date.allPronunciations).toHaveLength(2);
      const hiraganas = date.allPronunciations.map((p) => p.hiragana);
      const romajis = date.allPronunciations.map((p) => p.romaji);
      expect(hiraganas).toContain('じゅうしちにち');
      expect(hiraganas).toContain('じゅうななにち');
      expect(romajis).toContain('jūshichinichi');
      expect(romajis).toContain('jūnananichi');
    });
  });
});

describe('Date - Full Date (day + month + year)', () => {
  describe('full date 2003年2月16日', () => {
    it('given year 2003, month 2, day 16, returns correct hiragana, romaji and japanese format', () => {
      const date = new Date({ year: 2003, month: 2, day: 16 });

      expect(date.hiragana).toBe('にせんさんねんにがつつじゅうろくにち');
      expect(date.romaji).toBe('nisensannennigatsujūrokunichi');
      expect(date.japaneseFormat).toBe('2003年2月16日');
    });
  });

  describe('full date 2024年12月25日', () => {
    it('given year 2024, month 12, day 25, returns correct hiragana, romaji and japanese format', () => {
      const date = new Date({ year: 2024, month: 12, day: 25 });

      expect(date.hiragana).toBe('にせんにじゅうよんねんじゅうにがつつにじゅうごにち');
      expect(date.romaji).toBe('nisennijūyonnenjūnigatsunijūgonichi');
      expect(date.japaneseFormat).toBe('2024年12月25日');
    });
  });

  describe('full date with special day 1st', () => {
    it('given year 2024, month 1, day 1, returns correct hiragana and romaji with alternative', () => {
      const date = new Date({ year: 2024, month: 1, day: 1 });

      expect(date.japaneseFormat).toBe('2024年1月1日');
      expect(date.hiragana).toBe('にせんにじゅうよんねんいちがつつついたち');
      expect(date.romaji).toBe('nisennijūyonnenichigatsutsuitachi');
    });
  });

  describe('full date with special day 20th', () => {
    it('given year 2024, month 6, day 20, returns correct hiragana and romaji', () => {
      const date = new Date({ year: 2024, month: 6, day: 20 });

      expect(date.japaneseFormat).toBe('2024年6月20日');
      expect(date.hiragana).toBe('にせんにじゅうよんねんろくがつつはつか');
      expect(date.romaji).toBe('nisennijūyonnenrokugatsuhatsuka');
    });
  });

  describe('full date 2014年7月19日', () => {
    it('given year 2014, month 7, day 19, returns correct hiragana and romaji', () => {
      const date = new Date({ year: 2014, month: 7, day: 19 });

      expect(date.japaneseFormat).toBe('2014年7月19日');
      expect(date.hiragana).toBe('にせんじゅうよんねんしちがつつじゅうきゅうにち');
      expect(date.romaji).toBe('nisenjūyonnenshichigatsujūkyūnichi');
    });

    it('given year 2014, month 7, day 19, then has 8 pronunciations (year 14: 2 x month 7: 2 x day 19: 2)', () => {
      const date = new Date({ year: 2014, month: 7, day: 19 });

      expect(date.allPronunciations).toHaveLength(8);
      const hiraganas = date.allPronunciations.map((p) => p.hiragana);
      expect(hiraganas).toContain('にせんじゅうよんねんしちがつつじゅうきゅうにち');
      expect(hiraganas).toContain('にせんじゅうよんねんしちがつつじゅうくにち');
      expect(hiraganas).toContain('にせんじゅうしねんしちがつつじゅうきゅうにち');
      expect(hiraganas).toContain('にせんじゅうしねんしちがつつじゅうくにち');
    });
  });

  describe('full date 2047年7月27日', () => {
    it('given year 2047, month 7, day 27, returns correct hiragana and romaji', () => {
      const date = new Date({ year: 2047, month: 7, day: 27 });

      expect(date.japaneseFormat).toBe('2047年7月27日');
      expect(date.hiragana).toBe('にせんよんじゅうななねんしちがつつにじゅうななにち');
      expect(date.romaji).toBe('nisenyonjūnananenshichigatsunijūnananichi');
    });

    it('given year 2047, month 7, day 27, then has 16 pronunciations (year 47: 4 x month 7: 2 x day 27: 2)', () => {
      const date = new Date({ year: 2047, month: 7, day: 27 });

      expect(date.allPronunciations).toHaveLength(16);
    });
  });
});
