import React from 'react';
import { User, Bell, Globe, Lock, HelpCircle, LogOut, ChevronRight, Mail, Phone, MessageSquare } from 'lucide-react';

const Switch = ({ checked, onChange, defaultChecked }) => (
  <label className="switch">
    <input
      type="checkbox"
      checked={onChange ? checked : undefined}
      defaultChecked={onChange ? undefined : defaultChecked}
      onChange={onChange}
    />
    <span className="slider"></span>
  </label>
);



const NOTIFICATION_TYPES = [
  { key: 'ride_join_request', title: 'Ride join requests', desc: 'When someone requests to join your ride' },
  { key: 'ride_request_accepted', title: 'Request accepted', desc: 'When your ride request gets accepted' },
  { key: 'ride_request_rejected', title: 'Request rejected', desc: 'When your ride request gets rejected' },
  { key: 'new_ride_nearby', title: 'New rides nearby', desc: 'When a new ride is posted near you' },
  { key: 'new_ride_for_club', title: 'New club rides', desc: 'When your club posts a new ride' },
  { key: 'achievement_unlocked', title: 'Achievements', desc: 'When you unlock a new achievement' },
  { key: 'new_follower', title: 'New followers', desc: 'When someone follows your profile' },
  { key: 'friend_joined_club', title: 'Friend joined a club', desc: 'When someone you follow joins a club' },
  { key: 'friend_joined_ride', title: 'Friend joined a ride', desc: 'When someone you follow joins a ride' },
];

export const NotificationSettings = ({ settings = {}, onToggle }) => (
  <div className="container px-4">
    <div className="settings-section">
      <div className="is-flex is-align-items-center gap-3 mb-4">
        <Bell size={20} className="has-text-grey" />
        <h3 className="title is-5 mb-0" style={{ fontWeight: 700 }}>Notifications</h3>
      </div>
      <p className="has-text-grey mb-5" style={{ fontSize: '0.9rem' }}>
        Choose what notifications you want to receive.
      </p>

      {NOTIFICATION_TYPES.map((item) => (
        <div key={item.key} className="is-flex is-align-items-center is-justify-content-space-between mb-5">
          <div>
            <h5 className="has-text-weight-bold mb-0" style={{ fontSize: '1rem' }}>{item.title}</h5>
            <p className="has-text-grey is-size-7 mt-1">{item.desc}</p>
          </div>
          <Switch
            checked={settings[item.key] !== false}
            onChange={() => onToggle?.(item.key)}
          />
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

