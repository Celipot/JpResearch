import { describe, it, expect } from 'vitest';
import { Nombre } from '../domain/entities/Nombre';

describe('Nombre', () => {
  describe('constructor', () => {
    it('given a number, then stores the value and its hiragana pronunciation', () => {
      const nombre = new Nombre(42);

      expect(nombre.valeur).toBe(42);
      expect(nombre.hiragana).toBe('よんじゅうに');
    });
  });

  describe('single digits', () => {
    it('given 1, then returns いち', () => {
      expect(new Nombre(1).hiragana).toBe('いち');
    });

    it('given 5, then returns ご', () => {
      expect(new Nombre(5).hiragana).toBe('ご');
    });

    it('given 9, then returns きゅう', () => {
      expect(new Nombre(9).hiragana).toBe('きゅう');
    });
  });

  describe('tens', () => {
    it('given 10, then returns じゅう', () => {
      expect(new Nombre(10).hiragana).toBe('じゅう');
    });

    it('given 30, then returns さんじゅう', () => {
      expect(new Nombre(30).hiragana).toBe('さんじゅう');
    });
  });

  describe('hundreds', () => {
    it('given 100, then returns ひゃく', () => {
      expect(new Nombre(100).hiragana).toBe('ひゃく');
    });

    it('given 300, then returns さんびゃく (rendaku)', () => {
      expect(new Nombre(300).hiragana).toBe('さんびゃく');
    });

    it('given 600, then returns ろっぴゃく (sokuon)', () => {
      expect(new Nombre(600).hiragana).toBe('ろっぴゃく');
    });

    it('given 800, then returns はっぴゃく (sokuon)', () => {
      expect(new Nombre(800).hiragana).toBe('はっぴゃく');
    });
  });

  describe('thousands', () => {
    it('given 1000, then returns せん', () => {
      expect(new Nombre(1000).hiragana).toBe('せん');
    });

    it('given 3000, then returns さんぜん (dakuon)', () => {
      expect(new Nombre(3000).hiragana).toBe('さんぜん');
    });

    it('given 8000, then returns はっせん (sokuon)', () => {
      expect(new Nombre(8000).hiragana).toBe('はっせん');
    });
  });

  describe('complex numbers', () => {
    it('given 9999, then returns きゅうせんきゅうひゃくきゅうじゅうきゅう', () => {
      expect(new Nombre(9999).hiragana).toBe('きゅうせんきゅうひゃくきゅうじゅうきゅう');
    });
  });
});
