// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './styles.css';
import HomePage from './HomePage';
import BodegasPage from './BodegasPage';
import BarDetails from './BarDetails';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('Danish'); // State to manage language

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(prevLanguage => (prevLanguage === 'Danish' ? 'English' : 'Danish'));
  };

  return (
    <Router>
      <div className="main-background min-h-screen flex flex-col items-center">
        <header className="w-full fixed top-0 left-0 flex justify-between items-center p-4 header">
          <div className="text-xl font-bold dbs-heading">De Brune Sider</div>
          <button onClick={toggleMenu} className="text-2xl hamburger">
            ☰
          </button>
        </header>

        {isMenuOpen && (
          <nav className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex flex-col items-center justify-center text-white nav-menu">
            <button onClick={toggleMenu} className="absolute top-4 right-4 text-3xl">
              ×
            </button>
            <ul className="space-y-6 text-xl">
              <li><Link to="/" onClick={toggleMenu}>Forside</Link></li>
              <li><Link to="/bodegas" onClick={toggleMenu}>Bodegas</Link></li>
              <li><button onClick={() => { toggleLanguage(); toggleMenu(); }}>{language === 'Danish' ? 'English' : 'Dansk'}</button></li>
            </ul>
          </nav>
        )}

        <main className="mt-20 w-full flex flex-col items-center">
          <Routes>
            <Route path="/" element={<HomePage language={language} />} />
            <Route path="/bodegas" element={<BodegasPage language={language} />} />
            <Route path="/bodegas/:id" element={<BarDetails language={language} />} />
          </Routes>
        </main>

        <footer className="w-full flex justify-around items-center p-4 mt-auto footer">
          <a href="#legal1">Legal</a>
          <a href="#legal2">Legal</a>
          <a href="#legal3">Legal</a>
        </footer>
      </div>
    </Router>
  );
};

export default App;
