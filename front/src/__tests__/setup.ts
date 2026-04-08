import '@testing-library/jest-dom/vitest';

class SpeechSynthesisUtterance {
  text: string;
  rate: number;
  lang: string;
  constructor(text: string) {
    this.text = text;
    this.rate = 1;
    this.lang = 'ja-JP';
  }
}

class SpeechSynthesis {
  cancel() {}
  speak(_utterance: SpeechSynthesisUtterance) {}
}

Object.defineProperty(window, 'speechSynthesis', {
  value: new SpeechSynthesis(),
});

global.SpeechSynthesisUtterance = SpeechSynthesisUtterance;
