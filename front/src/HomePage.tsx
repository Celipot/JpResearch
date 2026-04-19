import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="container">
      <h1>Bienvenue</h1>
      <div className="summary">
        <h2>Synopsis</h2>
        <ul>
          <li>
            <Link to="/revision">Révision de nombres</Link>
          </li>
          <li>
            <Link to="/hour">Révision d&apos;heures</Link>
          </li>
          <li>
            <Link to="/date">Révision de dates</Link>
          </li>
          <li>
            <Link to="/adjective">Révision d&apos;adjectifs</Link>
          </li>
          <li>
            <Link to="/verb">Révision de verbes</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
