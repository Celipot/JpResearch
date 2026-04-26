import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import NumberRevisionPage from './NumberRevisionPage';
import HourRevisionPage from './HourRevisionPage';
import DateRevisionPage from './DateRevisionPage';
import AdjectiveRevisionPage from './AdjectiveRevisionPage';
import VerbRevisionPage from './VerbRevisionPage';
import HelpPage from './HelpPage';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="nav">
        <Link to="/">Accueil</Link>
        <Link to="/revision">Révision de nombres</Link>
        <Link to="/hour">Révision d&apos;heures</Link>
        <Link to="/date">Révision de dates</Link>
        <Link to="/adjective">Révision d&apos;adjectifs</Link>
        <Link to="/verb">Révision de verbes</Link>
        <Link to="/aide">Aide</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/revision" element={<NumberRevisionPage />} />
        <Route path="/hour" element={<HourRevisionPage />} />
        <Route path="/date" element={<DateRevisionPage />} />
        <Route path="/adjective" element={<AdjectiveRevisionPage />} />
        <Route path="/verb" element={<VerbRevisionPage />} />
        <Route path="/aide" element={<HelpPage />} />
      </Routes>
    </BrowserRouter>
  );
}
