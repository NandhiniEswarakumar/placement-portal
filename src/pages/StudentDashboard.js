import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  FaUpload, FaBook, FaMicrophone, FaQuestionCircle, 
  FaChartLine, FaCertificate, FaFileAlt, FaCheckCircle 
} from 'react-icons/fa';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get('tab');
    const validTabs = ['overview', 'resume', 'training', 'interview', 'questions'];
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

  const skills = [
    { name: 'JavaScript', progress: 85, color: '#f7df1e' },
    { name: 'React', progress: 90, color: '#61dafb' },
    { name: 'Python', progress: 75, color: '#3776ab' },
    { name: 'Communication', progress: 80, color: '#667eea' }
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

        {activeTab === 'resume' && (
          <div className="resume-section">
            <div className="resume-upload-card">
              <div className="upload-icon">
                <FaUpload />
              </div>
              <h2>Upload Your Resume</h2>
              <p>Upload an ATS-friendly resume to increase your job match rate</p>
              
              <div className="upload-area">
                <input 
                  type="file" 
                  id="resume-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="resume-upload" className="upload-btn">
                  Choose File
                </label>
                {selectedFile && (
                  <div className="file-info">
                    <FaFileAlt />
                    <span>{selectedFile.name}</span>
                  </div>
                )}
              </div>

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
                  <circle cx="100" cy="100" r="90" fill="none" stroke="#667eea" strokeWidth="20"
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
