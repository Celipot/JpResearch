import { describe, it, expect } from 'vitest';
import { Verb } from '../../../domain/entities/verb/Verb';
import { VerbTense } from '../../../domain/entities/verb/VerbTense';
import { VerbPolarity } from '../../../domain/entities/verb/VerbPolarity';
import { VerbRegister } from '../../../domain/entities/verb/VerbRegister';

describe('Verb', () => {
  describe('conjugate() ichidan', () => {
    it('when conjugating 食べる present plain, then returns 食べる', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('食べる');
    });

    it('when conjugating 食べる present polite, then returns 食べます', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toBe('食べます');
    });

    it('when conjugating 食べる present negative plain, then returns 食べない', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('食べない');
    });

    it('when conjugating 食べる present negative polite, then returns 食べません', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toBe('食べません');
    });

    it('when conjugating 食べる past plain, then returns 食べた', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PAST,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('食べた');
    });

    it('when conjugating 食べる past polite, then returns 食べました', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PAST,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toBe('食べました');
    });

    it('when conjugating 食べる past negative plain, then returns 食べなかった', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PAST,
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('食べなかった');
    });

    it('when conjugating 食べる past negative polite, then returns 食べませんでした', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PAST,
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toBe('食べませんでした');
    });
  });

  describe('conjugate() godan', () => {
    it('when conjugating 飲む present plain, then returns 飲む', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('飲む');
    });

    it('when conjugating 飲む present polite, then returns 飲みます', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toBe('飲みます');
    });

    it('when conjugating 飲む present negative plain, then returns 飲まない', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('飲まない');
    });

    it('when conjugating 飲む present negative polite, then returns 飲みません', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toBe('飲みません');
    });

    it('when conjugating 飲む past plain, then returns 飲んだ', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PAST,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('飲んだ');
    });

    it('when conjugating 飲む past polite, then returns 飲みました', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PAST,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toBe('飲みました');
    });

    it('when conjugating 飲む past negative plain, then returns 飲まなかった', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PAST,
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('飲まなかった');
    });

    it('when conjugating 飲む past negative polite, then returns 飲みませんでした', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PAST,
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toBe('飲みませんでした');
    });

    it('when conjugating 書く past plain, then returns 書いた', () => {
      // Given
      const verb = new Verb('書く', 'かく', 'godan', 'écrire');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PAST,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('書いた');
    });

    it('when conjugating 話す present polite, then returns 話します', () => {
      // Given
      const verb = new Verb('話す', 'はなす', 'godan', 'parler');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toBe('話します');
    });

    it('when conjugating 待つ present negative plain, then returns 待たない', () => {
      // Given
      const verb = new Verb('待つ', 'まつ', 'godan', 'attendre');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('待たない');
    });

    it('when conjugating 泳ぐ past plain, then returns 泳いだ', () => {
      // Given
      const verb = new Verb('泳ぐ', 'およぐ', 'godan', 'nager');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PAST,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('泳いだ');
    });

    it('when conjugating 買う past plain, then returns 買った', () => {
      // Given
      const verb = new Verb('買う', 'かう', 'godan', 'acheter');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PAST,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('買った');
    });
  });

  describe('conjugate() irregular', () => {
    it('when conjugating する present polite, then returns します', () => {
      // Given
      const verb = new Verb('する', 'する', 'irregular', 'faire');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toBe('します');
    });

    it('when conjugating する present negative plain, then returns しない', () => {
      // Given
      const verb = new Verb('する', 'する', 'irregular', 'faire');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('しない');
    });

    it('when conjugating する past plain, then returns した', () => {
      // Given
      const verb = new Verb('する', 'する', 'irregular', 'faire');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PAST,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('した');
    });

    it('when conjugating する past negative polite, then returns しませんでした', () => {
      // Given
      const verb = new Verb('する', 'する', 'irregular', 'faire');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PAST,
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toBe('しませんでした');
    });

    it('when conjugating くる present polite, then returns きます', () => {
      // Given
      const verb = new Verb('くる', 'くる', 'irregular', 'venir');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toBe('きます');
    });

    it('when conjugating くる present negative plain, then returns こない', () => {
      // Given
      const verb = new Verb('くる', 'くる', 'irregular', 'venir');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('こない');
    });

    it('when conjugating くる past plain, then returns きた', () => {
      // Given
      const verb = new Verb('くる', 'くる', 'irregular', 'venir');

      // When
      const result = verb.conjugate({
        kind: 'indicative',
        tense: VerbTense.PAST,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('きた');
    });
  });

  describe('acceptableAnswers()', () => {
    it('when ichidan present negative polite, then returns 食べません and 食べないです', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.acceptableAnswers({
        kind: 'indicative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toEqual(['食べません', '食べないです']);
    });

    it('when ichidan past negative polite, then returns 食べませんでした and 食べなかったです', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.acceptableAnswers({
        kind: 'indicative',
        tense: VerbTense.PAST,
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toEqual(['食べませんでした', '食べなかったです']);
    });

    it('when godan present negative polite, then returns 飲みません and 飲まないです', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.acceptableAnswers({
        kind: 'indicative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toEqual(['飲みません', '飲まないです']);
    });

    it('when godan past negative polite, then returns 飲みませんでした and 飲まなかったです', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.acceptableAnswers({
        kind: 'indicative',
        tense: VerbTense.PAST,
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toEqual(['飲みませんでした', '飲まなかったです']);
    });

    it('when present plain, then returns single answer', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.acceptableAnswers({
        kind: 'indicative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toEqual(['食べる']);
    });
  });

  describe('conjugate() forme en て', () => {
    it('when ichidan te affirmative, then returns 食べて', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({ kind: 'te', polarity: VerbPolarity.AFFIRMATIVE });

      // Then
      expect(result).toBe('食べて');
    });

    it('when ichidan te negative, then returns 食べなくて', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({ kind: 'te', polarity: VerbPolarity.NEGATIVE });

      // Then
      expect(result).toBe('食べなくて');
    });

    it('when godan む te affirmative, then returns 飲んで', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({ kind: 'te', polarity: VerbPolarity.AFFIRMATIVE });

      // Then
      expect(result).toBe('飲んで');
    });

    it('when godan む te negative, then returns 飲まなくて', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({ kind: 'te', polarity: VerbPolarity.NEGATIVE });

      // Then
      expect(result).toBe('飲まなくて');
    });

    it('when godan く te affirmative, then returns 書いて', () => {
      // Given
      const verb = new Verb('書く', 'かく', 'godan', 'écrire');

      // When
      const result = verb.conjugate({ kind: 'te', polarity: VerbPolarity.AFFIRMATIVE });

      // Then
      expect(result).toBe('書いて');
    });

    it('when godan す te affirmative, then returns 話して', () => {
      // Given
      const verb = new Verb('話す', 'はなす', 'godan', 'parler');

      // When
      const result = verb.conjugate({ kind: 'te', polarity: VerbPolarity.AFFIRMATIVE });

      // Then
      expect(result).toBe('話して');
    });

    it('when する te affirmative, then returns して', () => {
      // Given
      const verb = new Verb('する', 'する', 'irregular', 'faire');

      // When
      const result = verb.conjugate({ kind: 'te', polarity: VerbPolarity.AFFIRMATIVE });

      // Then
      expect(result).toBe('して');
    });

    it('when する te negative, then returns しなくて', () => {
      // Given
      const verb = new Verb('する', 'する', 'irregular', 'faire');

      // When
      const result = verb.conjugate({ kind: 'te', polarity: VerbPolarity.NEGATIVE });

      // Then
      expect(result).toBe('しなくて');
    });

    it('when くる te affirmative, then returns きて', () => {
      // Given
      const verb = new Verb('くる', 'くる', 'irregular', 'venir');

      // When
      const result = verb.conjugate({ kind: 'te', polarity: VerbPolarity.AFFIRMATIVE });

      // Then
      expect(result).toBe('きて');
    });
  });

  describe('conjugate() forme volitionnelle', () => {
    it('when ichidan volitional plain, then returns 食べよう', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({ kind: 'volitional', register: VerbRegister.PLAIN });

      // Then
      expect(result).toBe('食べよう');
    });

    it('when ichidan volitional polite, then returns 食べましょう', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({ kind: 'volitional', register: VerbRegister.POLITE });

      // Then
      expect(result).toBe('食べましょう');
    });

    it('when godan む volitional plain, then returns 飲もう', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({ kind: 'volitional', register: VerbRegister.PLAIN });

      // Then
      expect(result).toBe('飲もう');
    });

    it('when godan む volitional polite, then returns 飲みましょう', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({ kind: 'volitional', register: VerbRegister.POLITE });

      // Then
      expect(result).toBe('飲みましょう');
    });

    it('when する volitional plain, then returns しよう', () => {
      // Given
      const verb = new Verb('する', 'する', 'irregular', 'faire');

      // When
      const result = verb.conjugate({ kind: 'volitional', register: VerbRegister.PLAIN });

      // Then
      expect(result).toBe('しよう');
    });

    it('when する volitional polite, then returns しましょう', () => {
      // Given
      const verb = new Verb('する', 'する', 'irregular', 'faire');

      // When
      const result = verb.conjugate({ kind: 'volitional', register: VerbRegister.POLITE });

      // Then
      expect(result).toBe('しましょう');
    });

    it('when くる volitional plain, then returns こよう', () => {
      // Given
      const verb = new Verb('くる', 'くる', 'irregular', 'venir');

      // When
      const result = verb.conjugate({ kind: 'volitional', register: VerbRegister.PLAIN });

      // Then
      expect(result).toBe('こよう');
    });
  });
});
