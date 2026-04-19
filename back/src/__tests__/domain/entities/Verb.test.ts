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
    it('when ichidan present polite affirmative, then returns kanji and hiragana variants', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.acceptableAnswers({
        kind: 'indicative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toEqual(['食べます', 'たべます']);
    });

    it('when ichidan present negative polite, then returns kanji and hiragana variants', () => {
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
      expect(result).toEqual(['食べません', '食べないです', 'たべません', 'たべないです']);
    });

    it('when ichidan past negative polite, then returns kanji and hiragana variants', () => {
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
      expect(result).toEqual([
        '食べませんでした',
        '食べなかったです',
        'たべませんでした',
        'たべなかったです',
      ]);
    });

    it('when godan present polite affirmative, then returns kanji and hiragana variants', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.acceptableAnswers({
        kind: 'indicative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toEqual(['飲みます', 'のみます']);
    });

    it('when godan present negative polite, then returns kanji and hiragana variants', () => {
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
      expect(result).toEqual(['飲みません', '飲まないです', 'のみません', 'のまないです']);
    });

    it('when godan past negative polite, then returns kanji and hiragana variants', () => {
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
      expect(result).toEqual([
        '飲みませんでした',
        '飲まなかったです',
        'のみませんでした',
        'のまなかったです',
      ]);
    });

    it('when ichidan present plain, then returns kanji and hiragana', () => {
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
      expect(result).toEqual(['食べる', 'たべる']);
    });

    it('when する present polite, then returns single answer without duplicate', () => {
      // Given
      const verb = new Verb('する', 'する', 'irregular', 'faire');

      // When
      const result = verb.acceptableAnswers({
        kind: 'indicative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toEqual(['します']);
    });

    it('when くる present polite, then returns single answer without duplicate', () => {
      // Given
      const verb = new Verb('くる', 'くる', 'irregular', 'venir');

      // When
      const result = verb.acceptableAnswers({
        kind: 'indicative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toEqual(['きます']);
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

  describe('conjugate() forme potentielle', () => {
    it('when ichidan 食べる potential present plain, then returns 食べられる', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({
        kind: 'potential',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('食べられる');
    });

    it('when ichidan 食べる potential present polite, then returns 食べられます', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({
        kind: 'potential',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toBe('食べられます');
    });

    it('when ichidan 食べる potential present negative plain, then returns 食べられない', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({
        kind: 'potential',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('食べられない');
    });

    it('when ichidan 食べる potential past plain, then returns 食べられた', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({
        kind: 'potential',
        tense: VerbTense.PAST,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('食べられた');
    });

    it('when godan 飲む potential present plain, then returns 飲める', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({
        kind: 'potential',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('飲める');
    });

    it('when godan 書く potential present plain, then returns 書ける', () => {
      // Given
      const verb = new Verb('書く', 'かく', 'godan', 'écrire');

      // When
      const result = verb.conjugate({
        kind: 'potential',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('書ける');
    });

    it('when godan 飲む potential past negative plain, then returns 飲めなかった', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({
        kind: 'potential',
        tense: VerbTense.PAST,
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('飲めなかった');
    });

    it('when する potential present plain, then returns できる', () => {
      // Given
      const verb = new Verb('する', 'する', 'irregular', 'faire');

      // When
      const result = verb.conjugate({
        kind: 'potential',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('できる');
    });

    it('when する potential past plain, then returns できた', () => {
      // Given
      const verb = new Verb('する', 'する', 'irregular', 'faire');

      // When
      const result = verb.conjugate({
        kind: 'potential',
        tense: VerbTense.PAST,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('できた');
    });

    it('when くる potential present plain, then returns こられる', () => {
      // Given
      const verb = new Verb('くる', 'くる', 'irregular', 'venir');

      // When
      const result = verb.conjugate({
        kind: 'potential',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('こられる');
    });
  });

  describe('conjugate() forme passive', () => {
    it('when ichidan 食べる passive present plain, then returns 食べられる', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({
        kind: 'passive',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('食べられる');
    });

    it('when ichidan 食べる passive present polite, then returns 食べられます', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({
        kind: 'passive',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toBe('食べられます');
    });

    it('when ichidan 食べる passive past negative plain, then returns 食べられなかった', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({
        kind: 'passive',
        tense: VerbTense.PAST,
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('食べられなかった');
    });

    it('when godan 飲む passive present plain, then returns 飲まれる', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({
        kind: 'passive',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('飲まれる');
    });

    it('when godan 書く passive present plain, then returns 書かれる', () => {
      // Given
      const verb = new Verb('書く', 'かく', 'godan', 'écrire');

      // When
      const result = verb.conjugate({
        kind: 'passive',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('書かれる');
    });

    it('when godan 飲む passive past polite, then returns 飲まれました', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({
        kind: 'passive',
        tense: VerbTense.PAST,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toBe('飲まれました');
    });

    it('when する passive present plain, then returns される', () => {
      // Given
      const verb = new Verb('する', 'する', 'irregular', 'faire');

      // When
      const result = verb.conjugate({
        kind: 'passive',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('される');
    });

    it('when する passive past plain, then returns された', () => {
      // Given
      const verb = new Verb('する', 'する', 'irregular', 'faire');

      // When
      const result = verb.conjugate({
        kind: 'passive',
        tense: VerbTense.PAST,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('された');
    });

    it('when くる passive present plain, then returns こられる', () => {
      // Given
      const verb = new Verb('くる', 'くる', 'irregular', 'venir');

      // When
      const result = verb.conjugate({
        kind: 'passive',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('こられる');
    });
  });

  describe('conjugate() forme causative', () => {
    it('when ichidan 食べる causative present plain, then returns 食べさせる', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({
        kind: 'causative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('食べさせる');
    });

    it('when ichidan 食べる causative present polite, then returns 食べさせます', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({
        kind: 'causative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toBe('食べさせます');
    });

    it('when ichidan 食べる causative past negative plain, then returns 食べさせなかった', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({
        kind: 'causative',
        tense: VerbTense.PAST,
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('食べさせなかった');
    });

    it('when godan 飲む causative present plain, then returns 飲ませる', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({
        kind: 'causative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('飲ませる');
    });

    it('when godan 書く causative present plain, then returns 書かせる', () => {
      // Given
      const verb = new Verb('書く', 'かく', 'godan', 'écrire');

      // When
      const result = verb.conjugate({
        kind: 'causative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('書かせる');
    });

    it('when する causative present plain, then returns させる', () => {
      // Given
      const verb = new Verb('する', 'する', 'irregular', 'faire');

      // When
      const result = verb.conjugate({
        kind: 'causative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('させる');
    });

    it('when くる causative present plain, then returns こさせる', () => {
      // Given
      const verb = new Verb('くる', 'くる', 'irregular', 'venir');

      // When
      const result = verb.conjugate({
        kind: 'causative',
        tense: VerbTense.PRESENT,
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('こさせる');
    });
  });

  describe('conjugate() forme impérative', () => {
    it('when ichidan 食べる imperative plain affirmative, then returns 食べろ', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({
        kind: 'imperative',
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('食べろ');
    });

    it('when ichidan 食べる imperative plain negative, then returns 食べるな', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({
        kind: 'imperative',
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('食べるな');
    });

    it('when ichidan 食べる imperative polite affirmative, then returns 食べてください', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({
        kind: 'imperative',
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toBe('食べてください');
    });

    it('when ichidan 食べる imperative polite negative, then returns 食べないでください', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({
        kind: 'imperative',
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toBe('食べないでください');
    });

    it('when godan 飲む imperative plain affirmative, then returns 飲め', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({
        kind: 'imperative',
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('飲め');
    });

    it('when godan 飲む imperative plain negative, then returns 飲むな', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({
        kind: 'imperative',
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('飲むな');
    });

    it('when godan 書く imperative plain affirmative, then returns 書け', () => {
      // Given
      const verb = new Verb('書く', 'かく', 'godan', 'écrire');

      // When
      const result = verb.conjugate({
        kind: 'imperative',
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('書け');
    });

    it('when godan 飲む imperative polite affirmative, then returns 飲んでください', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({
        kind: 'imperative',
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toBe('飲んでください');
    });

    it('when godan 飲む imperative polite negative, then returns 飲まないでください', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({
        kind: 'imperative',
        polarity: VerbPolarity.NEGATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toBe('飲まないでください');
    });

    it('when する imperative plain affirmative, then returns しろ', () => {
      // Given
      const verb = new Verb('する', 'する', 'irregular', 'faire');

      // When
      const result = verb.conjugate({
        kind: 'imperative',
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('しろ');
    });

    it('when する imperative polite affirmative, then returns してください', () => {
      // Given
      const verb = new Verb('する', 'する', 'irregular', 'faire');

      // When
      const result = verb.conjugate({
        kind: 'imperative',
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toBe('してください');
    });

    it('when くる imperative plain affirmative, then returns こい', () => {
      // Given
      const verb = new Verb('くる', 'くる', 'irregular', 'venir');

      // When
      const result = verb.conjugate({
        kind: 'imperative',
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.PLAIN,
      });

      // Then
      expect(result).toBe('こい');
    });

    it('when くる imperative polite affirmative, then returns きてください', () => {
      // Given
      const verb = new Verb('くる', 'くる', 'irregular', 'venir');

      // When
      const result = verb.conjugate({
        kind: 'imperative',
        polarity: VerbPolarity.AFFIRMATIVE,
        register: VerbRegister.POLITE,
      });

      // Then
      expect(result).toBe('きてください');
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

  describe('conjugate() conditionnelle en たら', () => {
    it('when ichidan 食べる tara affirmative, then returns 食べたら', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({ kind: 'tara', polarity: VerbPolarity.AFFIRMATIVE });

      // Then
      expect(result).toBe('食べたら');
    });

    it('when ichidan 食べる tara negative, then returns 食べなかったら', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({ kind: 'tara', polarity: VerbPolarity.NEGATIVE });

      // Then
      expect(result).toBe('食べなかったら');
    });

    it('when godan 飲む tara affirmative, then returns 飲んだら', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({ kind: 'tara', polarity: VerbPolarity.AFFIRMATIVE });

      // Then
      expect(result).toBe('飲んだら');
    });

    it('when godan 飲む tara negative, then returns 飲まなかったら', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({ kind: 'tara', polarity: VerbPolarity.NEGATIVE });

      // Then
      expect(result).toBe('飲まなかったら');
    });

    it('when godan 書く tara affirmative, then returns 書いたら', () => {
      // Given
      const verb = new Verb('書く', 'かく', 'godan', 'écrire');

      // When
      const result = verb.conjugate({ kind: 'tara', polarity: VerbPolarity.AFFIRMATIVE });

      // Then
      expect(result).toBe('書いたら');
    });

    it('when する tara affirmative, then returns したら', () => {
      // Given
      const verb = new Verb('する', 'する', 'irregular', 'faire');

      // When
      const result = verb.conjugate({ kind: 'tara', polarity: VerbPolarity.AFFIRMATIVE });

      // Then
      expect(result).toBe('したら');
    });

    it('when くる tara affirmative, then returns きたら', () => {
      // Given
      const verb = new Verb('くる', 'くる', 'irregular', 'venir');

      // When
      const result = verb.conjugate({ kind: 'tara', polarity: VerbPolarity.AFFIRMATIVE });

      // Then
      expect(result).toBe('きたら');
    });
  });

  describe('conjugate() conditionnelle en ば', () => {
    it('when ichidan 食べる ba affirmative, then returns 食べれば', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({ kind: 'ba', polarity: VerbPolarity.AFFIRMATIVE });

      // Then
      expect(result).toBe('食べれば');
    });

    it('when ichidan 食べる ba negative, then returns 食べなければ', () => {
      // Given
      const verb = new Verb('食べる', 'たべる', 'ichidan', 'manger');

      // When
      const result = verb.conjugate({ kind: 'ba', polarity: VerbPolarity.NEGATIVE });

      // Then
      expect(result).toBe('食べなければ');
    });

    it('when godan 飲む ba affirmative, then returns 飲めば', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({ kind: 'ba', polarity: VerbPolarity.AFFIRMATIVE });

      // Then
      expect(result).toBe('飲めば');
    });

    it('when godan 飲む ba negative, then returns 飲まなければ', () => {
      // Given
      const verb = new Verb('飲む', 'のむ', 'godan', 'boire');

      // When
      const result = verb.conjugate({ kind: 'ba', polarity: VerbPolarity.NEGATIVE });

      // Then
      expect(result).toBe('飲まなければ');
    });

    it('when godan 書く ba affirmative, then returns 書けば', () => {
      // Given
      const verb = new Verb('書く', 'かく', 'godan', 'écrire');

      // When
      const result = verb.conjugate({ kind: 'ba', polarity: VerbPolarity.AFFIRMATIVE });

      // Then
      expect(result).toBe('書けば');
    });

    it('when する ba affirmative, then returns すれば', () => {
      // Given
      const verb = new Verb('する', 'する', 'irregular', 'faire');

      // When
      const result = verb.conjugate({ kind: 'ba', polarity: VerbPolarity.AFFIRMATIVE });

      // Then
      expect(result).toBe('すれば');
    });

    it('when する ba negative, then returns しなければ', () => {
      // Given
      const verb = new Verb('する', 'する', 'irregular', 'faire');

      // When
      const result = verb.conjugate({ kind: 'ba', polarity: VerbPolarity.NEGATIVE });

      // Then
      expect(result).toBe('しなければ');
    });

    it('when くる ba affirmative, then returns くれば', () => {
      // Given
      const verb = new Verb('くる', 'くる', 'irregular', 'venir');

      // When
      const result = verb.conjugate({ kind: 'ba', polarity: VerbPolarity.AFFIRMATIVE });

      // Then
      expect(result).toBe('くれば');
    });
  });
});
