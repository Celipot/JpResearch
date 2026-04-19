import { describe, it, expect, beforeEach } from 'vitest';
import { generateRandomVerb } from '../../services/verbService';
import { VerbRepositoryImpl } from '../../infrastructure/repositories/VerbRepositoryImpl';

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
    expect(['indicative', 'te', 'volitional']).toContain(result.form.kind);
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
});
