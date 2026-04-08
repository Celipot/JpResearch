import { useState, useCallback } from 'react';

interface Pronunciation {
  hiragana: string;
  romaji: string;
  isStandard: boolean;
}

interface RandomResult {
  number: number;
  hiragana: string;
  romaji: string;
  allPronunciations: Pronunciation[];
}

type Mode = 'jp-to-fr' | 'fr-to-jp';

export default function NumberRevisionPage() {
  const [mode, setMode] = useState<Mode>('jp-to-fr');
  const [result, setResult] = useState<RandomResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [spokenHiragana, setSpokenHiragana] = useState<string | null>(null);
  const [showPronunciation, setShowPronunciation] = useState(false);
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(99999999);

  const speak = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.lang = 'ja-JP';
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }, []);

  const fetchNumber = async () => {
    setLoading(true);
    setFeedback(null);
    setUserAnswer('');
    setSpokenHiragana(null);
    setShowPronunciation(false);
    try {
      const res = await fetch(`/api/random?min=${minValue}&max=${maxValue}`);
      const data = await res.json();
      setResult(data);

      if (mode === 'jp-to-fr') {
        const randomIndex = Math.floor(Math.random() * data.allPronunciations.length);
        const spoken = data.allPronunciations[randomIndex];
        setSpokenHiragana(spoken.hiragana);
        speak(spoken.hiragana);
      }
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReplay = () => {
    if (spokenHiragana) {
      speak(spokenHiragana);
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

  const checkAnswer = () => {
    if (!result || !userAnswer.trim()) return;

    if (mode === 'fr-to-jp') {
      const normalizedUserAnswer = normalizeRomaji(userAnswer.trim());
      const validAnswers = result.allPronunciations.flatMap((p) => [
        p.hiragana.toLowerCase().replace(/\s+/g, ''),
        normalizeRomaji(p.romaji),
      ]);
      setFeedback(validAnswers.includes(normalizedUserAnswer) ? 'correct' : 'incorrect');
    } else {
      const userNumber = parseInt(userAnswer.trim(), 10);
      setFeedback(userNumber === result.number ? 'correct' : 'incorrect');
    }
  };

  const getCorrectAnswers = (): string => {
    if (!result) return '';
    return result.allPronunciations.map((p) => `${p.hiragana} / ${p.romaji}`).join(' ou ');
  };

  return (
    <div className="container">
      <h1>Révision de Nombres</h1>

      <div className="mode-selector">
        <button
          className={mode === 'jp-to-fr' ? 'mode-btn active' : 'mode-btn'}
          onClick={() => {
            setMode('jp-to-fr');
            setResult(null);
            setFeedback(null);
          }}
        >
          🇯🇵 → 🇫🇷 Japonais → Français
        </button>
        <button
          className={mode === 'fr-to-jp' ? 'mode-btn active' : 'mode-btn'}
          onClick={() => {
            setMode('fr-to-jp');
            setResult(null);
            setFeedback(null);
          }}
        >
          🇫🇷 → 🇯🇵 Français → Japonais
        </button>
      </div>

      <div className="range-selector">
        <label>Plage: </label>
        <div className="range-inputs">
          <input
            type="number"
            min="1"
            max="99999999"
            value={minValue}
            onChange={(e) => {
              const newMin = Math.max(1, Math.min(99999999, parseInt(e.target.value, 10) || 1));
              setMinValue(newMin);
              if (newMin > maxValue) {
                setMaxValue(newMin);
              }
            }}
            placeholder="Min"
          />
          <span> - </span>
          <input
            type="number"
            min="1"
            max="99999999"
            value={maxValue}
            onChange={(e) => {
              const newMax = Math.max(
                1,
                Math.min(99999999, parseInt(e.target.value, 10) || 99999999)
              );
              setMaxValue(newMax);
              if (newMax < minValue) {
                setMinValue(newMax);
              }
            }}
            placeholder="Max"
          />
        </div>
      </div>

      <button onClick={fetchNumber} disabled={loading}>
        {loading ? 'Chargement...' : 'Nouveau nombre'}
      </button>

      {result !== null && (
        <div className="revision-section">
          {mode === 'jp-to-fr' ? (
            <>
              <div className="audio-section">
                <button className="speak-btn" onClick={handleReplay}>
                  🔊 Réécouter
                </button>
              </div>
              <div className="answer-section">
                <label htmlFor="answer">Quel nombre est-ce ? (en chiffres)</label>
                <input
                  id="answer"
                  type="number"
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
                  placeholder="Ex: 42"
                />
                <button className="check-btn" onClick={checkAnswer} disabled={!userAnswer.trim()}>
                  Vérifier
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="number">{result.number}</p>
              <div className="answer-section">
                <label htmlFor="answer">Écrivez en hiragana ou romaji :</label>
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
                  placeholder="Ex: よんじゅうに / yonjuuni"
                />
                <button className="check-btn" onClick={checkAnswer} disabled={!userAnswer.trim()}>
                  Vérifier
                </button>
              </div>
            </>
          )}

          {feedback === 'correct' && (
            <div className="feedback correct">
              ✓ Correct !{mode === 'jp-to-fr' && <> C'était bien {result.number}.</>}
            </div>
          )}

          {feedback === 'incorrect' && (
            <div className="feedback incorrect">
              ✗ Incorrect.
              {mode === 'jp-to-fr' ? (
                <> La réponse était {result.number}.</>
              ) : (
                <> La réponse était : {getCorrectAnswers()}.</>
              )}
            </div>
          )}

          {feedback !== null && (
            <>
              <button
                className="toggle-btn"
                onClick={() => setShowPronunciation(!showPronunciation)}
              >
                {showPronunciation ? 'Cacher les prononciations' : 'Afficher les prononciations'}
              </button>

              {showPronunciation && (
                <div className="pronunciation">
                  {result.allPronunciations.map((p, index) => (
                    <div key={index} className="pronunciation-card">
                      <span className={p.isStandard ? 'badge-standard' : 'badge-alt'}>
                        {p.isStandard ? 'Standard' : 'Alternative'}
                      </span>
                      <p className="hiragana">{p.hiragana}</p>
                      <p className="romaji">{p.romaji}</p>
                      <button className="speak-btn" onClick={() => speak(p.hiragana)}>
                        Écouter
                      </button>
                    </div>
                  ))}
                  <span className="tooltip-wrapper">
                    <span className="tooltip-icon">?</span>
                    <span className="tooltip-text">
                      Si le son ne fonctionne pas, ajoutez la langue japonaise dans les paramètres
                      de votre PC (Paramètres → Heure et langue → Japonais).
                    </span>
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
