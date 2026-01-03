import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';

import Home from './pages/Home';
import Jobs from './pages/Jobs';
import StudentDashboard from './pages/StudentDashboard';
import HRDashboard from './pages/HRDashboard';
import PlacementDashboard from './pages/PlacementDashboard';
import PlacementPortal from './pages/PlacementPortal';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [userRole, setUserRole] = useState('student');

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Router>
      <div className="app-shell">
        <Navbar userRole={userRole} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/hr-dashboard" element={<HRDashboard />} />
            <Route path="/placement-dashboard" element={<PlacementDashboard />} />
            <Route path="/placement-portal" element={<PlacementPortal />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings theme={theme} setTheme={setTheme} />} />
            <Route path="/login" element={<Login setUserRole={setUserRole} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </main>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
