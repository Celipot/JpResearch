import { Response } from 'express';
import { generateRandomVerb } from '../services/verbService';
import { VerbRepositoryImpl } from '../infrastructure/repositories/VerbRepositoryImpl';
import { VerbFormKind } from '../domain/entities/verb/VerbConjugationForm';
import type { VerbReq } from '../routes/contracts';

const VALID_KINDS: VerbFormKind[] = [
  'indicative',
  'potential',
  'passive',
  'causative',
  'imperative',
  'tara',
  'ba',
  'te',
  'volitional',
];

const verbRepository = new VerbRepositoryImpl();

export const getRandomVerb = (req: VerbReq, res: Response) => {
  const kinds = parseKinds(req.query.kinds as string | undefined);
  const verb = generateRandomVerb(verbRepository, kinds);
  res.json(verb);
};

const parseKinds = (raw: string | undefined): VerbFormKind[] | undefined => {
  if (!raw) return undefined;
  const valid = raw
    .split(',')
    .map((k) => k.trim())
    .filter((k): k is VerbFormKind => VALID_KINDS.includes(k as VerbFormKind));
  return valid.length > 0 ? valid : undefined;
};
