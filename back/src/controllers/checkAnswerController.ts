import { Request, Response } from 'express';
import { AnswerCheck } from '../domain/entities/AnswerCheck';

export const checkAnswer = (req: Request, res: Response) => {
  const { userAnswer, expectedAnswer } = req.body;
  res.json({ correct: AnswerCheck.isCorrect(userAnswer, expectedAnswer) });
};
