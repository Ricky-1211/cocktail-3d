
import { useEffect, useState, useRef } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { MocktailOrder } from '../Componets/types/index.ts';
import Navbar from '../Componets/Navbar.tsx';
import { gsap } from 'gsap';
import Lenis from '@studio-freight/lenis';

// Define types for AuthContext
interface AuthContextType {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    dateOfBirth: string;
    preferences: string[];
    createdAt: string;
  } | null;
  updateProfile: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    dateOfBirth: string;
    preferences: string[];
  }) => void;
  getUserOrders: () => MocktailOrder[];
  logout: () => void;
}

const Profile = () => {
  const { user, updateProfile, getUserOrders, logout } = useAuth() as AuthContextType;
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState<MocktailOrder[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    preferences: [] as string[],
  });
  const [isLoading, setIsLoading] = useState(true);

  const profileRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ordersRef = useRef<HTMLDivElement>(null);
  const backgroundContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    if (!user) {
      navigate('/login'); // Redirect to login instead of Profile
      return;
    }

    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      dateOfBirth: user.dateOfBirth || '',
      preferences: user.preferences || [],
    });

    setOrders(getUserOrders() || []);
    setIsLoading(false);

    // Background animation with 3D effect
    if (backgroundContainerRef.current) {
      gsap.to(backgroundContainerRef.current, {
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        duration: 2,
        ease: 'power2.inOut',
      });
    }

    // Create animated glass and drink elements background
    const createGlassBackground = () => {
      const container = backgroundContainerRef.current;
      if (!container) return { container: null, animationInterval: null };

      container.className = 'fixed inset-0 pointer-events-none -z-10 overflow-hidden';

      // Create main rotating glass
      const createMainGlass = () => {
        const glass = document.createElement('div');
        glass.className = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
        
        // Glass container
        const glassContainer = document.createElement('div');
        glassContainer.className = 'relative';
        
        // Glass bowl (main part)
        const glassBowl = document.createElement('div');
        glassBowl.className = 'absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-40 border-2 border-cyan-300/60 rounded-full';
        glassBowl.style.clipPath = 'ellipse(50% 40% at 50% 50%)';
        glassBowl.style.backdropFilter = 'blur(10px)';
        glassBowl.style.background = 'linear-gradient(135deg, rgba(173, 216, 230, 0.1) 0%, rgba(135, 206, 250, 0.05) 100%)';
        
        // Glass stem
        const glassStem = document.createElement('div');
        glassStem.className = 'absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-20 bg-cyan-200/40';
        
        // Glass base
        const glassBase = document.createElement('div');
        glassBase.className = 'absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-cyan-200/50 rounded-full';
        
        // Liquid inside glass
        const liquid = document.createElement('div');
        liquid.className = 'absolute bottom-8 left-1/2 transform -translate-x-1/2 w-28 h-24';
        liquid.style.clipPath = 'ellipse(50% 35% at 50% 50%)';
        liquid.style.background = 'linear-gradient(135deg, rgba(255, 105, 180, 0.3) 0%, rgba(255, 215, 0, 0.4) 100%)';
        liquid.style.backdropFilter = 'blur(5px)';
        
        glassShape.appendChild(glassBowl);
        glassShape.appendChild(glassStem);
        glassShape.appendChild(glassBase);
        glassShape.appendChild(liquid);
        glassContainer.appendChild(glassShape);
        glass.appendChild(glassContainer);
        
        // Animate the main glass
        gsap.to(glass, {
          rotationY: 360,
          rotationX: 15,
          duration: 8,
          repeat: -1,
          ease: 'none',
        });
        
        // Pulsing animation
        gsap.to(glass, {
          scale: 1.1,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
        
        return { glass, glassContainer };
      };

      const { glass, glassContainer } = createMainGlass();
      container.appendChild(glass);

      // Create drink elements that split from the glass
      const createDrinkElements = () => {
        const drinkElements: HTMLDivElement[] = [];
        const drinkColors = [
          'rgba(255, 107, 107, 0.6)', // Red
          'rgba(77, 208, 225, 0.6)',  // Blue
          'rgba(255, 218, 121, 0.6)', // Yellow
          'rgba(169, 220, 118, 0.6)', // Green
          'rgba(197, 134, 192, 0.6)', // Purple
          'rgba(255, 159, 67, 0.6)',  // Orange
        ];

        for (let i = 0; i < 12; i++) {
          const element = document.createElement('div');
          const isBubble = Math.random() > 0.7;
          const size = isBubble ? Math.random() * 20 + 10 : Math.random() * 35 + 20;
          const color = drinkColors[i % drinkColors.length];

          element.className = `absolute ${isBubble ? 'rounded-full' : 'rounded-lg'} opacity-70`;
          element.style.width = `${size}px`;
          element.style.height = `${size}px`;
          element.style.background = isBubble
            ? `radial-gradient(circle at 30% 30%, ${color}, ${color.replace('0.6', '0.3')})`
            : color;
          element.style.boxShadow = `0 8px 25px ${color.replace('0.6', '0.4')}`;
          element.style.filter = 'blur(1px)';
          element.style.left = '50%';
          element.style.top = '50%';

          // Initial animation - split from glass
          gsap.fromTo(
            element,
            {
              scale: 0,
              rotation: Math.random() * 360,
              x: 0,
              y: 0,
            },
            {
              scale: 1,
              x: `+=${(Math.random() - 0.5) * 800}`,
              y: `+=${(Math.random() - 0.5) * 600}`,
              rotation: Math.random() * 720 - 360,
              duration: Math.random() * 3 + 2,
              ease: 'power2.out',
              delay: i * 0.2,
            }
          );

          // Continuous floating animation
          gsap.to(element, {
            y: `-=${Math.random() * 100 + 50}`,
            x: `+=${(Math.random() - 0.5) * 60}`,
            rotation: `+=${Math.random() * 180 - 90}`,
            duration: Math.random() * 8 + 6,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 2,
          });

          // Pulsing glow effect
          gsap.to(element, {
            scale: 1.2,
            opacity: 0.9,
            duration: Math.random() * 2 + 1,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });

          container.appendChild(element);
          drinkElements.push(element);
        }

        return drinkElements;
      };

      const drinkElements = createDrinkElements();

      // Create floating ice cubes
      const createIceCubes = () => {
        for (let i = 0; i < 8; i++) {
          const iceCube = document.createElement('div');
          iceCube.className = 'absolute rounded-sm opacity-50';
          iceCube.style.width = `${Math.random() * 20 + 15}px`;
          iceCube.style.height = `${Math.random() * 20 + 15}px`;
          iceCube.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(173, 216, 230, 0.6) 100%)';
          iceCube.style.boxShadow = '0 4px 15px rgba(173, 216, 230, 0.4)';
          iceCube.style.border = '1px solid rgba(255, 255, 255, 0.3)';
          iceCube.style.left = `${Math.random() * 100}%`;
          iceCube.style.top = `${Math.random() * 100}%`;

          // Complex 3D rotation and movement
          gsap.to(iceCube, {
            rotationX: Math.random() * 360,
            rotationY: Math.random() * 360,
            rotationZ: Math.random() * 360,
            x: `+=${(Math.random() - 0.5) * 200}`,
            y: `+=${(Math.random() - 0.5) * 150}`,
            duration: Math.random() * 10 + 8,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
          });

          // Floating animation
          gsap.to(iceCube, {
            y: `-=${Math.random() * 80 + 40}`,
            duration: Math.random() * 6 + 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });

          container.appendChild(iceCube);
        }
      };

      createIceCubes();

      // Reset animation every 30 seconds
      const resetAnimation = () => {
        // Animate elements back to glass
        drinkElements.forEach((element, index) => {
          gsap.to(element, {
            x: 0,
            y: 0,
            scale: 0,
            rotation: 0,
            duration: 2,
            ease: 'power2.in',
            delay: index * 0.1,
            onComplete: () => {
              // Then split again
              gsap.to(element, {
                scale: 1,
                x: `+=${(Math.random() - 0.5) * 800}`,
                y: `+=${(Math.random() - 0.5) * 600}`,
                rotation: Math.random() * 720 - 360,
                duration: Math.random() * 3 + 2,
                ease: 'power2.out',
              });
            },
          });
        });
      };

      const animationInterval = setInterval(resetAnimation, 30000);

      return { container, animationInterval };
    };

    const { container: backgroundElements, animationInterval } = createGlassBackground();

    // Profile card 3D entrance animation
    if (profileRef.current) {
      gsap.fromTo(
        profileRef.current,
        { opacity: 0, y: 50, rotateX: 15, transformPerspective: 1000 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: 'power3.out' }
      );
    }

    // Orders card 3D flip animation
    if (ordersRef.current) {
      gsap.fromTo(
        ordersRef.current,
        { opacity: 0, rotateY: 90, transformPerspective: 1000 },
        { opacity: 1, rotateY: 0, duration: 1, ease: 'back.out(1.7)', delay: 0.2 }
      );
    }

    // Stats card 3D flip animation
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, rotateY: -90, transformPerspective: 1000 },
        { opacity: 1, rotateY: 0, duration: 1, ease: 'back.out(1.7)', delay: 0.4 }
      );
    }

    return () => {
      lenis.destroy();
      clearInterval(animationInterval);
      gsap.killTweensOf('*'); // Kill all GSAP animations to prevent memory leaks
      if (backgroundElements && backgroundElements.parentNode) {
        backgroundElements.parentNode.removeChild(backgroundElements);
      }
    };
  }, [user, navigate, getUserOrders]);

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);

    // 3D save button animation
    gsap.to('.save-button', {
      scale: 1.2,
      rotateX: 360,
      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      boxShadow: '0 10px 20px rgba(16, 185, 129, 0.5)',
      duration: 0.5,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out',
    });
  };

  const handlePreferenceToggle = (preference: string) => {
    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter((p) => p !== preference)
        : [...prev.preferences, preference],
    }));

    // 3D button toggle animation
    gsap.to(`[data-pref="${preference}"]`, {
      scale: 0.9,
      rotateY: 180,
      duration: 0.4,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out',
    });
  };

  const handleLogout = () => {
    // 3D logout button animation
    gsap.to('.logout-button', {
      scale: 0.9,
      rotateX: -360,
      background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
      boxShadow: '0 10px 20px rgba(220, 38, 38, 0.5)',
      duration: 0.4,
      onComplete: () => {
        logout();
        navigate('/');
      },
    });
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-indigo-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4 transform-gpu"></div>
          <p className="text-white/80 text-lg font-medium">Mixing your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 relative overflow-hidden">
        <div ref={backgroundContainerRef} />
        <div
          ref={profileRef}
          className="min-h-screen bg-gradient-to-br from-gray-900/90 via-indigo-900/80 to-cyan-900/90 p-6 mt-16"
          style={{ perspective: '1000px' }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-5xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                My Profile
              </h1>
              <div className="flex gap-4">
                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-cyan-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_10px_20px_rgba(6,182,212,0.5)]"
                >
                  Order Mocktails
                </Link>
                <button
                  onClick={handleLogout}
                  className="logout-button bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-red-800 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_10px_20px_rgba(220,38,38,0.5)]"
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Information */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl transform-gpu hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)] transition-all duration-500">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]">Personal Information</h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_8px_16px_rgba(59,130,246,0.5)]"
                    >
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">First Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 transform-gpu hover:shadow-[0_4px_12px_rgba(245,158,11,0.3)]"
                          placeholder="Enter first name"
                        />
                      ) : (
                        <p className="text-white text-lg bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-xl px-4 py-3 shadow-inner">{formData.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Last Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 transform-gpu hover:shadow-[0_4px_12px_rgba(245,158,11,0.3)]"
                          placeholder="Enter last name"
                        />
                      ) : (
                        <p className="text-white text-lg bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-xl px-4 py-3 shadow-inner">{formData.lastName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Email</label>
                      <p className="text-white text-lg bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-xl px-4 py-3 shadow-inner">{formData.email}</p>
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 transform-gpu hover:shadow-[0_4px_12px_rgba(245,158,11,0.3)]"
                          placeholder="Enter phone number"
                        />
                      ) : (
                        <p className="text-white text-lg bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-xl px-4 py-3 shadow-inner">{formData.phone || 'Not provided'}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-white text-sm font-medium mb-2">Address</label>
                      {isEditing ? (
                        <textarea
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 transform-gpu hover:shadow-[0_4px_12px_rgba(245,158,11,0.3)] resize-none"
                          rows={3}
                          placeholder="Enter your address"
                        />
                      ) : (
                        <p className="text-white text-lg bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-xl px-4 py-3 shadow-inner min-h-[80px]">{formData.address || 'Not provided'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Date of Birth</label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                          className="w-full px-4 py-3 bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 transform-gpu hover:shadow-[0_4px_12px_rgba(245,158,11,0.3)]"
                        />
                      ) : (
                        <p className="text-white text-lg bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-xl px-4 py-3 shadow-inner">{formData.dateOfBirth || 'Not provided'}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-white text-sm font-medium mb-2">Mocktail Preferences</label>
                      {isEditing ? (
                        <div className="flex flex-wrap gap-3">
                          {['Fruity', 'Sweet', 'Sour', 'Spicy', 'Creamy', 'Fresh', 'Tropical', 'Classic'].map((pref) => (
                            <button
                              key={pref}
                              data-pref={pref}
                              type="button"
                              onClick={() => handlePreferenceToggle(pref)}
                              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform-gpu ${
                                formData.preferences.includes(pref)
                                  ? 'bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-[0_6px_12px_rgba(245,158,11,0.5)] scale-105'
                                  : 'bg-gradient-to-r from-gray-700/50 to-gray-800/50 text-white/70 hover:bg-gray-700/70 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]'
                              }`}
                            >
                              {pref}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-3">
                          {formData.preferences.length > 0 ? (
                            formData.preferences.map((pref) => (
                              <span
                                key={pref}
                                className="bg-gradient-to-r from-amber-500/20 to-pink-500/20 text-white px-4 py-2 rounded-xl text-sm border border-white/10 shadow-inner"
                              >
                                {pref}
                              </span>
                            ))
                          ) : (
                            <p className="text-white/70 bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-xl px-4 py-3 shadow-inner">No preferences set</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-6">
                      <button
                        onClick={handleSave}
                        className="save-button bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform-gpu hover:scale-105 hover:shadow-[0_10px_20px_rgba(16,185,129,0.5)] font-semibold"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Recent Orders */}
                <div
                  ref={ordersRef}
                  className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-3xl p-6 border border-white/10 shadow-2xl transform-gpu hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)] transition-all duration-500"
                >
                  <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]">Recent Orders</h2>
                  {orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.slice(0, 5).map((order) => (
                        <div
                          key={order.id}
                          className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-xl p-4 border border-white/10 hover:bg-gray-700/70 transition-all duration-300 transform-gpu hover:scale-[1.02] hover:shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-white font-semibold">{order.name}</h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                order.status === 'completed'
                                  ? 'bg-gradient-to-r from-green-500/20 to-green-700/20 text-green-300 border border-green-500/30'
                                  : order.status === 'ready'
                                  ? 'bg-gradient-to-r from-blue-500/20 to-blue-700/20 text-blue-300 border border-blue-500/30'
                                  : order.status === 'preparing'
                                  ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-700/20 text-yellow-300 border border-yellow-500/30'
                                  : 'bg-gradient-to-r from-gray-500/20 to-gray-700/20 text-gray-300 border border-gray-500/30'
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className="text-white/70 text-sm mb-2">${order.price.toFixed(2)}</p>
                          <p className="text-white/50 text-xs">
                            {new Date(order.orderDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-white/70 mb-4">No orders yet</p>
                      <Link
                        to="/dashboard"
                        className="inline-block bg-gradient-to-r from-amber-500 to-pink-500 text-white px-4 py-2 rounded-xl hover:from-amber-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_8px_16px_rgba(245,158,11,0.5)]"
                      >
                        Order Your First Mocktail
                      </Link>
                    </div>
                  )}
                  {orders.length > 5 && (
                    <Link
                      to="/dashboard"
                      className="block text-center text-amber-400 hover:text-amber-300 mt-4 font-medium transition-colors duration-300"
                    >
                      View all orders →
                    </Link>
                  )}
                </div>

                {/* Account Stats */}
                <div
                  ref={statsRef}
                  className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-3xl p-6 border border-white/10 shadow-2xl transform-gpu hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)] transition-all duration-500"
                >
                  <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]">Account Stats</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-white bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-xl p-3 shadow-inner">
                      <span>Member since:</span>
                      <span className="font-semibold">{new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-white bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-xl p-3 shadow-inner">
                      <span>Total orders:</span>
                      <span className="font-semibold text-amber-400">{orders.length}</span>
                    </div>
                    <div className="flex justify-between items-center text-white bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-xl p-3 shadow-inner">
                      <span>Completed orders:</span>
                      <span className="font-semibold text-green-400">{orders.filter((o) => o.status === 'completed').length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;