import { describe, it, expect } from 'vitest';
import { GrammarRule } from '../../../domain/entities/GrammarRule';

describe('GrammarRule', () => {
  it('given id, particle, name and description, then stores all properties', () => {
    // Given / When
    const rule = new GrammarRule('wa', 'は', 'Topic', 'Marque le sujet du discours');

    // Then
    expect(rule.id).toBe('wa');
    expect(rule.particle).toBe('は');
    expect(rule.name).toBe('Topic');
    expect(rule.description).toBe('Marque le sujet du discours');
  });
});
