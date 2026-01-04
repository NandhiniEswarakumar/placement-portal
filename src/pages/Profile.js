import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaCalendarAlt, FaCamera, FaPen, FaEdit, FaTrash, FaGithub, FaGlobe, FaPhone, FaGraduationCap, FaFileUpload, FaLanguage, FaProjectDiagram } from 'react-icons/fa';
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
      <div className="profile-banner">
        <div className="avatar-wrap">
          <div className="avatar">{(profile?.name || 'N')[0].toUpperCase()}</div>
          <button className="avatar-edit" aria-label="Upload avatar">
            <FaCamera />
          </button>
        </div>
        <div>
          <h1>{profile?.name || 'Your Name'}</h1>
          <p className="subtitle">{form.jobTitle || 'Add your job title'}</p>
          <div className="meta-row">
            <span><FaEnvelope /> {profile?.email || 'your.email@example.com'}</span>
            <span>
              <FaCalendarAlt />{' '}
              {profile?.joinedAt
                ? `Joined ${new Date(profile.joinedAt).toLocaleString('default', { month: 'long', year: 'numeric' })}`
                : 'Recently joined'}
            </span>
          </div>
        </div>
        <button className="edit-btn" onClick={() => setShowModal(true)}>
          <FaPen /> Edit Profile
        </button>
      </div>

      <div className="profile-grid">
        <div className="card">
          <h3>About</h3>
          <p>{form.bio || 'Add a bio to tell employers about yourself.'}</p>
        </div>

        <div className="card">
          <h3>Contact & Links</h3>
          <div className="info-list">
            {form.phone && <div className="info-item"><FaPhone /> {form.phone}</div>}
            {form.linkedin && <div className="info-item"><FaEnvelope /> <a href={form.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></div>}
            {form.github && <div className="info-item"><FaGithub /> <a href={form.github} target="_blank" rel="noopener noreferrer">GitHub</a></div>}
            {form.portfolio && <div className="info-item"><FaGlobe /> <a href={form.portfolio} target="_blank" rel="noopener noreferrer">Portfolio</a></div>}
            {form.website && <div className="info-item"><FaGlobe /> <a href={form.website} target="_blank" rel="noopener noreferrer">Website</a></div>}
            {!form.phone && !form.linkedin && !form.github && !form.portfolio && !form.website && (
              <div className="empty">Add your contact information and links</div>
            )}
          </div>
        </div>

        <div className="card">
          <h3>Education</h3>
          <div className="info-list">
            {form.degree && <div className="info-item"><FaGraduationCap /> {form.degree}</div>}
            {form.graduationYear && <div className="info-item"><FaCalendarAlt /> Graduating in {form.graduationYear}</div>}
            {form.cgpa && <div className="info-item">CGPA: {form.cgpa}</div>}
            {!form.degree && !form.graduationYear && !form.cgpa && (
              <div className="empty">Add your educational details</div>
            )}
          </div>
        </div>

        <div className="card">
          <h3>Resume</h3>
          {form.resumeUrl ? (
            <div className="resume-preview">
              <FaFileUpload size={32} />
              <a href={form.resumeUrl} target="_blank" rel="noopener noreferrer" className="resume-link">View Resume</a>
            </div>
          ) : (
            <div className="empty">Upload your resume</div>
          )}
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Languages</h3>
            <button type="button" className="action-link" onClick={() => setShowLanguageModal(true)}>Add Language</button>
          </div>
          {languages.length === 0 ? (
            <div className="empty">Add languages you speak</div>
          ) : (
            <div className="language-list">
              {languages.map((lang, idx) => (
                <div key={idx} className="language-item">
                  <div className="language-content">
                    <FaLanguage /> {lang.name} - <span className="proficiency-text">{lang.proficiency}</span>
                  </div>
                  <div className="skill-actions">
                    <button 
                      className="icon-btn edit-icon" 
                      onClick={() => handleEditLanguage(idx)}
                      aria-label="Edit language"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="icon-btn delete-icon" 
                      onClick={() => handleDeleteLanguage(idx)}
                      aria-label="Delete language"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Projects</h3>
            <button type="button" className="action-link" onClick={() => setShowProjectModal(true)}>Add Project</button>
          </div>
          {projects.length === 0 ? (
            <div className="empty">Add your projects to showcase your work</div>
          ) : (
            <div className="project-list">
              {projects.map((project, idx) => (
                <div key={idx} className="project-item">
                  <div className="project-header">
                    <FaProjectDiagram />
                    <h4>{project.title}</h4>
                    <div className="skill-actions" style={{marginLeft: 'auto'}}>
                      <button 
                        className="icon-btn edit-icon" 
                        onClick={() => handleEditProject(idx)}
                        aria-label="Edit project"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="icon-btn delete-icon" 
                        onClick={() => handleDeleteProject(idx)}
                        aria-label="Delete project"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <p>{project.description}</p>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">View Project →</a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Skills</h3>
            <button type="button" className="action-link" onClick={() => setShowSkillModal(true)}>Add Skill</button>
          </div>
          {skills.length === 0 ? (
            <div className="empty">No skills added yet. Add your first skill to get started.</div>
          ) : (
            <div className="skill-list">
              {skills.map((skill, idx) => (
                <div key={idx} className="skill-card">
                  <div className="skill-top">
                    <div className="skill-info">
                      <h4>{skill.name}</h4>
                      <span className="pill">{skill.category}</span>
                    </div>
                    <div className="skill-actions">
                      <button 
                        className="icon-btn edit-icon" 
                        onClick={() => handleEditSkill(idx)}
                        aria-label="Edit skill"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="icon-btn delete-icon" 
                        onClick={() => handleDeleteSkill(idx)}
                        aria-label="Delete skill"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <div className="skill-progress-row">
                    <div className="progress-bar">
                      <div style={{ width: `${skill.proficiency}%` }} />
                    </div>
                    <span className="percent">{skill.proficiency}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Profile</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form className="modal-form" onSubmit={handleSave}>
              <label>
                Job Title / Role *
                <input
                  name="jobTitle"
                  value={form.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g. Full Stack Developer"
                  required
                />
              </label>

              <label>
                Location *
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Chennai, India"
                  required
                />
              </label>

              <label>
                Phone Number *
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 98765 43210"
                  required
                />
              </label>

              <label>
                Bio / About *
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself, your interests, and career goals..."
                  rows={4}
                  required
                />
              </label>

              <h4 style={{marginTop: '16px', marginBottom: '8px', fontSize: '1rem', fontWeight: '600'}}>Education</h4>
              
              <label>
                Degree / Program *
                <input
                  name="degree"
                  value={form.degree}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech in Computer Science"
                  required
                />
              </label>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
                <label>
                  Graduation Year *
                  <input
                    name="graduationYear"
                    value={form.graduationYear}
                    onChange={handleChange}
                    placeholder="e.g. 2026"
                    required
                  />
                </label>

                <label>
                  CGPA / Percentage *
                  <input
                    name="cgpa"
                    value={form.cgpa}
                    onChange={handleChange}
                    placeholder="e.g. 8.5"
                    required
                  />
                </label>
              </div>

              <h4 style={{marginTop: '16px', marginBottom: '8px', fontSize: '1rem', fontWeight: '600'}}>Links & Profiles</h4>

              <label>
                LinkedIn URL *
                <input
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                  required
                />
              </label>

              <label>
                GitHub Profile *
                <input
                  name="github"
                  value={form.github}
                  onChange={handleChange}
                  placeholder="https://github.com/yourusername"
                  required
                />
              </label>

              <label>
                Portfolio Website *
                <input
                  name="portfolio"
                  value={form.portfolio}
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                  required
                />
              </label>

              <label>
                Other Website
                <input
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://yourwebsite.com"
                />
              </label>

              <label>
                Resume URL *
                <input
                  name="resumeUrl"
                  value={form.resumeUrl}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/your-resume-link"
                  required
                />
                <small style={{fontSize: '0.85rem', color: '#6b7280', marginTop: '4px'}}>
                  Upload your resume to Google Drive or Dropbox and paste the shareable link
                </small>
              </label>

              <div className="modal-actions">
                <button type="button" className="ghost" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

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
