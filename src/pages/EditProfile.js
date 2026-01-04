import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import './Profile.css';

const EditProfile = ({ inline = false, onSaved = null, onCancel = null }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [form, setForm] = useState({ jobTitle: '', location: '', bio: '', linkedin: '', website: '' });
  const [skills, setSkills] = useState([]);
  const [skillForm, setSkillForm] = useState({ name: '', proficiency: 50 });
  const skillNameRef = React.useRef(null);
  const [skillMsg, setSkillMsg] = useState('');
  // inline skill editing
  const [editingIndex, setEditingIndex] = useState(null);
  const [editableSkill, setEditableSkill] = useState({ name: '', proficiency: 50 });

  const startEditSkill = (idx) => {
    setEditingIndex(idx);
    setEditableSkill({ ...skills[idx] });
  };

  const updateEditableSkill = (field, value) => {
    setEditableSkill((prev) => ({ ...prev, [field]: value }));
  };

  const saveSkillEdit = (idx) => {
    const updated = skills.slice();
    updated[idx] = { ...editableSkill };
    setSkills(updated);
    setEditingIndex(null);
    setEditableSkill({ name: '', proficiency: 50 });
  };

  const cancelSkillEdit = () => {
    setEditingIndex(null);
    setEditableSkill({ name: '', proficiency: 50 });
  };

  const removeSkill = (idx) => {
    setSkills((prev) => prev.filter((_, i) => i !== idx));
  };

  const profileStorageKey = (email) => `profile:${email}`;
  const loadProfile = (usr) => {
    if (!usr || !usr.email) return;
    const raw = localStorage.getItem(profileStorageKey(usr.email));
    const data = raw ? JSON.parse(raw) : null;
    setDisplayName(usr.name || usr.email.split('@')[0]);
    if (data) {
      setForm({ jobTitle: data.jobTitle || '', location: data.location || '', bio: data.bio || '', linkedin: data.linkedin || '', website: data.website || '' });
      setSkills(data.skills || []);
    } else {
      setForm({ jobTitle: '', location: '', bio: '', linkedin: '', website: '' });
      setSkills([]);
    }
  };

  useEffect(() => {
    const cur = JSON.parse(localStorage.getItem('user'));
    setUser(cur);
    loadProfile(cur);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setSkillForm((prev) => ({ ...prev, [name]: name === 'proficiency' ? Number(value) : value }));
  };

  const addSkill = (e) => {
    // safe for click or Enter (e may be undefined)
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    if (!skillForm.name.trim()) return;
    const updated = [...skills, { ...skillForm }];
    setSkills(updated);
    setSkillForm({ name: '', proficiency: 50 });
    // persist immediately so multiple adds are safe even if the user navigates away
    if (user && user.email) {
      const payload = { fullName: displayName, ...form, skills: updated };
      saveProfileToStorage(user.email, payload);
      try { window.dispatchEvent(new CustomEvent('profileUpdated', { detail: { email: user.email, profile: payload } })); } catch (e) { /* ignore */ }
    }
    // show a small confirmation message
    setSkillMsg('Skill added');
    setTimeout(() => setSkillMsg(''), 1800);
    // refocus skill name for quick multi-add
    setTimeout(() => skillNameRef.current && skillNameRef.current.focus(), 0);
  };

  const saveProfileToStorage = (email, profileData) => {
    if (!email) return;
    localStorage.setItem(profileStorageKey(email), JSON.stringify(profileData));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!user || !user.email) {
      navigate('/login');
      return;
    }

    const payload = { fullName: displayName, ...form, skills };
    saveProfileToStorage(user.email, payload);

    // update user display name
    const updatedUser = { ...user, name: displayName };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    window.dispatchEvent(new Event('userChanged'));

    // dispatch profileUpdated with profile data to avoid storage race conditions
    try { window.dispatchEvent(new CustomEvent('profileUpdated', { detail: { email: user.email, profile: payload } })); } catch (e) { /* ignore */ }

    // show a quick confirmation and then either notify parent (inline) or go to public profile
    try { window.alert('Profile saved'); } catch (e) { /* ignore */ }

    if (inline && typeof onSaved === 'function') {
      try { onSaved(user.email); } catch (err) { /* ignore callback errors */ }
    } else {
      navigate(`/users/${encodeURIComponent(user.email)}`);
    }
  };

  const formBody = (
    <form className="modal-form grid-form" onSubmit={handleSave}>
      <div className="form-col">
        <label>
          Full Name
          <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Full name" />
        </label>
        <label>
          Job Title
          <input name="jobTitle" value={form.jobTitle} onChange={handleChange} placeholder="e.g. Software Engineer" />
        </label>
        <label>
          Location
          <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. San Francisco, CA" />
        </label>
        <label>
          LinkedIn URL
          <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/you" />
        </label>
      </div>

      <div className="form-col">
        <label>
          Bio
          <textarea name="bio" value={form.bio} onChange={handleChange} rows={8} placeholder="Tell us about yourself..." />
        </label>

        <div className="skills-preview">
          <div className="skills-header">
            <h4>Skills</h4>
            <button type="button" className="skill-add-btn" title="Focus skill input" onClick={() => { skillNameRef.current && skillNameRef.current.focus(); }}><FaPlus /></button>
          </div>
          {skillMsg && <div className="skill-added-msg">{skillMsg}</div>}
          {skills.length === 0 ? (
            <div className="empty">No skills yet. Add some to show employers.</div>
          ) : (
            <div className="skill-list">
              {skills.map((s, idx) => (
                <div key={idx} className="skill-card">
                  {editingIndex === idx ? (
                    <div className="skill-edit-row">
                      <input className="skill-input" value={editableSkill.name} onChange={(e) => updateEditableSkill('name', e.target.value)} placeholder="Skill name" />
                      <div className="skill-slider-row">
                        <input type="range" min="0" max="100" value={editableSkill.proficiency} onChange={(e) => updateEditableSkill('proficiency', Number(e.target.value))} />
                        <span className="percent">{editableSkill.proficiency}%</span>
                      </div>

                      <div className="skill-edit-controls">
                        <button type="button" className="small-btn" onClick={() => saveSkillEdit(idx)}><FaSave /> Save</button>
                        <button type="button" className="ghost" onClick={cancelSkillEdit}><FaTimes /> Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="skill-top">
                        <h4>{s.name}</h4>
                      </div>
                      <div className="skill-progress-row">
                        <div className="progress-bar"><div style={{ width: `${s.proficiency}%` }} /></div>
                        <span className="percent">{s.proficiency}%</span>
                      </div>
                      <div className="skill-row-actions">
                        <button type="button" className="ghost" onClick={() => startEditSkill(idx)}><FaEdit /> Edit</button>
                        <button type="button" className="ghost" onClick={() => removeSkill(idx)}><FaTrash /> Remove</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 12 }}>
            <div className="skill-add-form">
              <input name="name" ref={skillNameRef} value={skillForm.name} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }} onChange={handleSkillChange} placeholder="Skill name" />

              <div className="skill-slider-row">
                <input type="range" name="proficiency" min="0" max="100" value={skillForm.proficiency} onChange={handleSkillChange} />
                <span className="percent">{skillForm.proficiency}%</span>
              </div>

              <div className="skill-add-actions">
                <button type="button" className="small-btn" onClick={addSkill}><FaPlus /> Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-actions full-width">
        <button type="button" className="ghost" onClick={() => {
          if (inline && typeof onCancel === 'function') return onCancel();
          navigate(-1);
        }}>Cancel</button>
        <button type="submit" className="primary">Save Profile</button>
      </div>
    </form>
  );

  if (inline) {
    return (
      <div className="profile-page">
        <div className="card edit-inline" style={{ marginTop: 16 }}>
          <h2 style={{ marginTop: 0 }}>{user ? 'Edit Your Profile' : 'Create Your Profile'}</h2>
          {formBody}
        </div>
      </div>
    );
  }

  return (
    <div className="edit-profile-page">
      <div className="edit-form-container">
        <h2 className="edit-form-title">Edit Your Profile</h2>
        <div className="edit-form">
          {formBody}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
