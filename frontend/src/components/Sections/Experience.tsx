import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Briefcase } from 'lucide-react';
import type { ExperienceProps } from '../../types';

const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  return (
    <section id="experience" className="relative py-16 bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900 transition-all duration-700 section-padding overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-br from-indigo-400/5 to-purple-400/5 dark:from-indigo-400/10 dark:to-purple-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-400/5 to-cyan-400/5 dark:from-blue-400/10 dark:to-cyan-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, -25, 0],
            y: [0, 25, 0],
            rotate: [360, 180, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 8
          }}
        />
        <motion.div
          className="absolute top-1/2 right-10 w-48 h-48 bg-gradient-to-br from-emerald-400/5 to-teal-400/5 dark:from-emerald-400/10 dark:to-teal-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            rotate: [0, 270, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 15
          }}
        />
        
        {/* Floating experience icons */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-indigo-400/40 to-purple-400/40 dark:from-indigo-300/40 dark:to-purple-300/40 rounded-full"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + i * 12}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.4, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 5 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
      
      <div className="container-max relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-inter font-bold text-primary dark:text-white mb-4"
            variants={itemVariants}
          >
            Work Experience
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            My professional journey and key achievements
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-transparent"></div>

          {experiences.map((experience, index) => (
            <motion.div
              key={`${experience.company}-${experience.title}`}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
            >
              {/* Timeline Dot */}
              <motion.div 
                className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-white dark:border-gray-800 shadow-lg z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.5 }}
              ></motion.div>

              {/* Content Card */}
              <motion.div
                className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                } group relative`}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.03, 
                  y: -8,
                  rotateZ: index % 2 === 0 ? -2 : 2,
                  transition: { duration: 0.3 }
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated rotating border */}
                <div className="absolute inset-[-2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                  <div className="absolute inset-0 rotating-border rounded-xl"></div>
                </div>
                
                <div className="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl shadow-lg dark:shadow-gray-700/30 p-6 relative transition-all duration-300 group-hover:shadow-2xl group-hover:border-gray-300 dark:group-hover:border-gray-500 overflow-hidden z-10">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Arrow */}
                  <div className={`absolute top-6 ${
                    index % 2 === 0 
                      ? 'md:-right-2 right-full mr-2' 
                      : 'md:-left-2 right-full mr-2'
                  } w-4 h-4 bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-600 transform rotate-45 ${
                    index % 2 === 0 
                      ? 'md:border-l md:border-b border-r border-t' 
                      : 'md:border-r md:border-t border-r border-t'
                  } group-hover:bg-gray-50 dark:group-hover:bg-gray-600 transition-colors duration-300`}></div>

                  {/* Status Badge */}
                  {experience.current && (
                    <div className="absolute -top-2 -right-2">
                      <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        Current
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-primary dark:text-white mb-1">
                      {experience.title}
                    </h3>
                    <div className="flex items-center gap-2 text-accent font-medium mb-2">
                      <Briefcase size={16} />
                      <span>{experience.company}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>
                          {formatDate(experience.startDate)} - {' '}
                          {experience.current ? 'Present' : formatDate(experience.endDate!)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <ul className="space-y-2">
                      {Array.isArray(experience.description) 
                        ? experience.description.map((desc, descIndex) => (
                            <li key={descIndex} className="text-gray-700 dark:text-gray-300 font-lora flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                              <span>{desc}</span>
                            </li>
                          ))
                        : (
                            <li className="text-gray-700 dark:text-gray-300 font-lora flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                              <span>{experience.description}</span>
                            </li>
                          )
                      }
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-medium text-primary dark:text-white mb-2">Key Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-accent/10 dark:bg-accent/20 text-accent px-2 py-1 rounded-md text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-accent/10 to-primary/10 dark:from-accent/20 dark:to-primary/20 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-primary dark:text-white mb-4">
              Looking for a Talented Developer?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 font-lora">
              I'm always open to discussing new opportunities and exciting projects.
            </p>
            <motion.a
              href="#contact"
              className="btn-primary inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Briefcase size={20} />
              Let's Work Together
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
