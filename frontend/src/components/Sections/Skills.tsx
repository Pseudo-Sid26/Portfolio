import React from 'react';
import { motion } from 'framer-motion';

// Core skills for Fullstack + AI Development
const coreSkills = {
  frontend: [
    { name: 'React', level: 'Medium', color: 'from-blue-500 to-cyan-500' },
    { name: 'TypeScript', level: 'Beginner', color: 'from-blue-600 to-blue-700' },
    { name: 'Next.js', level: 'Beginner', color: 'from-gray-700 to-black' },
    { name: 'Tailwind CSS', level: 'Advanced', color: 'from-teal-400 to-blue-500' }
  ],
  backend: [
    { name: 'Node.js', level: 'Medium', color: 'from-green-500 to-green-600' },
    { name: 'Django', level: 'Beginner', color: 'from-yellow-500 to-blue-500' },
    { name: 'Express.js', level: 'Medium', color: 'from-gray-600 to-gray-700' },
    { name: 'MongoDB', level: 'Medium', color: 'from-green-600 to-green-700' }
  ],
  ai: [
    { name: 'Machine Learning', level: 'Advanced', color: 'from-purple-500 to-pink-500' },
    { name: 'TensorFlow', level: 'Intermediate', color: 'from-orange-500 to-red-500' },
    { name: 'RAG', level: 'Beginner', color: 'from-emerald-500 to-teal-600' },
    { name: 'Agentic AI', level: 'Intermediate', color: 'from-indigo-500 to-purple-600' }
  ]
};

const Skills: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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

  const SkillCard = ({ skill }: { skill: { name: string, level: string, color: string } }) => (
    <motion.div
      className="group relative bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-200 overflow-hidden"
      variants={itemVariants}
      whileHover={{ 
        y: -3,
        scale: 1.01,
        transition: { duration: 0.2 }
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      <div className="relative z-10">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{skill.name}</h4>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}</span>
          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${skill.color} group-hover:scale-125 transition-transform duration-300`} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="skills" className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors section-padding relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-20 w-64 h-64 bg-gradient-to-br from-blue-400/5 to-purple-400/5 dark:from-blue-400/10 dark:to-purple-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />
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
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Technologies and tools I work with
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Frontend */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Frontend
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {coreSkills.frontend.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </motion.div>

          {/* Backend */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Backend
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {coreSkills.backend.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </motion.div>

          {/* AI */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              AI
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {coreSkills.ai.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
