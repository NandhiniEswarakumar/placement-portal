import React, { useState } from 'react';
import { FaEnvelope, FaCalendarAlt, FaCamera, FaPen } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const [skills, setSkills] = useState([
    { name: 'React', category: 'Technical', proficiency: 85 },
    { name: 'Communication', category: 'Soft Skill', proficiency: 75 }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [form, setForm] = useState({
    jobTitle: '',
    location: '',
    bio: '',
    linkedin: '',
    website: ''
  });
  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Technical',
    proficiency: 50
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setSkillForm((prev) => ({ ...prev, [name]: name === 'proficiency' ? Number(value) : value }));
  };

  const handleSkillSubmit = (e) => {
    e.preventDefault();
    if (!skillForm.name.trim()) return;
    setSkills((prev) => [...prev, { ...skillForm }]);
    setSkillForm({ name: '', category: 'Technical', proficiency: 50 });
    setShowSkillModal(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-banner">
        <div className="avatar-wrap">
          <div className="avatar">n</div>
          <button className="avatar-edit" aria-label="Upload avatar">
            <FaCamera />
          </button>
        </div>
        <div>
          <h1>nandhinieswarakumar</h1>
          <p className="subtitle">{form.jobTitle || 'Add your job title'}</p>
          <div className="meta-row">
            <span><FaEnvelope /> nandhinieswarakumar@gmail.com</span>
            <span><FaCalendarAlt /> Joined December 2025</span>
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
          <div className="card-header">
            <h3>Skills</h3>
            <button className="small-btn" onClick={() => setShowSkillModal(true)}>Add Skill</button>
          </div>
          {skills.length === 0 ? (
            <div className="empty">No skills added yet. Add your first skill to get started.</div>
          ) : (
            <div className="skill-list">
              {skills.map((skill, idx) => (
                <div key={idx} className="skill-card">
                  <div className="skill-top">
                    <h4>{skill.name}</h4>
                    <span className="pill">{skill.category}</span>
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
                Job Title
                <input
                  name="jobTitle"
                  value={form.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineer"
                />
              </label>
              <label>
                Location
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. San Francisco, CA"
                />
              </label>
              <label>
                Bio
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              </label>
              <label>
                LinkedIn URL
                <input
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </label>
              <label>
                Website
                <input
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://yourwebsite.com"
                />
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
          <div className="modal-backdrop" onClick={() => setShowSkillModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Add New Skill</h3>
                <button className="close-btn" onClick={() => setShowSkillModal(false)}>×</button>
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
                  <button type="button" className="ghost" onClick={() => setShowSkillModal(false)}>Cancel</button>
                  <button type="submit" className="primary">Add Skill</button>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
  );
};

export default Profile;
