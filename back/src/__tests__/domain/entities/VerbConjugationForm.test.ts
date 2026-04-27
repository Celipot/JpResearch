import { describe, it, expect } from 'vitest';
import {
  VerbConjugationFormUtils,
  VerbFormKind,
  VerbTense,
} from '../../../domain/entities/verb/VerbConjugationForm';

describe('VerbConjugationFormUtils.getRandomFormFor', () => {
  it('when given a single kind, then returns a form of that kind', () => {
    // Given
    const kinds: VerbFormKind[] = ['te'];

    // When
    const form = VerbConjugationFormUtils.getRandomFormFor(kinds);

    // Then
    expect(form.kind).toBe('te');
  });

  it('when given multiple kinds, then returns a form whose kind is one of the selected kinds', () => {
    // Given
    const kinds: VerbFormKind[] = ['indicative', 'passive'];

    // When
    const forms = Array.from({ length: 30 }, () =>
      VerbConjugationFormUtils.getRandomFormFor(kinds)
    );

    // Then
    forms.forEach((form) => expect(kinds).toContain(form.kind));
  });

  it('when given multiple kinds, then all selected kinds can be returned', () => {
    // Given
    const kinds: VerbFormKind[] = ['tara', 'ba', 'volitional'];

    // When
    const returnedKinds = new Set(
      Array.from({ length: 100 }, () => VerbConjugationFormUtils.getRandomFormFor(kinds).kind)
    );

    // Then
    expect(returnedKinds.size).toBeGreaterThan(1);
  });

  describe('with tenses filter', () => {
    it('when given present tense only, then never returns a past form', () => {
      // Given
      const kinds: VerbFormKind[] = ['indicative', 'potential'];
      const tenses: VerbTense[] = [VerbTense.PRESENT];

      // When
      const forms = Array.from({ length: 50 }, () =>
        VerbConjugationFormUtils.getRandomFormFor(kinds, tenses)
      );

      // Then
      forms.forEach((form) => {
        if ('tense' in form) expect(form.tense).toBe(VerbTense.PRESENT);
      });
    });

    it('when given past tense only, then never returns a present form', () => {
      // Given
      const kinds: VerbFormKind[] = ['indicative', 'causative'];
      const tenses: VerbTense[] = [VerbTense.PAST];

      // When
      const forms = Array.from({ length: 50 }, () =>
        VerbConjugationFormUtils.getRandomFormFor(kinds, tenses)
      );

      // Then
      forms.forEach((form) => {
        if ('tense' in form) expect(form.tense).toBe(VerbTense.PAST);
      });
    });

    it('when tense-less kind selected with tense filter, then still returns forms', () => {
      // Given
      const kinds: VerbFormKind[] = ['te'];
      const tenses: VerbTense[] = [VerbTense.PRESENT];

      // When
      const form = VerbConjugationFormUtils.getRandomFormFor(kinds, tenses);

      // Then
      expect(form.kind).toBe('te');
    });

    it('when mixed kinds with tense filter, then tense-bearing forms respect filter and tense-less forms still appear', () => {
      // Given
      const kinds: VerbFormKind[] = ['indicative', 'te'];
      const tenses: VerbTense[] = [VerbTense.PRESENT];

      // When
      const forms = Array.from({ length: 100 }, () =>
        VerbConjugationFormUtils.getRandomFormFor(kinds, tenses)
      );

      // Then
      forms.forEach((form) => {
        if ('tense' in form) expect(form.tense).toBe(VerbTense.PRESENT);
      });
      expect(forms.some((f) => f.kind === 'te')).toBe(true);
      expect(forms.some((f) => f.kind === 'indicative')).toBe(true);
    });

    it('when both tenses given, then present and past forms are both returned', () => {
      // Given
      const kinds: VerbFormKind[] = ['indicative'];
      const tenses: VerbTense[] = [VerbTense.PRESENT, VerbTense.PAST];

      // When
      const returnedTenses = new Set(
        Array.from({ length: 100 }, () => {
          const form = VerbConjugationFormUtils.getRandomFormFor(kinds, tenses);
          return 'tense' in form ? form.tense : null;
        })
      );

      // Then
      expect(returnedTenses).toContain(VerbTense.PRESENT);
      expect(returnedTenses).toContain(VerbTense.PAST);
    });
  });
});
