import React, { useMemo, useState, useEffect } from 'react';
import 'bulma/css/bulma.min.css';
import './index.css';
import Layout from './components/Layout';
import { HeroBanner, RideFilters, RideCard } from './components/HomeComponents';
import { ProfileHeader, ProfileStats, AchievementsSection, RecentActivitySection } from './components/ProfileComponents';
import { ClubsHeader, ClubCard } from './components/ClubsComponents';
import { MarketHeader, MarketBanner, ProductCard } from './components/MarketComponents';
import { NotificationSettings, PreferencesSettings, SecuritySettings, SupportSettings } from './components/SettingsComponents';
import Login from './components/Login';
import Register from './components/Register';
import api from './api/axios';



const MOCK_RIDES = [
  {
    id: 1,
    type: 'Running',
    title: 'Morning Trail Run',
    organizer: 'City Runners Club',
    date: 'Dec 28, 2025',
    time: '6:30 AM',
    location: 'Central Park Loop',
    distance: '8 km',
    duration: '50 min',
    fee: 'Free',
    joinedCount: 24
  },
  {
    id: 2,
    type: 'Cycling',
    title: 'Weekend Mountain Ride',
    organizer: 'Peak Cyclists',
    date: 'Dec 29, 2025',
    time: '7:00 AM',
    location: 'Mountain Trail',
    distance: '45 km',
    duration: '3 hrs',
    fee: '15',
    joinedCount: 18
  },
  {
    id: 3,
    type: 'Skating',
    title: 'Sunset City Skate',
    organizer: 'Urban Skaters',
    date: 'Dec 29, 2025',
    time: '5:45 PM',
    location: 'Embarcadero Loop',
    distance: '12 km',
    duration: '1 hr 5 min',
    fee: 'Free',
    joinedCount: 21
  },
  {
    id: 4,
    type: 'Running',
    title: 'Sunset Beach Run',
    organizer: 'Coastal Runners',
    date: 'Dec 30, 2025',
    time: '5:00 PM',
    location: 'Beach Promenade',
    distance: '5 km',
    duration: '30 min',
    fee: 'Free',
    joinedCount: 32
  },
  {
    id: 5,
    type: 'Cycling',
    title: 'City Tour Ride',
    organizer: 'Urban Cyclists',
    date: 'Dec 31, 2025',
    time: '9:00 AM',
    location: 'Downtown Circuit',
    distance: '25 km',
    duration: '1.5 hrs',
    fee: '10',
    joinedCount: 15
  }
];

const MOCK_CLUBS = [
  {
    id: 1,
    type: 'Running',
    initial: 'C',
    name: 'City Runners Club',
    description: 'A community of passionate runners exploring urban trails and parks.',
    members: 234,
    rating: 4.8,
    location: 'San Francisco'
  },
  {
    id: 2,
    type: 'Cycling',
    initial: 'P',
    name: 'Peak Cyclists',
    description: 'Mountain biking enthusiasts tackling challenging terrains together.',
    members: 156,
    rating: 4.9,
    location: 'Bay Area'
  },
  {
    id: 3,
    type: 'Skating',
    initial: 'U',
    name: 'Urban Skaters',
    description: 'Inline and quad skaters cruising city paths and waterfront routes.',
    members: 142,
    rating: 4.7,
    location: 'San Francisco'
  },
  {
    id: 4,
    type: 'Running',
    initial: 'C',
    name: 'Coastal Runners',
    description: 'Beach runs and scenic coastal routes for all skill levels.',
    members: 312,
    rating: 4.7,
    location: 'Santa Cruz'
  },
  {
    id: 5,
    type: 'Cycling',
    initial: 'U',
    name: 'Urban Cyclists',
    description: 'City commuters and weekend riders exploring the concrete jungle.',
    members: 189,
    rating: 4.6,
    location: 'San Jose'
  }
];

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'TrailRunner Pro Shoes',
    description: 'Lightweight trail running shoes with superior grip and comfort.',
    category: 'Footwear',
    price: 129,
    oldPrice: 159,
    discount: 19,
    rating: 4.8,
    reviews: 234
  },
  {
    id: 2,
    name: 'Breathable Running Tee',
    description: 'High-performance moisture-wicking fabric for maximum comfort.',
    category: 'Apparel',
    price: 35,
    oldPrice: 45,
    discount: 22,
    rating: 4.7,
    reviews: 156
  },
  {
    id: 3,
    name: 'SpeedRide Cycling Helmet',
    description: 'Aerodynamic design with advanced ventilation and impact protection.',
    category: 'Safety',
    price: 89,
    oldPrice: 110,
    discount: 19,
    rating: 4.9,
    reviews: 89
  },
  {
    id: 4,
    name: 'GPS Smart Watch V2',
    description: 'Track your routes, heart rate, and performance metrics in real-time.',
    category: 'Electronics',
    price: 199,
    oldPrice: 249,
    discount: 20,
    rating: 4.6,
    reviews: 312
  },
  {
    id: 5,
    name: 'Hydration Pack 2L',
    description: 'Comfortable and lightweight hydration solution for long trails.',
    category: 'Accessories',
    price: 55,
    rating: 4.7,
    reviews: 142
  },
  {
    id: 6,
    name: 'Reflective Safety Vest',
    description: 'High-visibility vest for safe running and cycling in low light.',
    category: 'Safety',
    price: 25,
    oldPrice: 30,
    discount: 16,
    rating: 4.5,
    reviews: 67
  },
  {
    id: 7,
    name: 'GlideMax Inline Skates',
    description: 'Smooth-rolling inline skates with supportive fit and durable wheels.',
    category: 'Skating',
    price: 149,
    oldPrice: 179,
    discount: 16,
    rating: 4.8,
    reviews: 98
  },
  {
    id: 8,
    name: 'SkateGuard Protective Set',
    description: 'Knee, elbow, and wrist protection for confident skating sessions.',
    category: 'Skating',
    price: 39,
    rating: 4.6,
    reviews: 211
  }
];

