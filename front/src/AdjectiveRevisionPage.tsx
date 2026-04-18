import { useState } from 'react';

interface AdjectiveResult {
  hiragana: string;
  type: 'i' | 'na';
  translation: string;
  form: 'present_affirmative' | 'present_negative';
  answer: string;
}

const HIRAGANA_MAP: Record<string, string> = {
  あ: 'a',
  い: 'i',
  う: 'u',
  え: 'e',
  お: 'o',
  か: 'ka',
  き: 'ki',
  く: 'ku',
  け: 'ke',
  こ: 'ko',
  が: 'ga',
  ぎ: 'gi',
  ぐ: 'gu',
  げ: 'ge',
  ご: 'go',
  さ: 'sa',
  し: 'shi',
  す: 'su',
  せ: 'se',
  そ: 'so',
  ざ: 'za',
  じ: 'ji',
  ず: 'zu',
  ぜ: 'ze',
  ぞ: 'zo',
  た: 'ta',
  ち: 'chi',
  つ: 'tsu',
  て: 'te',
  と: 'to',
  だ: 'da',
  ぢ: 'di',
  づ: 'du',
  で: 'de',
  ど: 'do',
  な: 'na',
  に: 'ni',
  ぬ: 'nu',
  ね: 'ne',
  の: 'no',
  は: 'ha',
  ひ: 'hi',
  ふ: 'fu',
  へ: 'he',
  ほ: 'ho',
  ば: 'ba',
  び: 'bi',
  ぶ: 'bu',
  べ: 'be',
  ぼ: 'bo',
  ぱ: 'pa',
  ぴ: 'pi',
  ぷ: 'pu',
  ぺ: 'pe',
  ぽ: 'po',
  ま: 'ma',
  み: 'mi',
  む: 'mu',
  め: 'me',
  も: 'mo',
  や: 'ya',
  ゆ: 'yu',
  よ: 'yo',
  ら: 'ra',
  り: 'ri',
  る: 'ru',
  れ: 're',
  ろ: 'ro',
  わ: 'wa',
  ゐ: 'wi',
  ゑ: 'we',
  を: 'wo',
  ん: 'n',
  ゃ: 'ya',
  ゅ: 'yu',
  ょ: 'yo',
};

function hiraganaToRomaji(hiragana: string): string {
  let result = '';
  for (let i = 0; i < hiragana.length; i++) {
    const char = hiragana[i];
    const romaji = HIRAGANA_MAP[char];

    if (isSmallYoSound(char) && i > 0) {
      result = removeTrailingVowel(result);
    }
    result += romaji || char;
  }
  return result;
}

function isSmallYoSound(char: string): boolean {
  return char === 'ゃ' || char === 'ゅ' || char === 'ょ';
}

function removeTrailingVowel(text: string): string {
  return text.endsWith('i') ? text.slice(0, -1) : text;
}

export default function AdjectiveRevisionPage() {
  const [result, setResult] = useState<AdjectiveResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const fetchAdjective = async () => {
    setLoading(true);
    setFeedback(null);
    setUserAnswer('');
    try {
      const res = await fetch('/api/random-adjective');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const normalizeRomaji = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/ou+/g, 'o')
      .replace(/ū/g, 'uu')
      .replace(/u+/g, (m) => (m.length >= 2 ? 'uu' : m));
  };

  const getFormLabel = (form: string): string => {
    const labels: Record<string, string> = {
      present_affirmative: 'Affirmatif',
      present_negative: 'Négatif',
    };
    return labels[form] || form;
  };

  const checkAnswer = () => {
    if (!result || !userAnswer.trim()) return;

    const isCorrect = isAnswerCorrect(userAnswer.trim(), result.answer);
    setFeedback(isCorrect ? 'correct' : 'incorrect');
  };

  const isAnswerCorrect = (userAnswer: string, correctAnswer: string): boolean => {
    const normalizedUserAnswer = normalizeRomaji(userAnswer);
    const expectedHiragana = correctAnswer.toLowerCase().replace(/\s+/g, '');
    const expectedRomaji = normalizeRomaji(hiraganaToRomaji(correctAnswer));

    return normalizedUserAnswer === expectedHiragana || normalizedUserAnswer === expectedRomaji;
  };

  return (
    <div className="container">
      <h1>Révision d&apos;adjectifs</h1>

      <button onClick={fetchAdjective} disabled={loading}>
        {loading ? 'Chargement...' : 'Nouvel adjectif'}
      </button>

      {result !== null && (
        <div className="revision-section">
          <div className="adjective-display">
            <p className="adjective-hiragana">{result.hiragana}</p>
            <p className="adjective-translation">{result.translation}</p>
          </div>

          <div className="form-display">
            <p className="form-label">
              Forme : <strong>Présent {getFormLabel(result.form)}</strong>
            </p>
          </div>

          <div className="answer-section">
            <label htmlFor="answer">Conjugaison :</label>
            <input
              id="answer"
              type="text"
              value={userAnswer}
              onChange={(e) => {
                setUserAnswer(e.target.value);
                setFeedback(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  checkAnswer();
                }
              }}
              placeholder="Écrivez en hiragana ou romaji"
            />
            <button className="check-btn" onClick={checkAnswer} disabled={!userAnswer.trim()}>
              Vérifier
            </button>
          </div>

          {feedback === 'correct' && <div className="feedback correct">✓ Correct !</div>}

          {feedback === 'incorrect' && (
            <div className="feedback incorrect">
              ✗ Incorrect. La réponse était : <strong>{result.answer}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
