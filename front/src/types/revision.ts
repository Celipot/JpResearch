export interface Pronunciation {
  hiragana: string;
  romaji: string;
  isStandard: boolean;
}

type VerbFullForm = {
  kind: 'indicative' | 'potential' | 'passive' | 'causative';
  tense: 'present' | 'past';
  polarity: 'affirmative' | 'negative';
  register: 'plain' | 'polite';
};
type VerbImperativeForm = {
  kind: 'imperative';
  polarity: 'affirmative' | 'negative';
  register: 'plain' | 'polite';
};
type VerbPolarityOnlyForm = { kind: 'tara' | 'ba' | 'te'; polarity: 'affirmative' | 'negative' };
type VerbVolitionalForm = { kind: 'volitional'; register: 'plain' | 'polite' };
export type VerbForm =
  | VerbFullForm
  | VerbImperativeForm
  | VerbPolarityOnlyForm
  | VerbVolitionalForm;

export interface VerbResult {
  kanji: string;
  hiragana: string;
  type: 'ichidan' | 'godan' | 'irregular';
  translation: string;
  form: VerbForm;
  answers: string[];
}

export interface AdjectiveResult {
  hiragana: string;
  type: 'i' | 'na';
  translation: string;
  tense: 'present' | 'past';
  polarity: 'affirmative' | 'negative';
  register: 'familiar' | 'polite';
  answers: string[];
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
