import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditProfile from './EditProfile';
import { FaEnvelope, FaLink, FaBriefcase } from 'react-icons/fa';
import './PublicProfile.css';

const PublicProfile = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    const cur = JSON.parse(localStorage.getItem('user'));
    setUser(cur);

    const fetchProfile = () => {
      const raw = localStorage.getItem(`profile:${email}`);
      const data = raw ? JSON.parse(raw) : null;
      setProfile(data);
    };

    fetchProfile();

    // If the profile is empty immediately after saving, retry fetch a couple times
    const retryFetchIfEmpty = () => {
      const raw = localStorage.getItem(`profile:${email}`);
      const data = raw ? JSON.parse(raw) : null;
      if (!data || !data.skills || data.skills.length === 0) {
        // try a couple more times in case of timing/race
        setTimeout(fetchProfile, 150);
        setTimeout(fetchProfile, 500);
      }
    };

    const onStorage = () => fetchProfile();
    const onProfileUpdated = (e) => {
      const updatedEmail = e && e.detail && e.detail.email;
      const updatedProfile = e && e.detail && e.detail.profile;
      if (updatedEmail && updatedEmail === email) {
        if (updatedProfile) {
          setProfile(updatedProfile);
        } else {
          fetchProfile();
        }
      }
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener('userChanged', onStorage);
    window.addEventListener('profileUpdated', onProfileUpdated);

    // run a retry shortly after mount to catch quick saves
    setTimeout(retryFetchIfEmpty, 100);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('userChanged', onStorage);
      window.removeEventListener('profileUpdated', onProfileUpdated);
    };
  }, [email]);

  const displayName = (profile && profile.fullName) || (user && user.name) || (email && email.split('@')[0]);

  // When the profile owner chooses to edit, show ONLY the edit form and nothing else
  if (showEditor && user && user.email === email) {
    return (
      <div className="public-profile-page">
        <div className="public-edit-wrapper">
          <EditProfile />
        </div>
      </div>
    );
  }

  return (
    <div className="public-profile-page">
      <div className="public-profile-card">
        <div className="left">
          <div className="avatar-large">{(displayName || 'G')[0].toUpperCase()}</div>
          <h2 className="pp-name">{displayName}</h2>
          <p className="pp-title">{profile?.jobTitle || 'Add your job title'}</p>

          <div className="pp-contact">
            <div><FaEnvelope /> <span>{email}</span></div>
            {profile?.website && (<div><FaLink /> <a href={profile.website} target="_blank" rel="noreferrer">Website</a></div>)}
          </div>

          {user && user.email === email && !showEditor && (
            <div className="pp-actions">
              <button className="primary" onClick={() => setShowEditor(true)}>Edit Profile</button>
            </div>
          )}

          {showEditor && (
            <div style={{ width: '100%', marginTop: 12 }}>
              <EditProfile
                inline={true}
                onSaved={(emailSaved) => {
                  // reload profile and hide editor
                  const raw = localStorage.getItem(`profile:${emailSaved}`);
                  setProfile(raw ? JSON.parse(raw) : null);
                  const cur = JSON.parse(localStorage.getItem('user'));
                  setUser(cur);
                  setShowEditor(false);
                }}
                onCancel={() => setShowEditor(false)}
              />
            </div>
          )}
        </div>

        <div className="right">
          <section className="about">
            <h4>About</h4>
            <p>{profile?.bio || 'No bio yet. Add a brief summary about yourself.'}</p>
          </section>

          <section className="skills">
            <h4>Skills</h4>
            {profile?.skills?.length ? (
              <div className="skills-grid">
                {profile.skills.map((s, idx) => (
                  <div key={idx} className="skill-pill">
                    <strong>{s.name}</strong>
                    <span className="percent">{s.proficiency}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty">No skills yet.</div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
