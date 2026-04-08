import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import NumberRevisionPage from './NumberRevisionPage';
import HourRevisionPage from './HourRevisionPage';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="nav">
        <Link to="/">Accueil</Link>
        <Link to="/revision">Révision de nombres</Link>
        <Link to="/hour">Révision d&apos;heures</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/revision" element={<NumberRevisionPage />} />
        <Route path="/hour" element={<HourRevisionPage />} />
      </Routes>
    </BrowserRouter>
  );
}
