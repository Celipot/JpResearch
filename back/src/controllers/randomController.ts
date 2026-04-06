import { Request, Response } from 'express';
import { generateRandomNumber } from '../services/randomService';

export const getRandom = (_req: Request, res: Response) => {
  const nombre = generateRandomNumber();
  res.json({ nombre: nombre.valeur, hiragana: nombre.hiragana, romaji: nombre.romaji });
};
