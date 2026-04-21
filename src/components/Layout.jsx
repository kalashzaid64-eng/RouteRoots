import React from 'react';
import { Bell, Home, Search, MapPin, User, Leaf, Users, ShoppingBag, Settings } from 'lucide-react';

const Navbar = () => (
  <nav className="rr-navbar">
    <div className="logo-container">
      <div className="logo-icon">
        <Leaf size={22} fill="currentColor" />
      </div>
      <div className="logo-text">
        RouteRoots <span style={{ color: 'var(--primary-green)' }}>🌱</span>
      </div>
    </div>
    <div className="notification-wrapper">
      <Bell size={24} color="#333" />
      <div className="notification-badge">3</div>
    </div>
  </nav>
);

const BottomNav = ({ currentTab, setCurrentTab }) => (
  <div className="rr-bottom-nav">
    <div
      className={`rr-nav-item ${currentTab === 'home' ? 'is-active' : ''}`}
      onClick={() => setCurrentTab('home')}
      style={{ cursor: 'pointer' }}
    >
      <Home size={24} />
      <span>Home</span>
    </div>
    <div
      className={`rr-nav-item ${currentTab === 'profile' ? 'is-active' : ''}`}
      onClick={() => setCurrentTab('profile')}
      style={{ cursor: 'pointer' }}
    >
      <User size={24} />
      <span>Profile</span>
    </div>
    <div
      className={`rr-nav-item ${currentTab === 'clubs' ? 'is-active' : ''}`}
      onClick={() => setCurrentTab('clubs')}
      style={{ cursor: 'pointer' }}
    >
      <Users size={24} />
      <span>Clubs</span>
    </div>
    <div
      className={`rr-nav-item ${currentTab === 'market' ? 'is-active' : ''}`}
      onClick={() => setCurrentTab('market')}
      style={{ cursor: 'pointer' }}
    >
      <ShoppingBag size={24} />
      <span>Market</span>
    </div>
    <div
      className={`rr-nav-item ${currentTab === 'settings' ? 'is-active' : ''}`}
      onClick={() => setCurrentTab('settings')}
      style={{ cursor: 'pointer' }}
    >
      <Settings size={24} />
      <span>Settings</span>
    </div>
  </div>
);

const Layout = ({ children, currentTab, setCurrentTab, hideBottomNav = false }) => {
  return (
    <div className="layout-container">
      <Navbar />
      <main style={{ paddingBottom: '80px' }}>
        {children}
      </main>
      {!hideBottomNav && <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />}
    </div>
  );
};

export default Layout;
