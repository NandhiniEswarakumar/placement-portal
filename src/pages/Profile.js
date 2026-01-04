import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaCalendarAlt, FaCamera, FaPen, FaPlus } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import './Profile.css';
import EditProfile from './EditProfile';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [form, setForm] = useState({
    jobTitle: '',
    location: '',
    bio: '',
    linkedin: '',
    website: ''
  });
  const [displayName, setDisplayName] = useState('');
  const [skillForm, setSkillForm] = useState({
    name: '',
    proficiency: 50
  });
  const skillNameRef = React.useRef(null);
  const [profileExists, setProfileExists] = useState(false);
  const [showInlineEditor, setShowInlineEditor] = useState(false);

  const profileStorageKey = (email) => `profile:${email}`;

  const loadProfileForUser = (usr) => {
    if (!usr || !usr.email) {
      setForm({ jobTitle: '', location: '', bio: '', linkedin: '', website: '' });
      setSkills([]);
      setProfileExists(false);
      setDisplayName('');
      return;
    }
    const raw = localStorage.getItem(profileStorageKey(usr.email));
    const data = raw ? JSON.parse(raw) : null;
    // set display name from user if present, otherwise use email prefix
    setDisplayName(usr.name || (usr.email ? usr.email.split('@')[0] : ''));
    if (data) {
      setForm({
        jobTitle: data.jobTitle || '',
        location: data.location || '',
        bio: data.bio || '',
        linkedin: data.linkedin || '',
        website: data.website || ''
      });
      setSkills(data.skills || []);
      setProfileExists(true);
    } else {
      // new user: empty profile
      setForm({ jobTitle: '', location: '', bio: '', linkedin: '', website: '' });
      setSkills([]);
      setProfileExists(false);
    }
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    setUser(currentUser);
    loadProfileForUser(currentUser);

    const handleUserChanged = () => {
      const cur = JSON.parse(localStorage.getItem('user'));
      setUser(cur);
      loadProfileForUser(cur);
    };

    window.addEventListener('userChanged', handleUserChanged);
    window.addEventListener('storage', handleUserChanged);
    return () => {
      window.removeEventListener('userChanged', handleUserChanged);
      window.removeEventListener('storage', handleUserChanged);
    };
  }, []);

  const saveProfileToStorage = (email, profileData) => {
    if (!email) return;
    localStorage.setItem(profileStorageKey(email), JSON.stringify(profileData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!user || !user.email) {
      // If no logged-in user, send to login
      navigate('/login');
      return;
    }
    // persist profile for this user (include fullName)
    const payload = { fullName: displayName, ...form, skills };
    saveProfileToStorage(user.email, payload);

    // update the user's display name in the 'user' object and persist
    const updatedUser = { ...user, name: displayName };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    window.dispatchEvent(new Event('userChanged'));

    // notify listeners that this profile changed and include profile data
    try { window.dispatchEvent(new CustomEvent('profileUpdated', { detail: { email: user.email, profile: payload } })); } catch (e) { /* ignore */ }

    setProfileExists(true);
    setShowModal(false);

    // quick confirmation and navigate to public profile
    try { window.alert('Profile saved'); } catch (e) { /* ignore */ }
    navigate(`/users/${encodeURIComponent(user.email)}`);
  };

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setSkillForm((prev) => ({ ...prev, [name]: name === 'proficiency' ? Number(value) : value }));
  };

  const handleSkillSubmit = (e) => {
    e.preventDefault();
    if (!skillForm.name.trim()) return;
    const updated = [...skills, { ...skillForm }];
    setSkills(updated);
    setSkillForm({ name: '', proficiency: 50 });
    setShowSkillModal(false);

    if (user && user.email) {
      // persist as we add skills (keep fullName if present)
      const payload = { fullName: displayName, ...form, skills: updated };
      saveProfileToStorage(user.email, payload);
      setProfileExists(true);
      try { window.dispatchEvent(new CustomEvent('profileUpdated', { detail: { email: user.email } })); } catch (e) { /* ignore */ }
    }
  };

  const handleSkillAddKeep = (e) => {
    // keep modal open and add skill
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    if (!skillForm.name.trim()) return;
    const updated = [...skills, { ...skillForm }];
    setSkills(updated);
    setSkillForm({ name: '', proficiency: 50 });

    if (user && user.email) {
      const payload = { fullName: displayName, ...form, skills: updated };
      saveProfileToStorage(user.email, payload);
      setProfileExists(true);
      try { window.dispatchEvent(new CustomEvent('profileUpdated', { detail: { email: user.email, profile: payload } })); } catch (e) { /* ignore */ }
    }

    // small feedback and refocus skill input so user can add many skills quickly
    try { window.alert('Skill added'); } catch (e) { /* ignore */ }
    setTimeout(() => skillNameRef.current && skillNameRef.current.focus(), 0);
  }; 

  // Close modals when route changes (safety)
  const location = useLocation();
  useEffect(() => {
    setShowModal(false);
    setShowSkillModal(false);
  }, [location.pathname]);

  return (
    <div className="profile-page">
      {/* When inline editor is open show only the editor form */}
      {showInlineEditor ? (
        <div className="card" style={{ marginTop: 16 }}>
          <h3 style={{ marginTop: 0 }}>{profileExists ? 'Edit Profile' : "Let's build your profile"}</h3>
          <EditProfile inline={true} onSaved={(email) => {
            const cur = JSON.parse(localStorage.getItem('user'));
            setUser(cur);
            loadProfileForUser(cur);
            setShowInlineEditor(false);
            setProfileExists(true);
            try { window.alert('Profile saved'); } catch (e) { /* ignore */ }
            navigate(`/users/${encodeURIComponent(email)}`);
          }} onCancel={() => setShowInlineEditor(false)} />
        </div>
      ) : (
        <>
          <div className="profile-banner">
            <div className="avatar-wrap">
              <div className="avatar">{user ? (user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()) : 'G'}</div>
              <button className="avatar-edit" aria-label="Upload avatar">
                <FaCamera />
              </button>
            </div>
            <div>
              <h1>{user ? (user.name || user.email.split('@')[0]) : 'Guest'}</h1>
              <p className="subtitle">{form.jobTitle || 'Add your job title'}</p>
              <div className="meta-row">
                <span><FaEnvelope /> {user ? user.email : 'not-signed-in@example.com'}</span>
                <span><FaCalendarAlt /> {user && user.joined ? `Joined ${user.joined}` : 'Joined -'}</span>
              </div>
            </div>
            <button className="edit-btn" onClick={() => setShowInlineEditor(true)}>
              <FaPen /> {profileExists ? 'Edit Profile' : 'Add Profile'}
            </button>
          </div>

          {!profileExists && (
            <div className="add-profile-card">
              <div className="card-art">✨</div>
              <div className="card-body">
                <h2>Welcome! Let's create your profile</h2>
                <p>Add information about yourself to attract employers — your headline, bio, skills and links.</p>
                <div className="card-actions">
                  <button className="primary" onClick={() => setShowInlineEditor(true)}>Add Profile</button>
                  <button className="ghost" onClick={() => navigate('/')}>Maybe later</button>
                </div>
              </div>
            </div>
          )}

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
        </>
      )}

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{profileExists ? 'Edit Profile' : "Let's build your profile"}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form className="modal-form grid-form" onSubmit={handleSave}>
              <div className="form-col">
                <label>
                  Full Name
                  <input name="fullName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="e.g. John Doe" />
                </label>
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
                  LinkedIn URL
                  <input
                    name="linkedin"
                    value={form.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </label>
              </div>

              <div className="form-col">
                <label>
                  Bio
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                    rows={8}
                  />
                </label>

                <div className="skills-preview">
                  <h4>Your Skills</h4>
                  {skills.length === 0 ? (
                    <div className="empty">No skills yet. Add skills after saving.</div>
                  ) : (
                    <div className="skill-list">
                      {skills.map((s, idx) => (
                        <div key={idx} className="skill-card">
                          <strong>{s.name}</strong>
                          <span className="percent">{s.proficiency}%</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ marginTop: 12 }}>
                    <button type="button" className="small-btn" onClick={() => { setShowSkillModal(true); }}>Add Skill</button>
                  </div>
                </div>
              </div>

              <div className="modal-actions full-width">
                <button type="button" className="ghost" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="primary">{profileExists ? 'Save Changes' : 'Create Profile'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

        {showSkillModal && (
          <div className="modal-backdrop" onClick={() => setShowSkillModal(false)}>
            <div className="modal small-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Add New Skill</h3>
                <button className="close-btn" onClick={() => setShowSkillModal(false)}>×</button>
              </div>
              <form className="modal-form" onSubmit={handleSkillSubmit}>
                <label>
                  Skill Name
                  <input
                    name="name"
                    ref={skillNameRef}
                    value={skillForm.name}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSkillAddKeep(); } }}
                    onChange={handleSkillChange}
                    placeholder="e.g. React, Python, Communication"
                    required
                  />
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
                  <button type="button" className="small-btn" onClick={handleSkillAddKeep}><FaPlus /> Add</button>
                  <button type="submit" className="primary">Add & Close</button>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
  );
};

export default Profile;
