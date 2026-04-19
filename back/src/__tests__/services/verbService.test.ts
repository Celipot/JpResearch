import { describe, it, expect, beforeEach } from 'vitest';
import { generateRandomVerb } from '../../services/verbService';
import { VerbRepositoryImpl } from '../../infrastructure/repositories/VerbRepositoryImpl';
import { VerbTense } from '../../domain/entities/verb/VerbTense';
import { VerbPolarity } from '../../domain/entities/verb/VerbPolarity';
import { VerbRegister } from '../../domain/entities/verb/VerbRegister';

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
    expect(result).toHaveProperty('tense');
    expect(result).toHaveProperty('polarity');
    expect(result).toHaveProperty('register');
    expect(result).toHaveProperty('answers');
  });

  it('when calling with repository, then type is valid', () => {
    // When
    const result = generateRandomVerb(repository);

    // Then
    expect(['ichidan', 'godan', 'irregular']).toContain(result.type);
  });

  it('when calling with repository, then tense is valid', () => {
    // When
    const result = generateRandomVerb(repository);

    // Then
    expect([VerbTense.PRESENT, VerbTense.PAST]).toContain(result.tense);
  });

  it('when calling with repository, then polarity is valid', () => {
    // When
    const result = generateRandomVerb(repository);

    // Then
    expect([VerbPolarity.AFFIRMATIVE, VerbPolarity.NEGATIVE]).toContain(result.polarity);
  });

  it('when calling with repository, then register is valid', () => {
    // When
    const result = generateRandomVerb(repository);

    // Then
    expect([VerbRegister.PLAIN, VerbRegister.POLITE]).toContain(result.register);
  });

  it('when calling with repository, then answers is non-empty array', () => {
    // When
    const result = generateRandomVerb(repository);

    // Then
    expect(Array.isArray(result.answers)).toBe(true);
    expect(result.answers.length).toBeGreaterThan(0);
  });

  it('when calling multiple times, then generates different verbs', () => {
    // When
    const verbs = new Set<string>();
    for (let i = 0; i < 30; i++) {
      const result = generateRandomVerb(repository);
      verbs.add(`${result.kanji}:${result.tense}:${result.polarity}:${result.register}`);
    }

    // Then
    expect(verbs.size).toBeGreaterThan(1);
  });
});
