import React, { useState } from 'react';
import './Settings.css';

const Settings = ({ theme, setTheme }) => {
  const [notificationToggles, setNotificationToggles] = useState({
    email: true,
    push: true,
    jobs: true,
    marketing: false
  });

  const [privacyToggles, setPrivacyToggles] = useState({
    publicProfile: false,
    salary: false
  });

  const handleToggle = (groupSetter, groupState, key) => {
    groupSetter({ ...groupState, [key]: !groupState[key] });
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account preferences</p>
      </div>

      <div className="settings-stack">
        <section className="settings-card">
          <div className="settings-card__title">
            <div className="icon">🔔</div>
            <div>
              <h3>Notifications</h3>
              <p>Manage how you receive updates</p>
            </div>
          </div>

          <div className="toggle-row">
            <div>
              <h4>Email Notifications</h4>
              <p>Receive updates via email</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={notificationToggles.email}
                onChange={() => handleToggle(setNotificationToggles, notificationToggles, 'email')}
              />
              <span className="slider" />
            </label>
          </div>

          <div className="toggle-row">
            <div>
              <h4>Push Notifications</h4>
              <p>Get instant notifications on your device</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={notificationToggles.push}
                onChange={() => handleToggle(setNotificationToggles, notificationToggles, 'push')}
              />
              <span className="slider" />
            </label>
          </div>

          <div className="toggle-row">
            <div>
              <h4>Job Alerts</h4>
              <p>Receive alerts for new job matches</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={notificationToggles.jobs}
                onChange={() => handleToggle(setNotificationToggles, notificationToggles, 'jobs')}
              />
              <span className="slider" />
            </label>
          </div>

          <div className="toggle-row">
            <div>
              <h4>Marketing Emails</h4>
              <p>Receive tips and product updates</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={notificationToggles.marketing}
                onChange={() => handleToggle(setNotificationToggles, notificationToggles, 'marketing')}
              />
              <span className="slider" />
            </label>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card__title">
            <div className="icon">🛡️</div>
            <div>
              <h3>Privacy</h3>
              <p>Control your profile visibility</p>
            </div>
          </div>

          <div className="toggle-row">
            <div>
              <h4>Public Profile</h4>
              <p>Allow employers to view your profile</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={privacyToggles.publicProfile}
                onChange={() => handleToggle(setPrivacyToggles, privacyToggles, 'publicProfile')}
              />
              <span className="slider" />
            </label>
          </div>

          <div className="toggle-row">
            <div>
              <h4>Show Salary Expectations</h4>
              <p>Display your expected salary to recruiters</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={privacyToggles.salary}
                onChange={() => handleToggle(setPrivacyToggles, privacyToggles, 'salary')}
              />
              <span className="slider" />
            </label>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card__title">
            <div className="icon">👁️</div>
            <div>
              <h3>Appearance</h3>
              <p>Customize your experience</p>
            </div>
          </div>

          <div className="toggle-row">
            <div>
              <h4>Dark Mode</h4>
              <p>Use dark theme for the interface</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={handleThemeToggle}
              />
              <span className="slider" />
            </label>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card__title">
            <div className="icon">⚙️</div>
            <div>
              <h3>Account</h3>
              <p>Manage your account settings</p>
            </div>
          </div>

          <div className="account-actions">
            <button className="secondary">Sign Out</button>
            <button className="danger">Delete Account</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;