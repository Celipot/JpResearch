import { useState } from 'react';

export type Feedback = 'correct' | 'incorrect';
export type Mode = 'jp-to-fr' | 'fr-to-jp';

export function useRevisionSession() {
  const [loading, setLoading] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [showPronunciation, setShowPronunciation] = useState(false);

  const reset = () => {
    setUserAnswer('');
    setFeedback(null);
    setShowPronunciation(false);
  };

  const onAnswerChange = (value: string) => {
    setUserAnswer(value);
    setFeedback(null);
  };

  return {
    loading,
    setLoading,
    userAnswer,
    setUserAnswer,
    onAnswerChange,
    feedback,
    setFeedback,
    showPronunciation,
    setShowPronunciation,
    reset,
  };
}
