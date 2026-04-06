import { useState } from 'react';

interface RandomResult {
  nombre: number;
  hiragana: string;
  romaji: string;
}

export default function App() {
  const [result, setResult] = useState<RandomResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPronunciation, setShowPronunciation] = useState(false);

  const fetchRandom = async () => {
    setLoading(true);
    setShowPronunciation(false);
    try {
      const res = await fetch('/api/random');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Random Number Generator</h1>
      <button onClick={fetchRandom} disabled={loading}>
        {loading ? 'Chargement...' : 'Générer un nombre aléatoire'}
      </button>
      {result !== null && (
        <div className="result">
          <p className="number">{result.nombre}</p>
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
            </div>
          )}
        </div>
      )}
    </div>
  );
}
