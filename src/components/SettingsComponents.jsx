import React from 'react';
import { User, Bell, Globe, Lock, HelpCircle, LogOut, ChevronRight, Mail, Phone, MessageSquare } from 'lucide-react';

const Switch = ({ defaultChecked }) => (
  <label className="switch">
    <input type="checkbox" defaultChecked={defaultChecked} />
    <span className="slider"></span>
  </label>
);

export const AccountSettings = () => (
  <div className="container px-4 mt-4">
    <div className="settings-section">
      <div className="is-flex is-align-items-center gap-3 mb-4">
        <User size={20} className="has-text-grey" />
        <h3 className="title is-5 mb-0" style={{ fontWeight: 700 }}>Account Settings</h3>
      </div>
      <p className="has-text-grey mb-5" style={{ fontSize: '0.9rem' }}>
        Manage your personal information and account details.
      </p>

      <div className="mb-4">
        <label className="settings-label">Full Name</label>
        <input className="settings-input" type="text" defaultValue="John Doe" />
      </div>

      <div className="mb-4">
        <label className="settings-label">Email Address</label>
        <input className="settings-input" type="email" defaultValue="john.doe@email.com" />
      </div>

      <div className="mb-4">
        <label className="settings-label">Phone Number</label>
        <input className="settings-input" type="tel" defaultValue="+1 (555) 123-4567" />
      </div>

      <div className="mb-5">
        <label className="settings-label">Bio</label>
        <input className="settings-input" type="text" defaultValue="Passionate runner and cyclist 🌱" />
      </div>

      <button className="button rr-btn-green is-fullwidth py-5" style={{ borderRadius: '12px' }}>
        Save Changes
      </button>
    </div>
  </div>
);

export const NotificationSettings = () => (
  <div className="container px-4">
    <div className="settings-section">
      <div className="is-flex is-align-items-center gap-3 mb-4">
        <Bell size={20} className="has-text-grey" />
        <h3 className="title is-5 mb-0" style={{ fontWeight: 700 }}>Notifications</h3>
      </div>
      <p className="has-text-grey mb-5" style={{ fontSize: '0.9rem' }}>
        Choose what notifications you want to receive.
      </p>

      {[
        { title: 'Ride reminders', desc: 'Get notified before upcoming rides', active: true },
        { title: 'Club updates', desc: 'News and announcements from your clubs', active: true },
        { title: 'New followers', desc: 'When someone follows your profile', active: false },
        { title: 'Market deals', desc: 'Exclusive offers and discounts', active: true },
        { title: 'Weekly summary', desc: 'Your activity summary every Sunday', active: true }
      ].map((item, i) => (
        <div key={i} className="is-flex is-align-items-center is-justify-content-space-between mb-5">
          <div>
            <h5 className="has-text-weight-bold mb-0" style={{ fontSize: '1rem' }}>{item.title}</h5>
            <p className="has-text-grey is-size-7 mt-1">{item.desc}</p>
          </div>
          <Switch defaultChecked={item.active} />
        </div>
      ))}
    </div>
  </div>
);

export const PreferencesSettings = () => (
  <div className="container px-4">
    <div className="settings-section">
      <div className="is-flex is-align-items-center gap-3 mb-4">
        <Globe size={20} className="has-text-grey" />
        <h3 className="title is-5 mb-0" style={{ fontWeight: 700 }}>Preferences</h3>
      </div>
      <p className="has-text-grey mb-5" style={{ fontSize: '0.9rem' }}>
        Customize your app experience.
      </p>

      <div className="is-flex is-align-items-center is-justify-content-space-between">
        <h5 className="has-text-weight-bold mb-0">Distance unit</h5>
        <div className="is-flex is-align-items-center gap-2 has-text-grey" style={{ cursor: 'pointer' }}>
          <span>Kilometers</span>
          <ChevronRight size={18} />
        </div>
      </div>
    </div>
  </div>
);

export const SecuritySettings = () => (
  <div className="container px-4">
    <div className="mb-5">
      {[
        'Change Password',
        'Two-Factor Authentication',
        'Privacy Settings',
        'Download My Data'
      ].map((item, i) => (
        <button key={i} className="settings-list-btn">
          <span>{item}</span>
          <ChevronRight size={20} />
        </button>
      ))}
    </div>
  </div>
);

export const SupportSettings = ({onLogout}) => (
  <div className="container px-4">
    <div className="settings-section">
      <div className="is-flex is-align-items-center gap-3 mb-4">
        <HelpCircle size={20} className="has-text-grey" />
        <h3 className="title is-5 mb-0" style={{ fontWeight: 700 }}>Help & Support</h3>
      </div>

      <div className="mb-0">
        {[
          'Help Center',
          'Contact Support',
          'Terms of Service',
          'Privacy Policy'
        ].map((item, i) => (
          <button key={i} className="settings-list-btn" style={{ border: '1px solid #E0E0E0', color: '#444' }}>
            <span>{item}</span>
            <ChevronRight size={20} className="has-text-grey" />
          </button>
        ))}
      </div>
    </div>

    <button className="logout-btn mb-6" onClick={onLogout}>
      <LogOut size={20} /> Log Out
    </button>
  </div>
);
