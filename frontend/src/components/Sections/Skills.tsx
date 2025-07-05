import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { SkillStats, Project } from '../../types';
import dataService from '../../services/api';
import { generateSkillsFromProjects, calculateProjectStats } from '../../utils/skillsGenerator';

const Skills: React.FC = () => {
  const [skillStats, setSkillStats] = useState<SkillStats>({
    yearsExperience: '3+',
    projectsCompleted: '50+',
    technologies: '15+',
    clientSatisfaction: '99%'
  });
  const [isLoading, setIsLoading] = useState(true);

  // Flatten all skills from all categories for the animated display
  const [allSkillsFlat, setAllSkillsFlat] = useState<Array<{name: string, level: string, category: string}>>([]);

  useEffect(() => {
    const fetchAndGenerateSkills = async () => {
      try {
        setIsLoading(true);
        
        // Fetch projects from API
        const projects = await dataService.getProjects() as Project[];
        
        // Generate skills dynamically from project data
        const dynamicSkills = generateSkillsFromProjects(projects);
        const dynamicStats = calculateProjectStats(projects);
        
        // Remove the old setter call since we're not using generatedSkills
        setSkillStats(dynamicStats);
        
        // Flatten all skills for animation
        const flatSkills = dynamicSkills.flatMap(category => 
          category.skills.map(skill => ({
            name: skill.name,
            level: skill.level,
            category: category.category
          }))
        );
        setAllSkillsFlat(flatSkills);
        
        console.log('✨ Generated skills from projects:', {
          categories: dynamicSkills.length,
          totalSkills: dynamicSkills.reduce((sum, cat) => sum + cat.skills.length, 0),
          stats: dynamicStats
        });
      } catch (error) {
        console.error('Error generating skills:', error);
        // Keep default empty skills on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndGenerateSkills();
  }, []);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-green-500';
      case 'Advanced':
        return 'bg-blue-500';
      case 'Intermediate':
        return 'bg-yellow-500';
      case 'Beginner':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Create multiple rows of skills for continuous animation
  const createSkillRows = () => {
    if (allSkillsFlat.length === 0) return [];
    
    // Ensure we have enough skills for smooth animation by duplicating if needed
    let skillsToUse = [...allSkillsFlat];
    while (skillsToUse.length < 12) { // Minimum 12 skills for good distribution
      skillsToUse = [...skillsToUse, ...allSkillsFlat];
    }
    
    // Create 3 rows with better distribution
    const rowSize = Math.ceil(skillsToUse.length / 3);
    const rows = [
      skillsToUse.slice(0, rowSize),
      skillsToUse.slice(rowSize, rowSize * 2),
      skillsToUse.slice(rowSize * 2)
    ];
    
    // Ensure no row is empty
    return rows.filter(row => row.length > 0);
  };

  const SkillChip = ({ skill, index }: { skill: { name: string, level: string, category: string }, index: number }) => (
    <motion.div
      className="flex-shrink-0 relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 mx-2 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden"
      whileHover={{ 
        scale: 1.05, 
        y: -2,
        rotateZ: Math.random() > 0.5 ? 2 : -2,
        transition: { duration: 0.2 }
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="flex items-center gap-2 relative z-10">
        <div className={`w-2 h-2 rounded-full ${getLevelColor(skill.level)} group-hover:scale-125 transition-transform duration-300`} />
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <section id="skills" className="py-12 bg-gray-50 dark:bg-gray-900 transition-colors section-padding">
        <div className="container-max">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Generating skills from project data...</p>
          </div>
        </div>
      </section>
    );
  }

  const skillRows = createSkillRows();

  return (
    <section id="skills" className="relative py-16 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50 dark:from-gray-800/50 dark:via-gray-900 dark:to-gray-800/50 transition-all duration-700 section-padding overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 -right-32 w-96 h-96 bg-gradient-to-br from-green-400/5 to-teal-400/5 dark:from-green-400/10 dark:to-teal-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 -left-32 w-80 h-80 bg-gradient-to-br from-yellow-400/5 to-orange-400/5 dark:from-yellow-400/10 dark:to-orange-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 38,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
        />
        <motion.div
          className="absolute top-10 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/5 to-blue-400/5 dark:from-purple-400/10 dark:to-blue-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 25, 0],
            y: [0, -25, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 270, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
        
        {/* Floating particles for skills */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-400/40 to-purple-400/40 dark:from-blue-300/40 dark:to-purple-300/40 rounded-full"
            style={{
              left: `${10 + i * 11}%`,
              top: `${15 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
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
            Skills & Expertise
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Technologies and tools I work with
          </motion.p>
        </motion.div>

        {/* Animated Skills Display */}
        <div className="relative mb-12">
          {skillRows.map((row, rowIndex) => (
            <div key={rowIndex} className="relative mb-6 overflow-hidden">
              <motion.div
                className="flex whitespace-nowrap"
                animate={{
                  x: rowIndex % 2 === 0 ? ['-100%', '100%'] : ['100%', '-100%']
                }}
                transition={{
                  duration: 120 + rowIndex * 30, // Much slower: 120s, 150s, 180s (2-3 minutes per cycle)
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  width: 'fit-content'
                }}
              >
                {/* Duplicate the row more times for seamless loop and better coverage */}
                {[...row, ...row, ...row, ...row, ...row].map((skill, index) => (
                  <SkillChip key={`${skill.name}-${index}`} skill={skill} index={index} />
                ))}
              </motion.div>
            </div>
          ))}
          
          {/* Gradient overlays to fade edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent pointer-events-none z-10" />
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div
            className="text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
              {isLoading ? '...' : skillStats.yearsExperience}
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">
              Years Experience
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
              {isLoading ? '...' : skillStats.projectsCompleted}
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">
              Projects Completed
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
              {isLoading ? '...' : skillStats.technologies}
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">
              Technologies
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
              {isLoading ? '...' : skillStats.clientSatisfaction}
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">
              Client Satisfaction
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