function App() {
  const [authPage, setAuthPage] = useState('login');
  const [rides, setRides] = useState([]);
  const [currentTab, setCurrentTab] = useState('home');
  const [marketCategory, setMarketCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    name: '',
    location: '',
    bio: '',
    activities: []
  });
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/me');
        const {data} = response;
        setUser({
          name: data.name ?? '',
          email: data.email ?? '' ,
          location: data.location ?? '',
          bio: data.bio ?? '',
          activities: data.activities ? data.activities.split(',') : [],
          avatar: data.avatar ?? ''

        });
      } catch (err) {}
    };
  
    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated]);

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (err) {}
  };

  if (isAuthenticated) {
    fetchProducts();
  }
}, [isAuthenticated]);

useEffect(() => {
  const fetchClubs = async () => {
    try {
      const response = await api.get('/clubs');
      setClubsData(response.data);
    } catch (err) {}
  };

  if (isAuthenticated) {
    fetchClubs();
  }
}, [isAuthenticated]);

useEffect(() => {
  const fetchRides = async () => {
    try {
      const response = await api.get('/rides');
      const data = Array.isArray(response.data) ? response.data : response.data.data ?? [];
      setRides(data);
    } catch (err) {}
  };
  

  if (isAuthenticated) {
    fetchRides();
  }
}, [isAuthenticated]);

  

  const [rideTypeFilter, setRideTypeFilter] = useState('all');
  const [clubTypeFilter, setClubTypeFilter] = useState('all');
  const [clubsTab, setClubsTab] = useState('explore');
  const [clubsData, setClubsData] = useState(MOCK_CLUBS);
  const [createClubForm, setCreateClubForm] = useState({
    name: '',
    type: 'Running',
    description: '',
    location: ''
  });

  const [selectedRide, setSelectedRide] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);

  const [joinedRideIds, setJoinedRideIds] = useState([]);
  const [joinedClubIds, setJoinedClubIds] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const filteredProducts = useMemo(() => {
  return marketCategory === 'all'
    ? products
    : products.filter((p) => p.category.toLowerCase() === marketCategory);
  }, [marketCategory, products]);


  const filteredRides = useMemo(() => {
    return rideTypeFilter === 'all' ? rides : rides.filter((r) => r.activity_type === rideTypeFilter);
  }, [rideTypeFilter, rides]);
  

  const filteredClubs = useMemo(() => {
    return clubTypeFilter === 'all' 
      ? clubsData 
      : clubsData.filter((c) => c.type?.toLowerCase() === clubTypeFilter.toLowerCase());
  }, [clubTypeFilter, clubsData]);
  

  const myClubs = useMemo(() => {
    const joined = clubsData.filter((c) => joinedClubIds.includes(c.id));
    return clubTypeFilter === 'all' ? joined : joined.filter((c) => c.type?.toLowerCase() === clubTypeFilter.toLowerCase());
  }, [clubTypeFilter, clubsData, joinedClubIds]);
  

  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.qty, 0);
  }, [cartItems]);

  const toggleJoinRide = async (ride) => {
    if (!ride?.id) return;
    try {
      if (joinedRideIds.includes(ride.id)) {
        await api.post(`/rides/${ride.id}/leave`);
        setJoinedRideIds((prev) => prev.filter((id) => id !== ride.id));
      } else {
        await api.post(`/rides/${ride.id}/join`);
        setJoinedRideIds((prev) => [...prev, ride.id]);
      }
    } catch (err) {
      console.error(err);
    }
  };
  

  const toggleJoinClub = async (club) => {
    if (!club?.id) return;
    try {
      if (joinedClubIds.includes(club.id)) {
        await api.post(`/clubs/${club.id}/leave`);
        setJoinedClubIds((prev) => prev.filter((id) => id !== club.id));
      } else {
        await api.post(`/clubs/${club.id}/join`);
        setJoinedClubIds((prev) => [...prev, club.id]);
      }
    } catch (err) {
      console.error(err);
    }
  };
  

  const addToCart = (product) => {
    if (!product?.id) return;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (!existing) return [...prev, { productId: product.id, qty: 1 }];
      return prev.map((i) => (i.productId === product.id ? { ...i, qty: i.qty + 1 } : i));
    });
  };

  const updateCartQty = (productId, nextQty) => {
    setCartItems((prev) => {
      if (nextQty <= 0) return prev.filter((i) => i.productId !== productId);
      return prev.map((i) => (i.productId === productId ? { ...i, qty: nextQty } : i));
    });
  };

  const cartLines = useMemo(() => {
    return cartItems
      .map((item) => {
        const product = MOCK_PRODUCTS.find((p) => p.id === item.productId);
        if (!product) return null;
        return { product, qty: item.qty, lineTotal: item.qty * product.price };
      })
      .filter(Boolean);
  }, [cartItems]);

  const cartTotal = useMemo(() => cartLines.reduce((sum, l) => sum + l.lineTotal, 0), [cartLines]);

  return (
    <Layout currentTab={currentTab} setCurrentTab={setCurrentTab} hideBottomNav={!isAuthenticated}>
      {/* {!isAuthenticated && (
        <div className="container px-4" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <div className="rr-card" style={{ maxWidth: '520px', margin: '0 auto' }}>
            <h1 className="title is-4 mb-2" style={{ fontWeight: 800 }}>Welcome to RouteRoots</h1>
            <p className="has-text-grey mb-5" style={{ lineHeight: 1.6 }}>
              Sign in to join rides, connect with clubs, and shop for gear across Running, Cycling, and Skating.
            </p>

            <div className="mb-4">
              <label className="settings-label">Full Name</label>
              <input
                className="settings-input"
                type="text"
                value={user.name}
                onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="mb-5">
              <label className="settings-label">Location</label>
              <input
                className="settings-input"
                type="text"
                value={user.location}
                onChange={(e) => setUser((prev) => ({ ...prev, location: e.target.value }))}
              />
            </div>

            <div className="mb-5">
              <label className="settings-label">Choose Your Activities</label>
              <div className="is-flex is-align-items-center" style={{ gap: '10px', flexWrap: 'wrap' }}>
                {['Running', 'Cycling', 'Skating'].map((activity) => {
                  const isActive = user.activities.includes(activity);
                  const activeClass =
                    activity === 'Running' ? 'is-active-running' :
                    activity === 'Cycling' ? 'is-active-cycling' :
                    'is-active-skating';

                  return (
                    <button
                      key={activity}
                      className={`rr-pill ${isActive ? activeClass : ''}`}
                      onClick={() => {
                        setUser((prev) => {
                          const next = prev.activities.includes(activity)
                            ? prev.activities.filter((a) => a !== activity)
                            : [...prev.activities, activity];
                          return { ...prev, activities: next.length ? next : prev.activities };
                        });
                      }}
                      style={!isActive ? { borderColor: '#E0E0E0' } : {}}
                    >
                      {activity}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              className="button rr-btn-green is-fullwidth"
              style={{ borderRadius: '12px', paddingTop: '1rem', paddingBottom: '1rem' }}
              onClick={() => {
                setIsAuthenticated(true);
                setCurrentTab('home');
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )} */
    !isAuthenticated && (
  authPage === 'login' ? (
    <Login onLogin={(token) => {
      setIsAuthenticated(true);
      setCurrentTab('home');
    }} onGoToRegister={() => setAuthPage('register')} />
  ) : (
    <Register onRegister={(token) => {
      setIsAuthenticated(true);
      setCurrentTab('home');
    }} onGoToLogin={() => setAuthPage('login')} />
  )
)}



      {isAuthenticated && currentTab === 'home' && (
        <>
          <HeroBanner />
          <RideFilters activeType={rideTypeFilter} setActiveType={setRideTypeFilter} />
          {filteredRides.map((ride) => (
            <RideCard
              key={ride.id}
              ride={ride}
              isJoined={joinedRideIds.includes(ride.id)}
              onToggleJoin={toggleJoinRide}
              onOpenDetails={(r) => setSelectedRide(r)}
            />
          ))}
        </>
      )}
      
      {isAuthenticated && currentTab === 'profile' && (
        <>
        <ProfileHeader 
  user={user} 
  selectedActivities={user.activities} 
  onEditProfile={() => setIsProfileEditOpen(true)}
  onAvatarChange={async (file) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('avatar', file);
    try {
      await api.post('/profile', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      const meResponse = await api.get('/me');
      setUser((prev) => ({ ...prev, avatar: meResponse.data.avatar }));
    } catch (err) {
      console.error(err);
    }
  }}
  
  
  
  
/>

          <ProfileStats />
          <AchievementsSection />
          <RecentActivitySection />
        </>
      )}

      {isAuthenticated && currentTab === 'clubs' && (
        <>
          <ClubsHeader
            activeTab={clubsTab}
            setActiveTab={(tab) => {
              setClubsTab(tab);
              if (tab === 'create') setClubTypeFilter('all');
            }}
            activeType={clubTypeFilter}
            setActiveType={setClubTypeFilter}
          />

          {clubsTab === 'create' && (
            <div className="container px-4 mt-5">
              <div className="rr-card">
                <h3 className="title is-5 mb-2" style={{ fontWeight: 800 }}>Create a Club</h3>
                <p className="has-text-grey mb-5" style={{ lineHeight: 1.6 }}>
                  Start a community for your favorite activity and invite people to join.
                </p>

                <div className="mb-4">
                  <label className="settings-label">Club Name</label>
                  <input
                    className="settings-input"
                    type="text"
                    value={createClubForm.name}
                    onChange={(e) => setCreateClubForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Downtown Skaters"
                  />
                </div>

                <div className="mb-4">
                  <label className="settings-label">Activity</label>
                  <div className="select is-fullwidth">
                    <select
                      value={createClubForm.type}
                      onChange={(e) => setCreateClubForm((prev) => ({ ...prev, type: e.target.value }))}
                      style={{ borderRadius: '12px', height: '48px' }}
                    >
                      <option value="Running">Running</option>
                      <option value="Cycling">Cycling</option>
                      <option value="Skating">Skating</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="settings-label">Location</label>
                  <input
                    className="settings-input"
                    type="text"
                    value={createClubForm.location}
                    onChange={(e) => setCreateClubForm((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., San Francisco"
                  />
                </div>

                <div className="mb-5">
                  <label className="settings-label">Description</label>
                  <input
                    className="settings-input"
                    type="text"
                    value={createClubForm.description}
                    onChange={(e) => setCreateClubForm((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Short description of your club"
                  />
                </div>

                <div className="is-flex is-justify-content-space-between is-align-items-center" style={{ gap: '12px' }}>
                  <button className="button is-fullwidth" style={{ borderRadius: '12px', fontWeight: 700 }} onClick={() => setClubsTab('explore')}>
                    Cancel
                  </button>
                  <button
                    className="button rr-btn-green is-fullwidth"
                    disabled={!createClubForm.name.trim() || !createClubForm.description.trim()}
                    onClick={async () => {
                      try {
                        const response = await api.post('/clubs', {
                          name: createClubForm.name.trim(),
                          activity_type: createClubForm.type.toLowerCase(),
                          description: createClubForm.description.trim(),
                          location: createClubForm.location.trim() || user.location
                        });
                    
                        const newClub = {
                          ...response.data,
                          type: createClubForm.type,
                          initial: createClubForm.name.trim()[0]?.toUpperCase() ?? 'C',
                          members: 1,
                          rating: 5.0,
                          location: createClubForm.location.trim() || user.location,
                        };
                        
                    
                        setClubsData((prev) => [newClub, ...prev]);
                        setJoinedClubIds((prev) => [...prev, newClub.id]);
                        setCreateClubForm({ name: '', type: 'Running', description: '', location: '' });
                        setClubsTab('my');
                        setSelectedClub(newClub);
                      } catch (err) {}
                    }}
                    
                    style={{
                      borderRadius: '12px',
                      ...(!createClubForm.name.trim() || !createClubForm.description.trim() ? { opacity: 0.6 } : {})
                    }}
                  >
                    Create Club
                  </button>
                </div>
              </div>
            </div>
          )}

          {clubsTab !== 'create' && (
            <>
              {(clubsTab === 'my' ? myClubs : filteredClubs).length === 0 && (
                <div className="container px-4 mt-5">
                  <div className="rr-card">
                    <h3 className="title is-5 mb-2" style={{ fontWeight: 800 }}>
                      {clubsTab === 'my' ? 'No clubs yet' : 'No clubs found'}
                    </h3>
                    <p className="has-text-grey" style={{ lineHeight: 1.6 }}>
                      {clubsTab === 'my'
                        ? 'Join a club from Explore or create your own.'
                        : 'Try a different activity filter.'}
                    </p>
                    {clubsTab === 'my' && (
                      <div className="is-flex mt-5" style={{ gap: '10px' }}>
                        <button className="button is-fullwidth" style={{ borderRadius: '12px', fontWeight: 700 }} onClick={() => setClubsTab('explore')}>
                          Explore
                        </button>
                        <button className="button rr-btn-green is-fullwidth" style={{ borderRadius: '12px' }} onClick={() => setClubsTab('create')}>
                          Create Club
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {(clubsTab === 'my' ? myClubs : filteredClubs).map((club) => (
                <ClubCard key={club.id} club={club} onOpenDetails={(c) => setSelectedClub(c)} />
              ))}
            </>
          )}
        </>
      )}

      {isAuthenticated && currentTab === 'market' && (
        <>
          <MarketHeader
            activeCategory={marketCategory}
            setActiveCategory={setMarketCategory}
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={cartCount}
          />
          <MarketBanner />
          <div className="pb-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={(p) => setSelectedProduct(p)}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </>
      )}

      {isAuthenticated && currentTab === 'settings' && (
        <div className="pb-6">
          <NotificationSettings />
          <PreferencesSettings />
          <SecuritySettings />
          {/* <SupportSettings /> */}
          <SupportSettings onLogout={async () => {
  try {
    await api.post('/logout');
  } catch (err) {}
  localStorage.removeItem('token');
  setIsAuthenticated(false);
  setCurrentTab('home');
}} />


          <div className="container px-4">
            {/* <button
              className="button is-fullwidth"
              style={{ borderRadius: '12px', fontWeight: 700, marginTop: '0.75rem' }}
            >
              Sign Out
            </button> */}
          </div>
        </div>
      )}
      
      {isAuthenticated && (
        <div className="mb-6" style={{ height: '40px' }}></div>
      )}

      <Modal
        isOpen={Boolean(selectedRide)}
        title={selectedRide ? selectedRide.title : ''}
        onClose={() => setSelectedRide(null)}
        footer={
          selectedRide ? (
            <div className="is-flex is-justify-content-space-between is-align-items-center" style={{ width: '100%', gap: '12px' }}>
              <div className="has-text-weight-bold" style={{ color: 'var(--primary-green)' }}>
                {selectedRide.fee === 'Free' ? 'Free' : `$ ${selectedRide.fee}`}
              </div>
              <button className="button rr-btn-green" onClick={() => toggleJoinRide(selectedRide)}>
                {joinedRideIds.includes(selectedRide.id) ? 'Leave Ride' : 'Join Ride'}
              </button>
            </div>
          ) : null
        }
      >
        {selectedRide && (
          <div>
            <div className="mb-4">
              <div className={`rr-activity-badge ${selectedRide.type === 'Running' ? 'badge-running' : selectedRide.type === 'Cycling' ? 'badge-cycling' : 'badge-skating'}`}>
                {selectedRide.type}
              </div>
            </div>
            <p className="has-text-grey-dark mb-3" style={{ lineHeight: 1.6 }}>
              Organized by <span className="has-text-weight-semibold">{selectedRide.organizer}</span>
            </p>
            <div className="rr-card" style={{ background: '#F8F9FA', border: 'none' }}>
              <div className="is-flex is-justify-content-space-between mb-2">
                <span className="has-text-grey">Date</span>
                <span className="has-text-weight-semibold">{selectedRide.date}</span>
              </div>
              <div className="is-flex is-justify-content-space-between mb-2">
                <span className="has-text-grey">Time</span>
                <span className="has-text-weight-semibold">{selectedRide.time}</span>
              </div>
              <div className="is-flex is-justify-content-space-between mb-2">
                <span className="has-text-grey">Location</span>
                <span className="has-text-weight-semibold">{selectedRide.location}</span>
              </div>
              <div className="is-flex is-justify-content-space-between">
                <span className="has-text-grey">Distance</span>
                <span className="has-text-weight-semibold">{selectedRide.distance}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={Boolean(selectedClub)}
        title={selectedClub ? selectedClub.name : ''}
        onClose={() => setSelectedClub(null)}
        footer={
          selectedClub ? (
            <div className="is-flex is-justify-content-space-between is-align-items-center" style={{ width: '100%', gap: '12px' }}>
              <div className="has-text-grey-dark">
                <span className="has-text-weight-semibold">{selectedClub.members}</span> members
              </div>
              <button className="button rr-btn-green" onClick={() => toggleJoinClub(selectedClub)}>
                {joinedClubIds.includes(selectedClub.id) ? 'Leave Club' : 'Join Club'}
              </button>
            </div>
          ) : null
        }
      >
        {selectedClub && (
          <div>
            <div className="mb-4">
              <div className={`rr-activity-badge ${selectedClub.type === 'Running' ? 'badge-running' : selectedClub.type === 'Cycling' ? 'badge-cycling' : 'badge-skating'}`}>
                {selectedClub.type}
              </div>
            </div>
            <p className="has-text-grey-dark mb-4" style={{ lineHeight: 1.6 }}>
              {selectedClub.description}
            </p>
            <div className="rr-card" style={{ background: '#F8F9FA', border: 'none' }}>
              <div className="is-flex is-justify-content-space-between mb-2">
                <span className="has-text-grey">Location</span>
                <span className="has-text-weight-semibold">{selectedClub.location}</span>
              </div>
              <div className="is-flex is-justify-content-space-between">
                <span className="has-text-grey">Rating</span>
                <span className="has-text-weight-semibold">{selectedClub.rating}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={Boolean(selectedProduct)}
        title={selectedProduct ? selectedProduct.name : ''}
        onClose={() => setSelectedProduct(null)}
        footer={
          selectedProduct ? (
            <div className="is-flex is-justify-content-space-between is-align-items-center" style={{ width: '100%', gap: '12px' }}>
              <div className="has-text-weight-bold" style={{ color: 'var(--primary-green)' }}>${selectedProduct.price}</div>
              <button
                className="button rr-btn-green"
                onClick={() => {
                  addToCart(selectedProduct);
                  setIsCartOpen(true);
                }}
              >
                Add to Cart
              </button>
            </div>
          ) : null
        }
      >
        {selectedProduct && (
          <div>
            <div className="mb-4">
              <span className="rr-pill" style={{ cursor: 'default' }}>
                <span style={{ color: selectedProduct.category === 'Skating' ? 'var(--skating-purple)' : 'inherit', fontWeight: 700 }}>
                  {selectedProduct.category}
                </span>
              </span>
            </div>
            <p className="has-text-grey-dark mb-4" style={{ lineHeight: 1.6 }}>
              {selectedProduct.description}
            </p>
            {selectedProduct.discount && (
              <div className="rr-card" style={{ background: '#F8F9FA', border: 'none' }}>
                <div className="is-flex is-justify-content-space-between">
                  <span className="has-text-grey">Discount</span>
                  <span className="has-text-weight-semibold">-{selectedProduct.discount}%</span>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isCartOpen}
        title="Cart"
        onClose={() => setIsCartOpen(false)}
        footer={
          <div className="is-flex is-justify-content-space-between is-align-items-center" style={{ width: '100%', gap: '12px' }}>
            <div className="has-text-weight-bold" style={{ color: 'var(--primary-green)' }}>${cartTotal}</div>
            <button className="button rr-btn-green" disabled={cartLines.length === 0} style={cartLines.length === 0 ? { opacity: 0.6 } : {}}>
              Checkout
            </button>
          </div>
        }
      >
        {cartLines.length === 0 && (
          <p className="has-text-grey" style={{ lineHeight: 1.6 }}>
            Your cart is empty. Add products from the Market.
          </p>
        )}
        {cartLines.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {cartLines.map((line) => (
              <div key={line.product.id} className="rr-card" style={{ background: '#F8F9FA', border: 'none' }}>
                <div className="is-flex is-justify-content-space-between is-align-items-start">
                  <div style={{ maxWidth: '65%' }}>
                    <div className="has-text-weight-bold">{line.product.name}</div>
                    <div className="has-text-grey is-size-7 mt-1">{line.product.category}</div>
                  </div>
                  <div className="has-text-weight-bold" style={{ color: 'var(--primary-green)' }}>${line.lineTotal}</div>
                </div>

                <div className="is-flex is-justify-content-space-between is-align-items-center mt-4">
                  <div className="is-flex is-align-items-center" style={{ gap: '10px' }}>
                    <button className="button" style={{ borderRadius: '10px', fontWeight: 700 }} onClick={() => updateCartQty(line.product.id, line.qty - 1)}>
                      -
                    </button>
                    <span className="has-text-weight-bold">{line.qty}</span>
                    <button className="button" style={{ borderRadius: '10px', fontWeight: 700 }} onClick={() => updateCartQty(line.product.id, line.qty + 1)}>
                      +
                    </button>
                  </div>
                  <button className="button" style={{ borderRadius: '10px', fontWeight: 700 }} onClick={() => updateCartQty(line.product.id, 0)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isProfileEditOpen}
        title="Edit Profile"
        onClose={() => setIsProfileEditOpen(false)}
        footer={
          <button className="button rr-btn-green" onClick={async () => {
            try {
              await api.put('/profile', {
                name: user.name,
                bio: user.bio,
                location: user.location,
                activities: user.activities ? user.activities.join(',') : '',
              });
            } catch (err) {
              console.error(err);
            } finally {
              setIsProfileEditOpen(false);
            }
          }}>
            Save
          </button>
          
          
        }
      >
        <div className="mb-4">
          <label className="settings-label">Full Name</label>
          <input className="settings-input" type="text" value={user.name} onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))} />
        </div>
        <div className="mb-4">
          <label className="settings-label">Location</label>
          <input className="settings-input" type="text" value={user.location} onChange={(e) => setUser((prev) => ({ ...prev, location: e.target.value }))} />
        </div>
        <div className="mb-5">
          <label className="settings-label">Bio</label>
          <input className="settings-input" type="text" value={user.bio} onChange={(e) => setUser((prev) => ({ ...prev, bio: e.target.value }))} />
        </div>
        <div>
          <label className="settings-label">Activities</label>
          <div className="is-flex is-align-items-center" style={{ gap: '10px', flexWrap: 'wrap' }}>
            {['Running', 'Cycling', 'Skating'].map((activity) => {
              const isActive = user.activities.includes(activity);
              const activeClass =
                activity === 'Running' ? 'is-active-running' :
                activity === 'Cycling' ? 'is-active-cycling' :
                'is-active-skating';

              return (
                <button
                  key={activity}
                  className={`rr-pill ${isActive ? activeClass : ''}`}
                  onClick={() => {
                    setUser((prev) => {
                      const next = prev.activities.includes(activity)
                        ? prev.activities.filter((a) => a !== activity)
                        : [...prev.activities, activity];
                      return { ...prev, activities: next.length ? next : prev.activities };
                    });
                  }}
                >
                  {activity}
                </button>
              );
            })}
          </div>
        </div>
      </Modal>
    </Layout>
  );
}

const Modal = ({ isOpen, title, onClose, children, footer }) => {
  if (!isOpen) return null;
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        <header className="modal-card-head" style={{ borderBottom: '1px solid #EEE' }}>
          <p className="modal-card-title" style={{ fontWeight: 800 }}>{title}</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body" style={{ background: 'white' }}>
          {children}
        </section>
        {footer && (
          <footer className="modal-card-foot" style={{ justifyContent: 'flex-end', borderTop: '1px solid #EEE' }}>
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
};


export default App;
