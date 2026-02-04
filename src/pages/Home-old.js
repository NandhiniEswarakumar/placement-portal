import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaShieldAlt, FaBolt, FaChartLine, FaUsers, FaCloudUploadAlt } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const highlights = [
    {
      icon: <FaBolt />,
      title: 'Smart Matching',
      desc: 'Match students to the best-fit roles and companies with clear criteria'
    },
    {
      icon: <FaChartLine />, 
      title: 'Career Analytics', 
      desc: 'Track applications, interviews, offers, and skills growth in one place'
    },
    {
      icon: <FaShieldAlt />, 
      title: 'ATS Friendly', 
      desc: 'Resume scanning and keyword guidance to beat the ATS filters'
    },
    {
      icon: <FaUsers />, 
      title: 'Role-Specific Portals', 
      desc: 'Dedicated dashboards for Students, HR, and Placement Teams'
    }
  ];

  const stats = [
    { label: 'Jobs Posted', value: '50K+' },
    { label: 'Companies', value: '10K+' },
    { label: 'Match Rate', value: '98%' }
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
            <div className="badge">Career Platform</div>
          <h1>Find Your Perfect Match in the Job Market</h1>
          <p>
              Campus Placement Portal connects talent with opportunity through smart matching,
            skill analysis, and personalized recommendations.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="primary-btn">Explore Jobs</Link>
            <Link to="/login" className="ghost-btn">Watch Demo</Link>
          </div>
          <div className="hero-stats">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="highlights">
        {highlights.map((item, idx) => (
          <div key={idx} className="highlight-card">
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="portals">
        <div className="portals-header">
          <h2>Three Portals. One Seamless Experience.</h2>
          <p>Tailored workflows for every stakeholder.</p>
        </div>
        <div className="portal-grid">
          <div className="portal-card">
            <div className="pill neutral">Student</div>
            <h3>Student Dashboard</h3>
            <p>ATS-friendly resume upload, skill training, interview prep, important questions, and job tracking.</p>
            <Link to="/student-dashboard" className="link-btn">Open Dashboard</Link>
          </div>
          <div className="portal-card">
            <div className="pill success">HR</div>
            <h3>HR Dashboard</h3>
            <p>View hiring companies, required skills, candidate pipeline, AI screening, and offer management.</p>
            <Link to="/hr-dashboard" className="link-btn">Open HR Portal</Link>
          </div>
          <div className="portal-card">
            <div className="pill info">Placement</div>
            <h3>Placement Coordinator</h3>
            <p>Monitor student applications, attendance, interview status, and company drives in real-time.</p>
            <Link to="/placement-dashboard" className="link-btn">Open Placement Portal</Link>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <div>
            <h2>Launch Your Career with Expert Guidance</h2>
            <p>Resume optimization, interview coaching, and a personal chatbot to keep you ready.</p>
          </div>
          <div className="cta-actions">
            <Link to="/signup" className="primary-btn">Get Started</Link>
            <Link to="/login" className="ghost-btn"><FaCloudUploadAlt /> Upload Resume</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
