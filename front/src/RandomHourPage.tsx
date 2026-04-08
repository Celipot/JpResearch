import { useState } from 'react';

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

export default function RandomHourPage() {
  const [result, setResult] = useState<HourResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPronunciation, setShowPronunciation] = useState(false);

  const fetchRandom = async () => {
    setLoading(true);
    setShowPronunciation(false);
    try {
      const res = await fetch('/api/random-hour');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.lang = 'ja-JP';
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="container">
      <h1>Random Hour Generator</h1>
      <button onClick={fetchRandom} disabled={loading}>
        {loading ? 'Chargement...' : 'Générer une heure aléatoire'}
      </button>
      {result !== null && (
        <div className="result">
          <p className="number">{result.hour}h{result.minute < 10 ? '0' : ''}{result.minute}</p>
          <button
            className="toggle-btn"
            onClick={() => setShowPronunciation(!showPronunciation)}
          >
            {showPronunciation ? 'Cacher la prononciation' : 'Afficher la prononciation'}
          </button>
          {showPronunciation && (
            <div className="pronunciation">
              {result.allPronunciations.map((p) => (
                <div key={p.hiragana} className="pronunciation-card">
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
                <span className="tooltip-text">Si le son ne fonctionne pas, ajoutez la langue japonaise dans les paramètres de votre PC (Paramètres → Heure et langue → Japonais).</span>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
