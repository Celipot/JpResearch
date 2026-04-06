import { useState } from 'react';

export default function App() {
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRandom = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/random');
      const data = await res.json();
      setResult(data.random);
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
        <p className="result">Résultat : {result}</p>
      )}
    </div>
  );
}
