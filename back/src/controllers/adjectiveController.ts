import { Request, Response } from 'express';
import { generateRandomAdjective } from '../services/adjectiveService';
import { AdjectiveRepositoryImpl } from '../infrastructure/repositories/AdjectiveRepositoryImpl';

const adjectiveRepository = new AdjectiveRepositoryImpl();

export const getRandomAdjective = (_req: Request, res: Response) => {
  const adjective = generateRandomAdjective(adjectiveRepository);
  res.json({
    hiragana: adjective.hiragana,
    type: adjective.type,
    translation: adjective.translation,
    tense: adjective.tense,
    polarity: adjective.polarity,
    register: adjective.register,
    answers: adjective.answers,
  });
};
