import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Docket from './pages/Docket';
import Inventory from './pages/Inventory';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Docket />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;