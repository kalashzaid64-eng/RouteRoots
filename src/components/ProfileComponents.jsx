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

export const ProfileHeader = ({ user, onEditProfile, selectedActivities = [], onAvatarChange, followersCount = 0, followingCount = 0, onOpenFollowers, onOpenFollowing, onAddFriend }) => {
  const initials =
    user?.name
      ? user.name
          .split(' ')
          .filter(Boolean)
          .slice(0, 2)
          .map((p) => p[0].toUpperCase())
          .join('')
      : 'JD';

  const activityMeta = {
    Running: { icon: '🏃', active: selectedActivities.includes('Running') },
    Cycling: { icon: '🚴', active: selectedActivities.includes('Cycling') },
    Skating: { icon: '🛼', active: selectedActivities.includes('Skating') },
  };
  const activeActivities = Object.entries(activityMeta).filter(([, v]) => v.active);
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
        <div className="is-flex is-justify-content-between is-align-items-start mb-2">
          <div>
            <h1 className="title is-3 mb-1" style={{ fontWeight: 800, color: 'black' }}>{user?.name ?? 'John Doe'}</h1>
            <div className="is-flex is-align-items-center gap-1 has-text-grey" style={{ fontSize: '0.95rem' }}>
              <MapPin size={16} /> {user?.location ?? 'San Francisco, CA'}
            </div>
          </div>
          <button
            onClick={() => onEditProfile?.()}
            title="Edit Profile"
            style={{
              background: '#F5F5F5',
              border: 'none',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <Edit3 size={16} color="#555" />
          </button>
        </div>

        <p className="subtitle is-6 has-text-grey-darker mb-3" style={{ lineHeight: 1.6, maxWidth: '90%' }}>
          {user?.bio ?? 'Passionate runner, cyclist, and skater. Love exploring new trails and connecting with fellow athletes. Member since 2024.'}
        </p>

        {activeActivities.length > 0 && (
          <div className="is-flex is-align-items-center has-text-grey-darker mb-4" style={{ gap: '6px', fontSize: '0.9rem', fontWeight: 500 }}>
            {activeActivities.map(([name, meta], i) => (
              <React.Fragment key={name}>
                {i > 0 && <span style={{ color: '#CCC' }}>·</span>}
                <span>{meta.icon} {name}</span>
              </React.Fragment>
            ))}
          </div>
        )}

<div style={{ borderTop: '1px solid #F0F0F0', marginTop: '16px', paddingTop: '18px' }}>
          <div className="is-flex is-align-items-center is-justify-content-center mb-4" style={{ gap: '0' }}>
            <div
              className="has-text-centered"
              style={{ cursor: 'pointer', padding: '0 28px', borderRight: '1px solid #EEE' }}
              onClick={() => onOpenFollowers?.()}
            >
              <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-dark)', lineHeight: 1.2 }}>{followersCount}</div>
              <div className="has-text-grey" style={{ fontSize: '0.78rem' }}>Followers</div>
            </div>
            <div
              className="has-text-centered"
              style={{ cursor: 'pointer', padding: '0 28px' }}
              onClick={() => onOpenFollowing?.()}
            >
              <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-dark)', lineHeight: 1.2 }}>{followingCount}</div>
              <div className="has-text-grey" style={{ fontSize: '0.78rem' }}>Following</div>
            </div>
          </div>
          <button
            onClick={() => onAddFriend?.()}
            style={{
              width: '100%',
              maxWidth: '360px',
              display: 'flex',
              margin: '0 auto',
              background: 'var(--primary-green)',
              border: 'none',
              color: 'white',
              borderRadius: '14px',
              padding: '12px',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            + Add Friend
          </button>
        </div>
      </div>
    </div>
  );
};
export const ProfileStats = ({ stats }) => (
  <div className="container px-4 mt-5">
    <div className="columns is-mobile is-multiline is-variable is-3">
      <div className="column is-6">
        <div className="stat-card">
          <div className="stat-icon-container">
            <Target size={20} />
          </div>
          <h4 className="title is-4 mb-0" style={{ fontWeight: 800, color: 'var(--text-dark)' }}>
            {stats?.total_rides ?? 0}
          </h4>
          <p className="has-text-grey is-size-7">Total Rides</p>
        </div>
      </div>
      <div className="column is-6">
        <div className="stat-card">
          <div className="stat-icon-container">
            <Activity size={20} />
          </div>
          <h4 className="title is-4 mb-0" style={{ fontWeight: 800, color: 'var(--text-dark)' }}>
            {stats?.total_distance ?? 0} km
          </h4>
          <p className="has-text-grey is-size-7">Distance</p>
        </div>
      </div>
      <div className="column is-6">
        <div className="stat-card">
          <div className="stat-icon-container">
            <Clock size={20} />
          </div>
          <h4 className="title is-4 mb-0" style={{ fontWeight: 800, color: 'var(--text-dark)' }}>
            {stats?.total_duration ?? 0}
          </h4>
          <p className="has-text-grey is-size-7">Minutes</p>
        </div>
      </div>
      <div className="column is-6">
        <div className="stat-card">
          <div className="stat-icon-container">
            <Users size={20} />
          </div>
          <h4 className="title is-4 mb-0" style={{ fontWeight: 800, color: 'var(--text-dark)' }}>
            {stats?.total_rides ?? 0}
          </h4>
          <p className="has-text-grey is-size-7">Clubs</p>
        </div>
      </div>
    </div>
  </div>
);


export const AchievementsSection = ({ achievements = [] }) => (
  <div className="container px-4 mt-5">
    <div className="is-flex is-justify-content-between is-align-items-center mb-4">
      <h3 className="title is-5 mb-0" style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' , margin:'5px' , color: 'var(--text-dark)' }}>
        <Trophy size={20} color="#FFD700" fill="#FFD700" /> Achievements
      </h3>
      <a href="#" className="has-text-grey-dark" style={{ fontSize: '0.9rem', fontWeight: 600 }}>View All</a>
    </div>
    {achievements.length === 0 ? (
      <div className="rr-card has-text-centered py-5">
        <p style={{ fontSize: '2rem' }}>🏆</p>
        <p className="has-text-grey mt-2">No achievements yet. Keep going!</p>
      </div>
    ) : (
      <div className="columns is-mobile is-multiline is-variable is-3">
        {achievements.map((ach, i) => (
          <div className="column is-6" key={i}>
            <div className="achievement-card">
              <span className="achievement-icon">🏅</span>
              <p className="has-text-weight-bold is-size-6 mb-0">{ach.title}</p>
              <p className="has-text-grey is-size-7">{ach.description}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);


export const RecentActivitySection = ({ activities = [] }) => (
  <div className="container px-4 mt-5 mb-6">
    <div className="is-flex is-justify-content-between is-align-items-center mb-4">
      <h3 className="title is-5 mb-0" style={{ fontWeight: 700 }}>Recent Activity</h3>
      <a href="#" className="has-text-grey-dark" style={{ fontSize: '0.9rem', fontWeight: 600 }}>View All</a>
    </div>
    {activities.length === 0 ? (
      <div className="rr-card has-text-centered py-5">
        <p style={{ fontSize: '2rem' }}>🏃</p>
        <p className="has-text-grey mt-2">No activities yet. Start moving!</p>
      </div>
    ) : (
      activities.map((act, i) => (
        <div className="activity-item" key={i}>
          <div className="is-flex is-align-items-center gap-3">
            <div className="activity-icon-box">
              {act.type === 'running'
                ? <Footprints size={20} color="var(--running-blue)" />
                : act.type === 'cycling'
                  ? <Bike size={20} color="var(--cycling-green)" />
                  : <SkateIcon size={20} color="var(--skating-purple)" />
              }
            </div>
            <div>
              <h5 className="has-text-weight-bold mb-0">{act.type}</h5>
              <p className="has-text-grey is-size-7 mt-1">{act.date}</p>
            </div>
          </div>
          <div className="has-text-right">
            <p className="has-text-weight-bold mb-0" style={{ color: 'var(--primary-green)' }}>{act.distance} km</p>
            <p className="has-text-grey is-size-7 mt-1">{act.duration} min</p>
          </div>
        </div>
      ))
    )}
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
