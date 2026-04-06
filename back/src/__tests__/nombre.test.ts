import { describe, it, expect } from 'vitest';
import { Nombre } from '../domain/entities/Nombre';

describe('Nombre', () => {
  describe('constructor', () => {
    it('given a number, then stores the value, hiragana and romaji', () => {
      // Given
      const valeur = 42;

      // When
      const nombre = new Nombre(valeur);

      // Then
      expect(nombre.valeur).toBe(42);
      expect(nombre.hiragana).toBe('よんじゅうに');
      expect(nombre.romaji).toBe('yonjūni');
    });
  });

  describe('single digits', () => {
    it('given 1, then returns correct hiragana and romaji', () => {
      // Given
      const valeur = 1;

      // When
      const nombre = new Nombre(valeur);

      // Then
      expect(nombre.hiragana).toBe('いち');
      expect(nombre.romaji).toBe('ichi');
    });

    it('given 5, then returns correct hiragana and romaji', () => {
      // Given
      const valeur = 5;

      // When
      const nombre = new Nombre(valeur);

      // Then
      expect(nombre.hiragana).toBe('ご');
      expect(nombre.romaji).toBe('go');
    });

    it('given 9, then returns correct hiragana and romaji', () => {
      // Given
      const valeur = 9;

      // When
      const nombre = new Nombre(valeur);

      // Then
      expect(nombre.hiragana).toBe('きゅう');
      expect(nombre.romaji).toBe('kyū');
    });
  });

  describe('tens', () => {
    it('given 10, then returns correct hiragana and romaji', () => {
      // Given
      const valeur = 10;

      // When
      const nombre = new Nombre(valeur);

      // Then
      expect(nombre.hiragana).toBe('じゅう');
      expect(nombre.romaji).toBe('jū');
    });

    it('given 30, then returns correct hiragana and romaji', () => {
      // Given
      const valeur = 30;

      // When
      const nombre = new Nombre(valeur);

      // Then
      expect(nombre.hiragana).toBe('さんじゅう');
      expect(nombre.romaji).toBe('sanjū');
    });
  });

  describe('hundreds', () => {
    it('given 100, then returns correct hiragana and romaji', () => {
      // Given
      const valeur = 100;

      // When
      const nombre = new Nombre(valeur);

      // Then
      expect(nombre.hiragana).toBe('ひゃく');
      expect(nombre.romaji).toBe('hyaku');
    });

    it('given 300, then returns correct hiragana and romaji (rendaku)', () => {
      // Given
      const valeur = 300;

      // When
      const nombre = new Nombre(valeur);

      // Then
      expect(nombre.hiragana).toBe('さんびゃく');
      expect(nombre.romaji).toBe('sanbyaku');
    });

    it('given 600, then returns correct hiragana and romaji (sokuon)', () => {
      // Given
      const valeur = 600;

      // When
      const nombre = new Nombre(valeur);

      // Then
      expect(nombre.hiragana).toBe('ろっぴゃく');
      expect(nombre.romaji).toBe('roppyaku');
    });

    it('given 800, then returns correct hiragana and romaji (sokuon)', () => {
      // Given
      const valeur = 800;

      // When
      const nombre = new Nombre(valeur);

      // Then
      expect(nombre.hiragana).toBe('はっぴゃく');
      expect(nombre.romaji).toBe('happyaku');
    });
  });

  describe('thousands', () => {
    it('given 1000, then returns correct hiragana and romaji', () => {
      // Given
      const valeur = 1000;

      // When
      const nombre = new Nombre(valeur);

      // Then
      expect(nombre.hiragana).toBe('せん');
      expect(nombre.romaji).toBe('sen');
    });

    it('given 3000, then returns correct hiragana and romaji (dakuon)', () => {
      // Given
      const valeur = 3000;

      // When
      const nombre = new Nombre(valeur);

      // Then
      expect(nombre.hiragana).toBe('さんぜん');
      expect(nombre.romaji).toBe('sanzen');
    });

    it('given 8000, then returns correct hiragana and romaji (sokuon)', () => {
      // Given
      const valeur = 8000;

      // When
      const nombre = new Nombre(valeur);

      // Then
      expect(nombre.hiragana).toBe('はっせん');
      expect(nombre.romaji).toBe('hassen');
    });
  });

  describe('complex numbers', () => {
    it('given 9999, then returns correct hiragana and romaji', () => {
      // Given
      const valeur = 9999;

      // When
      const nombre = new Nombre(valeur);

      // Then
      expect(nombre.hiragana).toBe('きゅうせんきゅうひゃくきゅうじゅうきゅう');
      expect(nombre.romaji).toBe('kyūsenkyūhyakukyūjūkyū');
    });
  });
});
