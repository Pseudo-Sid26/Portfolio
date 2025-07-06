import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Calendar } from 'lucide-react';
import type { UserProfile } from '../../types';

interface AboutProps {
  profile: UserProfile;
}

const About: React.FC<AboutProps> = ({ profile }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section id="about" className="py-4 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50 dark:from-gray-800/50 dark:via-gray-900 dark:to-gray-800/50 section-padding transition-all duration-700 min-h-screen flex items-center relative overflow-hidden">
      {/* Simplified floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-400/3 to-purple-400/3 dark:from-blue-400/5 dark:to-purple-400/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-green-400/3 to-blue-400/3 dark:from-green-400/5 dark:to-blue-400/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-1/2 right-10 w-48 h-48 bg-gradient-to-br from-purple-400/3 to-pink-400/3 dark:from-purple-400/5 dark:to-pink-400/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>
      
      <div className="container-max w-full relative z-10">
        <motion.div
          className="text-center mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-inter font-bold text-primary dark:text-white mb-10"
            variants={itemVariants}
          >
            About Me
          </motion.h2>
          
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 items-center max-w-6xl mx-auto">
          {/* Profile Image */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ 
              rotateZ: -3,
              scale: 1.03,
              transition: { duration: 0.3 }
            }}
          >
            <div className="relative w-full max-w-sm mx-auto">
              {/* Animated rotating border */}
              <div className="absolute inset-[-4px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl">
                <div className="absolute inset-0 rotating-border rounded-2xl"></div>
              </div>
              
              <div className="aspect-square bg-gradient-to-br from-accent to-primary/80 rounded-2xl p-2 relative z-10 group-hover:shadow-2xl transition-shadow duration-300">
                <div className="w-full h-full bg-gray-200 rounded-xl overflow-hidden group-hover:bg-gray-100 dark:group-hover:bg-gray-600 transition-colors duration-300">
                  <img
                    src="/images/profile-about.jpg"
                    alt={`${profile.name} - Profile`}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center group-hover:bg-gray-100 dark:group-hover:bg-gray-600 transition-colors duration-300" style={{ display: 'none' }}>
                    <span className="text-6xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-3 -right-3 w-16 h-16 bg-accent/20 rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute -bottom-3 -left-3 w-12 h-12 bg-primary/20 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h3 className="text-xl font-inter font-semibold text-primary dark:text-white mb-3">
                Hello! I'm {profile.name.split(' ')[0]}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 font-lora text-sm">
                {profile.bio} I'm passionate about creating beautiful, functional, and user-centered digital experiences. 
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-lora text-sm">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                or sharing knowledge with the developer community.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                className="relative bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 transition-all duration-300 group overflow-hidden"
                whileHover={{ 
                  scale: 1.03,
                  rotateZ: -1,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex items-center gap-2 relative z-10">
                  <div className="p-1.5 bg-accent/10 dark:bg-accent/20 rounded-lg group-hover:bg-accent/20 dark:group-hover:bg-accent/30 transition-colors duration-300">
                    <MapPin className="w-4 h-4 text-accent group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <p className="font-medium text-primary dark:text-white text-sm">Location</p>
                    <p className="text-gray-600 dark:text-gray-300 text-xs">{profile.location}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 transition-all duration-300 group overflow-hidden"
                whileHover={{ 
                  scale: 1.03,
                  rotateZ: 1,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex items-center gap-2 relative z-10">
                  <div className="p-1.5 bg-accent/10 dark:bg-accent/20 rounded-lg group-hover:bg-accent/20 dark:group-hover:bg-accent/30 transition-colors duration-300">
                    <Mail className="w-4 h-4 text-accent group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <p className="font-medium text-primary dark:text-white text-sm">Email</p>
                    <p className="text-gray-600 dark:text-gray-300 text-xs">{profile.email}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 col-span-2 transition-all duration-300 group overflow-hidden"
                whileHover={{ 
                  scale: 1.02,
                  y: -3,
                  transition: { duration: 0.2 }
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex items-center gap-2 relative z-10">
                  <div className="p-1.5 bg-accent/10 dark:bg-accent/20 rounded-lg group-hover:bg-accent/20 dark:group-hover:bg-accent/30 transition-colors duration-300">
                    <Calendar className="w-4 h-4 text-accent group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <p className="font-medium text-primary dark:text-white text-sm">Available for</p>
                    <p className="text-gray-600 dark:text-gray-300 text-xs">Freelance projects and full-time opportunities</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              className="pt-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={`mailto:${profile.email}`}
                className="btn-primary inline-flex items-center gap-2 text-sm px-4 py-2"
              >
                <Mail size={16} />
                Let's Work Together
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
