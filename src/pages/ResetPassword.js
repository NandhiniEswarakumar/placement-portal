import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import './Auth.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="auth-container">
        <div className="auth-background">
          <div className="gradient-circle circle-1"></div>
          <div className="gradient-circle circle-2"></div>
        </div>

        <div className="auth-content centered">
          <div className="auth-card success-card">
            <div className="success-icon">
              <FaCheckCircle />
            </div>
            <h2>Check Your Email</h2>
            <p>We've sent a password reset link to</p>
            <p className="email-highlight">{email}</p>
            <p className="info-text">
              Click the link in the email to reset your password. 
              If you don't see the email, check your spam folder.
            </p>
            <Link to="/login" className="auth-button">
              Back to Login
            </Link>
            <button 
              onClick={() => setIsSubmitted(false)} 
              className="resend-link"
            >
              Resend Email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="gradient-circle circle-1"></div>
        <div className="gradient-circle circle-2"></div>
        <div className="gradient-circle circle-3"></div>
      </div>

      <div className="auth-content centered">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Reset Password</h2>
            <p>Enter your email address and we'll send you a link to reset your password</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
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

            <button type="submit" className="auth-button">
              Send Reset Link
            </button>

            <div className="auth-footer">
              <p>Remember your password? <Link to="/login">Sign In</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
