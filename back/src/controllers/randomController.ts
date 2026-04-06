import { Request, Response } from 'express';
import { generateRandomNumber } from '../services/randomService';

export const getRandom = (_req: Request, res: Response) => {
  const nombre = generateRandomNumber();
  res.json({ random: nombre.valeur, hiragana: nombre.hiragana });
};
