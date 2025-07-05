import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../UI/ThemeToggle';

// Header component without theme context dependency
const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg dark:shadow-gray-900/20'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="container-max section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="font-inter font-bold text-2xl text-theme-primary"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}>
              Siddhesh.
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className="relative text-theme-primary hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.name}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
            
            {/* Theme Toggle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: navigation.length * 0.1 }}
            >
              <ThemeToggle />
            </motion.div>
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-theme-primary hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-16 left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg dark:shadow-gray-900/20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="section-padding py-4">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className="block py-3 text-theme-primary hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
