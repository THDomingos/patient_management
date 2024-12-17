import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Insert from './pages/Insert.tsx';
import Updated from './pages/Updated.tsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient" element={<Dashboard />} />
        <Route path="/patient/new" element={<Insert />} />
        <Route path="/patients/edit/:id" element={<Updated />} />
        <Route path="/*" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
