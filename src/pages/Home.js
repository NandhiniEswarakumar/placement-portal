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
  FaChevronDown
} from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [scrollY, setScrollY] = useState(0);
  const [particles, setParticles] = useState([]);

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

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer at Google',
      content: 'The AI matching system helped me find my dream job. The interview prep was invaluable!',
      rating: 5,
      avatar: 'PS'
    },
    {
      name: 'Rahul Verma',
      role: 'Product Manager at Microsoft',
      content: 'From campus to corporate in 60 days. The platform guided me every step of the way.',
      rating: 5,
      avatar: 'RV'
    },
    {
      name: 'Ananya Patel',
      role: 'Data Scientist at Amazon',
      content: 'The skill assessment and resume builder features are game-changers for freshers.',
      rating: 5,
      avatar: 'AP'
    }
  ];

  const portalData = {
    students: {
      title: 'Student Portal',
      subtitle: 'Your Career Launchpad',
      features: ['AI Resume Builder', 'Mock Interviews', 'Skill Assessment', 'Job Tracking', 'Career Guidance'],
      color: 'var(--primary)',
      bgGradient: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
      icon: <FaGraduationCap />
    },
    companies: {
      title: 'Company Portal',
      subtitle: 'Find Top Talent',
      features: ['AI Screening', 'Talent Pipeline', 'Campus Drives', 'Analytics Dashboard', 'Bulk Hiring'],
      color: 'var(--growth)',
      bgGradient: 'linear-gradient(135deg, var(--growth) 0%, var(--primary) 100%)',
      icon: <FaBriefcase />
    },
    colleges: {
      title: 'College Portal',
      subtitle: 'Placement Management',
      features: ['Drive Coordination', 'Student Tracking', 'Company Relations', 'Analytics', 'Report Generation'],
      color: 'var(--joy)',
      bgGradient: 'linear-gradient(135deg, var(--joy) 0%, var(--primary) 100%)',
      icon: <FaSchool />
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="particles">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="particle"
                style={{
                  left: `${particle.left}%`,
                  animationDelay: `${particle.animationDelay}s`,
                  animationDuration: `${particle.duration}s`
                }}
              />
            ))}
          </div>
          <div className="floating-shapes">
            <div className="shape shape-1" style={{ transform: `translateY(${scrollY * 0.3}px)` }}></div>
            <div className="shape shape-2" style={{ transform: `translateY(${scrollY * 0.2}px)` }}></div>
            <div className="shape shape-3" style={{ transform: `translateY(${scrollY * 0.4}px)` }}></div>
            <div className="shape shape-4" style={{ transform: `translateY(${scrollY * 0.25}px)` }}></div>
          </div>
        </div>
        
        <div className="hero-content">
          
          <h1 className="hero-title">
            Transform Your <span className="gradient-text">Career</span>
            <br />
            with Rookdesk placement portal
          </h1>
          
          <p className="hero-subtitle">
            Your Ultimate Career Companion 
            <br/>
            Connect. Learn. Achieve. Succeed.
            <br/>
            <span style={{ fontSize: '0.9rem', marginTop: '0.5rem', display: 'block' }}>
              Empowering 50,000+ students to land dream roles with expert guidance, 
              smart resume optimization, and personalized interview coaching.
            </span>
          </p>
          
          <div className="hero-actions">
            <Link to="/signup" className="btn-primary btn-glow">
              <FaRocket /> Start Your Journey
              <FaArrowRight />
            </Link>
            <button className="btn-secondary">
              <FaPlay /> See It In Action
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Success Stories</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Placement Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">AI Support</div>
            </div>
          </div>
          
          <div className="scroll-indicator">
            <FaChevronDown />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose Our Platform?</h2>
          <p>Comprehensive tools designed for your success</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card" style={{ '--accent-color': feature.color }}>
              <div className="feature-icon" style={{ background: `${feature.color}20`, color: feature.color }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
              <div className="feature-hover"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Portal Section */}
      <section className="portal-section">
        <div className="section-header">
          <h2>Choose Your Path</h2>
          <p>Tailored experience for every stakeholder</p>
        </div>
        
        <div className="portal-tabs">
          {Object.keys(portalData).map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {portalData[tab].icon}
              {portalData[tab].title}
            </button>
          ))}
        </div>
        
        <div className="portal-content">
          <div className="portal-visual" style={{ background: portalData[activeTab].bgGradient }}>
            <div className="portal-icon">
              {portalData[activeTab].icon}
            </div>
          </div>
          
          <div className="portal-info">
            <h3>{portalData[activeTab].title}</h3>
            <p>{portalData[activeTab].subtitle}</p>
            
            <ul className="portal-features">
              {portalData[activeTab].features.map((feature, idx) => (
                <li key={idx}>
                  <FaCheckCircle />
                  {feature}
                </li>
              ))}
            </ul>
            
            <Link to={`/${activeTab === 'students' ? 'student' : activeTab === 'companies' ? 'hr' : 'placement'}-dashboard`} 
                  className="btn-portal">
              Explore {portalData[activeTab].title}
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>Success Stories</h2>
          <p>Hear from our successful alumni</p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">{testimonial.avatar}</div>
                <div className="testimonial-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
              <p className="testimonial-content">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <div className="cta-text">
            <h2>Ready to Launch Your Career?</h2>
            <p>Join thousands of students who've already secured their dream jobs</p>
          </div>
          <div className="cta-actions">
            <Link to="/signup" className="btn-primary btn-large">
              <FaRocket /> Start Your Journey
            </Link>
            <Link to="/login" className="btn-outline btn-large">
              <FaCloudUploadAlt /> Upload Resume
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
