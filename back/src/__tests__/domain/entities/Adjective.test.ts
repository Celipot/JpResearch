import { describe, it, expect } from 'vitest';
import { Adjective } from '../../../domain/entities/Adjective';

describe('Adjective', () => {
  describe('conjugate()', () => {
    it('when conjugating たかい to present_affirmative, then returns たかい', () => {
      const adj = new Adjective('たかい', 'i', 'high/expensive');
      const result = adj.conjugate('present_affirmative');
      expect(result).toBe('たかい');
    });

    it('when conjugating たかい to present_negative, then returns たかくない', () => {
      const adj = new Adjective('たかい', 'i', 'high/expensive');
      const result = adj.conjugate('present_negative');
      expect(result).toBe('たかくない');
    });

    it('when conjugating special いい to present_negative, then returns よくない', () => {
      const adj = new Adjective('いい', 'i', 'good');
      const result = adj.conjugate('present_negative');
      expect(result).toBe('よくない');
    });

    it('when conjugating きれい to present_affirmative, then returns きれいだ', () => {
      const adj = new Adjective('きれい', 'na', 'clean/pretty');
      const result = adj.conjugate('present_affirmative');
      expect(result).toBe('きれいだ');
    });

    it('when conjugating きれい to present_negative, then returns きれいじゃない', () => {
      const adj = new Adjective('きれい', 'na', 'clean/pretty');
      const result = adj.conjugate('present_negative');
      expect(result).toBe('きれいじゃない');
    });

    it('when conjugating multiple i-adjectives, then all conjugate correctly', () => {
      const delicious = new Adjective('おいしい', 'i', 'delicious');
      const difficult = new Adjective('むずかしい', 'i', 'difficult');

      expect(delicious.conjugate('present_negative')).toBe('おいしくない');
      expect(difficult.conjugate('present_affirmative')).toBe('むずかしい');
    });

    it('when conjugating multiple na-adjectives, then all conjugate correctly', () => {
      const quiet = new Adjective('しずか', 'na', 'quiet');
      const energetic = new Adjective('げんき', 'na', 'energetic');

      expect(quiet.conjugate('present_affirmative')).toBe('しずかだ');
      expect(energetic.conjugate('present_negative')).toBe('げんきじゃない');
    });
  });
});
