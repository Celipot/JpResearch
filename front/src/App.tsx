import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import RandomNumberPage from './RandomNumberPage';
import RandomHourPage from './RandomHourPage';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="nav">
        <Link to="/">Accueil</Link>
        <Link to="/random">Nombre aléatoire</Link>
        <Link to="/hour">Heure aléatoire</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/random" element={<RandomNumberPage />} />
        <Route path="/hour" element={<RandomHourPage />} />
      </Routes>
    </BrowserRouter>
  );
}
