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
    expect([
      'present_affirmative',
      'present_negative',
      'present_affirmative_polite',
      'present_negative_polite',
    ]).toContain(result.form);
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
  const { hiragana, type, form, answer } = result;
  const stem = hiragana === '\u3044\u3044' ? '\u3088\u304f' : hiragana.slice(0, -1) + '\u304f';

  if (type === 'i') {
    if (form === 'present_affirmative') return answer === hiragana;
    if (form === 'present_affirmative_polite') return answer === hiragana + '\u3067\u3059';
    if (form === 'present_negative_polite')
      return answer === stem + '\u3042\u308a\u307e\u305b\u3093';
    return answer === stem + '\u306a\u3044';
  }

  if (form === 'present_affirmative') return answer === hiragana + '\u3060';
  if (form === 'present_affirmative_polite') return answer === hiragana + '\u3067\u3059';
  if (form === 'present_negative_polite')
    return answer === hiragana + '\u3067\u306f\u3042\u308a\u307e\u305b\u3093';
  return answer === hiragana + '\u3058\u3083\u306a\u3044';
}
