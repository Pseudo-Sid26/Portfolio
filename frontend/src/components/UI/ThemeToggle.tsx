import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

// Simple theme toggle without context dependency
const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = React.useState(false);

  // Check for saved theme preference or default to light mode
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative w-14 h-8 rounded-full p-1 transition-all duration-500
        ${isDark 
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25' 
          : 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/25'
        }
        hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
        ${isDark ? 'focus:ring-blue-500' : 'focus:ring-yellow-500'}
      `}
      whileTap={{ scale: 0.95 }}
      whileHover={{ 
        boxShadow: isDark 
          ? "0 10px 25px rgba(59, 130, 246, 0.4)" 
          : "0 10px 25px rgba(251, 191, 36, 0.4)"
      }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center relative"
        animate={{
          x: isDark ? 24 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30
        }}
      >
        {isDark ? (
          <Moon size={14} className="text-blue-600" />
        ) : (
          <Sun size={14} className="text-yellow-600" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
