import { Request, Response } from 'express';
import { generateRandomNumber } from '../services/numberService';

export const getRandom = (req: Request, res: Response) => {
  console.log('HERERERERER: ', req.query.max);
  const min = Math.max(1, parseInt(req.query.min as string, 10) || 1);
  const max = Math.min(1000000000, parseInt(req.query.max as string, 10) || 999999999);
  const numberEntity = generateRandomNumber(min, max);
  res.json({
    number: numberEntity.value,
    hiragana: numberEntity.hiragana,
    romaji: numberEntity.romaji,
    allPronunciations: numberEntity.allPronunciations,
  });
};
