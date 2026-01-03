import React from 'react';
import { FaStar, FaMapMarkerAlt, FaBriefcase, FaClock } from 'react-icons/fa';
import './Jobs.css';

const Jobs = () => {
  const jobs = [
    {
      title: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: '$150k - $200k',
      tags: ['remote', 'senior', 'React', 'Node.js'],
      featured: true,
      posted: '12/15/2024'
    },
    {
      title: 'Product Manager',
      company: 'InnovateTech',
      location: 'New York, NY',
      salary: '$130k - $170k',
      tags: ['hybrid', 'mid', 'Product Strategy', 'Agile'],
      featured: true,
      posted: '12/14/2024'
    },
    {
      title: 'Data Scientist',
      company: 'DataDriven AI',
      location: 'Seattle, WA',
      salary: '$140k - $180k',
      tags: ['remote', 'senior', 'Python', 'ML'],
      featured: false,
      posted: '12/12/2024'
    },
    {
      title: 'UX Designer',
      company: 'DesignHub',
      location: 'Los Angeles, CA',
      salary: '$90k - $130k',
      tags: ['full time', 'mid', 'Figma', 'Research'],
      featured: false,
      posted: '12/10/2024'
    }
  ];

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <h1>Jobs</h1>
        <p>Find roles that match your skills and aspirations.</p>
      </div>

      <div className="filters">
        <input placeholder="Job title or keyword" />
        <input placeholder="Location" />
        <select>
          <option>Job Type</option>
          <option>Full Time</option>
          <option>Part Time</option>
          <option>Remote</option>
        </select>
        <select>
          <option>Experience</option>
          <option>Internship</option>
          <option>Junior</option>
          <option>Mid</option>
          <option>Senior</option>
        </select>
        <button className="filter-btn">Filter</button>
      </div>

      <div className="jobs-grid">
        {jobs.map((job, idx) => (
          <div key={idx} className="job-card">
            {job.featured && <div className="badge"><FaStar /> Featured</div>}
            <div className="job-main">
              <div className="avatar">{job.company[0]}</div>
              <div>
                <h3>{job.title}</h3>
                <p className="company">{job.company}</p>
                <div className="meta">
                  <span><FaMapMarkerAlt /> {job.location}</span>
                  <span><FaBriefcase /> {job.salary}</span>
                </div>
              </div>
            </div>
            <div className="tags">
              {job.tags.map((tag, tIdx) => (
                <span key={tIdx} className="tag">{tag}</span>
              ))}
            </div>
            <div className="card-footer">
              <span className="posted"><FaClock /> Posted {job.posted}</span>
              <button className="view-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
