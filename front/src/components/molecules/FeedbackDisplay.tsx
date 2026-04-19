import type { Feedback } from '../hooks/useRevisionSession';

interface FeedbackDisplayProps {
  feedback: Feedback | null;
  correctMessage?: React.ReactNode;
  incorrectMessage?: React.ReactNode;
}

export function FeedbackDisplay({
  feedback,
  correctMessage,
  incorrectMessage,
}: FeedbackDisplayProps) {
  if (feedback === 'correct') {
    return <div className="feedback correct">✓ Correct !{correctMessage}</div>;
  }
  if (feedback === 'incorrect') {
    return <div className="feedback incorrect">✗ Incorrect.{incorrectMessage}</div>;
  }
  return null;
}
