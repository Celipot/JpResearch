import { useState, useCallback } from 'react';

interface Pronunciation {
  hiragana: string;
  romaji: string;
  isStandard: boolean;
}

interface HourResult {
  hour: number;
  minute: number;
  hiragana: string;
  romaji: string;
  allPronunciations: Pronunciation[];
}

type Mode = 'jp-to-fr' | 'fr-to-jp';

export default function HourRevisionPage() {
  const [mode, setMode] = useState<Mode>('jp-to-fr');
  const [result, setResult] = useState<HourResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [spokenHiragana, setSpokenHiragana] = useState<string | null>(null);
  const [showPronunciation, setShowPronunciation] = useState(false);

  const speak = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.lang = 'ja-JP';
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }, []);

  const fetchHour = async () => {
    setLoading(true);
    setFeedback(null);
    setUserAnswer('');
    setSpokenHiragana(null);
    setShowPronunciation(false);
    try {
      const res = await fetch('/api/random-hour');
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

  const formatTime = (hour: number, minute: number): string => {
    return `${hour}時${minute < 10 ? '0' : ''}${minute}分`;
  };

  const checkAnswer = async () => {
    if (!result || !userAnswer.trim()) return;

    if (mode === 'fr-to-jp') {
      const response = await fetch('/api/check-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userAnswer: userAnswer.trim(),
          expectedAnswers: result.allPronunciations.map((p) => p.hiragana),
        }),
      });
      const data = await response.json();
      setFeedback(data.correct ? 'correct' : 'incorrect');
    } else {
      const userTime = userAnswer.trim().toLowerCase().replace(/\s+/g, '');
      const kanjiFormat = formatTime(result.hour, result.minute).toLowerCase();
      const hFormat = `${result.hour}h${result.minute < 10 ? '0' : ''}${result.minute}`;
      setFeedback(userTime === kanjiFormat || userTime === hFormat ? 'correct' : 'incorrect');
    }
  };

  const getCorrectAnswers = (): string => {
    if (!result) return '';
    return result.allPronunciations.map((p) => `${p.hiragana} / ${p.romaji}`).join(' ou ');
  };

  return (
    <div className="container">
      <h1>Révision d&apos;heures</h1>

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

      <button onClick={fetchHour} disabled={loading}>
        {loading ? 'Chargement...' : 'Nouvelle heure'}
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
                <label htmlFor="answer">Quelle heure est-ce ? (format: XhYY)</label>
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
                  placeholder="Ex: 12h30"
                />
                <button className="check-btn" onClick={checkAnswer} disabled={!userAnswer.trim()}>
                  Vérifier
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="number">{formatTime(result.hour, result.minute)}</p>
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
                  placeholder="Ex: じゅうにじさんじゅっぷん / juunijisanjuppun"
                />
                <button className="check-btn" onClick={checkAnswer} disabled={!userAnswer.trim()}>
                  Vérifier
                </button>
              </div>
            </>
          )}

          {feedback === 'correct' && (
            <div className="feedback correct">
              ✓ Correct !
              {mode === 'jp-to-fr' && (
                <> C&apos;était bien {formatTime(result.hour, result.minute)}.</>
              )}
            </div>
          )}

          {feedback === 'incorrect' && (
            <div className="feedback incorrect">
              ✗ Incorrect.
              {mode === 'jp-to-fr' ? (
                <> La réponse était {formatTime(result.hour, result.minute)}.</>
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
