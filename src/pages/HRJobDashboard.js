import React, { useState, useEffect } from 'react';
import { createJob, updateJob, deleteJob, getJobs } from '../api';
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaTimes, FaCheck } from 'react-icons/fa';
import './HRDashboard.css';

const HRDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    description: '',
    requirements: [],
    salary: { min: 0, max: 0, currency: 'INR' },
    location: '',
    jobType: 'Full-time',
    experienceLevel: 'Fresher',
    skills: [],
    applicationDeadline: '',
    status: 'published'
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('salary.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        salary: { ...formData.salary, [field]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleArrayInput = (e, field) => {
    const value = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateJob(editingId, formData);
        alert('Job updated successfully!');
      } else {
        await createJob(formData);
        alert('Job posted successfully!');
      }
      setShowModal(false);
      setEditingId(null);
      setFormData({
        company: '',
        position: '',
        description: '',
        requirements: [],
        salary: { min: 0, max: 0, currency: 'INR' },
        location: '',
        jobType: 'Full-time',
        experienceLevel: 'Fresher',
        skills: [],
        applicationDeadline: '',
        status: 'published'
      });
      fetchJobs();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this job?')) {
      try {
        await deleteJob(id);
        alert('Job deleted successfully!');
        fetchJobs();
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }
  };

  const handleEdit = (job) => {
    setFormData(job);
    setEditingId(job._id);
    setShowModal(true);
  };

  const handleNewJob = () => {
    setFormData({
      company: '',
      position: '',
      description: '',
      requirements: [],
      salary: { min: 0, max: 0, currency: 'INR' },
      location: '',
      jobType: 'Full-time',
      experienceLevel: 'Fresher',
      skills: [],
      applicationDeadline: '',
      status: 'published'
    });
    setEditingId(null);
    setShowModal(true);
  };

  return (
    <div className="hr-dashboard">
      <div className="dashboard-header">
        <h1>HR Dashboard - Job Management</h1>
        <button className="new-job-btn" onClick={handleNewJob}>
          <FaPlus /> Post New Job
        </button>
      </div>

      {loading ? (
        <div className="loading"><FaSpinner className="spin" /> Loading...</div>
      ) : (
        <div className="jobs-table-container">
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Company</th>
                <th>Location</th>
                <th>Type</th>
                <th>Experience</th>
                <th>Status</th>
                <th>Posted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan="8" className="no-data">No jobs posted yet. Create one to get started!</td>
                </tr>
              ) : (
                jobs.map(job => (
                  <tr key={job._id}>
                    <td><strong>{job.position}</strong></td>
                    <td>{job.company}</td>
                    <td>{job.location}</td>
                    <td><span className="badge">{job.jobType}</span></td>
                    <td>{job.experienceLevel}</td>
                    <td>
                      <span className={`status ${job.status}`}>
                        {job.status === 'published' ? <FaCheck /> : <FaTimes />}
                        {job.status}
                      </span>
                    </td>
                    <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                    <td className="actions">
                      <button className="edit-btn" onClick={() => handleEdit(job)} title="Edit">
                        <FaEdit />
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(job._id)} title="Delete">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Job Form Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Edit Job' : 'Post New Job'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="job-form">
              <div className="form-group">
                <label>Company Name *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Google, Microsoft"
                />
              </div>

              <div className="form-group">
                <label>Position Title *</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Senior React Developer"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Bangalore, India"
                  />
                </div>
                <div className="form-group">
                  <label>Job Type *</label>
                  <select name="jobType" value={formData.jobType} onChange={handleInputChange} required>
                    <option value="Full-time">Full-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Experience Level *</label>
                  <select name="experienceLevel" value={formData.experienceLevel} onChange={handleInputChange} required>
                    <option value="Fresher">Fresher</option>
                    <option value="Junior">Junior</option>
                    <option value="Mid-level">Mid-level</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Application Deadline *</label>
                  <input
                    type="date"
                    name="applicationDeadline"
                    value={formData.applicationDeadline}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Salary Min (K) *</label>
                  <input
                    type="number"
                    name="salary.min"
                    value={formData.salary.min}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 10"
                  />
                </div>
                <div className="form-group">
                  <label>Salary Max (K) *</label>
                  <input
                    type="number"
                    name="salary.max"
                    value={formData.salary.max}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 25"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Detailed job description..."
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label>Requirements (comma-separated)</label>
                <input
                  type="text"
                  value={formData.requirements.join(', ')}
                  onChange={(e) => handleArrayInput(e, 'requirements')}
                  placeholder="e.g., 3+ years experience, Bachelor's degree"
                />
              </div>

              <div className="form-group">
                <label>Skills (comma-separated)</label>
                <input
                  type="text"
                  value={formData.skills.join(', ')}
                  onChange={(e) => handleArrayInput(e, 'skills')}
                  placeholder="e.g., React, Node.js, MongoDB"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingId ? 'Update Job' : 'Post Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRDashboard;
