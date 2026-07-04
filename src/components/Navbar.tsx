import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Shield, LayoutDashboard, HelpCircle, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';

interface NavbarProps {
  showDashboardLinks?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showDashboardLinks = false }) => {
  const { darkMode, toggleDarkMode, student } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navLinks = showDashboardLinks
    ? [
        { label: 'Privacy Center', path: '/privacy-center', icon: Shield },
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Support', path: '#', icon: HelpCircle },
      ]
    : [];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 w-full border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 group"
            id="navbar-logo"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#FF8F3F] flex items-center justify-center shadow-lg shadow-orange-200 dark:shadow-orange-900/30 group-hover:scale-105 transition-transform duration-200">
              <Shield className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900 dark:text-white leading-tight">Vedantu</span>
              <span className="text-[10px] font-medium text-[#FF6B00] leading-tight tracking-wide">Privacy Center</span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          {showDashboardLinks && (
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ label, path, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => path !== '#' && navigate(path)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                    location.pathname.startsWith(path) && path !== '#'
                      ? 'bg-orange-50 dark:bg-orange-900/20 text-[#FF6B00]'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              id="dark-mode-toggle"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              <motion.div
                initial={false}
                animate={{ rotate: darkMode ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.div>
            </motion.button>

            {/* Avatar */}
            {showDashboardLinks && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF8F3F] flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-orange-200 dark:shadow-orange-900/30">
                {student.avatar}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            {showDashboardLinks && (
              <button
                className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && showDashboardLinks && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
        >
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ label, path, icon: Icon }) => (
              <button
                key={label}
                onClick={() => { if (path !== '#') { navigate(path); setMobileOpen(false); } }}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
