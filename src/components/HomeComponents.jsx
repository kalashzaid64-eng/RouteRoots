import React, { useState } from 'react';
import { SlidersHorizontal, MapPin, Calendar, Clock, Users, Footprints, Bike, TrendingUp, ChevronRight } from 'lucide-react';

const SkateIcon = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14h9a3 3 0 0 0 3-3V7H8a4 4 0 0 0-4 4v3Z" />
    <path d="M16 10h3a1 1 0 0 1 1 1v3h-4" />
    <circle cx="7" cy="18" r="1.5" />
    <circle cx="16" cy="18" r="1.5" />
  </svg>
);

export const HeroBanner = () => (
  <div className="container px-4 mt-4">
    <div className="rr-hero">
      <div className="rr-badge-brown mb-3">
        <TrendingUp size={14} /> Trending
      </div>
      <h1 className="title is-3 has-text-white mb-2" style={{ fontWeight: 800 }}>
        Discover Your Next Adventure
      </h1>
      <p className="subtitle is-6 has-text-white mb-5" style={{ opacity: 0.9, lineHeight: 1.5 }}>
        Join local rides, connect with clubs, and track your journey with RouteRoots.
      </p>
      <button className="button is-large rr-btn-brown">
        <MapPin size={20} /> Find Rides Near Me
      </button>
    </div>
  </div>
);

export const RideFilters = ({ activeType = 'all', setActiveType }) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentLabel = activeType === 'all' ? 'All Activities' : activeType;

  const items = [
    { id: 'all', label: 'All Activities' },
    { id: 'Running', label: 'Running' },
    { id: 'Cycling', label: 'Cycling' },
    { id: 'Skating', label: 'Skating' }
  ];

  return (
    <div className="container px-4 mt-5">
      <div className="is-flex is-justify-content-space-between is-align-items-end mb-4">
        <h2 className="title is-4 mb-0" style={{ fontWeight: 700 }}>Upcoming<br/>Rides</h2>

        <div className={`dropdown is-right ${isOpen ? 'is-active' : ''}`}>
          <div className="dropdown-trigger">
            <button
              className="rr-pill"
              onClick={() => setIsOpen((v) => !v)}
              style={{ padding: '8px 14px' }}
            >
              <SlidersHorizontal size={18} /> {currentLabel}
            </button>
          </div>
          <div className="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {items.map((item) => (
                <a
                  key={item.id}
                  href="#"
                  className={`dropdown-item ${activeType === item.id ? 'is-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveType?.(item.id);
                    setIsOpen(false);
                  }}
                  style={{ fontWeight: activeType === item.id ? 700 : 600 }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RideCard = ({ ride, onOpenDetails, onToggleJoin, isJoined = false }) => {
  const badgeClass =
    ride.type === 'Running' ? 'badge-running' :
    ride.type === 'Cycling' ? 'badge-cycling' :
    'badge-skating';

  const icon =
    ride.type === 'Running' ? <Footprints size={22} color="var(--running-blue)" /> :
    ride.type === 'Cycling' ? <Bike size={22} color="var(--cycling-green)" /> :
    <SkateIcon size={22} color="var(--skating-purple)" />;

  return (
    <div className="container px-4 mt-4">
      <div className="rr-card">
        <div className="is-flex is-justify-content-between is-align-items-start mb-4">
          <div className="is-flex is-align-items-center gap-3">
            <div className="rr-icon-container">
              {icon}
            </div>
            <div>
              <h3 className="title is-5 mb-1" style={{ fontWeight: 700 }}>{ride.title}</h3>
              <p className="subtitle is-7 has-text-grey mb-0">{ride.organizer}</p>
            </div>
          </div>
          <div className={`rr-activity-badge ${badgeClass}`}>
            {ride.type}
          </div>
        </div>

        <div className="columns is-mobile is-multiline is-variable is-2 mb-4" style={{ paddingLeft: '56px' }}>
          <div className="column is-6">
            <div className="is-flex is-align-items-center gap-2 has-text-grey" style={{ fontSize: '0.85rem' }}>
              <Calendar size={16} /> {ride.date}
            </div>
          </div>
          <div className="column is-6">
            <div className="is-flex is-align-items-center gap-2 has-text-grey" style={{ fontSize: '0.85rem' }}>
              <Clock size={16} /> {ride.time}
            </div>
          </div>
          <div className="column is-12">
            <div className="is-flex is-align-items-center gap-2 has-text-grey" style={{ fontSize: '0.85rem' }}>
              <MapPin size={16} /> {ride.location} <span className="mx-1">•</span> {ride.distance} <span className="mx-1">•</span> ~{ride.duration}
            </div>
          </div>
        </div>

        <div className="is-flex is-align-items-center is-justify-content-between pt-4" style={{ borderTop: '1px solid #F0F0F0' }}>
          <div className="is-flex is-align-items-center gap-4">
            <span className="has-text-weight-bold has-text-grey-darker">
              {ride.fee === 'Free' ? 'Free' : `$ ${ride.fee}`}
            </span>
            <div className="is-flex is-align-items-center gap-1 has-text-grey" style={{ fontSize: '0.85rem' }}>
              <Users size={16} /> {ride.joinedCount} joined
            </div>
          </div>
          <div className="is-flex is-align-items-center gap-3">
            <button
              className="button is-ghost has-text-grey-darker px-0"
              style={{ textDecoration: 'none', fontWeight: 600 }}
              onClick={() => onOpenDetails?.(ride)}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' , margin:'5px' }}>
                Details <ChevronRight size={18} />
              </span>
            </button>
            <button className="button rr-btn-green" onClick={() => onToggleJoin?.(ride)} style={isJoined ? { opacity: 0.85 } : {}}>
              {isJoined ? 'Joined' : 'Join'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
