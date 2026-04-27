import { Response } from 'express';
import { generateRandomVerb } from '../services/verbService';
import { VerbRepositoryImpl } from '../infrastructure/repositories/VerbRepositoryImpl';
import { VerbFormKind, VerbTense } from '../domain/entities/verb/VerbConjugationForm';
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

const VALID_TENSES: VerbTense[] = [VerbTense.PRESENT, VerbTense.PAST];

export const getRandomVerb = (req: VerbReq, res: Response) => {
  const kinds = parseKinds(req.query.kinds as string | undefined);
  const tenses = parseTenses(req.query.tenses as string | undefined);
  const verb = generateRandomVerb(verbRepository, kinds, tenses);
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

const parseTenses = (raw: string | undefined): VerbTense[] | undefined => {
  if (!raw) return undefined;
  const valid = raw
    .split(',')
    .map((t) => t.trim())
    .filter((t): t is VerbTense => VALID_TENSES.includes(t as VerbTense));
  return valid.length > 0 ? valid : undefined;
};
