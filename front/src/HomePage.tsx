import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="container">
      <h1>Bienvenue</h1>
      <div className="summary">
        <h2>Sommaire</h2>
        <ul>
          <li>
            <Link to="/revision">Révision de nombres</Link>
          </li>
          <li>
            <Link to="/hour">Révision d&apos;heures</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
