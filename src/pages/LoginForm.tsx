import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import ThreeScene from './ThreeScene';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Main container refs
  const containerRef = useRef<HTMLDivElement>(null);
  const loginContainerRef = useRef<HTMLDivElement>(null);
  const registerContainerRef = useRef<HTMLDivElement>(null);
  
  // Animation refs
  const loginFormRef = useRef<HTMLDivElement>(null);
  const registerFormRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const toggleButtonsRef = useRef<HTMLDivElement>(null);
  
  // Floating elements refs
  const mocktailRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement[]>([]);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    preferences: [] as string[],
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Background gradient animation
    gsap.to('body', {
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      duration: 2,
      ease: 'power2.inOut',
    });

    // Animated gradient background
    const gradientTl = gsap.timeline({ repeat: -1, yoyo: true });
    gradientTl
      .to('body', {
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        duration: 8,
        ease: 'sine.inOut',
      })
      .to('body', {
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        duration: 8,
        ease: 'sine.inOut',
      });

    // Main entrance animation
    tl.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.9, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    )
    .fromTo(
      toggleButtonsRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo(
      loginContainerRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(
      titleRef.current,
      { opacity: 0, y: 30, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.5'
    )
    .fromTo(
      descriptionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );

    // Create floating mocktail elements
    createMocktailElements();
    createFloatingBubbles();

    return () => {
      gradientTl.kill();
      gsap.to('body', {
        background: '',
        duration: 0.5,
      });
      cleanupMocktailElements();
    };
  }, []);

  const createMocktailElements = () => {
    if (!mocktailRef.current) {
      const container = document.createElement('div');
      container.className = 'fixed inset-0 pointer-events-none -z-10 overflow-hidden';
      mocktailRef.current = container;
      document.body.appendChild(container);

      const colors = [
        'rgba(76, 201, 240, 0.3)',
        'rgba(244, 143, 177, 0.3)',
        'rgba(120, 119, 198, 0.3)',
        'rgba(255, 119, 97, 0.3)',
        'rgba(29, 209, 161, 0.3)',
        'rgba(255, 221, 89, 0.3)',
      ];

      // Create decorative floating shapes
      for (let i = 0; i < 8; i++) {
        const shape = document.createElement('div');
        const size = Math.random() * 40 + 20;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        shape.className = 'absolute rounded-full opacity-20';
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.background = color;
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.filter = 'blur(10px)';

        gsap.to(shape, {
          x: `+=${(Math.random() - 0.5) * 100}`,
          y: `+=${(Math.random() - 0.5) * 80}`,
          rotation: Math.random() * 360,
          duration: Math.random() * 15 + 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 5,
        });

        container.appendChild(shape);
      }
    }
  };

  const createFloatingBubbles = () => {
    const container = document.querySelector('.bubbles-container');
    if (!container) return;

    for (let i = 0; i < 15; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'absolute rounded-full bg-gradient-to-br from-white/10 to-white/5';
      const size = Math.random() * 15 + 5;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.top = `${Math.random() * 100}%`;
      
      gsap.to(bubble, {
        y: `-=${Math.random() * 100 + 50}`,
        x: `+=${(Math.random() - 0.5) * 30}`,
        opacity: Math.random() * 0.5 + 0.1,
        duration: Math.random() * 8 + 6,
        repeat: -1,
        ease: 'sine.inOut',
        delay: Math.random() * 3,
      });
      
      bubblesRef.current.push(bubble);
      container.appendChild(bubble);
    }
  };

  const cleanupMocktailElements = () => {
    if (mocktailRef.current && mocktailRef.current.parentNode) {
      mocktailRef.current.parentNode.removeChild(mocktailRef.current);
    }
    bubblesRef.current.forEach(bubble => {
      if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
    });
  };

  const handleSwitch = (toLogin: boolean) => {
    if (isAnimating || isLogin === toLogin) return;
    
    setError('');
    setIsAnimating(true);
    
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLogin(toLogin);
        setIsAnimating(false);
      }
    });
    
    if (toLogin) {
      // Switch to Login (slide registration out)
      tl.to(registerContainerRef.current, {
        x: '100%',
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      })
      .to(loginContainerRef.current, {
        x: '0%',
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, 0);
    } else {
      // Switch to Register (slide login out)
      tl.to(loginContainerRef.current, {
        x: '-100%',
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      })
      .to(registerContainerRef.current, {
        x: '0%',
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, 0);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      if (loginFormRef.current) {
        animateError(loginFormRef.current);
      }
      return;
    }

    const success = login(email, password);
    
    if (success) {
      const button = (e.currentTarget as HTMLFormElement).querySelector('button');
      animateSuccess(button, '/profile');
    } else {
      setError('Invalid email or password');
      if (loginFormRef.current) {
        animateError(loginFormRef.current);
      }
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerData.email)) {
      setError('Please enter a valid email address');
      if (registerFormRef.current) {
        animateError(registerFormRef.current);
      }
      return;
    }

    if (!registerData.firstName || !registerData.lastName) {
      setError('First and last names are required');
      if (registerFormRef.current) {
        animateError(registerFormRef.current);
      }
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      if (registerFormRef.current) {
        animateError(registerFormRef.current);
      }
      return;
    }

    if (registerData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      if (registerFormRef.current) {
        animateError(registerFormRef.current);
      }
      return;
    }

    const success = register(
      {
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        email: registerData.email,
        phone: registerData.phone,
        address: registerData.address,
        dateOfBirth: registerData.dateOfBirth,
        preferences: registerData.preferences,
      },
      registerData.password
    );

    if (success) {
      const button = (e.currentTarget as HTMLFormElement).querySelector('button');
      animateSuccess(button, '/profile');
    } else {
      setError('User with this email already exists');
      if (registerFormRef.current) {
        animateError(registerFormRef.current);
      }
    }
  };

  const animateError = (element: HTMLDivElement | null) => {
    if (!element) return;
    
    gsap.timeline()
      .to(element, {
        x: 10,
        duration: 0.1,
        ease: 'power1.inOut',
      })
      .to(element, {
        x: -10,
        duration: 0.1,
        ease: 'power1.inOut',
      })
      .to(element, {
        x: 0,
        duration: 0.1,
        ease: 'power1.inOut',
      });
  };

  const animateSuccess = (button: Element | null, route: string) => {
    if (!button) return;
    
    gsap.timeline()
      .to(button, {
        scale: 0.95,
        backgroundColor: '#4ECDC4',
        duration: 0.1,
        ease: 'power1.inOut',
      })
      .to(button, {
        scale: 1,
        duration: 0.1,
        ease: 'power1.inOut',
        onComplete: () => {
          navigate(route);
        },
      });
  };

  const handlePreferenceToggle = (preference: string) => {
    setRegisterData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference],
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <ThreeScene />
      
      {/* Animated background elements */}
      <div className="fixed inset-0 bubbles-container pointer-events-none -z-10"></div>
      
      {/* Glow effects */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div
        ref={containerRef}
        className="w-full max-w-6xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-4xl shadow-2xl border border-white/20 overflow-hidden relative z-10"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px rgba(147, 51, 234, 0.15)',
        }}
      >
        {/* Animated border */}
        <div className="absolute inset-0 rounded-4xl p-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent animate-gradient-border"></div>
        
        {/* Top toggle buttons */}
        <div 
          ref={toggleButtonsRef}
          className="absolute top-6 left-0 right-0 flex justify-center gap-4 z-30"
        >
          <button
            onClick={() => handleSwitch(true)}
            disabled={isAnimating}
            className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform ${isLogin 
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl scale-105' 
              : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => handleSwitch(false)}
            disabled={isAnimating}
            className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform ${!isLogin 
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl scale-105' 
              : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'}`}
          >
            Create Account
          </button>
        </div>
        
        <div className="relative flex h-[750px]">
          {/* Left Panel - Always visible info section */}
          <div
            ref={leftPanelRef}
            className="w-2/5 p-12 flex flex-col justify-center relative z-20"
          >
            <div className="text-white relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"></div>
              
              <h2
                ref={titleRef}
                className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight"
              >
                Welcome to Mocktail Magic
              </h2>
              
              <p
                ref={descriptionRef}
                className="text-white/90 text-lg mb-12 leading-relaxed font-light"
              >
                Discover amazing alcohol-free cocktails, save your favorite recipes, 
                and get personalized recommendations based on your taste preferences.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/80">1,000+ Mocktail Recipes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/80">Personalized Taste Profile</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/80">AI-Powered Recommendations</span>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-8 right-8 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-8 left-8 w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </div>

          {/* Right Panel - Forms (Sliding) */}
          <div className="w-3/5 relative overflow-hidden">
            {/* Login Form Container */}
            <div
              ref={loginContainerRef}
              className={`absolute inset-0 p-12 ${isLogin ? 'block' : 'hidden'}`}
            >
              <div
                ref={loginFormRef}
                className="h-full flex flex-col justify-center"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold text-white">Sign In to Your Account</h3>
                </div>
                
                {error && isLogin && (
                  <div className="mb-8 p-4 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 rounded-2xl text-red-200 text-sm backdrop-blur-sm animate-shake">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {error}
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleLoginSubmit} className="space-y-8">
                  <div className="relative group">
                    <label className="block text-white/90 text-sm font-medium mb-3">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:border-white/20"
                        placeholder="you@example.com"
                        required
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/30">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <label className="block text-white/90 text-sm font-medium mb-3">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="password"
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:border-white/20"
                        placeholder="••••••••"
                        required
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/30">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-white/80 text-sm cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 bg-white/10 border border-white/20 rounded-lg peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-blue-500 transition-all duration-300 group-hover:border-white/40"></div>
                        <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="group-hover:text-white transition-colors">Remember me</span>
                    </label>
                    <a href="#" className="text-blue-300 hover:text-blue-200 text-sm transition-colors duration-300 font-medium hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  
                  <button
                    type="submit"
                    className="group relative w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-5 px-6 rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Sign In
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>
              </div>
            </div>

            {/* Register Form Container */}
            <div
              ref={registerContainerRef}
              className={`absolute inset-0 p-12 ${!isLogin ? 'block' : 'hidden'}`}
              style={{ transform: isLogin ? 'translateX(100%)' : 'translateX(0%)' }}
            >
              <div
                ref={registerFormRef}
                className="h-full flex flex-col justify-center"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold text-white">Create Your Account</h3>
                </div>
                
                {error && !isLogin && (
                  <div className="mb-8 p-4 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 rounded-2xl text-red-200 text-sm backdrop-blur-sm animate-shake">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {error}
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleRegisterSubmit} className="space-y-6 max-h-[580px] overflow-y-auto pr-3 custom-scrollbar">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="block text-white/90 text-sm font-medium mb-3">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={registerData.firstName}
                        onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:border-white/20"
                        placeholder="John"
                      />
                    </div>
                    
                    <div className="relative group">
                      <label className="block text-white/90 text-sm font-medium mb-3">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={registerData.lastName}
                        onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:border-white/20"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <label className="block text-white/90 text-sm font-medium mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:border-white/20"
                      placeholder="you@example.com"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="block text-white/90 text-sm font-medium mb-3">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:border-white/20"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div className="relative group">
                      <label className="block text-white/90 text-sm font-medium mb-3">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={registerData.dateOfBirth}
                        onChange={(e) => setRegisterData({ ...registerData, dateOfBirth: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:border-white/20"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-3">
                      Mocktail Preferences
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {['Fruity', 'Sweet', 'Sour', 'Spicy', 'Creamy', 'Fresh', 'Tropical', 'Classic'].map(pref => (
                        <button
                          key={pref}
                          type="button"
                          onClick={() => handlePreferenceToggle(pref)}
                          className={`group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
                            registerData.preferences.includes(pref)
                              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                              : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <span className="relative z-10">{pref}</span>
                          {registerData.preferences.includes(pref) && (
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="block text-white/90 text-sm font-medium mb-3">
                        Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:border-white/20"
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div className="relative group">
                      <label className="block text-white/90 text-sm font-medium mb-3">
                        Confirm Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:border-white/20"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="group relative w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-5 px-6 rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Create Account
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add custom styles for animations */}
      <style>{`
        @keyframes gradient-border {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-gradient-border {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          background-size: 200% 100%;
          animation: gradient-border 3s linear infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #3b82f6);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #2563eb);
        }
      `}</style>
    </div>
  );
};

export default AuthPage;