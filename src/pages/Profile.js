import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaCalendarAlt, FaCamera, FaPen, FaEdit, FaTrash, FaGithub, FaGlobe, FaPhone, FaGraduationCap, FaFileUpload, FaLanguage, FaProjectDiagram, FaUser, FaBriefcase, FaAward, FaSave, FaPlus, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import { getProfile, updateProfile, getSkills, addSkill, deleteSkill, updateSkill } from '../api';
import './Profile.css';

const Profile = () => {
  const [skills, setSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [editingSkillIndex, setEditingSkillIndex] = useState(null);
  const [editingProjectIndex, setEditingProjectIndex] = useState(null);
  const [editingLanguageIndex, setEditingLanguageIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    jobTitle: '',
    location: '',
    bio: '',
    linkedin: '',
    website: '',
    github: '',
    portfolio: '',
    phone: '',
    degree: '',
    graduationYear: '',
    cgpa: '',
    resumeUrl: ''
  });
  const [languages, setLanguages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [profile, setProfile] = useState(null);
  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Technical',
    proficiency: 50
  });
    const [projectForm, setProjectForm] = useState({
      title: '',
      description: '',
      link: ''
    });
    const [languageForm, setLanguageForm] = useState({
      name: '',
      proficiency: 'Fluent'
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      try {
        const [profileData, skillsData] = await Promise.all([getProfile(), getSkills()]);
        if (!active) return;
        setProfile(profileData);
        setForm((prev) => ({
          ...prev,
          jobTitle: profileData.jobTitle || '',
          location: profileData.location || '',
          bio: profileData.bio || '',
          linkedin: profileData.linkedin || '',
          website: profileData.website || '',
          github: profileData.github || '',
          portfolio: profileData.portfolio || '',
          phone: profileData.phone || '',
          degree: profileData.degree || '',
          graduationYear: profileData.graduationYear || '',
          cgpa: profileData.cgpa || '',
          resumeUrl: profileData.resumeUrl || ''
        }));
        setLanguages(profileData.languages || []);
        setProjects(profileData.projects || []);
        setSkills(skillsData || []);
      } catch (err) {
        console.error('Failed to load profile', err);
      }
    };

    loadData();
    return () => {
      active = false;
    };
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        ...form,
        languages,
        projects
      });
      setShowModal(false);
    } catch (err) {
      console.error('Failed to save profile', err);
      alert('Could not save profile. Please try again.');
    }
  };

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setSkillForm((prev) => ({ ...prev, [name]: name === 'proficiency' ? Number(value) : value }));
  };

  const openProfileModal = (targetId) => {
    setShowModal(true);
    requestAnimationFrame(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.focus({ preventScroll: false });
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    if (!skillForm.name.trim()) return;

    try {
      if (editingSkillIndex !== null) {
        const existing = skills[editingSkillIndex];
        if (existing?._id) {
          await updateSkill(existing._id, skillForm);
          setSkills((prev) => prev.map((skill, idx) => 
            idx === editingSkillIndex ? { ...existing, ...skillForm } : skill
          ));
        } else {
          const created = await addSkill(skillForm);
          setSkills((prev) => prev.map((skill, idx) =>
            idx === editingSkillIndex ? created : skill
          ));
        }
        setEditingSkillIndex(null);
      } else {
        const created = await addSkill(skillForm);
        setSkills((prev) => [...prev, created]);
      }
    } catch (err) {
      console.error('Failed to save skill', err);
      alert('Could not save skill. Please try again.');
    }

    setSkillForm({ name: '', category: 'Technical', proficiency: 50 });
    setShowSkillModal(false);
  };

  const handleEditSkill = (index) => {
    setSkillForm(skills[index]);
    setEditingSkillIndex(index);
    setShowSkillModal(true);
  };

  const handleDeleteSkill = async (index) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      const target = skills[index];
      try {
        if (target?._id) await deleteSkill(target._id);
        setSkills((prev) => prev.filter((_, idx) => idx !== index));
      } catch (err) {
        console.error('Failed to delete skill', err);
        alert('Could not delete skill. Please try again.');
      }
    }
  };

    const handleProjectChange = (e) => {
      const { name, value } = e.target;
      setProjectForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleProjectSubmit = (e) => {
      e.preventDefault();
      if (!projectForm.title.trim()) return;
    
      if (editingProjectIndex !== null) {
        setProjects((prev) => prev.map((proj, idx) => 
          idx === editingProjectIndex ? { ...projectForm } : proj
        ));
        setEditingProjectIndex(null);
      } else {
        setProjects((prev) => [...prev, { ...projectForm }]);
      }
    
      setProjectForm({ title: '', description: '', link: '' });
      setShowProjectModal(false);
    };

    const handleEditProject = (index) => {
      setProjectForm(projects[index]);
      setEditingProjectIndex(index);
      setShowProjectModal(true);
    };

    const handleDeleteProject = (index) => {
      if (window.confirm('Are you sure you want to delete this project?')) {
        setProjects((prev) => prev.filter((_, idx) => idx !== index));
      }
    };

    const handleLanguageChange = (e) => {
      const { name, value } = e.target;
      setLanguageForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleLanguageSubmit = (e) => {
      e.preventDefault();
      if (!languageForm.name.trim()) return;
    
      if (editingLanguageIndex !== null) {
        setLanguages((prev) => prev.map((lang, idx) => 
          idx === editingLanguageIndex ? { ...languageForm } : lang
        ));
        setEditingLanguageIndex(null);
      } else {
        setLanguages((prev) => [...prev, { ...languageForm }]);
      }
    
      setLanguageForm({ name: '', proficiency: 'Fluent' });
      setShowLanguageModal(false);
    };

    const handleEditLanguage = (index) => {
      setLanguageForm(languages[index]);
      setEditingLanguageIndex(index);
      setShowLanguageModal(true);
    };

    const handleDeleteLanguage = (index) => {
      if (window.confirm('Are you sure you want to delete this language?')) {
        setLanguages((prev) => prev.filter((_, idx) => idx !== index));
      }
    };

  return (
    <div className="profile-page">
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
              <label>Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={form.jobTitle}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Enter your job title"
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="City, State, Country"
              />
            </div>
            <div className="form-group">
              <label><FaPhone /> Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="form-group">
              <label><FaLinkedin /> LinkedIn</label>
              <input
                type="url"
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div className="form-group">
              <label><FaGithub /> GitHub</label>
              <input
                type="url"
                name="github"
                value={form.github}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="https://github.com/yourusername"
              />
            </div>
            <div className="form-group">
              <label><FaGlobe /> Portfolio</label>
              <input
                type="url"
                name="portfolio"
                value={form.portfolio}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="https://yourportfolio.com"
              />
            </div>
          </div>
          <div className="form-group full-width">
            <label>Bio / About</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Tell us about yourself, your interests, and career goals..."
              rows="4"
            />
          </div>
        </div>

        {/* Education */}
        <div className="form-section">
          <h3><FaGraduationCap /> Education</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Degree</label>
              <input
                type="text"
                name="degree"
                value={form.degree}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="e.g., Bachelor of Science in Computer Science"
              />
            </div>
            <div className="form-group">
              <label>Graduation Year</label>
              <input
                type="text"
                name="graduationYear"
                value={form.graduationYear}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="2024"
              />
            </div>
            <div className="form-group">
              <label>CGPA / Percentage</label>
              <input
                type="text"
                name="cgpa"
                value={form.cgpa}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="3.8"
              />
            </div>
            <div className="form-group">
              <label><FaFileUpload /> Resume URL</label>
              <input
                type="url"
                name="resumeUrl"
                value={form.resumeUrl}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="https://drive.google.com/your-resume"
              />
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className="form-section">
          <h3><FaLanguage /> Languages</h3>
          {languages.length === 0 ? (
            <div className="empty-state">No languages added yet</div>
          ) : (
            <div className="form-grid">
              {languages.map((lang, idx) => (
                <div key={idx} className="form-group">
                  <label>{lang.name}</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ flex: 1 }}>{lang.proficiency}</span>
                    {isEditing && (
                      <>
                        <button 
                          type="button"
                          className="icon-btn" 
                          onClick={() => handleEditLanguage(idx)}
                        >
                          <FaEdit />
                        </button>
                        <button 
                          type="button"
                          className="icon-btn" 
                          onClick={() => handleDeleteLanguage(idx)}
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {isEditing && (
            <button 
              type="button"
              className="add-btn"
              onClick={() => setShowLanguageModal(true)}
            >
              <FaPlus /> Add Language
            </button>
          )}
        </div>

        {/* Projects */}
        <div className="form-section">
          <h3><FaProjectDiagram /> Projects</h3>
          {projects.length === 0 ? (
            <div className="empty-state">Add your projects to showcase your work</div>
          ) : (
            <div className="project-list">
              {projects.map((project, idx) => (
                <div key={idx} className="array-item">
                  <div className="array-item-header">
                    <span>{project.title}</span>
                    {isEditing && (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          type="button"
                          className="icon-btn" 
                          onClick={() => handleEditProject(idx)}
                        >
                          <FaEdit />
                        </button>
                        <button 
                          type="button"
                          className="icon-btn" 
                          onClick={() => handleDeleteProject(idx)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>
                  <p>{project.description}</p>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>
                      View Project →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
          {isEditing && (
            <button 
              type="button"
              className="add-btn"
              onClick={() => setShowProjectModal(true)}
            >
              <FaPlus /> Add Project
            </button>
          )}
        </div>

        {/* Skills */}
        <div className="form-section">
          <h3>Skills</h3>
          {skills.length === 0 ? (
            <div className="empty-state">Add your skills to get started</div>
          ) : (
            <div className="skill-grid">
              {skills.map((skill, idx) => (
                <div key={idx} className="skill-card-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h4 style={{ margin: 0 }}>{skill.name}</h4>
                    {isEditing && (
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button 
                          type="button"
                          className="icon-btn" 
                          onClick={() => handleEditSkill(idx)}
                        >
                          <FaEdit />
                        </button>
                        <button 
                          type="button"
                          className="icon-btn" 
                          onClick={() => handleDeleteSkill(idx)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: '0.85rem', color: '#666' }}>{skill.category}</span>
                  <div style={{ marginTop: '0.5rem', height: '6px', background: '#e0e0e0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${skill.proficiency}%`, background: 'var(--primary)' }}></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {isEditing && (
            <button 
              type="button"
              className="add-btn"
              onClick={() => setShowSkillModal(true)}
            >
              <FaPlus /> Add Skill
            </button>
          )}
        </div>
      </div>

      {showSkillModal && (
        <div className="modal-backdrop" onClick={() => { setShowSkillModal(false); setEditingSkillIndex(null); }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingSkillIndex !== null ? 'Edit Skill' : 'Add New Skill'}</h3>
              <button className="close-btn" onClick={() => { setShowSkillModal(false); setEditingSkillIndex(null); }}>×</button>
            </div>
            <form className="modal-form" onSubmit={handleSkillSubmit}>
              <label>
                Skill Name
                <input
                  name="name"
                  value={skillForm.name}
                  onChange={handleSkillChange}
                  placeholder="e.g. React, Python, Communication"
                  required
                />
              </label>

              <label>
                Category
                <select name="category" value={skillForm.category} onChange={handleSkillChange}>
                  <option>Technical</option>
                  <option>Soft Skill</option>
                  <option>Language</option>
                  <option>Certification</option>
                </select>
              </label>

              <label>
                Proficiency: {skillForm.proficiency}%
                <input
                  type="range"
                  name="proficiency"
                  min="0"
                  max="100"
                  value={skillForm.proficiency}
                  onChange={handleSkillChange}
                />
              </label>

              <div className="modal-actions">
                <button type="button" className="ghost" onClick={() => { setShowSkillModal(false); setEditingSkillIndex(null); }}>Cancel</button>
                <button type="submit" className="primary">{editingSkillIndex !== null ? 'Update Skill' : 'Add Skill'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showProjectModal && (
        <div className="modal-backdrop" onClick={() => { setShowProjectModal(false); setEditingProjectIndex(null); }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingProjectIndex !== null ? 'Edit Project' : 'Add New Project'}</h3>
              <button className="close-btn" onClick={() => { setShowProjectModal(false); setEditingProjectIndex(null); }}>×</button>
            </div>
            <form className="modal-form" onSubmit={handleProjectSubmit}>
              <label>
                Project Title *
                <input
                  name="title"
                  value={projectForm.title}
                  onChange={handleProjectChange}
                  placeholder="e.g. E-commerce Website"
                  required
                />
              </label>

              <label>
                Description *
                <textarea
                  name="description"
                  value={projectForm.description}
                  onChange={handleProjectChange}
                  placeholder="Describe your project, technologies used, and your role..."
                  rows={4}
                  required
                />
              </label>

              <label>
                Project Link
                <input
                  name="link"
                  value={projectForm.link}
                  onChange={handleProjectChange}
                  placeholder="https://github.com/yourproject or live demo link"
                />
              </label>

              <div className="modal-actions">
                <button type="button" className="ghost" onClick={() => { setShowProjectModal(false); setEditingProjectIndex(null); }}>Cancel</button>
                <button type="submit" className="primary">{editingProjectIndex !== null ? 'Update Project' : 'Add Project'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showLanguageModal && (
        <div className="modal-backdrop" onClick={() => { setShowLanguageModal(false); setEditingLanguageIndex(null); }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingLanguageIndex !== null ? 'Edit Language' : 'Add New Language'}</h3>
              <button className="close-btn" onClick={() => { setShowLanguageModal(false); setEditingLanguageIndex(null); }}>×</button>
            </div>
            <form className="modal-form" onSubmit={handleLanguageSubmit}>
              <label>
                Language *
                <input
                  name="name"
                  value={languageForm.name}
                  onChange={handleLanguageChange}
                  placeholder="e.g. English, Spanish, Tamil"
                  required
                />
              </label>

              <label>
                Proficiency *
                <select name="proficiency" value={languageForm.proficiency} onChange={handleLanguageChange} required>
                  <option>Native</option>
                  <option>Fluent</option>
                  <option>Advanced</option>
                  <option>Intermediate</option>
                  <option>Basic</option>
                </select>
              </label>

              <div className="modal-actions">
                <button type="button" className="ghost" onClick={() => { setShowLanguageModal(false); setEditingLanguageIndex(null); }}>Cancel</button>
                <button type="submit" className="primary">{editingLanguageIndex !== null ? 'Update Language' : 'Add Language'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
