export class Hour {
  readonly hour: number;
  readonly minute: number;
  readonly hiragana: string;
  readonly romaji: string;

  constructor(hour: number, minute: number) {
    this.hour = hour;
    this.minute = minute;
    this.hiragana = this.toHiragana(hour, minute);
    this.romaji = this.toRomaji(hour, minute);
  }

  static factoryRandom(): Hour {
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 60);
    return new Hour(hour, minute);
  }

  private toHiragana(hour: number, minute: number): string {
    const hourMap: Record<number, string> = {
      0: 'れいじ', 1: 'いちじ', 2: 'にじ', 3: 'さんじ', 4: 'よじ',
      5: 'ごじ', 6: 'ろくじ', 7: 'しちじ', 8: 'はちじ', 9: 'きゅうじ',
      10: 'じゅうじ', 11: 'じゅういちじ', 12: 'じゅうにじ',
      13: 'じゅうさんじ', 14: 'じゅうよじ', 15: 'じゅうごじ',
      16: 'じゅうろくじ', 17: 'じゅうしちじ', 18: 'じゅうはちじ',
      19: 'じゅうきゅうじ', 20: 'にじゅうじ', 21: 'にじゅういちじ',
      22: 'にじゅうにじ', 23: 'にじゅうさんじ',
    };
    const hourPart = hourMap[hour];

    if (minute === 0) return hourPart;

    const minuteHiragana = this.minuteToHiragana(minute);
    return hourPart + minuteHiragana;
  }

  private minuteToHiragana(minute: number): string {
    const units = ['', 'いっぷん', 'にふん', 'さんぷん', 'よんぷん', 'ごふん', 'ろっぷん', 'ななふん', 'はっぷん', 'きゅうふん'];
    const tenPrefix = ['', 'じゅう', 'にじゅう', 'さんじゅう', 'ごじゅう'];
    const digitPrefix = ['', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'];

    if (minute <= 9) return units[minute];
    if (minute === 10) return 'じゅっぷん';

    const ten = Math.floor(minute / 10);
    const unit = minute % 10;

    if (unit === 0) return digitPrefix[ten] + 'じゅっぷん';

    return tenPrefix[ten] + units[unit];
  }

  private toRomaji(hour: number, minute: number): string {
    const hourMap: Record<number, string> = {
      0: 'reiji', 1: 'ichiji', 2: 'niji', 3: 'sanji', 4: 'yoji',
      5: 'goji', 6: 'rokuji', 7: 'shichiji', 8: 'hachiji', 9: 'kyūji',
      10: 'jūji', 11: 'jūichiji', 12: 'jūniji',
      13: 'jūsanji', 14: 'jūyoji', 15: 'jūgoji',
      16: 'jūrokuji', 17: 'jūshichiji', 18: 'jūhachiji',
      19: 'jūkyūji', 20: 'nijūji', 21: 'nijūichiji',
      22: 'nijūniji', 23: 'nijūsanji',
    };
    const hourPart = hourMap[hour];

    if (minute === 0) return hourPart;

    const minuteRomaji = this.minuteToRomaji(minute);
    return hourPart + minuteRomaji;
  }

  private minuteToRomaji(minute: number): string {
    const units = ['', 'ippun', 'nifun', 'sanpun', 'yonpun', 'gofun', 'roppun', 'nanafun', 'happun', 'kyūfun'];
    const tenPrefix = ['', 'jū', 'nijū', 'sanjū', 'gojū'];
    const digitPrefix = ['', 'ichi', 'ni', 'san', 'yon', 'go', 'roku', 'nana', 'hachi', 'kyū'];

    if (minute <= 9) return units[minute];
    if (minute === 10) return 'juppun';

    const ten = Math.floor(minute / 10);
    const unit = minute % 10;

    if (unit === 0) return digitPrefix[ten] + 'juppun';

    return tenPrefix[ten] + units[unit];
  }
}
