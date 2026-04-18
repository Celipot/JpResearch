export class AnswerCheck {
  private static readonly HIRAGANA_MAP: Record<string, string> = {
    あ: 'a',
    い: 'i',
    う: 'u',
    え: 'e',
    お: 'o',
    か: 'ka',
    き: 'ki',
    く: 'ku',
    け: 'ke',
    こ: 'ko',
    が: 'ga',
    ぎ: 'gi',
    ぐ: 'gu',
    げ: 'ge',
    ご: 'go',
    さ: 'sa',
    し: 'shi',
    す: 'su',
    せ: 'se',
    そ: 'so',
    ざ: 'za',
    じ: 'ji',
    ず: 'zu',
    ぜ: 'ze',
    ぞ: 'zo',
    た: 'ta',
    ち: 'chi',
    つ: 'tsu',
    て: 'te',
    と: 'to',
    だ: 'da',
    ぢ: 'di',
    づ: 'du',
    で: 'de',
    ど: 'do',
    な: 'na',
    に: 'ni',
    ぬ: 'nu',
    ね: 'ne',
    の: 'no',
    は: 'ha',
    ひ: 'hi',
    ふ: 'fu',
    へ: 'he',
    ほ: 'ho',
    ば: 'ba',
    び: 'bi',
    ぶ: 'bu',
    べ: 'be',
    ぼ: 'bo',
    ぱ: 'pa',
    ぴ: 'pi',
    ぷ: 'pu',
    ぺ: 'pe',
    ぽ: 'po',
    ま: 'ma',
    み: 'mi',
    む: 'mu',
    め: 'me',
    も: 'mo',
    や: 'ya',
    ゆ: 'yu',
    よ: 'yo',
    ら: 'ra',
    り: 'ri',
    る: 'ru',
    れ: 're',
    ろ: 'ro',
    わ: 'wa',
    ゐ: 'wi',
    ゑ: 'we',
    を: 'wo',
    ん: 'n',
    ゃ: 'ya',
    ゅ: 'yu',
    ょ: 'yo',
  };

  static isCorrect(userAnswer: string, expectedAnswer: string): boolean {
    const normalizedUserAnswer = this.normalizeRomaji(userAnswer);
    const expectedHiragana = expectedAnswer.toLowerCase().replace(/\s+/g, '');
    const expectedRomaji = this.normalizeRomaji(this.hiraganaToRomaji(expectedAnswer));

    return normalizedUserAnswer === expectedHiragana || normalizedUserAnswer === expectedRomaji;
  }

  private static hiraganaToRomaji(hiragana: string): string {
    let result = '';
    for (let i = 0; i < hiragana.length; i++) {
      const char = hiragana[i];
      const romaji = this.HIRAGANA_MAP[char];

      if (this.isSmallYoSound(char) && i > 0) {
        result = this.removeTrailingVowel(result);
      }
      result += romaji || char;
    }
    return result;
  }

  private static isSmallYoSound(char: string): boolean {
    return char === 'ゃ' || char === 'ゅ' || char === 'ょ';
  }

  private static removeTrailingVowel(text: string): string {
    return text.endsWith('i') ? text.slice(0, -1) : text;
  }

  private static normalizeRomaji(str: string): string {
    return str
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/ou+/g, 'o')
      .replace(/ū/g, 'uu')
      .replace(/u+/g, (m) => (m.length >= 2 ? 'uu' : m));
  }
}
