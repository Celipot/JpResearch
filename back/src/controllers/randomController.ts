import { Request, Response } from 'express';
import { generateRandomNumber } from '../services/numberService';

export const getRandom = (_req: Request, res: Response) => {
  const numberEntity = generateRandomNumber();
  res.json({
    number: numberEntity.value,
    hiragana: numberEntity.hiragana,
    romaji: numberEntity.romaji,
    allPronunciations: numberEntity.allPronunciations,
  });
};
