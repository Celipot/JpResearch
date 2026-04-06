export class Nombre {
  readonly valeur: number;
  readonly hiragana: string;
  readonly romaji: string;

  constructor(valeur: number) {
    this.valeur = valeur;
    this.hiragana = this.toHiragana(valeur);
    this.romaji = this.toRomaji(valeur);
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

  private toRomaji(num: number): string {
    const digits = ['', 'ichi', 'ni', 'san', 'yon', 'go', 'roku', 'nana', 'hachi', 'kyū'];

    let result = '';

    const thousands = Math.floor(num / 1000);
    const remainder1 = num % 1000;

    if (thousands > 0) {
      if (thousands === 1) {
        result += 'sen';
      } else if (thousands === 3) {
        result += 'sanzen';
      } else if (thousands === 8) {
        result += 'hassen';
      } else {
        result += digits[thousands] + 'sen';
      }
    }

    const hundreds = Math.floor(remainder1 / 100);
    const remainder2 = remainder1 % 100;

    if (hundreds > 0) {
      if (hundreds === 1) {
        result += 'hyaku';
      } else if (hundreds === 3) {
        result += 'sanbyaku';
      } else if (hundreds === 6) {
        result += 'roppyaku';
      } else if (hundreds === 8) {
        result += 'happyaku';
      } else {
        result += digits[hundreds] + 'hyaku';
      }
    }

    const tens = Math.floor(remainder2 / 10);
    const units = remainder2 % 10;

    if (tens > 0) {
      if (tens === 1) {
        result += 'jū';
      } else {
        result += digits[tens] + 'jū';
      }
    }

    if (units > 0) {
      result += digits[units];
    }

    return result;
  }
}
