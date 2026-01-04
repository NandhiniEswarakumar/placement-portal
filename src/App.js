import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import StudentDashboard from './pages/StudentDashboard';
import HRDashboard from './pages/HRDashboard';
import PlacementDashboard from './pages/PlacementDashboard';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';
import EditProfile from './pages/EditProfile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';   // ✅ already imported

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );
  const [userRole, setUserRole] = useState(null);

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
      <Navbar userRole={userRole} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />

        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/signup" element={<Signup />} />   {/* ✅ FIX */}

        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/hr-dashboard" element={<HRDashboard />} />
        <Route path="/placement-dashboard" element={<PlacementDashboard />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/users/:email" element={<PublicProfile />} />
        <Route
          path="/settings"
          element={<Settings theme={theme} setTheme={setTheme} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
