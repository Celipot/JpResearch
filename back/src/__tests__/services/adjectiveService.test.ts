import { describe, it, expect, beforeEach } from 'vitest';
import { generateRandomAdjective } from '../../services/adjectiveService';
import { AdjectiveRepositoryImpl } from '../../infrastructure/repositories/AdjectiveRepositoryImpl';

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
    expect(result).toHaveProperty('form');
    expect(result).toHaveProperty('answer');
  });

  it('when calling with repository, then returns valid adjective type', () => {
    // When
    const result = generateRandomAdjective(repository);

    // Then
    expect(['i', 'na']).toContain(result.type);
  });

  it('when calling with repository, then returns valid form', () => {
    // When
    const result = generateRandomAdjective(repository);

    // Then
    expect(['present_affirmative', 'present_negative']).toContain(result.form);
  });

  it('when calling with repository, then answer matches conjugation', () => {
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
      adjectives.add(`${result.hiragana}:${result.form}`);
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

  it('when calling with repository, then answer is non-empty string', () => {
    // When
    const result = generateRandomAdjective(repository);

    // Then
    expect(typeof result.answer).toBe('string');
    expect(result.answer.length).toBeGreaterThan(0);
  });
});

function isValidConjugation(result: ReturnType<typeof generateRandomAdjective>): boolean {
  if (result.type === 'i') {
    if (result.form === 'present_affirmative') {
      return result.answer === result.hiragana;
    }
    if (result.hiragana === 'いい') {
      return result.answer === 'よくない';
    }
    const stem = result.hiragana.slice(0, -1);
    return result.answer === stem + 'くない';
  }

  if (result.form === 'present_affirmative') {
    return result.answer === result.hiragana + 'だ';
  }
  return result.answer === result.hiragana + 'じゃない';
}
