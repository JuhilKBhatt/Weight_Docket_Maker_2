import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Docket from './pages/Docket';
import Inventory from './pages/Inventory';

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Docket />} />
        <Route path="/Inventory" element={<Inventory />} />
      </Routes>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
