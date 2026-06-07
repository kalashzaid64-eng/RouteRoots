import React from 'react';
import { MapPin, Edit3, Target, Activity, Clock, Users, Trophy, Footprints, Bike } from 'lucide-react';

const SkateIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14h9a3 3 0 0 0 3-3V7H8a4 4 0 0 0-4 4v3Z" />
    <path d="M16 10h3a1 1 0 0 1 1 1v3h-4" />
    <circle cx="7" cy="18" r="1.5" />
    <circle cx="16" cy="18" r="1.5" />
  </svg>
);

export const ProfileHeader = ({ user, onEditProfile, selectedActivities = [] , onAvatarChange }) => {
  const initials =
    user?.name
      ? user.name
          .split(' ')
          .filter(Boolean)
          .slice(0, 2)
          .map((p) => p[0].toUpperCase())
          .join('')
      : 'JD';

  return (
    <div className="profile-header-container">
      <div className="profile-bg-gradient"></div>
      <div className="profile-avatar-wrapper">
  <div className="profile-avatar">
    {user?.avatar 
      ? <img src={user.avatar} style={{ width: '100%', height: '100%', borderRadius: '24px', objectFit: 'cover' }} />
      : initials
    }
  </div>
  <label style={{ 
    position: 'absolute', 
    bottom: '-8px', 
    right: '-8px',
    background: 'var(--primary-green)', 
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '2px solid white'
  }}>
    <input 
      type="file" 
      accept="image/*" 
      style={{ display: 'none' }}
      onChange={(e) => onAvatarChange?.(e.target.files[0])}
    />
    <Edit3 size={14} color="white" />
  </label>
</div>

      <div className="container px-5">
        <div className="is-flex is-justify-content-between is-align-items-start mb-4">
          <div>
            <h1 className="title is-3 mb-1" style={{ fontWeight: 800 }}>{user?.name ?? 'John Doe'}</h1>
            <div className="is-flex is-align-items-center gap-1 has-text-grey" style={{ fontSize: '0.95rem' }}>
              <MapPin size={16} /> {user?.location ?? 'San Francisco, CA'}
            </div>
          </div>
          <button className="edit-profile-btn" onClick={() => onEditProfile?.()}>
            <Edit3 size={18} /> Edit Profile
          </button>
        </div>
        <p className="subtitle is-6 has-text-grey-darker mb-0" style={{ lineHeight: 1.6, maxWidth: '90%' }}>
          {user?.bio ?? 'Passionate runner, cyclist, and skater. Love exploring new trails and connecting with fellow athletes. Member since 2024.'}
        </p>

        <div className="is-flex is-align-items-center mt-4" style={{ gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          <span className={`rr-pill ${selectedActivities.includes('Running') ? 'is-active-running' : ''}`} style={{ cursor: 'default' }}>Running</span>
          <span className={`rr-pill ${selectedActivities.includes('Cycling') ? 'is-active-cycling' : ''}`} style={{ cursor: 'default' }}>Cycling</span>
          <span className={`rr-pill ${selectedActivities.includes('Skating') ? 'is-active-skating' : ''}`} style={{ cursor: 'default' }}>Skating</span>
        </div>
      </div>
    </div>
  );
};

export const ProfileStats = () => (
  <div className="container px-4 mt-5">
    <div className="columns is-mobile is-multiline is-variable is-3">
      <div className="column is-6">
        <div className="stat-card">
          <div className="stat-icon-container">
            <Target size={20} />
          </div>
          <h4 className="title is-4 mb-0" style={{ fontWeight: 800 }}>124</h4>
          <p className="has-text-grey is-size-7">Total Rides</p>
        </div>
      </div>
      <div className="column is-6">
        <div className="stat-card">
          <div className="stat-icon-container">
            <Activity size={20} />
          </div>
          <h4 className="title is-4 mb-0" style={{ fontWeight: 800 }}>1,847 km</h4>
          <p className="has-text-grey is-size-7">Distance</p>
        </div>
      </div>
      <div className="column is-6">
        <div className="stat-card">
          <div className="stat-icon-container">
            <Clock size={20} />
          </div>
          <h4 className="title is-4 mb-0" style={{ fontWeight: 800 }}>156</h4>
          <p className="has-text-grey is-size-7">Hours</p>
        </div>
      </div>
      <div className="column is-6">
        <div className="stat-card">
          <div className="stat-icon-container">
            <Users size={20} />
          </div>
          <h4 className="title is-4 mb-0" style={{ fontWeight: 800 }}>8</h4>
          <p className="has-text-grey is-size-7">Clubs</p>
        </div>
      </div>
    </div>
  </div>
);

export const AchievementsSection = () => (
  <div className="container px-4 mt-5">
    <div className="is-flex is-justify-content-between is-align-items-center mb-4">
      <h3 className="title is-5 mb-0" style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Trophy size={20} color="#FFD700" fill="#FFD700" /> Achievements
      </h3>
      <a href="#" className="has-text-grey-dark" style={{ fontSize: '0.9rem', fontWeight: 600 }}>View All</a>
    </div>
    <div className="columns is-mobile is-multiline is-variable is-3">
      {[
        { icon: '🏃', name: 'First 5K', date: 'Nov 2025' },
        { icon: '🚴', name: 'Century Ride', date: 'Oct 2025' },
        { icon: '🛼', name: 'First Skate Session', date: 'Sep 2025' },
        { icon: '🌅', name: 'Early Bird', date: 'Sep 2025' },
        { icon: '👥', name: '10 Clubs', date: 'Aug 2025' }
      ].map((ach, i) => (
        <div className="column is-6" key={i}>
          <div className="achievement-card">
            <span className="achievement-icon">{ach.icon}</span>
            <p className="has-text-weight-bold is-size-6 mb-0">{ach.name}</p>
            <p className="has-text-grey is-size-7">{ach.date}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const RecentActivitySection = () => (
  <div className="container px-4 mt-5 mb-6">
    <div className="is-flex is-justify-content-between is-align-items-center mb-4">
      <h3 className="title is-5 mb-0" style={{ fontWeight: 700 }}>Recent Activity</h3>
      <a href="#" className="has-text-grey-dark" style={{ fontSize: '0.9rem', fontWeight: 600 }}>View All</a>
    </div>
    {[
      { title: 'Morning Trail Run', date: 'Dec 20, 2025', dist: '8 km', time: '48:32', type: 'Run' },
      { title: 'Sunset City Skate', date: 'Dec 18, 2025', dist: '12 km', time: '1:05:00', type: 'Skate' },
      { title: 'Weekend Mountain Ride', date: 'Dec 15, 2025', dist: '42 km', time: '2:15:00', type: 'Ride' }
    ].map((act, i) => (
      <div className="activity-item" key={i}>
        <div className="is-flex is-align-items-center gap-3">
          <div className="activity-icon-box">
            {act.type === 'Run'
              ? <Footprints size={20} color="var(--running-blue)" />
              : act.type === 'Ride'
                ? <Bike size={20} color="var(--cycling-green)" />
                : <SkateIcon size={20} color="var(--skating-purple)" />
            }
          </div>
          <div>
            <h5 className="has-text-weight-bold mb-0">{act.title}</h5>
            <div className="is-flex is-align-items-center gap-1 has-text-grey is-size-7 mt-1">
              <Calendar size={12} /> {act.date}
            </div>
          </div>
        </div>
        <div className="has-text-right">
          <p className="has-text-weight-bold mb-0" style={{ color: 'var(--primary-green)' }}>{act.dist}</p>
          <p className="has-text-grey is-size-7 mt-1">{act.time}</p>
        </div>
      </div>
    ))}
  </div>
);

const Calendar = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);
