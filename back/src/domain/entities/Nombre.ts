export class Nombre {
  readonly valeur: number;
  readonly hiragana: string;

  constructor(valeur: number) {
    this.valeur = valeur;
    this.hiragana = this.toHiragana(valeur);
  }

  private toHiragana(num: number): string {
    const digits = ['', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'];

    let result = '';

    const thousands = Math.floor(num / 1000);
    const remainder1 = num % 1000;

    if (thousands > 0) {
      if (thousands === 1) {
        result += 'せん';
      } else if (thousands === 3) {
        result += 'さんぜん';
      } else if (thousands === 8) {
        result += 'はっせん';
      } else {
        result += digits[thousands] + 'せん';
      }
    }

    const hundreds = Math.floor(remainder1 / 100);
    const remainder2 = remainder1 % 100;

    if (hundreds > 0) {
      if (hundreds === 1) {
        result += 'ひゃく';
      } else if (hundreds === 3) {
        result += 'さんびゃく';
      } else if (hundreds === 6) {
        result += 'ろっぴゃく';
      } else if (hundreds === 8) {
        result += 'はっぴゃく';
      } else {
        result += digits[hundreds] + 'ひゃく';
      }
    }

    const tens = Math.floor(remainder2 / 10);
    const units = remainder2 % 10;

    if (tens > 0) {
      if (tens === 1) {
        result += 'じゅう';
      } else {
        result += digits[tens] + 'じゅう';
      }
    }

    if (units > 0) {
      result += digits[units];
    }

    return result;
  }
}
