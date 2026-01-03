import React from 'react';
import { FaBuilding, FaUserTie, FaChartBar, FaCogs, FaEnvelopeOpenText, FaCheckCircle } from 'react-icons/fa';
import './HRDashboard.css';

const HRDashboard = () => {
  const cards = [
    { label: 'Total Applications', value: 2, trend: '+12%' },
    { label: 'Active Jobs', value: 8, trend: '+5%' },
    { label: 'Interviews Scheduled', value: 0, trend: '+0%' },
    { label: 'Offers Sent', value: 0, trend: '+0%' }
  ];

  const tools = [
    { title: 'AI Screening', desc: 'Resume analysis and matching', badge: 'AI Powered' },
    { title: 'Workflow Builder', desc: 'Automated hiring stages and notifications', badge: 'Automation' },
    { title: 'Candidate Ranking', desc: 'Smart ranking across multiple criteria', badge: 'Smart' },
    { title: 'Offer Management', desc: 'Offers, acceptances, onboarding', badge: 'Track' }
  ];

  const applications = [
    { email: 'brandm.dma@gmail.com', status: 'Applied', date: '12/12/2025' },
    { email: 'carjeep55@gmail.com', status: 'Applied', date: '12/10/2025' },
  ];

  return (
    <div className="hr-dashboard">
      <div className="hero">
        <h1>Hiring Management Dashboard</h1>
        <p>AI-powered tools to streamline your hiring process</p>
        <div className="chips">
          <span>HR Portal</span>
          <span>Automation</span>
          <span>AI Powered</span>
        </div>
      </div>

      <div className="stats">
        {cards.map((card, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-icon">
              {idx === 0 && <FaEnvelopeOpenText />} 
              {idx === 1 && <FaBuilding />} 
              {idx === 2 && <FaUserTie />} 
              {idx === 3 && <FaCheckCircle />}
            </div>
            <div>
              <h3>{card.value}</h3>
              <p>{card.label}</p>
            </div>
            <div className="trend">{card.trend}</div>
          </div>
        ))}
      </div>

      <div className="tools">
        {tools.map((tool, idx) => (
          <div key={idx} className="tool-card">
            <div className="tool-icon">{idx % 2 === 0 ? <FaChartBar /> : <FaCogs />}</div>
            <div>
              <h4>{tool.title}</h4>
              <p>{tool.desc}</p>
            </div>
            <div className="badge">{tool.badge}</div>
          </div>
        ))}
      </div>

      <div className="applications">
        <div className="section-header">
          <h3>Recent Applications</h3>
          <button className="view-all">View All</button>
        </div>
        <div className="application-list">
          {applications.map((item, idx) => (
            <div key={idx} className="application-row">
              <div>
                <p className="email">{item.email}</p>
                <p className="date">Applied {item.date}</p>
              </div>
              <span className="status">{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
