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

    // ✅ STORE USER DATA
    const userData = {
      name: email.split('@')[0],
      email,
      role,
      isLoggedIn: true
    };

    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userRole', role);

    // ✅ ONLY THIS STATE EXISTS
    setUserRole(role);

    // notify other components (e.g., Navbar) to re-read user data
    window.dispatchEvent(new Event('userChanged'));

    navigate(`/${role}-dashboard`);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign In</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="hr">HR</option>
              <option value="placement">Placement</option>
            </select>
          </div>

          <div className="form-group">
            <label>Email</label>
            <div className="input-group">
              <FaEnvelope />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-group">
              <FaLock />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-button">
            Sign In
          </button>

          <p className="auth-footer">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
