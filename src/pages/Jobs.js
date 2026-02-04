import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBriefcase, FaMapMarkerAlt, FaClock, FaMoneyBillWave,
  FaGraduationCap, FaUsers, FaStar,
  FaBookmark, FaShare, FaFilter,
  FaSearch, FaCalendarAlt,
  FaCheckCircle, FaTimesCircle,
  FaArrowRight, FaEye
} from 'react-icons/fa';
import './Jobs.css';

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    jobType: '',
    experience: '',
    location: '',
    salary: ''
  });
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  // Mock job data
  useEffect(() => {
    const mockJobs = [
      {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'TechCorp Solutions',
        location: 'Bangalore, India',
        type: 'Full-time',
        experience: '3-5 years',
        salary: '₹15-25 LPA',
        posted: '2 days ago',
        deadline: '2024-02-15',
        applicants: 45,
        status: 'active',
        description: 'We are looking for a skilled Frontend Developer...',
        requirements: ['React.js', 'TypeScript', 'Node.js', 'AWS'],
        benefits: ['Health Insurance', 'Work from Home', 'Stock Options'],
        logo: '🏢',
        rating: 4.5,
        reviews: 128
      },
      {
        id: 2,
        title: 'Full Stack Engineer',
        company: 'InnovateTech',
        location: 'Mumbai, India',
        type: 'Full-time',
        experience: '2-4 years',
        salary: '₹12-20 LPA',
        posted: '1 week ago',
        deadline: '2024-02-20',
        applicants: 67,
        status: 'active',
        description: 'Join our team as a Full Stack Engineer...',
        requirements: ['JavaScript', 'Python', 'Django', 'PostgreSQL'],
        benefits: ['Flexible Hours', 'Gym Membership', 'Learning Budget'],
        logo: '💻',
        rating: 4.3,
        reviews: 89
      },
      {
        id: 3,
        title: 'React Developer',
        company: 'Digital Agency',
        location: 'Remote',
        type: 'Remote',
        experience: '1-3 years',
        salary: '₹8-15 LPA',
        posted: '3 days ago',
        deadline: '2024-02-10',
        applicants: 23,
        status: 'active',
        description: 'Remote React Developer position available...',
        requirements: ['React', 'CSS', 'JavaScript', 'Git'],
        benefits: ['Fully Remote', 'Equipment Budget', 'Annual Bonus'],
        logo: '🌍',
        rating: 4.7,
        reviews: 56
      },
      {
        id: 4,
        title: 'Backend Developer',
        company: 'StartupHub',
        location: 'Pune, India',
        type: 'Full-time',
        experience: '2-5 years',
        salary: '₹10-18 LPA',
        posted: '5 days ago',
        deadline: '2024-02-25',
        applicants: 34,
        status: 'active',
        description: 'Backend Developer needed for growing startup...',
        requirements: ['Java', 'Spring Boot', 'MySQL', 'Redis'],
        benefits: ['Equity Options', 'Casual Dress', 'Free Meals'],
        logo: '🚀',
        rating: 4.1,
        reviews: 42
      },
      {
        id: 5,
        title: 'UI/UX Designer',
        company: 'Design Studio',
        location: 'Delhi, India',
        type: 'Contract',
        experience: '2-4 years',
        salary: '₹8-12 LPA',
        posted: '1 day ago',
        deadline: '2024-02-08',
        applicants: 18,
        status: 'active',
        description: 'Creative UI/UX Designer wanted...',
        requirements: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
        benefits: ['Creative Freedom', 'Client Projects', 'Design Tools'],
        logo: '🎨',
        rating: 4.6,
        reviews: 73
      }
    ];

    setTimeout(() => {
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter jobs
  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedFilters.jobType) {
      filtered = filtered.filter(job => job.type === selectedFilters.jobType);
    }

    if (selectedFilters.experience) {
      filtered = filtered.filter(job => job.experience === selectedFilters.experience);
    }

    if (selectedFilters.location) {
      filtered = filtered.filter(job => job.location.toLowerCase().includes(selectedFilters.location.toLowerCase()));
    }

    if (selectedFilters.salary) {
      filtered = filtered.filter(job => job.salary.includes(selectedFilters.salary));
    }

    setFilteredJobs(filtered);
  }, [searchTerm, selectedFilters, jobs]);

  const handleApply = (jobId) => {
    if (appliedJobs.includes(jobId)) {
      return;
    }

    setAppliedJobs([...appliedJobs, jobId]);
    navigate(`/apply/${jobId}`);
  };

  const handleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      jobType: '',
      experience: '',
      location: '',
      salary: ''
    });
    setSearchTerm('');
  };

  const getApplicationStatus = (jobId) => {
    if (appliedJobs.includes(jobId)) return 'applied';
    return 'available';
  };

  return (
    <div className="jobs-page">
      {/* Header */}
      <div className="jobs-header">
        <div className="container">
          <div className="header-content">
            <h1 className="fade-in">Find Your Dream Job</h1>
            <p className="fade-in">Discover opportunities that match your skills and aspirations</p>
            
            {/* Search Bar */}
            <div className="search-container fade-in">
              <div className="search-input-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <button 
                className="filter-toggle-btn"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter />
                Filters
              </button>
            </div>

            {/* Quick Stats */}
            <div className="quick-stats">
              <div className="stat-item">
                <span className="stat-number">{filteredJobs.length}</span>
                <span className="stat-label">Available Jobs</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{savedJobs.length}</span>
                <span className="stat-label">Saved Jobs</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{appliedJobs.length}</span>
                <span className="stat-label">Applications</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="filters-panel slide-in-down">
          <div className="container">
            <div className="filters-grid">
              <div className="filter-group">
                <label>Job Type</label>
                <select 
                  value={selectedFilters.jobType}
                  onChange={(e) => handleFilterChange('jobType', e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Experience</label>
                <select 
                  value={selectedFilters.experience}
                  onChange={(e) => handleFilterChange('experience', e.target.value)}
                >
                  <option value="">All Levels</option>
                  <option value="0-1 years">Entry Level (0-1 years)</option>
                  <option value="1-3 years">Junior (1-3 years)</option>
                  <option value="3-5 years">Mid Level (3-5 years)</option>
                  <option value="5+ years">Senior (5+ years)</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="Enter location..."
                  value={selectedFilters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                />
              </div>
              
              <div className="filter-group">
                <label>Salary Range</label>
                <select 
                  value={selectedFilters.salary}
                  onChange={(e) => handleFilterChange('salary', e.target.value)}
                >
                  <option value="">All Salaries</option>
                  <option value="0-5">0-5 LPA</option>
                  <option value="5-10">5-10 LPA</option>
                  <option value="10-15">10-15 LPA</option>
                  <option value="15-20">15-20 LPA</option>
                  <option value="20+">20+ LPA</option>
                </select>
              </div>
            </div>
            
            <div className="filter-actions">
              <button className="btn btn-outline" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Jobs List */}
      <div className="jobs-content">
        <div className="container">
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading amazing opportunities...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="no-jobs">
              <div className="no-jobs-icon">🔍</div>
              <h3>No jobs found</h3>
              <p>Try adjusting your search or filters</p>
              <button className="btn btn-primary" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="jobs-grid">
              {filteredJobs.map((job, index) => (
                <div key={job.id} className="job-card scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Job Header */}
                  <div className="job-header">
                    <div className="company-info">
                      <div className="company-logo">{job.logo}</div>
                      <div className="company-details">
                        <h3 className="job-title">{job.title}</h3>
                        <p className="company-name">{job.company}</p>
                        <div className="company-rating">
                          <FaStar className="star" />
                          <span>{job.rating}</span>
                          <span className="reviews">({job.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="job-actions">
                      <button 
                        className={`save-btn ${savedJobs.includes(job.id) ? 'saved' : ''}`}
                        onClick={() => handleSaveJob(job.id)}
                        title={savedJobs.includes(job.id) ? 'Remove from saved' : 'Save job'}
                      >
                        <FaBookmark />
                      </button>
                      <button className="share-btn" title="Share job">
                        <FaShare />
                      </button>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="job-details">
                    <div className="detail-item">
                      <FaMapMarkerAlt className="icon" />
                      <span>{job.location}</span>
                    </div>
                    <div className="detail-item">
                      <FaBriefcase className="icon" />
                      <span>{job.type}</span>
                    </div>
                    <div className="detail-item">
                      <FaGraduationCap className="icon" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="detail-item">
                      <FaMoneyBillWave className="icon" />
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="job-description">
                    <p>{job.description}</p>
                  </div>

                  {/* Requirements */}
                  <div className="job-requirements">
                    <h4>Key Requirements</h4>
                    <div className="requirements-list">
                      {job.requirements.slice(0, 3).map((req, idx) => (
                        <span key={idx} className="requirement-tag">{req}</span>
                      ))}
                      {job.requirements.length > 3 && (
                        <span className="requirement-tag more">+{job.requirements.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  {/* Job Footer */}
                  <div className="job-footer">
                    <div className="job-meta">
                      <div className="meta-item">
                        <FaClock className="icon" />
                        <span>{job.posted}</span>
                      </div>
                      <div className="meta-item">
                        <FaUsers className="icon" />
                        <span>{job.applicants} applicants</span>
                      </div>
                      <div className="meta-item deadline">
                        <FaCalendarAlt className="icon" />
                        <span>Apply by {job.deadline}</span>
                      </div>
                    </div>
                    
                    <div className="job-actions-footer">
                      <button 
                        className="btn btn-outline view-details-btn"
                        onClick={() => setSelectedJob(job)}
                      >
                        <FaEye />
                        View Details
                      </button>
                      <button 
                        className={`btn ${getApplicationStatus(job.id) === 'applied' ? 'btn-success' : 'btn-primary'} apply-btn`}
                        onClick={() => handleApply(job.id)}
                        disabled={getApplicationStatus(job.id) === 'applied'}
                      >
                        {getApplicationStatus(job.id) === 'applied' ? (
                          <>
                            <FaCheckCircle />
                            Applied
                          </>
                        ) : (
                          <>
                            <FaArrowRight />
                            Apply Now
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="job-modal-overlay" onClick={() => setSelectedJob(null)}>
          <div className="job-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedJob.title}</h2>
              <button className="close-btn" onClick={() => setSelectedJob(null)}>
                <FaTimesCircle />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="company-section">
                <div className="company-logo large">{selectedJob.logo}</div>
                <div className="company-info">
                  <h3>{selectedJob.company}</h3>
                  <div className="company-rating large">
                    <FaStar className="star" />
                    <span>{selectedJob.rating}</span>
                    <span className="reviews">({selectedJob.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="job-details-grid">
                <div className="detail-card">
                  <FaMapMarkerAlt className="icon" />
                  <div>
                    <h4>Location</h4>
                    <p>{selectedJob.location}</p>
                  </div>
                </div>
                <div className="detail-card">
                  <FaBriefcase className="icon" />
                  <div>
                    <h4>Job Type</h4>
                    <p>{selectedJob.type}</p>
                  </div>
                </div>
                <div className="detail-card">
                  <FaGraduationCap className="icon" />
                  <div>
                    <h4>Experience</h4>
                    <p>{selectedJob.experience}</p>
                  </div>
                </div>
                <div className="detail-card">
                  <FaMoneyBillWave className="icon" />
                  <div>
                    <h4>Salary</h4>
                    <p>{selectedJob.salary}</p>
                  </div>
                </div>
              </div>

              <div className="description-section">
                <h4>Job Description</h4>
                <p>{selectedJob.description}</p>
              </div>

              <div className="requirements-section">
                <h4>Requirements</h4>
                <ul>
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="benefits-section">
                <h4>Benefits & Perks</h4>
                <div className="benefits-list">
                  {selectedJob.benefits.map((benefit, idx) => (
                    <div key={idx} className="benefit-item">
                      <FaCheckCircle className="icon" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className={`btn ${getApplicationStatus(selectedJob.id) === 'applied' ? 'btn-success' : 'btn-primary'} btn-lg`}
                onClick={() => {
                  handleApply(selectedJob.id);
                  setSelectedJob(null);
                }}
                disabled={getApplicationStatus(selectedJob.id) === 'applied'}
              >
                {getApplicationStatus(selectedJob.id) === 'applied' ? (
                  <>
                    <FaCheckCircle />
                    Already Applied
                  </>
                ) : (
                  <>
                    <FaArrowRight />
                    Apply for this Position
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
