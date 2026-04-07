import { useState } from 'react';

interface HourResult {
  hour: number;
  minute: number;
  hiragana: string;
  romaji: string;
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

  const speak = () => {
    if (!result) return;
    const utterance = new SpeechSynthesisUtterance(result.hiragana);
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
              <p className="hiragana">{result.hiragana}</p>
              <p className="romaji">{result.romaji}</p>
              <button className="speak-btn" onClick={speak}>
                Écouter la prononciation
              </button>
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
