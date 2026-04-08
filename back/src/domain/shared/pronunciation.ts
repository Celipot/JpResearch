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

export const DIGIT_PRONUNCIATIONS: PronunciationVariant[] = [
  { standardHiragana: '', standardRomaji: '' },
  { standardHiragana: 'いち', standardRomaji: 'ichi' },
  { standardHiragana: 'に', standardRomaji: 'ni' },
  { standardHiragana: 'さん', standardRomaji: 'san' },
  {
    standardHiragana: 'よん',
    standardRomaji: 'yon',
    alternativeHiragana: 'し',
    alternativeRomaji: 'shi',
  },
  { standardHiragana: 'ご', standardRomaji: 'go' },
  { standardHiragana: 'ろく', standardRomaji: 'roku' },
  {
    standardHiragana: 'なな',
    standardRomaji: 'nana',
    alternativeHiragana: 'しち',
    alternativeRomaji: 'shichi',
  },
  { standardHiragana: 'はち', standardRomaji: 'hachi' },
  {
    standardHiragana: 'きゅう',
    standardRomaji: 'kyū',
    alternativeHiragana: 'く',
    alternativeRomaji: 'ku',
  },
];

export function getDigitVariants(
  digit: number
): { hiragana: string; romaji: string; isStandard: boolean }[] {
  const variant = DIGIT_PRONUNCIATIONS[digit];
  if (!variant) return [];

  const variants: { hiragana: string; romaji: string; isStandard: boolean }[] = [
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

export function cartesianProduct<T>(arrays: T[][]): T[][] {
  if (arrays.length === 0) return [[]];
  return arrays.reduce<T[][]>(
    (acc, arr) => {
      const result: T[][] = [];
      for (const a of acc) {
        for (const b of arr) {
          result.push([...a, b]);
        }
      }
      return result;
    },
    [[]]
  );
}
