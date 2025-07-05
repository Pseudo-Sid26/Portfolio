import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Mail, Download } from 'lucide-react';
import type { UserProfile } from '../../types';
import dataService from '../../services/api';

interface HeroProps {
  profile: UserProfile;
}

const Hero: React.FC<HeroProps> = ({ profile }) => {
  const [typedText, setTypedText] = React.useState('');
  const [currentTitleIndex, setCurrentTitleIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const titles = [
    "Full Stack Developer",
    "AI/ML Engineer", 
    "Software Engineer",
    "Web Developer"
  ];

  // Typewriter effect
  React.useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (typedText.length < currentTitle.length) {
          setTypedText(currentTitle.slice(0, typedText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (typedText.length > 0) {
          setTypedText(currentTitle.slice(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [typedText, currentTitleIndex, isDeleting, titles]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    try {
      const resumeUrl = dataService.getResumeDownloadUrl();
      window.open(resumeUrl, '_blank');
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen py-20 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-all duration-700"
    >
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 dark:from-blue-500/30 dark:to-purple-700/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 dark:from-cyan-500/30 dark:to-blue-700/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/15 to-pink-600/15 dark:from-purple-500/25 dark:to-pink-700/25 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Additional animated orbs */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 dark:from-indigo-500/20 dark:to-purple-500/20 rounded-full blur-2xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            scale: [1, 1.3, 1],
            rotate: [0, 270, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/40 dark:bg-blue-300/40 rounded-full"
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + i * 8}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile Initials */}
          <motion.div
            className="relative mb-10 group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Subtle glow effect */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 dark:from-blue-400/30 dark:to-purple-600/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Floating dots around avatar */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400/60 dark:bg-blue-300/60 rounded-full"
                style={{
                  top: `${20 + Math.cos(i * Math.PI / 2) * 60}px`,
                  left: `${50 + Math.sin(i * Math.PI / 2) * 60}%`,
                }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.5, 1, 0.5],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
            
            <motion.div 
              className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1.5 shadow-xl relative z-10 transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-gray-100 dark:group-hover:bg-gray-600 transition-colors duration-300">
                <motion.span 
                  className="text-3xl font-bold text-gray-800 dark:text-white transition-all duration-300"
                  whileHover={{
                    scale: 1.1,
                    color: "#3b82f6"
                  }}
                >
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </motion.span>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Hi! I'm {profile.name} 👋
          </motion.h1>

          {/* Animated Title with Typewriter Effect */}
          <motion.div
            className="text-xl md:text-2xl lg:text-3xl mb-8 h-14 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="text-gray-600 dark:text-gray-400">I'm a </span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold ml-3 min-w-[250px] text-left">
              {typedText}
              <motion.span
                className="inline-block w-1 h-6 md:h-7 lg:h-8 bg-blue-600 dark:bg-blue-400 ml-2"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {profile.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <motion.button
              onClick={handleDownloadResume}
              className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-full font-medium flex items-center gap-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                rotateZ: -2,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Download size={18} className="relative z-10" />
              <span className="relative z-10">Download Resume</span>
            </motion.button>
            
            <motion.a
              href={`mailto:${profile.email}`}
              className="relative border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 px-6 py-2.5 rounded-full font-medium flex items-center gap-2 transition-all duration-300 transform hover:scale-105 text-sm overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                rotateZ: 2,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Mail size={18} className="relative z-10" />
              <span className="relative z-10">Get In Touch</span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.a
              href={profile.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={30}/>
            </motion.a>
            
            <motion.a
              href={profile.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </motion.a>
          </motion.div>

        </div>
      </div>
      
      {/* Scroll Down Indicator - Right Corner */}
      <motion.div
        className="absolute bottom-24 right-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <motion.button
          onClick={scrollToAbout}
          className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-full p-3"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
        >
          <ChevronDown size={18} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
