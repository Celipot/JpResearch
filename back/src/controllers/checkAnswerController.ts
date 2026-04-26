import { Response } from 'express';
import { AnswerCheck } from '../domain/entities/AnswerCheck';
import type { CheckAnswerReq } from '../routes/contracts';

export const checkAnswer = (req: CheckAnswerReq, res: Response) => {
  const { userAnswer, expectedAnswer, expectedAnswers } = req.body;
  const correct = expectedAnswers
    ? AnswerCheck.isAnyCorrect(userAnswer, expectedAnswers)
    : AnswerCheck.isCorrect(userAnswer, expectedAnswer!);
  res.json({ correct });
};
