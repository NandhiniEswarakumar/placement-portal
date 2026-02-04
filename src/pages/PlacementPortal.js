import React, { useState, useEffect } from 'react';
import { FaBriefcase, FaUsers, FaBuilding, FaChartBar, FaChartLine } from 'react-icons/fa';
import './PlacementPortal.css';

const PlacementPortal = () => {
  const [stats, setStats] = useState({
    activeDrives: 0,
    registeredStudents: 0,
    partnerCompanies: 0,
    placementsYTD: 0
  });

  const [upcomingDrives] = useState([
    {
      id: 1,
      company: 'Google',
      role: 'Software Engineer',
      registered: 45,
      date: '12/25/2024'
    },
    {
      id: 2,
      company: 'Microsoft',
      role: 'Cloud Solutions Developer',
      registered: 38,
      date: '12/28/2024'
    },
    {
      id: 3,
      company: 'Amazon',
      role: 'SDE-1',
      registered: 52,
      date: '1/5/2025'
    }
  ]);

  const placementTools = [
    {
      id: 1,
      title: 'Drive Management',
      desc: 'Schedule and manage campus placement drives',
      icon: <FaBriefcase />,
      color: '#9C27B0'
    },
    {
      id: 2,
      title: 'Student Analytics',
      desc: 'Track student performance and placement statistics',
      icon: <FaChartLine />,
      color: '#2196F3'
    },
    {
      id: 3,
      title: 'Company Relations',
      desc: 'Manage relationships with recruiting companies',
      icon: <FaBuilding />,
      color: '#E91E63'
    },
    {
      id: 4,
      title: 'Reports',
      desc: 'Generate placement reports and insights',
      icon: <FaChartBar />,
      color: '#4CAF50'
    }
  ];

  useEffect(() => {
    // Fetch stats from backend
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/placement/stats', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.log('Using default stats');
    }
  };

  return (
    <div className="placement-portal">
      {/* Header with Stats */}
      <div className="portal-header">
        <h1>Placement Office Portal</h1>
        <p>Comprehensive placement management system</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#E8D4F8' }}>
            <FaBriefcase size={32} color="#9C27B0" />
          </div>
          <div className="stat-content">
            <h3>{stats.activeDrives || 2}</h3>
            <p>Active Drives</p>
          </div>
          <span className="stat-change">+3</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#D4E8F8' }}>
            <FaUsers size={32} color="#2196F3" />
          </div>
          <div className="stat-content">
            <h3>{stats.registeredStudents || 248}</h3>
            <p>Registered Students</p>
          </div>
          <span className="stat-change"></span>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#F8D4E0' }}>
            <FaBuilding size={32} color="#E91E63" />
          </div>
          <div className="stat-content">
            <h3>{stats.partnerCompanies || 4}</h3>
            <p>Partner Companies</p>
          </div>
          <span className="stat-change"></span>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#D4F8E0' }}>
            <FaChartBar size={32} color="#4CAF50" />
          </div>
          <div className="stat-content">
            <h3>{stats.placementsYTD || 127}</h3>
            <p>Placements YTD</p>
          </div>
          <span className="stat-change">+15%</span>
        </div>
      </div>

      {/* Placement Tools */}
      <section className="placement-tools">
        <h2>Placement Tools</h2>
        <div className="tools-grid">
          {placementTools.map((tool) => (
            <div key={tool.id} className="tool-card" style={{ borderTopColor: tool.color }}>
              <div className="tool-icon" style={{ backgroundColor: tool.color }}>
                {tool.icon}
              </div>
              <h3>{tool.title}</h3>
              <p>{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Drives */}
      <section className="upcoming-drives">
        <div className="section-header">
          <h2>Upcoming Drives</h2>
          <a href="#view-all" className="view-all">View All</a>
        </div>
        <div className="drives-list">
          {upcomingDrives.map((drive) => (
            <div key={drive.id} className="drive-item">
              <div className="drive-company">
                <div className="company-logo">
                  {drive.company.charAt(0)}
                </div>
                <div className="company-info">
                  <h4>{drive.company}</h4>
                  <p>{drive.role}</p>
                </div>
              </div>
              <div className="drive-registered">
                <span>{drive.registered} registered</span>
                <p className="drive-date">{drive.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PlacementPortal;