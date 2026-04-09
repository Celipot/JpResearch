import { Request, Response } from 'express';
import { generateRandomNumber } from '../services/numberService';

export const getRandom = (req: Request, res: Response) => {
  const min = Math.max(1, parseInt(req.query.min as string, 10) || 1);
  const max = Math.min(1000000000, parseInt(req.query.max as string, 10) || 1000000000);
  const numberEntity = generateRandomNumber(min, max);
  res.json({
    number: numberEntity.value,
    hiragana: numberEntity.hiragana,
    romaji: numberEntity.romaji,
    allPronunciations: numberEntity.allPronunciations,
  });
};
