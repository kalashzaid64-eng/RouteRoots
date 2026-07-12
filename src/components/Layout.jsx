import React, { useState } from 'react';
import { Bell, Home, User, Leaf, Users, ShoppingBag, Settings } from 'lucide-react';

const Navbar = ({ unreadCount = 0, onBellClick }) => (
  <nav className="rr-navbar">
    <div className="logo-container">
      <div className="logo-icon">
        <Leaf size={22} fill="currentColor" />
      </div>
      <div className="logo-text">
        RouteRoots <span style={{ color: 'var(--primary-green)' }}>🌱</span>
      </div>
    </div>
    <div className="notification-wrapper" onClick={onBellClick} style={{ cursor: 'pointer' }}>
      <Bell size={24} color="#333" />
      {unreadCount > 0 && (
        <div className="notification-badge">{unreadCount}</div>
      )}
    </div>
  </nav>
);

const BottomNav = ({ currentTab, setCurrentTab }) => (
  <div className="rr-bottom-nav">
    <div className={`rr-nav-item ${currentTab === 'home' ? 'is-active' : ''}`} onClick={() => setCurrentTab('home')} style={{ cursor: 'pointer' }}>
      <Home size={24} /><span>Home</span>
    </div>
    <div className={`rr-nav-item ${currentTab === 'profile' ? 'is-active' : ''}`} onClick={() => setCurrentTab('profile')} style={{ cursor: 'pointer' }}>
      <User size={24} /><span>Profile</span>
    </div>
    <div className={`rr-nav-item ${currentTab === 'clubs' ? 'is-active' : ''}`} onClick={() => setCurrentTab('clubs')} style={{ cursor: 'pointer' }}>
      <Users size={24} /><span>Clubs</span>
    </div>
    <div className={`rr-nav-item ${currentTab === 'market' ? 'is-active' : ''}`} onClick={() => setCurrentTab('market')} style={{ cursor: 'pointer' }}>
      <ShoppingBag size={24} /><span>Market</span>
    </div>
    <div className={`rr-nav-item ${currentTab === 'settings' ? 'is-active' : ''}`} onClick={() => setCurrentTab('settings')} style={{ cursor: 'pointer' }}>
      <Settings size={24} /><span>Settings</span>
    </div>
  </div>
);

const Layout = ({ children, currentTab, setCurrentTab, hideBottomNav = false, unreadCount = 0, notifications = [], onMarkAsRead }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  React.useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.notification-wrapper') && !e.target.closest('.notification-panel')) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
  

  return (
    <div className="layout-container">
      <Navbar unreadCount={unreadCount} onBellClick={() => setShowNotifications(v => !v)} />
      
      {showNotifications && (
        <div  className="notification-panel" style={{
          position: 'fixed', top: '60px', right: '16px',
          background: 'white', borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          zIndex: 200, width: '300px', maxHeight: '400px',
          overflowY: 'auto', border: '1px solid #E0E0E0'
        }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid #E0E0E0', fontWeight: 700 }}>
            Notifications
          </div>
          {notifications.length === 0 ? (
            <div style={{ padding: '1rem', color: '#757575', textAlign: 'center' }}>
              No notifications yet
            </div>
          ) : (
            notifications.map((n) => (
              <div key={n.id} style={{
                padding: '1rem',
                borderBottom: '1px solid #F0F0F0',
                background: n.is_read == true || n.is_read === 1 ? 'white' : '#E8F5E9',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px'
              }} onClick={() => onMarkAsRead?.(n.id)}>
                <div style={{
                  width: '36px', height: '36px',
                  borderRadius: '50%',
                  background: 'var(--primary-green)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '1rem' }}>
                    {n.type === 'ride_joined' ? '🚴' : 
                      n.type === 'club_joined' ? '🏛️' : 
                      n.type === 'achievement_unlocked' ? '🏆' :
                      n.type === 'new_follower' ? '👤' :
                      n.type === 'friend_joined_club' ? '🏛' :
                      n.type === 'friend_joined_ride' ? '🚴' : '🔔'}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '2px' }}>
                    {n.type === 'ride_joined' ? `${n.data?.joined_by} joined your ride` :
                      n.type === 'club_joined' ? `${n.data?.joined_by} joined your club` :
                      n.type === 'new_follower' ? `${n.data?.follower_name} started following you` :
                      n.type === 'friend_joined_club' ? `${n.data?.friend_name} joined ${n.data?.club_name}` :
                      n.type === 'friend_joined_ride' ? `${n.data?.friend_name} joined ${n.data?.ride_title}` :
                      n.data?.title ?? n.type}
                  </p>
                  <p style={{ color: '#757575', fontSize: '0.75rem' }}>
                    {n.data?.title ?? ''}
                  </p>
                  <p style={{ color: '#BDBDBD', fontSize: '0.7rem', marginTop: '4px' }}>
                    {new Date(n.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
            
          )}
        </div>
      )}

      <main style={{ paddingBottom: '80px' }}>
        {children}
      </main>
      {!hideBottomNav && <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />}
    </div>
  );
};

export default Layout;
