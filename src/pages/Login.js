import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Auth.css';

const Login = ({ setUserRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userRole', role);
    setUserRole(role);
    navigate(`/${role}-dashboard`);
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="gradient-circle circle-1"></div>
        <div className="gradient-circle circle-2"></div>
        <div className="gradient-circle circle-3"></div>
      </div>

      <div className="auth-content">
        <div className="auth-left">
          <h1>Welcome Back to</h1>
          <h2>RekrootDesk</h2>
          <p>AI-Powered Career Platform</p>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Smart Job Matching</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>AI Resume Builder</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Interview Preparation</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Skill Assessment</span>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-card">
            <div className="auth-header">
              <h2>Sign In</h2>
              <p>Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>Select Role</label>
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className="form-select"
                >
                  <option value="student">Student</option>
                  <option value="hr">HR Manager</option>
                  <option value="placement">Placement Coordinator</option>
                </select>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <div className="input-group">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-group">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to="/reset-password" className="forgot-link">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="auth-button">
                Sign In
              </button>

              <div className="auth-footer">
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
