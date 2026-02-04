import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  FaUpload, FaBook, FaMicrophone, FaQuestionCircle, 
  FaChartLine, FaCertificate, FaFileAlt, FaCheckCircle,
  FaUser, FaGraduationCap, FaBriefcase, FaAward,
  FaEdit, FaSave, FaTrash, FaPlus,
  FaLinkedin, FaGithub, FaGlobe, FaEnvelope,
  FaPhone, FaMapMarkerAlt, FaCalendarAlt
} from 'react-icons/fa';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchParams] = useSearchParams();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      portfolio: '',
      summary: ''
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: []
  });

  useEffect(() => {
    const tab = searchParams.get('tab');
    const validTabs = ['overview', 'profile', 'resume', 'training', 'interview', 'questions'];
    if (tab && validTabs.includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const addArrayItem = (section) => {
    const newItem = section === 'education' ? {
      degree: '',
      institution: '',
      graduationYear: '',
      gpa: ''
    } : section === 'experience' ? {
      company: '',
      position: '',
      duration: '',
      description: ''
    } : section === 'skills' ? {
      name: '',
      level: 'Beginner'
    } : section === 'projects' ? {
      title: '',
      description: '',
      technologies: '',
      link: ''
    } : {
      name: '',
      issuer: '',
      date: '',
      credentialId: ''
    };

    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeArrayItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const skills = [
    { name: 'JavaScript', progress: 85, color: '#f7df1e' },
    { name: 'React', progress: 90, color: '#61dafb' },
    { name: 'Python', progress: 75, color: '#3776ab' },
    { name: 'Communication', progress: 80, color: 'var(--primary)' }
  ];

  const courses = [
    {
      id: 1,
      title: 'Advanced React Development',
      progress: 65,
      duration: '8 weeks',
      instructor: 'Sarah Johnson',
      thumbnail: '📱'
    },
    {
      id: 2,
      title: 'Python for Data Science',
      progress: 40,
      duration: '10 weeks',
      instructor: 'Michael Chen',
      thumbnail: '🐍'
    },
    {
      id: 3,
      title: 'Communication Skills',
      progress: 80,
      duration: '4 weeks',
      instructor: 'Emily Davis',
      thumbnail: '💬'
    },
    {
      id: 4,
      title: 'DSA Masterclass',
      progress: 30,
      duration: '12 weeks',
      instructor: 'David Kumar',
      thumbnail: '🧮'
    }
  ];

  const interviewQuestions = [
    {
      category: 'Technical',
      questions: [
        'Explain the difference between let, const, and var in JavaScript',
        'What is React Virtual DOM and how does it work?',
        'Describe the concept of closures in JavaScript',
        'What are React Hooks and why are they useful?'
      ]
    },
    {
      category: 'Behavioral',
      questions: [
        'Tell me about yourself',
        'Describe a challenging project you worked on',
        'How do you handle conflicts in a team?',
        'What are your greatest strengths and weaknesses?'
      ]
    },
    {
      category: 'Problem Solving',
      questions: [
        'Reverse a linked list',
        'Find the missing number in an array',
        'Implement a binary search algorithm',
        'Detect a cycle in a linked list'
      ]
    }
  ];

  const mockInterviews = [
    {
      id: 1,
      company: 'TechCorp Inc.',
      type: 'Technical Round',
      duration: '45 min',
      difficulty: 'Medium',
      available: true
    },
    {
      id: 2,
      company: 'InnovateTech',
      type: 'HR Round',
      duration: '30 min',
      difficulty: 'Easy',
      available: true
    },
    {
      id: 3,
      company: 'DataDriven AI',
      type: 'System Design',
      duration: '60 min',
      difficulty: 'Hard',
      available: true
    }
  ];

  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Student Dashboard</h1>
          <p>Track your career development and skill progress</p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-icon applications">
              <FaFileAlt />
            </div>
            <div className="stat-info">
              <h3>5</h3>
              <p>Applications</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon interviews">
              <FaMicrophone />
            </div>
            <div className="stat-info">
              <h3>3</h3>
              <p>Interviews</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon skills">
              <FaChartLine />
            </div>
            <div className="stat-info">
              <h3>12</h3>
              <p>Skills</p>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <FaUser /> Profile
        </button>
        <button 
          className={`tab-btn ${activeTab === 'resume' ? 'active' : ''}`}
          onClick={() => setActiveTab('resume')}
        >
          <FaUpload /> Resume
        </button>
        <button 
          className={`tab-btn ${activeTab === 'training' ? 'active' : ''}`}
          onClick={() => setActiveTab('training')}
        >
          <FaBook /> Skills Training
        </button>
        <button 
          className={`tab-btn ${activeTab === 'interview' ? 'active' : ''}`}
          onClick={() => setActiveTab('interview')}
        >
          <FaMicrophone /> Interview Prep
        </button>
        <button 
          className={`tab-btn ${activeTab === 'questions' ? 'active' : ''}`}
          onClick={() => setActiveTab('questions')}
        >
          <FaQuestionCircle /> Important Questions
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="skills-overview">
              <h2>Your Skills Progress</h2>
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-card">
                    <div className="skill-header">
                      <h3>{skill.name}</h3>
                      <span className="skill-percentage">{skill.progress}%</span>
                    </div>
                    <div className="skill-progress">
                      <div 
                        className="skill-progress-bar"
                        style={{ 
                          width: `${skill.progress}%`,
                          background: skill.color
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon success">
                    <FaCheckCircle />
                  </div>
                  <div className="activity-details">
                    <h4>Resume Updated</h4>
                    <p>2 hours ago</p>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon info">
                    <FaBook />
                  </div>
                  <div className="activity-details">
                    <h4>Completed React Course Module</h4>
                    <p>1 day ago</p>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon warning">
                    <FaMicrophone />
                  </div>
                  <div className="activity-details">
                    <h4>Mock Interview Scheduled</h4>
                    <p>2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-section">
            <div className="profile-header">
              <h2>Complete Your Profile</h2>
              <button 
                className={`edit-btn ${isEditing ? 'save' : ''}`}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <FaSave /> : <FaEdit />}
                {isEditing ? 'Save Profile' : 'Edit Profile'}
              </button>
            </div>

            <div className="profile-form">
              {/* Personal Information */}
              <div className="form-section">
                <h3><FaUser /> Personal Information</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      value={formData.personalInfo.firstName}
                      onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={formData.personalInfo.lastName}
                      onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div className="form-group">
                    <label><FaEnvelope /> Email</label>
                    <input
                      type="email"
                      value={formData.personalInfo.email}
                      onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                      disabled={!isEditing}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label><FaPhone /> Phone</label>
                    <input
                      type="tel"
                      value={formData.personalInfo.phone}
                      onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                      disabled={!isEditing}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="form-group">
                    <label><FaMapMarkerAlt /> Location</label>
                    <input
                      type="text"
                      value={formData.personalInfo.location}
                      onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                      disabled={!isEditing}
                      placeholder="City, State, Country"
                    />
                  </div>
                  <div className="form-group">
                    <label><FaLinkedin /> LinkedIn</label>
                    <input
                      type="url"
                      value={formData.personalInfo.linkedin}
                      onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
                      disabled={!isEditing}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div className="form-group">
                    <label><FaGithub /> GitHub</label>
                    <input
                      type="url"
                      value={formData.personalInfo.github}
                      onChange={(e) => handleInputChange('personalInfo', 'github', e.target.value)}
                      disabled={!isEditing}
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                  <div className="form-group">
                    <label><FaGlobe /> Portfolio</label>
                    <input
                      type="url"
                      value={formData.personalInfo.portfolio}
                      onChange={(e) => handleInputChange('personalInfo', 'portfolio', e.target.value)}
                      disabled={!isEditing}
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>
                <div className="form-group full-width">
                  <label>Professional Summary</label>
                  <textarea
                    value={formData.personalInfo.summary}
                    onChange={(e) => handleInputChange('personalInfo', 'summary', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Write a brief summary about yourself, your experience, and career goals..."
                    rows="4"
                  />
                </div>
              </div>

              {/* Education */}
              <div className="form-section">
                <h3><FaGraduationCap /> Education</h3>
                {formData.education.map((edu, index) => (
                  <div key={index} className="array-item">
                    <div className="array-item-header">
                      <span>Education {index + 1}</span>
                      {isEditing && (
                        <button 
                          className="remove-btn"
                          onClick={() => removeArrayItem('education', index)}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Degree</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateArrayItem('education', index, 'degree', e.target.value)}
                          disabled={!isEditing}
                          placeholder="e.g., Bachelor of Science in Computer Science"
                        />
                      </div>
                      <div className="form-group">
                        <label>Institution</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => updateArrayItem('education', index, 'institution', e.target.value)}
                          disabled={!isEditing}
                          placeholder="University Name"
                        />
                      </div>
                      <div className="form-group">
                        <label>Graduation Year</label>
                        <input
                          type="text"
                          value={edu.graduationYear}
                          onChange={(e) => updateArrayItem('education', index, 'graduationYear', e.target.value)}
                          disabled={!isEditing}
                          placeholder="2024"
                        />
                      </div>
                      <div className="form-group">
                        <label>GPA</label>
                        <input
                          type="text"
                          value={edu.gpa}
                          onChange={(e) => updateArrayItem('education', index, 'gpa', e.target.value)}
                          disabled={!isEditing}
                          placeholder="3.8"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {isEditing && (
                  <button 
                    className="add-btn"
                    onClick={() => addArrayItem('education')}
                  >
                    <FaPlus /> Add Education
                  </button>
                )}
              </div>

              {/* Experience */}
              <div className="form-section">
                <h3><FaBriefcase /> Work Experience</h3>
                {formData.experience.map((exp, index) => (
                  <div key={index} className="array-item">
                    <div className="array-item-header">
                      <span>Experience {index + 1}</span>
                      {isEditing && (
                        <button 
                          className="remove-btn"
                          onClick={() => removeArrayItem('experience', index)}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateArrayItem('experience', index, 'company', e.target.value)}
                          disabled={!isEditing}
                          placeholder="Company Name"
                        />
                      </div>
                      <div className="form-group">
                        <label>Position</label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => updateArrayItem('experience', index, 'position', e.target.value)}
                          disabled={!isEditing}
                          placeholder="Job Title"
                        />
                      </div>
                      <div className="form-group">
                        <label><FaCalendarAlt /> Duration</label>
                        <input
                          type="text"
                          value={exp.duration}
                          onChange={(e) => updateArrayItem('experience', index, 'duration', e.target.value)}
                          disabled={!isEditing}
                          placeholder="Jan 2023 - Present"
                        />
                      </div>
                    </div>
                    <div className="form-group full-width">
                      <label>Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateArrayItem('experience', index, 'description', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Describe your responsibilities and achievements..."
                        rows="3"
                      />
                    </div>
                  </div>
                ))}
                {isEditing && (
                  <button 
                    className="add-btn"
                    onClick={() => addArrayItem('experience')}
                  >
                    <FaPlus /> Add Experience
                  </button>
                )}
              </div>

              {/* Skills */}
              <div className="form-section">
                <h3>Skills</h3>
                {formData.skills.map((skill, index) => (
                  <div key={index} className="array-item">
                    <div className="array-item-header">
                      <span>Skill {index + 1}</span>
                      {isEditing && (
                        <button 
                          className="remove-btn"
                          onClick={() => removeArrayItem('skills', index)}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Skill Name</label>
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => updateArrayItem('skills', index, 'name', e.target.value)}
                          disabled={!isEditing}
                          placeholder="e.g., JavaScript, Python, Project Management"
                        />
                      </div>
                      <div className="form-group">
                        <label>Proficiency Level</label>
                        <select
                          value={skill.level}
                          onChange={(e) => updateArrayItem('skills', index, 'level', e.target.value)}
                          disabled={!isEditing}
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                {isEditing && (
                  <button 
                    className="add-btn"
                    onClick={() => addArrayItem('skills')}
                  >
                    <FaPlus /> Add Skill
                  </button>
                )}
              </div>

              {/* Projects */}
              <div className="form-section">
                <h3>Projects</h3>
                {formData.projects.map((project, index) => (
                  <div key={index} className="array-item">
                    <div className="array-item-header">
                      <span>Project {index + 1}</span>
                      {isEditing && (
                        <button 
                          className="remove-btn"
                          onClick={() => removeArrayItem('projects', index)}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Project Title</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => updateArrayItem('projects', index, 'title', e.target.value)}
                          disabled={!isEditing}
                          placeholder="Project Name"
                        />
                      </div>
                      <div className="form-group">
                        <label>Technologies Used</label>
                        <input
                          type="text"
                          value={project.technologies}
                          onChange={(e) => updateArrayItem('projects', index, 'technologies', e.target.value)}
                          disabled={!isEditing}
                          placeholder="React, Node.js, MongoDB"
                        />
                      </div>
                      <div className="form-group">
                        <label>Project Link</label>
                        <input
                          type="url"
                          value={project.link}
                          onChange={(e) => updateArrayItem('projects', index, 'link', e.target.value)}
                          disabled={!isEditing}
                          placeholder="https://github.com/username/project"
                        />
                      </div>
                    </div>
                    <div className="form-group full-width">
                      <label>Description</label>
                      <textarea
                        value={project.description}
                        onChange={(e) => updateArrayItem('projects', index, 'description', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Describe your project, its purpose, and your role..."
                        rows="3"
                      />
                    </div>
                  </div>
                ))}
                {isEditing && (
                  <button 
                    className="add-btn"
                    onClick={() => addArrayItem('projects')}
                  >
                    <FaPlus /> Add Project
                  </button>
                )}
              </div>

              {/* Certifications */}
              <div className="form-section">
                <h3><FaAward /> Certifications</h3>
                {formData.certifications.map((cert, index) => (
                  <div key={index} className="array-item">
                    <div className="array-item-header">
                      <span>Certification {index + 1}</span>
                      {isEditing && (
                        <button 
                          className="remove-btn"
                          onClick={() => removeArrayItem('certifications', index)}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Certification Name</label>
                        <input
                          type="text"
                          value={cert.name}
                          onChange={(e) => updateArrayItem('certifications', index, 'name', e.target.value)}
                          disabled={!isEditing}
                          placeholder="e.g., AWS Certified Developer"
                        />
                      </div>
                      <div className="form-group">
                        <label>Issuing Organization</label>
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) => updateArrayItem('certifications', index, 'issuer', e.target.value)}
                          disabled={!isEditing}
                          placeholder="e.g., Amazon Web Services"
                        />
                      </div>
                      <div className="form-group">
                        <label><FaCalendarAlt /> Date Obtained</label>
                        <input
                          type="text"
                          value={cert.date}
                          onChange={(e) => updateArrayItem('certifications', index, 'date', e.target.value)}
                          disabled={!isEditing}
                          placeholder="January 2024"
                        />
                      </div>
                      <div className="form-group">
                        <label>Credential ID</label>
                        <input
                          type="text"
                          value={cert.credentialId}
                          onChange={(e) => updateArrayItem('certifications', index, 'credentialId', e.target.value)}
                          disabled={!isEditing}
                          placeholder="Optional: Credential ID"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {isEditing && (
                  <button 
                    className="add-btn"
                    onClick={() => addArrayItem('certifications')}
                  >
                    <FaPlus /> Add Certification
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resume' && (
          <div className="resume-section">
            <div className="resume-upload-card">
              <div className="upload-icon">
                <FaUpload />
              </div>
              <h2>Upload Your Resume</h2>
              <p>Upload an ATS-friendly resume to increase your job match rate</p>
              
              <div className="upload-area" onClick={() => document.getElementById('resume-upload').click()}>
                <input 
                  type="file" 
                  id="resume-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <div className="upload-zone">
                  <FaUpload className="upload-zone-icon" />
                  <p>Click to upload or drag and drop</p>
                  <span>PDF, DOC, DOCX (MAX. 10MB)</span>
                </div>
                {selectedFile && (
                  <div className="file-info">
                    <FaFileAlt />
                    <div className="file-details">
                      <span className="file-name">{selectedFile.name}</span>
                      <span className="file-size">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                    <button 
                      className="remove-file-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>

              {selectedFile && (
                <div className="upload-actions">
                  <button className="upload-submit-btn">
                    <FaUpload /> Upload Resume
                  </button>
                  <button className="upload-cancel-btn" onClick={() => setSelectedFile(null)}>
                    Cancel
                  </button>
                </div>
              )}

              <div className="resume-tips">
                <h3>Resume Tips</h3>
                <ul>
                  <li>✓ Use standard section headings (Experience, Education, Skills)</li>
                  <li>✓ Include relevant keywords from job descriptions</li>
                  <li>✓ Keep formatting simple and clean</li>
                  <li>✓ Quantify achievements with numbers</li>
                  <li>✓ Use action verbs (Led, Developed, Implemented)</li>
                </ul>
              </div>
            </div>

            <div className="resume-analysis">
              <h2>ATS Score Analysis</h2>
              <div className="score-circle">
                <svg viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="#e0e0e0" strokeWidth="20"/>
                  <circle cx="100" cy="100" r="90" fill="none" stroke="var(--primary)" strokeWidth="20"
                    strokeDasharray="565" strokeDashoffset="113" 
                    transform="rotate(-90 100 100)"/>
                </svg>
                <div className="score-text">
                  <span className="score-number">85</span>
                  <span className="score-label">ATS Score</span>
                </div>
              </div>
              <div className="analysis-tips">
                <h4>Improvement Suggestions</h4>
                <p>• Add more technical skills</p>
                <p>• Include project links</p>
                <p>• Quantify your achievements</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'training' && (
          <div className="training-section">
            <div className="section-header">
              <h2>Skills Training Courses</h2>
              <p>Enhance your skills with our curated courses</p>
            </div>
            
            <div className="courses-grid">
              {courses.map(course => (
                <div key={course.id} className="course-card">
                  <div className="course-thumbnail">
                    <span>{course.thumbnail}</span>
                  </div>
                  <div className="course-content">
                    <h3>{course.title}</h3>
                    <p className="course-instructor">By {course.instructor}</p>
                    <div className="course-meta">
                      <span className="course-duration">
                        <FaClock /> {course.duration}
                      </span>
                    </div>
                    <div className="course-progress">
                      <div className="progress-info">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <button className="continue-btn">
                      {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="certificates-section">
              <h2><FaCertificate /> Your Certificates</h2>
              <div className="certificates-grid">
                <div className="certificate-card">
                  <div className="certificate-icon">🏆</div>
                  <h4>React Developer</h4>
                  <p>Issued: Jan 2025</p>
                  <button className="view-btn">View Certificate</button>
                </div>
                <div className="certificate-card">
                  <div className="certificate-icon">⭐</div>
                  <h4>JavaScript Expert</h4>
                  <p>Issued: Dec 2024</p>
                  <button className="view-btn">View Certificate</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'interview' && (
          <div className="interview-section">
            <div className="section-header">
              <h2>Interview Preparation</h2>
              <p>Practice with AI-powered mock interviews</p>
            </div>

            <div className="mock-interviews">
              <h3>Available Mock Interviews</h3>
              <div className="interviews-grid">
                {mockInterviews.map(interview => (
                  <div key={interview.id} className="interview-card">
                    <div className={`difficulty-badge ${interview.difficulty.toLowerCase()}`}>
                      {interview.difficulty}
                    </div>
                    <h4>{interview.company}</h4>
                    <p className="interview-type">{interview.type}</p>
                    <div className="interview-meta">
                      <span>⏱️ {interview.duration}</span>
                    </div>
                    <button className="start-interview-btn">
                      Start Interview
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="interview-tips-section">
              <h3>Interview Tips</h3>
              <div className="tips-grid">
                <div className="tip-card">
                  <div className="tip-icon">💡</div>
                  <h4>Research the Company</h4>
                  <p>Understand their products, culture, and recent news</p>
                </div>
                <div className="tip-card">
                  <div className="tip-icon">🎯</div>
                  <h4>Practice STAR Method</h4>
                  <p>Situation, Task, Action, Result for behavioral questions</p>
                </div>
                <div className="tip-card">
                  <div className="tip-icon">📝</div>
                  <h4>Prepare Questions</h4>
                  <p>Have thoughtful questions ready for the interviewer</p>
                </div>
                <div className="tip-card">
                  <div className="tip-icon">⏰</div>
                  <h4>Arrive Early</h4>
                  <p>Join virtual interviews 5 minutes early</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'questions' && (
          <div className="questions-section">
            <div className="section-header">
              <h2>Important Interview Questions</h2>
              <p>Commonly asked questions by top companies</p>
            </div>

            {interviewQuestions.map((category, index) => (
              <div key={index} className="questions-category">
                <h3>{category.category} Questions</h3>
                <div className="questions-list">
                  {category.questions.map((question, qIndex) => (
                    <div key={qIndex} className="question-item">
                      <div className="question-number">{qIndex + 1}</div>
                      <div className="question-content">
                        <p>{question}</p>
                        <button className="view-answer-btn">View Answer</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// FaClock component for course duration
const FaClock = () => <span>⏰</span>;

export default StudentDashboard;
