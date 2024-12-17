import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';
import List from './pages/List.tsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient" element={<Dashboard />} />
        <Route path="/patient/new" element={<List />} />
        <Route path="/*" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
