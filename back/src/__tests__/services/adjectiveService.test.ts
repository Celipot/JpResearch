import { describe, it, expect, beforeEach } from 'vitest';
import { generateRandomAdjective } from '../../services/adjectiveService';
import { AdjectiveRepositoryImpl } from '../../infrastructure/repositories/AdjectiveRepositoryImpl';
import { AdjectivePolarity } from '../../domain/entities/adjective/AdjectivePolarity';
import { AdjectiveRegister } from '../../domain/entities/adjective/AdjectiveRegister';
import { AdjectiveTense } from '../../domain/entities/adjective/AdjectiveTense';

describe('generateRandomAdjective', () => {
  let repository: AdjectiveRepositoryImpl;

  beforeEach(() => {
    repository = new AdjectiveRepositoryImpl();
  });

  it('when calling with repository, then returns result with all required properties', () => {
    // When
    const result = generateRandomAdjective(repository);

    // Then
    expect(result).toHaveProperty('hiragana');
    expect(result).toHaveProperty('type');
    expect(result).toHaveProperty('translation');
    expect(result).toHaveProperty('tense');
    expect(result).toHaveProperty('polarity');
    expect(result).toHaveProperty('register');
    expect(result).toHaveProperty('answers');
  });

  it('when calling with repository, then returns valid adjective type', () => {
    // When
    const result = generateRandomAdjective(repository);

    // Then
    expect(['i', 'na']).toContain(result.type);
  });

  it('when calling with repository, then returns valid tense', () => {
    // When
    const result = generateRandomAdjective(repository);

    // Then
    expect([AdjectiveTense.PRESENT, AdjectiveTense.PAST]).toContain(result.tense);
  });

  it('when calling with repository, then returns valid polarity', () => {
    // When
    const result = generateRandomAdjective(repository);

    // Then
    expect([AdjectivePolarity.AFFIRMATIVE, AdjectivePolarity.NEGATIVE]).toContain(result.polarity);
  });

  it('when calling with repository, then returns valid register', () => {
    // When
    const result = generateRandomAdjective(repository);

    // Then
    expect([AdjectiveRegister.FAMILIAR, AdjectiveRegister.POLITE]).toContain(result.register);
  });

  it('when calling with repository, then answers[0] matches conjugation', () => {
    // When
    const result = generateRandomAdjective(repository);

    // Then
    expect(isValidConjugation(result)).toBe(true);
  });

  it('when calling multiple times with repository, then generates different adjectives', () => {
    // When
    const adjectives = new Set<string>();
    for (let i = 0; i < 30; i++) {
      const result = generateRandomAdjective(repository);
      adjectives.add(`${result.hiragana}:${result.tense}:${result.polarity}:${result.register}`);
    }

    // Then
    expect(adjectives.size).toBeGreaterThan(1);
  });

  it('when calling with repository, then hiragana is non-empty string', () => {
    // When
    const result = generateRandomAdjective(repository);

    // Then
    expect(typeof result.hiragana).toBe('string');
    expect(result.hiragana.length).toBeGreaterThan(0);
  });

  it('when calling with repository, then translation is non-empty string', () => {
    // When
    const result = generateRandomAdjective(repository);

    // Then
    expect(typeof result.translation).toBe('string');
    expect(result.translation.length).toBeGreaterThan(0);
  });

  it('when calling with repository, then answers is non-empty array', () => {
    // When
    const result = generateRandomAdjective(repository);

    // Then
    expect(Array.isArray(result.answers)).toBe(true);
    expect(result.answers.length).toBeGreaterThan(0);
  });
});

function isValidConjugation(result: ReturnType<typeof generateRandomAdjective>): boolean {
  const { hiragana, type, tense, polarity, register, answers } = result;
  const answer = answers[0];
  const negativeStem =
    hiragana === '\u3044\u3044' ? '\u3088\u304f' : hiragana.slice(0, -1) + '\u304f';
  const pastStem =
    hiragana === '\u3044\u3044' ? '\u3088\u304b\u3063' : hiragana.slice(0, -1) + '\u304b\u3063';
  const isAffirmative = polarity === AdjectivePolarity.AFFIRMATIVE;
  const isPolite = register === AdjectiveRegister.POLITE;
  const isPast = tense === AdjectiveTense.PAST;

  if (type === 'i') {
    if (isAffirmative && !isPast)
      return answer === (isPolite ? hiragana + '\u3067\u3059' : hiragana);
    if (isAffirmative && isPast)
      return answer === (isPolite ? pastStem + '\u305f\u3067\u3059' : pastStem + '\u305f');
    if (isPast)
      return (
        answer ===
        (isPolite
          ? negativeStem + '\u3042\u308a\u307e\u305b\u3093\u3067\u3057\u305f'
          : negativeStem + '\u306a\u304b\u3063\u305f')
      );
    return (
      answer ===
      (isPolite ? negativeStem + '\u3042\u308a\u307e\u305b\u3093' : negativeStem + '\u306a\u3044')
    );
  }

  if (isAffirmative && !isPast)
    return answer === (isPolite ? hiragana + '\u3067\u3059' : hiragana + '\u3060');
  if (isAffirmative && isPast)
    return (
      answer === (isPolite ? hiragana + '\u3067\u3057\u305f' : hiragana + '\u3060\u3063\u305f')
    );
  if (isPast)
    return (
      answer ===
      (isPolite
        ? hiragana + '\u3067\u306f\u3042\u308a\u307e\u305b\u3093\u3067\u3057\u305f'
        : hiragana + '\u3058\u3083\u306a\u304b\u3063\u305f')
    );
  return (
    answer ===
    (isPolite
      ? hiragana + '\u3067\u306f\u3042\u308a\u307e\u305b\u3093'
      : hiragana + '\u3058\u3083\u306a\u3044')
  );
}
