import { Request, Response } from 'express';
import { generateRandomVerb } from '../services/verbService';
import { VerbRepositoryImpl } from '../infrastructure/repositories/VerbRepositoryImpl';

const verbRepository = new VerbRepositoryImpl();

export const getRandomVerb = (_req: Request, res: Response) => {
  const verb = generateRandomVerb(verbRepository);
  res.json(verb);
};
