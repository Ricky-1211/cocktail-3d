import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LoginForm = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const inputRefs = useRef<HTMLDivElement[]>([]);
  const glassRef = useRef<HTMLDivElement>(null);
  const liquidRef = useRef<HTMLDivElement>(null);
  const mocktailRef = useRef<HTMLDivElement | null>(null);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.5'
      )
      .fromTo(
        inputRefs.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out' },
        '-=0.3'
      );

    if (glassRef.current) {
      gsap.to(glassRef.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center',
      });
    }

    if (liquidRef.current) {
      gsap.to(liquidRef.current, {
        rotation: 15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: 'center center',
      });
    }

    // Create mocktail elements container
    const container = document.createElement('div');
    container.className = 'fixed inset-0 pointer-events-none -z-10';
    mocktailRef.current = container;
    document.body.appendChild(container);

    const mocktailColors = [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#96CEB4',
      '#FFEAA7',
      '#FD79A8',
      '#A29BFE',
      '#FFA726',
      '#26C6DA',
      '#EF5350',
    ];

    // Reduced elements from 20 to 10 for performance
    for (let i = 0; i < 10; i++) {
      const element = document.createElement('div');
      const isBubble = Math.random() > 0.5;

      if (isBubble) {
        const size = Math.random() * 10 + 5;
        element.className = 'absolute rounded-full opacity-40';
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.background = `radial-gradient(circle at 30% 30%, ${mocktailColors[i % mocktailColors.length]}55, ${mocktailColors[(i + 3) % mocktailColors.length]}22)`;
      } else {
        const size = Math.random() * 20 + 10;
        element.className = 'absolute rounded-lg opacity-50';
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.background = mocktailColors[i % mocktailColors.length];
        element.style.borderRadius = '50% 50% 30% 70% / 60% 30% 70% 40%';
        element.style.filter = 'blur(1px)';
      }

      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;

      gsap.to(element, {
        y: `-=${Math.random() * 50 + 25}`,
        x: `+=${(Math.random() - 0.5) * 40}`,
        rotation: Math.random() * 360,
        duration: Math.random() * 10 + 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 5,
      });

      container.appendChild(element);
    }

    const backgroundTl = gsap.timeline({ repeat: -1, yoyo: true });
    backgroundTl
      .to('body', {
        background: 'linear-gradient(135deg, #FF6B6B 0%, #FFEAA7 50%, #4ECDC4 100%)',
        duration: 10,
        ease: 'sine.inOut',
      })
      .to('body', {
        background: 'linear-gradient(135deg, #A29BFE 0%, #FD79A8 50%, #FFA726 100%)',
        duration: 10,
        ease: 'sine.inOut',
      })
      .to('body', {
        background: 'linear-gradient(135deg, #45B7D1 0%, #96CEB4 50%, #EF5350 100%)',
        duration: 10,
        ease: 'sine.inOut',
      });

    return () => {
      if (mocktailRef.current && mocktailRef.current.parentNode) {
        mocktailRef.current.parentNode.removeChild(mocktailRef.current);
      }
      backgroundTl.kill();
      gsap.killTweensOf([formRef.current, titleRef.current, inputRefs.current, glassRef.current, liquidRef.current]);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      gsap.to(formRef.current, {
        x: 10,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        ease: 'power1.inOut',
      });
      return;
    }

    const success = login(email, password);
    
    if (success) {
      const button = (e.currentTarget as HTMLFormElement).querySelector('button');
      gsap.to(button, {
        scale: 0.95,
        backgroundColor: '#4ECDC4',
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          navigate('/profile');
        },
      });
    } else {
      setError('Invalid email or password');
      if (formRef.current) {
        gsap.to(formRef.current, {
          x: 10,
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }
    }
  };

  const addToInputRefs = (el: HTMLDivElement | null) => {
    if (el && !inputRefs.current.includes(el)) {
      inputRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div
        ref={glassRef}
        className="absolute right-10 top-1/2 transform -translate-y-1/2 w-48 h-48 z-0"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-40 bg-gradient-to-b from-transparent to-white/10 rounded-b-full border-2 border-white/30 border-t-transparent backdrop-blur-sm">
            <div
              ref={liquidRef}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-28 h-32 rounded-b-full overflow-hidden"
            >
              <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-yellow-400/80 to-orange-400/60 rounded-t-full"></div>
              <div className="absolute bottom-1/3 w-full h-1/3 bg-gradient-to-t from-pink-400/70 to-red-400/60"></div>
              <div className="absolute bottom-2/3 w-full h-1/3 bg-gradient-to-t from-blue-400/60 to-purple-400/50 rounded-b-full"></div>
              <div className="absolute bottom-4 left-6 w-2 h-2 bg-white/40 rounded-full"></div>
              <div className="absolute bottom-8 right-8 w-3 h-3 bg-white/30 rounded-full"></div>
              <div className="absolute bottom-12 left-10 w-2 h-2 bg-white/50 rounded-full"></div>
              <div className="absolute bottom-20 left-14 w-2 h-2 bg-white/40 rounded-full"></div>
            </div>
            <div className="absolute top-8 left-6 w-6 h-6 bg-orange-400/70 rounded-full rotate-45"></div>
            <div className="absolute top-12 right-8 w-5 h-5 bg-lime-400/60 rounded-full rotate-12"></div>
            <div className="absolute top-20 left-10 w-4 h-4 bg-rose-400/70 rounded-full rotate-30"></div>
          </div>
          <div className="absolute -bottom-8 w-2 h-8 bg-white/40 rounded-b-lg"></div>
          <div className="absolute -bottom-16 w-12 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>

      <div
        ref={formRef}
        className="bg-white/15 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 w-full max-w-md relative z-10"
      >
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-400/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-400/20 rounded-full blur-xl"></div>
        
        <div className="relative z-10">
          <h2
            ref={titleRef}
            className="text-4xl font-bold text-white text-center mb-8 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent"
          >
            Welcome Back
          </h2>
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-sm text-center backdrop-blur-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div ref={addToInputRefs}>
              <label className="block text-white text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div ref={addToInputRefs}>
              <label className="block text-white text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div ref={addToInputRefs} className="flex items-center justify-between">
              <label className="flex items-center text-white text-sm">
                <input
                  type="checkbox"
                  className="rounded bg-white/10 border-white/20 text-pink-400 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-transparent"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <a href="#" className="text-blue-300 hover:text-blue-200 text-sm transition-colors duration-300 font-medium">
                Forgot password?
              </a>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white py-4 px-4 rounded-xl font-semibold hover:from-pink-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-white/80 text-sm">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-blue-300 hover:text-blue-200 font-semibold transition-colors duration-300 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;