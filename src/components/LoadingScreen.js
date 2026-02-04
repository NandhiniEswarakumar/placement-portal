import React from 'react';
import './LoadingScreen.css';
import logo from '../assests/logo.png';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-logo">
          <img src={logo} alt="Rookdesk Logo" className="logo-image" />
        </div>
        <h1 className="loading-title">Rookdesk</h1>
        <p className="loading-subtitle">Connecting Ambition with Opportunity</p>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;