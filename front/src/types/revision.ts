export interface Pronunciation {
  hiragana: string;
  romaji: string;
  isStandard: boolean;
}

export interface AdjectiveResult {
  hiragana: string;
  type: 'i' | 'na';
  translation: string;
  form: 'present_affirmative' | 'present_negative';
  answer: string;
}

export interface NumberResult {
  number: number;
  hiragana: string;
  romaji: string;
  allPronunciations: Pronunciation[];
}

export interface HourResult {
  hour: number;
  minute: number;
  hiragana: string;
  romaji: string;
  allPronunciations: Pronunciation[];
}

export interface DateResult {
  year: number;
  month: number;
  day: number;
  hiragana: string;
  romaji: string;
  japaneseFormat: string;
  allPronunciations: Pronunciation[];
}
