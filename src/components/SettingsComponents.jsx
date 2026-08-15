import React from 'react';
import { User, Bell, Globe, Lock, HelpCircle, LogOut, ChevronRight, Mail, Phone, MessageSquare } from 'lucide-react';

const Switch = ({ defaultChecked }) => (
  <label className="switch">
    <input type="checkbox" defaultChecked={defaultChecked} />
    <span className="slider"></span>
  </label>
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

export const SecuritySettings = ({ onChangePassword }) => (
  <div className="container px-4">
    <div className="mb-5">
      <button className="settings-list-btn" onClick={onChangePassword}>
        <span>Change Password</span>
        <ChevronRight size={20} />
      </button>
    </div>
  </div>
);


export const SupportSettings = ({onLogout}) => (
  <div className="container px-4">
    <button className="logout-btn mb-6" onClick={onLogout}>
      <LogOut size={20} /> Log Out
    </button>
  </div>
);

