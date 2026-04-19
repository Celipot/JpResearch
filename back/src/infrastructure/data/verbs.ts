import { VerbType } from '../../domain/entities/verb/VerbType';

export interface VerbData {
  kanji: string;
  hiragana: string;
  type: VerbType;
  translation: string;
}

export const VERBS: VerbData[] = [
  // Ichidan
  { kanji: '食べる', hiragana: 'たべる', type: VerbType.ICHIDAN, translation: 'manger' },
  { kanji: '見る', hiragana: 'みる', type: VerbType.ICHIDAN, translation: 'voir' },
  { kanji: '起きる', hiragana: 'おきる', type: VerbType.ICHIDAN, translation: 'se lever' },
  { kanji: '寝る', hiragana: 'ねる', type: VerbType.ICHIDAN, translation: 'dormir' },
  { kanji: '着る', hiragana: 'きる', type: VerbType.ICHIDAN, translation: 'porter (vêtement)' },
  { kanji: '出る', hiragana: 'でる', type: VerbType.ICHIDAN, translation: 'sortir' },
  { kanji: '開ける', hiragana: 'あける', type: VerbType.ICHIDAN, translation: 'ouvrir' },
  { kanji: '閉める', hiragana: 'しめる', type: VerbType.ICHIDAN, translation: 'fermer' },
  { kanji: '教える', hiragana: 'おしえる', type: VerbType.ICHIDAN, translation: 'enseigner' },
  { kanji: '覚える', hiragana: 'おぼえる', type: VerbType.ICHIDAN, translation: 'mémoriser' },
  { kanji: '考える', hiragana: 'かんがえる', type: VerbType.ICHIDAN, translation: 'réfléchir' },
  { kanji: '答える', hiragana: 'こたえる', type: VerbType.ICHIDAN, translation: 'répondre' },
  { kanji: '浴びる', hiragana: 'あびる', type: VerbType.ICHIDAN, translation: 'prendre (douche)' },
  { kanji: '借りる', hiragana: 'かりる', type: VerbType.ICHIDAN, translation: 'emprunter' },

  // Godan
  { kanji: '飲む', hiragana: 'のむ', type: VerbType.GODAN, translation: 'boire' },
  { kanji: '書く', hiragana: 'かく', type: VerbType.GODAN, translation: 'écrire' },
  { kanji: '話す', hiragana: 'はなす', type: VerbType.GODAN, translation: 'parler' },
  { kanji: '聞く', hiragana: 'きく', type: VerbType.GODAN, translation: 'écouter/entendre' },
  { kanji: '読む', hiragana: 'よむ', type: VerbType.GODAN, translation: 'lire' },
  { kanji: '買う', hiragana: 'かう', type: VerbType.GODAN, translation: 'acheter' },
  { kanji: '行く', hiragana: 'いく', type: VerbType.GODAN, translation: 'aller' },
  { kanji: '帰る', hiragana: 'かえる', type: VerbType.GODAN, translation: 'rentrer' },
  { kanji: '待つ', hiragana: 'まつ', type: VerbType.GODAN, translation: 'attendre' },
  { kanji: '泳ぐ', hiragana: 'およぐ', type: VerbType.GODAN, translation: 'nager' },
  { kanji: '遊ぶ', hiragana: 'あそぶ', type: VerbType.GODAN, translation: 'jouer' },
  { kanji: '急ぐ', hiragana: 'いそぐ', type: VerbType.GODAN, translation: 'se dépêcher' },
  { kanji: '押す', hiragana: 'おす', type: VerbType.GODAN, translation: 'pousser' },
  { kanji: '貸す', hiragana: 'かす', type: VerbType.GODAN, translation: 'prêter' },
  {
    kanji: '立つ',
    hiragana: 'たつ',
    type: VerbType.GODAN,
    translation: 'se lever/se tenir debout',
  },
  { kanji: '使う', hiragana: 'つかう', type: VerbType.GODAN, translation: 'utiliser' },

  // Irregular
  { kanji: 'する', hiragana: 'する', type: VerbType.IRREGULAR, translation: 'faire' },
  { kanji: 'くる', hiragana: 'くる', type: VerbType.IRREGULAR, translation: 'venir' },
];
