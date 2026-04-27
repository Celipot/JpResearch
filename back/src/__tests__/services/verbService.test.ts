import { describe, it, expect, beforeEach } from 'vitest';
import { generateRandomVerb } from '../../services/verbService';
import { VerbRepositoryImpl } from '../../infrastructure/repositories/VerbRepositoryImpl';
import { VerbTense } from '../../domain/entities/verb/VerbConjugationForm';

describe('generateRandomVerb', () => {
  let repository: VerbRepositoryImpl;

  beforeEach(() => {
    repository = new VerbRepositoryImpl();
  });

  it('when calling with repository, then returns result with all required properties', () => {
    // When
    const result = generateRandomVerb(repository);

    // Then
    expect(result).toHaveProperty('kanji');
    expect(result).toHaveProperty('hiragana');
    expect(result).toHaveProperty('type');
    expect(result).toHaveProperty('translation');
    expect(result).toHaveProperty('form');
    expect(result).toHaveProperty('answers');
  });

  it('when calling with repository, then type is valid', () => {
    // When
    const result = generateRandomVerb(repository);

    // Then
    expect(['ichidan', 'godan', 'irregular']).toContain(result.type);
  });

  it('when calling with repository, then form has valid kind', () => {
    // When
    const result = generateRandomVerb(repository);

    // Then
    expect([
      'indicative',
      'potential',
      'passive',
      'causative',
      'imperative',
      'tara',
      'ba',
      'te',
      'volitional',
    ]).toContain(result.form.kind);
  });

  it('when calling with repository, then answers is non-empty array', () => {
    // When
    const result = generateRandomVerb(repository);

    // Then
    expect(Array.isArray(result.answers)).toBe(true);
    expect(result.answers.length).toBeGreaterThan(0);
  });

  it('when calling multiple times, then generates different combinations', () => {
    // When
    const combinations = new Set<string>();
    for (let i = 0; i < 30; i++) {
      const result = generateRandomVerb(repository);
      combinations.add(`${result.kanji}:${result.form.kind}`);
    }

    // Then
    expect(combinations.size).toBeGreaterThan(1);
  });

  it('when calling with a kinds filter, then form kind matches one of the selected kinds', () => {
    // Given
    const kinds = ['te', 'volitional'] as const;

    // When
    const results = Array.from({ length: 20 }, () => generateRandomVerb(repository, [...kinds]));

    // Then
    results.forEach((result) => expect(kinds).toContain(result.form.kind));
  });

  it('when calling with tenses filter only, then form tense matches one of the selected tenses', () => {
    // Given
    const tenses = [VerbTense.PRESENT];

    // When
    const results = Array.from({ length: 50 }, () =>
      generateRandomVerb(repository, undefined, tenses)
    );

    // Then
    results.forEach((result) => {
      if ('tense' in result.form) expect(result.form.tense).toBe(VerbTense.PRESENT);
    });
  });
});
