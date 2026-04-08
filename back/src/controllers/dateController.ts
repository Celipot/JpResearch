import { Request, Response } from 'express';
import { generateRandomDate } from '../services/dateService';

export const getRandomDate = (_req: Request, res: Response) => {
  const date = generateRandomDate();
  res.json({
    year: parseInt(date.japaneseFormat.match(/^(\d+)年/)?.[1] || '0'),
    month: parseInt(date.japaneseFormat.match(/年(\d+)月/)?.[1] || '0'),
    day: parseInt(date.japaneseFormat.match(/月(\d+)日/)?.[1] || '0'),
    hiragana: date.hiragana,
    romaji: date.romaji,
    japaneseFormat: date.japaneseFormat,
    allPronunciations: date.allPronunciations,
  });
};
