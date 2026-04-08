export interface Pronunciation {
  hiragana: string;
  romaji: string;
  isStandard: boolean;
}

export interface PronunciationVariant {
  standardHiragana: string;
  standardRomaji: string;
  alternativeHiragana?: string;
  alternativeRomaji?: string;
}

export function selectVariant(variant: PronunciationVariant, isUsingAlternative: boolean): { hiragana: string; romaji: string } {
  if (isUsingAlternative && variant.alternativeHiragana) {
    return { hiragana: variant.alternativeHiragana, romaji: variant.alternativeRomaji! };
  }
  return { hiragana: variant.standardHiragana, romaji: variant.standardRomaji };
}

export const DIGIT_PRONUNCIATIONS: PronunciationVariant[] = [
  { standardHiragana: '', standardRomaji: '' },
  { standardHiragana: 'いち', standardRomaji: 'ichi' },
  { standardHiragana: 'に', standardRomaji: 'ni' },
  { standardHiragana: 'さん', standardRomaji: 'san' },
  { standardHiragana: 'よん', standardRomaji: 'yon', alternativeHiragana: 'し', alternativeRomaji: 'shi' },
  { standardHiragana: 'ご', standardRomaji: 'go' },
  { standardHiragana: 'ろく', standardRomaji: 'roku' },
  { standardHiragana: 'なな', standardRomaji: 'nana', alternativeHiragana: 'しち', alternativeRomaji: 'shichi' },
  { standardHiragana: 'はち', standardRomaji: 'hachi' },
  { standardHiragana: 'きゅう', standardRomaji: 'kyū', alternativeHiragana: 'く', alternativeRomaji: 'ku' },
];

export const ALTERNATIVE_DIGITS = ['4', '7', '9'];

export function buildAllPronunciations(
  standardPronunciation: { hiragana: string; romaji: string },
  alternativePronunciation: { hiragana: string; romaji: string } | null,
): Pronunciation[] {
  const all: Pronunciation[] = [
    { hiragana: standardPronunciation.hiragana, romaji: standardPronunciation.romaji, isStandard: true },
  ];

  if (alternativePronunciation && alternativePronunciation.hiragana !== standardPronunciation.hiragana) {
    all.push({
      hiragana: alternativePronunciation.hiragana,
      romaji: alternativePronunciation.romaji,
      isStandard: false,
    });
  }

  return all;
}
