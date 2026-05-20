import { Response } from 'express';
import { generateRandomAdjective } from '../services/adjectiveService';
import { AdjectiveRepositoryImpl } from '../infrastructure/repositories/AdjectiveRepositoryImpl';
import { AdjectivePolarity } from '../domain/entities/adjective/AdjectivePolarity';
import { AdjectiveRegister } from '../domain/entities/adjective/AdjectiveRegister';
import type { AdjectiveReq } from '../routes/contracts';

const adjectiveRepository = new AdjectiveRepositoryImpl();

const VALID_POLARITIES: AdjectivePolarity[] = [
  AdjectivePolarity.AFFIRMATIVE,
  AdjectivePolarity.NEGATIVE,
];
const VALID_REGISTERS: AdjectiveRegister[] = [AdjectiveRegister.FAMILIAR, AdjectiveRegister.POLITE];

const parsePolarities = (raw: string | undefined): AdjectivePolarity[] | undefined => {
  if (!raw) return undefined;
  const valid = raw
    .split(',')
    .map((p) => p.trim())
    .filter((p): p is AdjectivePolarity => VALID_POLARITIES.includes(p as AdjectivePolarity));
  return valid.length > 0 ? valid : undefined;
};

const parseRegisters = (raw: string | undefined): AdjectiveRegister[] | undefined => {
  if (!raw) return undefined;
  const valid = raw
    .split(',')
    .map((r) => r.trim())
    .filter((r): r is AdjectiveRegister => VALID_REGISTERS.includes(r as AdjectiveRegister));
  return valid.length > 0 ? valid : undefined;
};

export const getRandomAdjective = (req: AdjectiveReq, res: Response) => {
  const polarities = parsePolarities(req.query.polarities as string | undefined);
  const registers = parseRegisters(req.query.registers as string | undefined);
  const adjective = generateRandomAdjective(adjectiveRepository, polarities, registers);
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
