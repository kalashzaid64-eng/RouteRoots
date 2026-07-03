import React from 'react';
import { Search, Users, Plus, MapPin, Star, ChevronRight } from 'lucide-react';

export const ClubsHeader = ({ activeTab = 'explore', setActiveTab, activeType = 'all', setActiveType, searchValue = '', onSearch  }) => (
  <div className="clubs-header">
    <div className="clubs-header-top mb-4">
    <div className="buttons has-addons mb-0 clubs-tab-group">
    <button
  className={`button clubs-tab-btn ${activeTab === 'explore' ? 'is-active' : ''}`}
  onClick={() => setActiveTab?.('explore')}
>
  <Search size={18} className="mr-2" /> Explore
</button>
<button
  className={`button clubs-tab-btn ${activeTab === 'my' ? 'is-active' : ''}`}
  onClick={() => setActiveTab?.('my')}
>
  <Users size={18} className="mr-2" /> My Clubs
</button>

      </div>
      <button
  className="button clubs-create-btn"
  onClick={() => setActiveTab?.('create')}
>
  <Plus size={18} className="mr-1" /> Create Club
</button>

    </div>

    {activeTab !== 'create' && (
      <>
        <div className="search-bar-wrapper">
          <span className="icon is-left" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', color: '#999' }}>
            <Search size={18} />
          </span>
          <input
  className="input rr-search-input"
  type="text"
  placeholder="Search clubs by name, location, or activity"
  value={searchValue}
  onChange={(e) => onSearch?.(e.target.value)}
/>


        </div>

        <div className="is-flex is-align-items-center mt-4" style={{ gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          <button
            className="rr-pill"
            onClick={() => setActiveType?.('all')}
            style={activeType === 'all' ? { backgroundColor: 'var(--primary-green)', color: 'white', borderColor: 'var(--primary-green)' } : {}}
          >
            All
          </button>
          <button className={`rr-pill ${activeType === 'Running' ? 'is-active-running' : ''}`} onClick={() => setActiveType?.('Running')}>Running</button>
          <button className={`rr-pill ${activeType === 'Cycling' ? 'is-active-cycling' : ''}`} onClick={() => setActiveType?.('Cycling')}>Cycling</button>
          <button className={`rr-pill ${activeType === 'Skating' ? 'is-active-skating' : ''}`} onClick={() => setActiveType?.('Skating')}>Skating</button>
        </div>
      </>
    )}
  </div>
);

export const ClubCard = ({ club, onOpenDetails }) => {
  const type = (club.activity_type || club.type || '')
  .charAt(0).toUpperCase() + 
  (club.activity_type || club.type || '').slice(1).toLowerCase();


  const avatarClass =
    type === 'Running' ? 'club-avatar-running' :
    type === 'Cycling' ? 'club-avatar-cycling' :
    'club-avatar-skating';

  const badgeClass =
    type === 'Running' ? 'badge-running' :
    type === 'Cycling' ? 'badge-cycling' :
    'badge-skating';
  
  // Create a soft gradient background based on the club type
  const bgGradient =
    type === 'Running'
      ? 'linear-gradient(180deg, rgba(87, 166, 217, 0.15) 0%, rgba(255,255,255,0) 100%)'
      : type === 'Cycling'
        ? 'linear-gradient(180deg, rgba(121, 180, 79, 0.15) 0%, rgba(255,255,255,0) 100%)'
        : 'linear-gradient(180deg, rgba(224, 90, 42, 0.14) 0%, rgba(255,255,255,0) 100%)';

  return (
    <div className="container px-4 mt-5">
      <div className="club-card" style={{ paddingTop: '0', overflow: 'hidden', cursor: 'pointer' }} onClick={() => onOpenDetails?.(club)}>
        <div style={{ height: '100px', background: bgGradient, margin: '0 -1.5rem', position: 'relative' }}>
          <div className={`club-activity-badge ${badgeClass}`}>
            {type}
          </div>
        </div>
        
        <div className={`club-avatar ${avatarClass}`}>
          {club.initial}
        </div>

        <div className="has-text-centered mb-4">
          <h3 className="title is-5 mb-2" style={{ fontWeight: 800 }}>{club.name}</h3>
          <p className="subtitle is-6 has-text-grey" style={{ lineHeight: 1.5, fontSize: '0.95rem' }}>
            {club.description}
          </p>
        </div>

        <div className="is-flex is-align-items-center is-justify-content-space-between pt-4" style={{ borderTop: '1px solid #F0F0F0' }}>
          <div className="is-flex is-align-items-center gap-4">
            <div className="is-flex is-align-items-center gap-1 has-text-grey-dark" style={{ fontWeight: 600, fontSize: '0.9rem' }}>
              <Users size={16} /> {club.members_count ?? 0}
            </div>
            <div className="is-flex is-align-items-center gap-1" style={{ color: '#F59E0B', fontWeight: 600, fontSize: '0.9rem' }}>
              <Star size={16} fill="currentColor" /> {club.rating}
            </div>
            <div className="is-flex is-align-items-center gap-1 has-text-grey" style={{ fontSize: '0.9rem' }}>
              <MapPin size={16} /> {club.location}
            </div>
          </div>
          <ChevronRight size={20} className="has-text-grey" />
        </div>
      </div>
    </div>
  );
};
