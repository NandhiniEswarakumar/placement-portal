import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ userRole }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Read user once on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  // Also re-read when role changes (keeps previous behavior)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, [userRole]);

  // Listen for explicit user updates from other components (login/logout)
  useEffect(() => {
    const handleUserChanged = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    };
    // for same-window updates
    window.addEventListener('userChanged', handleUserChanged);
    // for cross-tab updates
    window.addEventListener('storage', handleUserChanged);
    return () => {
      window.removeEventListener('userChanged', handleUserChanged);
      window.removeEventListener('storage', handleUserChanged);
    };
  }, []);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    // notify other components
    window.dispatchEvent(new Event('userChanged'));
    setShowDropdown(false);
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🚀</span>
          Placement Portal
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/jobs" className="navbar-link">Jobs</Link>

          {userRole === 'student' && (
            <Link to="/student-dashboard" className="navbar-link">Dashboard</Link>
          )}
          {userRole === 'hr' && (
            <Link to="/hr-dashboard" className="navbar-link">HR</Link>
          )}
          {userRole === 'placement' && (
            <Link to="/placement-dashboard" className="navbar-link">Placement</Link>
          )}
        </div>

        <div className="navbar-user">
          {!user && <div style={{ color: 'white', fontWeight: 600 }}>Guest User</div>}

          {user && (
            <>
              <div
                className="user-avatar"
                onClick={() => setShowDropdown((s) => !s)}
                title={user.name || user.email}
              >
                {getInitials(user.name || (user.email || ''))}
              </div>

              {showDropdown && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <p className="user-name">{user.name || (user.email && user.email.split('@')[0])}</p>
                    <p className="user-email">{user.email}</p>
                  </div>
                  <div className="dropdown-section">
                    <button className="dropdown-item" onClick={() => { setShowDropdown(false); navigate(`/users/${encodeURIComponent(user.email)}`); }}>
                      View Profile
                    </button>
                    <div className="dropdown-divider" />
                    <button className="dropdown-item logout" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
