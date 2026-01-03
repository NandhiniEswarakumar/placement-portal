import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaCog, FaChartBar, FaMicrophone, FaBook, FaUpload, FaBuilding } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ userRole }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">⭐</div>
          <span>RekrootDesk</span>
        </Link>
        
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/jobs" className="navbar-link">Jobs</Link>
          {userRole === 'student' && <Link to="/student-dashboard" className="navbar-link">Dashboard</Link>}
          {userRole === 'hr' && <Link to="/hr-dashboard" className="navbar-link">HR Portal</Link>}
          {userRole === 'placement' && <Link to="/placement-dashboard" className="navbar-link">Dashboard</Link>}
          <Link to="/profile" className="navbar-link">Profile</Link>
        </div>

        <div className="navbar-user">
          <div 
            className="user-avatar" 
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span>N</span>
          </div>
          {showDropdown && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <p className="user-name">Nandhinieswarakumar</p>
                <p className="user-email">nandhinieswarakumar@gmail.com</p>
              </div>
              <Link to={`/${userRole}-dashboard`} className="dropdown-item">
                <FaChartBar /> Dashboard
              </Link>
              <Link to="/profile" className="dropdown-item">
                <FaUser /> Profile
              </Link>
              <Link to="/settings" className="dropdown-item">
                <FaCog /> Settings
              </Link>
              <div className="dropdown-divider"></div>
              <div className="dropdown-section">
                <p className="dropdown-section-title">Student Tools</p>
                <Link to="/student-dashboard?tab=interview" className="dropdown-item">
                  <FaMicrophone /> Interview Prep
                </Link>
                <Link to="/student-dashboard?tab=training" className="dropdown-item">
                  <FaBook /> Skill Assessment
                </Link>
                <Link to="/student-dashboard?tab=resume" className="dropdown-item">
                  <FaUpload /> Resume Builder
                </Link>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-section">
                <p className="dropdown-section-title">Portals</p>
                <Link to="/hr-dashboard" className="dropdown-item">
                  <FaBuilding /> HR Portal
                </Link>
                <Link to="/placement-dashboard" className="dropdown-item">
                  <FaBuilding /> Placement Portal
                </Link>
              </div>
              <div className="dropdown-divider"></div>
              <button onClick={handleLogout} className="dropdown-item logout">
                <FaSignOutAlt /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
