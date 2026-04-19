import { useCallback, useState } from 'react';

export function useSpeech() {
  const [spokenHiragana, setSpokenHiragana] = useState<string | null>(null);

  const speak = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.lang = 'ja-JP';
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }, []);

  const speakAndRemember = useCallback(
    (text: string) => {
      setSpokenHiragana(text);
      speak(text);
    },
    [speak]
  );

  const replay = useCallback(() => {
    if (spokenHiragana) speak(spokenHiragana);
  }, [speak, spokenHiragana]);

  const reset = useCallback(() => setSpokenHiragana(null), []);

  return { speak, speakAndRemember, replay, reset };
}
