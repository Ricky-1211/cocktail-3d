import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogIn, Menu, X, ChevronDown, ChevronUp, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../pages/AuthContext.tsx'; // Import your AuthContext

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
  logout: () => void;
}

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Order', href: '/Fmenu' },
  { name: 'About', href: '/about' },
  { name: 'Visit Us', href: '/visit' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  const navbarRef = useRef(null);
  const profileDropdownRef = useRef(null);

  // Get auth context
  const { user, logout } = useAuth() as AuthContextType;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    document.body.style.position = isMenuOpen ? 'fixed' : 'static';
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
    };
  }, [isMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !(profileDropdownRef.current as HTMLElement).contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
      }
    } else {
      navigate(href);
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    navigate('/');
  };

  const isActivePath = (path: string) => location.pathname === path;

  const navLinkClasses = (path: string) => {
    const baseClasses = 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300';
    return isActivePath(path)
      ? `${baseClasses} text-amber-400 border-b-2 border-amber-400`
      : `${baseClasses} text-amber-100 hover:text-amber-400`;
  };

  const mobileNavLinkClasses = (path: string) => {
    const baseClasses = 'block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300';
    return isActivePath(path)
      ? `${baseClasses} text-amber-400 bg-amber-500/10`
      : `${baseClasses} text-gray-700 hover:bg-amber-500/10 hover:text-amber-400`;
  };

  const overlayVariants = {
    open: { opacity: 1, backdropFilter: 'blur(8px)', transition: { duration: 0.4 } },
    closed: { opacity: 0, backdropFilter: 'blur(0px)', transition: { duration: 0.3 } },
  };

  const sidebarVariants = {
    open: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 40 } },
    closed: { x: '100%', opacity: 0, transition: { type: 'spring', stiffness: 400, damping: 40 } },
  };

  const itemVariants = {
    open: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 30 } },
    closed: { y: 20, opacity: 0, scale: 0.8, transition: { type: 'spring', stiffness: 500, damping: 30 } },
  };

  const dropdownVariants = {
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    }
  };

  return (
    <>
      <nav
        ref={navbarRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-black/90 backdrop-blur-xl shadow-lg border-b border-amber-500/20' : 'bg-black/50 backdrop-blur-md'
        }`}
        style={{ transform: isScrolled ? 'translateY(0) scale(1)' : 'translateY(0) scale(1.02)', perspective: '1000px' }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.05, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotateY: 10, boxShadow: '0 0 20px rgba(245, 158, 11, 0.6)' }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="text-white font-bold text-xl">E</span>
              </motion.div>
              <div>
                <h1 className="font-display text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  ELIXIR
                </h1>
                <p className="text-xs text-amber-200/80 font-medium tracking-wide">The Art of Mixology</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <motion.button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className={navLinkClasses(link.href)}
                  whileHover={{ y: -3, rotateX: 5 }}
                  whileTap={{ y: 0 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {link.name}
                  <motion.span
                    className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Desktop CTA & Auth */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.button
                className="relative p-3 text-amber-100 hover:text-amber-400 transition-all duration-300"
                whileHover={{ scale: 1.1, rotateY: 10 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/cart')}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <ShoppingCart size={22} />
                {cartItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </motion.button>

              {user ? (
                // User is logged in - Show profile dropdown
                <div className="relative" ref={profileDropdownRef}>
                  <motion.button
                    className="flex items-center space-x-2 p-2 text-amber-100 hover:text-amber-400 transition-all duration-300 rounded-lg"
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">
                        {user.firstName?.[0]}{user.lastName?.[0]}
                      </span>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium text-amber-100">
                        {user.firstName} {user.lastName}
                      </span>
                      <span className="text-xs text-amber-200/70">
                        {user.email}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isProfileDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={16} className="text-amber-200" />
                    </motion.div>
                  </motion.button>

                  {/* Profile Dropdown */}
                  <AnimatePresence>
                    {isProfileDropdownOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="absolute right-0 top-full mt-2 w-64 bg-black/90 backdrop-blur-xl rounded-xl shadow-2xl border border-amber-500/20 overflow-hidden"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="p-4 border-b border-amber-500/20">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                              <span className="text-white font-bold text-sm">
                                {user.firstName?.[0]}{user.lastName?.[0]}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-amber-100 truncate">
                                {user.firstName} {user.lastName}
                              </p>
                              <p className="text-xs text-amber-200/70 truncate">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-2">
                          <motion.button
                            onClick={() => {
                              navigate('/profile');
                              setIsProfileDropdownOpen(false);
                            }}
                            className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-amber-100 hover:bg-amber-500/10 rounded-lg transition-all duration-300"
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <User size={16} />
                            <span>My Profile</span>
                          </motion.button>

                          <motion.button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300 mt-1"
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <LogOut size={16} />
                            <span>Logout</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                // User is not logged in - Show login button
                <>
                  <motion.button
                    className="bg-amber-500/20 text-amber-100 px-6 py-2 rounded-xl font-semibold text-base border border-amber-500/40 hover:bg-amber-500/30 transition-all duration-300"
                    whileHover={{ scale: 1.05, rotateX: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/login')}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <LogIn size={18} className="inline mr-2 text-amber-400" />
                    Login
                  </motion.button>
                </>
              )}

              <motion.button
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold text-base shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
                whileHover={{ scale: 1.05, rotateX: 5, boxShadow: '0 10px 20px rgba(245, 158, 11, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick('/Fmenu')}
                style={{ transformStyle: 'preserve-3d' }}
              >
                Order Now
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative p-2 rounded-full focus:outline-none"
              whileHover={{ scale: 1.05, rotateY: 10 }}
              whileTap={{ scale: 0.9 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                animate={isMenuOpen ? 'open' : 'closed'}
                variants={{ closed: { rotate: 0 }, open: { rotate: 180 } }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-amber-400" />
                ) : (
                  <Menu className="w-6 h-6 text-amber-400" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl p-6 overflow-y-auto"
              style={{ transformStyle: 'preserve-3d' }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div className="flex justify-between items-center border-b border-amber-200 pb-3">
                <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
                <motion.button
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ scale: 1.1, rotateY: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-6 w-6 text-gray-600" />
                </motion.button>
              </motion.div>

              {/* User Info in Mobile Menu */}
              {user && (
                <motion.div 
                  variants={itemVariants}
                  className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">
                        {user.firstName?.[0]}{user.lastName?.[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.div variants={itemVariants} className="space-y-2 mt-4">
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={itemVariants}>
                    <Link
                      to={link.href}
                      className={mobileNavLinkClasses(link.href)}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Mobile Auth Section */}
              <motion.div variants={itemVariants} className="mt-6 pt-6 border-t border-amber-200">
                {user ? (
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-amber-500/10 hover:text-amber-400 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-500/10 transition-all duration-300"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-amber-500/10 hover:text-amber-400 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;