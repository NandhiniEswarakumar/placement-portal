import React from 'react';
import { FaUsers, FaClipboardCheck, FaBuilding, FaCalendarCheck } from 'react-icons/fa';
import './PlacementDashboard.css';

const PlacementDashboard = () => {
  const summary = [
    { label: 'Students Applied', value: 120 },
    { label: 'Interviews Scheduled', value: 35 },
    { label: 'Offers Received', value: 12 },
    { label: 'Drives Active', value: 4 }
  ];

  const drives = [
    { company: 'TechCorp', role: 'SWE', date: 'Jan 12', status: 'Ongoing' },
    { company: 'InnovateTech', role: 'PM', date: 'Jan 18', status: 'Registration' },
    { company: 'DataDriven AI', role: 'Data Scientist', date: 'Jan 22', status: 'Upcoming' }
  ];

  const attendance = [
    { name: 'Alice Johnson', company: 'TechCorp', attended: true },
    { name: 'Brian Lee', company: 'InnovateTech', attended: false },
    { name: 'Cara Patel', company: 'DataDriven AI', attended: true }
  ];

  return (
    <div className="placement-dashboard">
      <div className="header">
        <div>
          <h1>Placement Coordinator</h1>
          <p>Track company drives, applications, and attendance</p>
        </div>
        <button className="primary">Create Drive</button>
      </div>

      <div className="summary-grid">
        {summary.map((item, idx) => (
          <div key={idx} className="summary-card">
            <div className="icon">{idx === 0 && <FaUsers />}{idx === 1 && <FaClipboardCheck />}{idx === 2 && <FaBuilding />}{idx === 3 && <FaCalendarCheck />}</div>
            <div>
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid">
        <div className="panel">
          <div className="panel-header">
            <h3>Company Drives</h3>
            <button className="ghost">View All</button>
          </div>
          <div className="list">
            {drives.map((drive, idx) => (
              <div key={idx} className="row">
                <div>
                  <h4>{drive.company}</h4>
                  <p>{drive.role}</p>
                </div>
                <div className="meta">
                  <span>{drive.date}</span>
                  <span className={`status ${drive.status.toLowerCase()}`}>{drive.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Attendance & Participation</h3>
          </div>
          <div className="list">
            {attendance.map((item, idx) => (
              <div key={idx} className="row">
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.company}</p>
                </div>
                <span className={`badge ${item.attended ? 'success' : 'warning'}`}>
                  {item.attended ? 'Attended' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementDashboard;
