import { Request, Response } from 'express';
import { getRandomExercise } from '../services/exerciseService';

export const getRandomExercise_ = (req: Request, res: Response): void => {
  const rule = req.query.rule as string;

  if (!rule) {
    res.status(400).json({ error: 'Le paramètre "rule" est requis.' });
    return;
  }

  try {
    const exercise = getRandomExercise(rule);
    res.json({
      type: exercise.type,
      rule: {
        id: exercise.rule.id,
        particle: exercise.rule.particle,
        name: exercise.rule.name,
        description: exercise.rule.description,
      },
      question: exercise.question,
      correctAnswers: exercise.correctAnswers,
      options: exercise.options ?? null,
      explanation: exercise.explanation,
      vocabulary: exercise.vocabulary ?? null,
    });
  } catch {
    res.status(404).json({ error: `Règle grammaticale inconnue : ${rule}` });
  }
};
