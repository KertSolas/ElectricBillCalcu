import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalculatorPage from './pages/CalculatorPage';
import HistoryPage from './pages/HistoryPage';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<CalculatorPage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  </Router>
);

export default App;
