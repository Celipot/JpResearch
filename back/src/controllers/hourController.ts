import { Request, Response } from 'express';
import { generateRandomHour } from '../services/hourService';

export const getRandomHour = (_req: Request, res: Response) => {
  const hour = generateRandomHour();
  res.json({
    hour: hour.hour,
    minute: hour.minute,
    hiragana: hour.hiragana,
    romaji: hour.romaji,
    allPronunciations: hour.allPronunciations,
  });
};
