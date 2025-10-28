import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import ThreeScene from './ThreeScene';

const Register = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const inputRefs = useRef<HTMLDivElement[]>([]);
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
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

    gsap.to('body', {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      duration: 2,
    });

    return () => {
      gsap.to('body', {
        background: '',
        duration: 0.5,
      });
      gsap.killTweensOf([formRef.current, titleRef.current, inputRefs.current]);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
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

    if (!formData.firstName || !formData.lastName) {
      setError('First and last names are required');
      gsap.to(formRef.current, {
        x: 10,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        ease: 'power1.inOut',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      gsap.to(formRef.current, {
        x: 10,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        ease: 'power1.inOut',
      });
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      gsap.to(formRef.current, {
        x: 10,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        ease: 'power1.inOut',
      });
      return;
    }

    const success = register(
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        dateOfBirth: formData.dateOfBirth,
        preferences: formData.preferences,
      },
      formData.password
    );

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
      setError('User with this email already exists');
      gsap.to(formRef.current, {
        x: 10,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }
  };

  const handlePreferenceToggle = (preference: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference],
    }));
  };

  const addToInputRefs = (el: HTMLDivElement | null) => {
    if (el && !inputRefs.current.includes(el)) {
      inputRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <ThreeScene />
      
      <div
        ref={formRef}
        className="bg-white/15 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 w-full max-w-2xl relative z-10"
      >
        <div className="relative z-10">
          <h2
            ref={titleRef}
            className="text-4xl font-bold text-white text-center mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
          >
            Create Account
          </h2>
          
          {error && (
            <div className="mb-6 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div ref={addToInputRefs}>
              <label className="block text-white text-sm font-medium mb-2">
                First Name *
              </label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                placeholder="Enter your first name"
              />
            </div>
            
            <div ref={addToInputRefs}>
              <label className="block text-white text-sm font-medium mb-2">
                Last Name *
              </label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                placeholder="Enter your last name"
              />
            </div>
            
            <div ref={addToInputRefs} className="md:col-span-2">
              <label className="block text-white text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                placeholder="Enter your email"
              />
            </div>
            
            <div ref={addToInputRefs}>
              <label className="block text-white text-sm font-medium mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                placeholder="Enter your phone number"
              />
            </div>
            
            <div ref={addToInputRefs}>
              <label className="block text-white text-sm font-medium mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
            </div>
            
            <div ref={addToInputRefs} className="md:col-span-2">
              <label className="block text-white text-sm font-medium mb-2">
                Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none"
                placeholder="Enter your address"
                rows={3}
              />
            </div>
            
            <div ref={addToInputRefs} className="md:col-span-2">
              <label className="block text-white text-sm font-medium mb-2">
                Mocktail Preferences
              </label>
              <div className="flex flex-wrap gap-3">
                {['Fruity', 'Sweet', 'Sour', 'Spicy', 'Creamy', 'Fresh', 'Tropical', 'Classic'].map(pref => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => handlePreferenceToggle(pref)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      formData.preferences.includes(pref)
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>
            
            <div ref={addToInputRefs}>
              <label className="block text-white text-sm font-medium mb-2">
                Password *
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                placeholder="Enter password"
              />
            </div>
            
            <div ref={addToInputRefs}>
              <label className="block text-white text-sm font-medium mb-2">
                Confirm Password *
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                placeholder="Confirm password"
              />
            </div>
            
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Create Account
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-white/80 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-green-300 hover:text-green-200 font-semibold transition-colors duration-300 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;