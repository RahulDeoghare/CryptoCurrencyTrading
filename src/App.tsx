import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Markets } from './pages/Markets';
import { Trade } from './pages/Trade';
import { Portfolio } from './pages/Portfolio';
import { Analysis } from './pages/Analysis';
import { IPO } from './pages/IPO';
import { Education } from './pages/Education';
import { TradingProvider } from './context/TradingContext';

function App() {
  return (
    <TradingProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/markets" element={<Markets />} />
              <Route path="/trade" element={<Trade />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/ipo" element={<IPO />} />
              <Route path="/education" element={<Education />} />
              <Route path="/" element={<Navigate to="/markets" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TradingProvider>
  );
}

export default App;