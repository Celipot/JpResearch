import { describe, it, expect } from 'vitest';
import {
  VerbConjugationFormUtils,
  VerbFormKind,
} from '../../../domain/entities/verb/VerbConjugationForm';

describe('VerbConjugationFormUtils.getRandomFormFromKinds', () => {
  it('when given a single kind, then returns a form of that kind', () => {
    // Given
    const kinds: VerbFormKind[] = ['te'];

    // When
    const form = VerbConjugationFormUtils.getRandomFormFromKinds(kinds);

    // Then
    expect(form.kind).toBe('te');
  });

  it('when given multiple kinds, then returns a form whose kind is one of the selected kinds', () => {
    // Given
    const kinds: VerbFormKind[] = ['indicative', 'passive'];

    // When
    const forms = Array.from({ length: 30 }, () =>
      VerbConjugationFormUtils.getRandomFormFromKinds(kinds)
    );

    // Then
    forms.forEach((form) => expect(kinds).toContain(form.kind));
  });

  it('when given multiple kinds, then all selected kinds can be returned', () => {
    // Given
    const kinds: VerbFormKind[] = ['tara', 'ba', 'volitional'];

    // When
    const returnedKinds = new Set(
      Array.from({ length: 100 }, () => VerbConjugationFormUtils.getRandomFormFromKinds(kinds).kind)
    );

    // Then
    expect(returnedKinds.size).toBeGreaterThan(1);
  });
});
