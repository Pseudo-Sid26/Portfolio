import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Eye, ChevronDown } from 'lucide-react';
import type { Project } from '../../types';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(3); // Show 3 projects initially
  const [showAll, setShowAll] = useState<boolean>(false);

  // Memoize filtered projects calculation
  const filteredProjects = useMemo(() => {
    if (filter === 'All') {
      return projects;
    }
    return projects.filter(p => p.category === filter);
  }, [filter, projects]);

  // Memoize projects to show
  const projectsToShow = useMemo(() => {
    return showAll ? filteredProjects : filteredProjects.slice(0, visibleCount);
  }, [showAll, filteredProjects, visibleCount]);

  // Update when filter changes
  useEffect(() => {
    // Reset visible count when filter changes
    setVisibleCount(3);
    setShowAll(false);
  }, [filter, projects]);

  // Handle show more/less
  const handleShowMore = () => {
    setShowAll(true);
    setVisibleCount(filteredProjects.length);
  };

  const handleShowLess = () => {
    setShowAll(false);
    setVisibleCount(3);
    // Smooth scroll to projects section when showing less
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  // Memoize categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(projects.map(p => p.category))];
    return cats;
  }, [projects]);

  // Handle filter button clicks
  const handleFilterClick = (category: string) => {
    setFilter(category);
  };

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
    <section id="projects" className="py-16 bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900 section-padding transition-all duration-700 relative overflow-hidden">
      {/* Smooth animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-br from-purple-400/5 to-pink-400/5 dark:from-purple-400/10 dark:to-pink-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            rotate: [0, 120, 240, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-gradient-to-br from-blue-400/5 to-indigo-400/5 dark:from-blue-400/10 dark:to-indigo-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, -15, 0],
            y: [0, 15, 0],
            rotate: [360, 240, 120, 0],
          }}
          transition={{
            duration: 12,
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
            Featured Projects
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4"
            variants={itemVariants}
          >
            A showcase of my recent work and creative solutions
          </motion.p>
          <motion.div
            className="text-sm text-gray-500 dark:text-gray-500"
            variants={itemVariants}
          >
            
          </motion.div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => handleFilterClick(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700'
              }`}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          key={filter} // Force re-animation when filter changes
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible" // Use animate instead of whileInView for immediate animation
        >
          {filteredProjects.length > 0 ? (
            projectsToShow.map((project, index) => (
              <ProjectCard
                key={`${filter}-${project.title}`} // Include filter in key to force re-render
                project={project}
                index={index}
                onViewDetails={() => setSelectedProject(project)}
              />
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-12"
              variants={itemVariants}
            >
              <p className="text-gray-400 dark:text-gray-400 text-lg">
                No projects found for "{filter}" category.
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                Try selecting a different category.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Show More/Less Controls */}
        {filteredProjects.length > 3 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {!showAll ? (
              <motion.button
                onClick={handleShowMore}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View More Projects</span>
                <motion.div
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="group-hover:animate-bounce"
                >
                  <ChevronDown size={20} />
                </motion.div>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                  +{filteredProjects.length - visibleCount}
                </span>
              </motion.button>
            ) : (
              <motion.button
                onClick={handleShowLess}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-4 rounded-full font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Show Less</span>
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="group-hover:animate-bounce"
                >
                  <ChevronDown size={20} className="rotate-180" />
                </motion.div>
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewDetails: () => void;
}

const ProjectCard = React.memo(({ project, onViewDetails, index }: ProjectCardProps & { index: number }) => {
  const handleClick = useCallback(() => onViewDetails(), [onViewDetails]);
  
  return (
    <motion.div
      className="relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 group cursor-pointer project-card-wrapper"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.1,
          },
        },
      }}
      whileHover={{ 
        y: -8,
        rotateZ: -1.5,
        scale: 1.02,
        transition: { 
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.2 }
      }}
      onClick={handleClick}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Animated rotating border */}
      <div className="absolute inset-[-2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
        <div className="absolute inset-0 rotating-border rounded-xl"></div>
      </div>
      
      {/* Inner content container with proper background */}
      <div className="relative bg-white dark:bg-gray-900 rounded-xl p-6 h-full z-10 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        {/* Header with title and featured badge */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {project.title}
          </h3>
          {project.featured && (
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Featured
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed text-sm group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
          {project.description}
        </p>

        {/* Domain Badge */}
        {project.domain && (
          <div className="mb-4">
            <span className="inline-block bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-700 group-hover:border-blue-400 dark:group-hover:border-blue-500 transition-colors duration-300">
              {project.domain}
            </span>
          </div>
        )}

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs font-medium border border-gray-300 dark:border-gray-700 group-hover:border-gray-400 dark:group-hover:border-gray-600 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-gray-500 dark:text-gray-500 text-xs flex items-center">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* GitHub Stats */}
        {project.language && (
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500 mb-6">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400 group-hover:bg-green-300 transition-colors duration-300"></div>
              <span>{project.language}</span>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1, rotateZ: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={18} />
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1, rotateZ: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={18} />
              </motion.a>
            )}
          </div>
          
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 hover:from-blue-500 hover:to-purple-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
          >
            <Eye size={14} />
            View Details
          </motion.button>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none rounded-xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </motion.div>
  );
});

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-2">
                {project.title}
              </h3>
              <div className="flex items-center gap-3">
                <p className="text-gray-600">{project.category}</p>
                {project.domain && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm font-medium">
                      {project.domain}
                    </span>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-6 font-lora leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mb-6">
            <h4 className="font-semibold text-primary mb-3">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
                View Code
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={20} />
                Live Demo
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;
