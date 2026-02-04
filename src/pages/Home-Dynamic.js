import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaRocket, 
  FaShieldAlt, 
  FaBolt, 
  FaChartLine, 
  FaUsers, 
  FaCloudUploadAlt,
  FaGraduationCap,
  FaBriefcase,
  FaArrowRight,
  FaPlay,
  FaStar,
  FaCheckCircle,
  FaSchool,
  FaChevronDown,
  FaSpinner,
  FaMapMarkerAlt,
  FaIndianRupeeSign
} from 'react-icons/fa';
import { getJobs, getTestimonials, getPlacementStats } from '../api';
import './Home.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [scrollY, setScrollY] = useState(0);
  const [particles, setParticles] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState({ activeDrives: 0, registeredStudents: 0, partnerCompanies: 0, placementsYTD: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Generate particles
    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 15,
        duration: 15 + Math.random() * 10
      });
    }
    setParticles(newParticles);
  }, []);

  // Fetch dynamic data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [jobsData, testimonialsData] = await Promise.all([
          getJobs({ limit: 3 }),
          getTestimonials()
        ]);
        setJobs(jobsData);
        setTestimonials(testimonialsData.slice(0, 3));

        // Fetch stats with auth if available
        try {
          const statsData = await getPlacementStats();
          setStats(statsData);
        } catch (err) {
          console.log('Stats require auth');
        }
      } catch (err) {
        console.error('Failed to fetch home data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const features = [
    {
      icon: <FaBolt />,
      title: 'AI-Powered Matching',
      desc: 'Advanced algorithms match you with perfect opportunities based on skills, preferences, and career goals.',
      color: 'var(--trust)'
    },
    {
      icon: <FaChartLine />, 
      title: 'Career Analytics', 
      desc: 'Track your progress with detailed insights on applications, interviews, and skill development.',
      color: 'var(--growth)'
    },
    {
      icon: <FaShieldAlt />, 
      title: 'ATS Optimization', 
      desc: 'Built-in ATS scanner ensures your resume passes through automated filters seamlessly.',
      color: 'var(--joy)'
    },
    {
      icon: <FaUsers />, 
      title: 'Network Building', 
      desc: 'Connect with professionals, alumni, and recruiters in your industry.',
      color: 'var(--creative)'
    }
  ];

  const portalData = {
    students: {
      title: 'Student Portal',
      subtitle: 'Your Career Launchpad',
      features: [
        { icon: '✓', text: 'AI Resume Builder' },
        { icon: '✓', text: 'Mock Interviews' },
        { icon: '✓', text: 'Skill Assessment' },
        { icon: '✓', text: 'Job Tracking' },
        { icon: '✓', text: 'Career Guidance' }
      ],
      description: 'Everything you need to launch your career successfully.',
      color: '#0ea5e9'
    },
    companies: {
      title: 'Company Portal',
      subtitle: 'Find Top Talent',
      features: [
        { icon: '✓', text: 'Post Unlimited Jobs' },
        { icon: '✓', text: 'AI Resume Screening' },
        { icon: '✓', text: 'Interview Scheduling' },
        { icon: '✓', text: 'Analytics Dashboard' },
        { icon: '✓', text: '24/7 Support' }
      ],
      description: 'Connect with pre-vetted candidates who match your requirements.',
      color: '#f59e0b'
    },
    college: {
      title: 'College Portal',
      subtitle: 'Campus Placement Management',
      features: [
        { icon: '✓', text: 'Placement Drives' },
        { icon: '✓', text: 'Student Registry' },
        { icon: '✓', text: 'Reports & Analytics' },
        { icon: '✓', text: 'Company Directory' },
        { icon: '✓', text: 'Alumni Network' }
      ],
      description: 'Manage all campus placement activities in one platform.',
      color: '#8b5cf6'
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          {particles.map(p => (
            <div key={p.id} className="particle" style={{
              left: `${p.left}%`,
              animation: `float ${p.duration}s linear infinite`,
              animationDelay: `${p.animationDelay}s`
            }}></div>
          ))}
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <div className="badge">
              <FaRocket /> Launching Dreams, Building Futures
            </div>
            <h1>Your Gateway to<br/><span>Dream Opportunities</span></h1>
            <p>Connect with top companies, master your skills, and land your dream job through our AI-powered placement platform.</p>
            
            <div className="hero-actions">
              <Link to="/jobs" className="primary-btn">
                Explore Jobs <FaArrowRight />
              </Link>
              <button className="ghost-btn">
                <FaPlay /> Watch Demo
              </button>
            </div>

            {!loading && stats.placementsYTD > 0 && (
              <div className="hero-stats">
                <div className="stat">
                  <h3>{stats.placementsYTD}+</h3>
                  <p>Placements</p>
                </div>
                <div className="stat">
                  <h3>{stats.partnerCompanies}+</h3>
                  <p>Partner Companies</p>
                </div>
                <div className="stat">
                  <h3>{stats.activeDrives}+</h3>
                  <p>Active Drives</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      {!loading && jobs.length > 0 && (
        <section className="featured-jobs-section">
          <div className="container">
            <h2>Featured Opportunities</h2>
            <p>Latest job openings from top companies</p>
            <div className="jobs-grid">
              {jobs.slice(0, 3).map(job => (
                <Link key={job._id} to={`/jobs`} className="job-card">
                  <div className="job-header">
                    <h3>{job.position}</h3>
                    <span className="job-type">{job.jobType}</span>
                  </div>
                  <p className="company">{job.company}</p>
                  <div className="job-meta">
                    <span><FaMapMarkerAlt /> {job.location}</span>
                    {job.salary?.min && (
                      <span><FaIndianRupeeSign /> {job.salary.min}K - {job.salary.max}K</span>
                    )}
                  </div>
                  <div className="job-skills">
                    {job.skills?.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/jobs" className="view-all-btn">View All Jobs →</Link>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Choose RookDesk?</h2>
          <div className="features-grid">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portals Section */}
      <section className="portals-section">
        <div className="container">
          <h2>Three Ways to Connect</h2>
          <div className="portal-tabs">
            {['students', 'companies', 'college'].map(tab => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'students' && <FaGraduationCap />}
                {tab === 'companies' && <FaBriefcase />}
                {tab === 'college' && <FaSchool />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="portal-content">
            <div className="portal-visual" style={{ background: `linear-gradient(135deg, ${portalData[activeTab].color}22, ${portalData[activeTab].color}08)` }}>
              <div className="portal-icon">{activeTab === 'students' ? <FaGraduationCap size={80} /> : activeTab === 'companies' ? <FaBriefcase size={80} /> : <FaSchool size={80} />}</div>
            </div>

            <div className="portal-info">
              <h2>{portalData[activeTab].title}</h2>
              <p className="subtitle">{portalData[activeTab].subtitle}</p>
              <p>{portalData[activeTab].description}</p>
              
              <div className="features-list">
                {portalData[activeTab].features.map((feature, idx) => (
                  <div key={idx} className="feature-item">
                    <FaCheckCircle className="check-icon" />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              <Link to={activeTab === 'students' ? '/student-dashboard' : activeTab === 'companies' ? '/company-portal' : '/college-portal'} className="explore-btn">
                Explore {portalData[activeTab].title} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {!loading && testimonials.length > 0 && (
        <section className="testimonials-section">
          <div className="container">
            <h2>Success Stories</h2>
            <p>Hear from students who've achieved their dreams</p>
            <div className="testimonials-grid">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="testimonial-card">
                  <div className="stars">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <FaStar key={i} className="star" />
                    ))}
                  </div>
                  <p className="quote">"{testimonial.message}"</p>
                  <div className="author">
                    <div className="avatar">{testimonial.name?.charAt(0) || 'U'}</div>
                    <div>
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.position} at {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Launch Your Career?</h2>
          <p>Join thousands of students who've secured their dream jobs</p>
          <Link to="/signup" className="cta-btn">Start Your Journey →</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
