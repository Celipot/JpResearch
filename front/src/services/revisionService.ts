import type {
  AdjectiveResult,
  VerbResult,
  NumberResult,
  HourResult,
  DateResult,
} from '../types/revision';

export async function getRandomVerb(): Promise<VerbResult> {
  const res = await fetch('/api/random-verb');
  return res.json();
}

export async function getRandomAdjective(): Promise<AdjectiveResult> {
  const res = await fetch('/api/random-adjective');
  return res.json();
}

export async function getRandomNumber(min: number, max: number): Promise<NumberResult> {
  const res = await fetch(`/api/random?min=${min}&max=${max}`);
  return res.json();
}

export async function getRandomHour(): Promise<HourResult> {
  const res = await fetch('/api/random-hour');
  return res.json();
}

export async function getRandomDate(): Promise<DateResult> {
  const res = await fetch('/api/random-date');
  return res.json();
}

export async function checkAnswer(userAnswer: string, expectedAnswers: string[]): Promise<boolean> {
  const res = await fetch('/api/check-answer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userAnswer, expectedAnswers }),
  });
  const data = await res.json();
  return data.correct;
}
