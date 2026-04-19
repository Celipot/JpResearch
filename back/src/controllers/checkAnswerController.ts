import { Request, Response } from 'express';
import { AnswerCheck } from '../domain/entities/AnswerCheck';

export const checkAnswer = (req: Request, res: Response) => {
  const { userAnswer, expectedAnswer, expectedAnswers } = req.body;
  const correct = expectedAnswers
    ? AnswerCheck.isAnyCorrect(userAnswer, expectedAnswers)
    : AnswerCheck.isCorrect(userAnswer, expectedAnswer);
  res.json({ correct });
};
