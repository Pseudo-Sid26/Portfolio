import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Layout/Header';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Projects from './components/Sections/Projects';
import Skills from './components/Sections/Skills';
import Experience from './components/Sections/Experience';
import Contact from './components/Sections/Contact';
import Footer from './components/Layout/Footer';
import LoadingSpinner from './components/UI/LoadingSpinner';
import dataService from './services/api';

import type { UserProfile, Project, Experience as ExperienceType } from './types';

const App: React.FC = () => {
  return <AppContent />;
};

const AppContent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check data service health
        try {
          await dataService.healthCheck();
          console.log('✅ Data service is ready');
        } catch (healthError) {
          console.warn('⚠️ Data service check failed, using fallback data');
          setError('Data service is not available. Using sample data.');
          loadFallbackData();
          return;
        }

        // Fetch data from static service
        const [profileResponse, projectsResponse, experiencesResponse] = await Promise.all([
          dataService.getProfile().catch(() => null),
          dataService.getProjects().catch(() => []),
          dataService.getExperience().catch(() => [])
        ]);

        // Type-safe data handling
        const profileData = profileResponse as UserProfile | null;
        const projectsData = Array.isArray(projectsResponse) ? projectsResponse as Project[] : [];
        const experiencesData = Array.isArray(experiencesResponse) ? experiencesResponse as ExperienceType[] : [];

        if (profileData) {
          setProfile(profileData);
        }

        if (projectsData.length > 0) {
          setProjects(projectsData);
        }

        if (experiencesData.length > 0) {
          setExperiences(experiencesData);
        }

        // If no data was loaded, use fallback
        if (!profileData && projectsData.length === 0 && experiencesData.length === 0) {
          console.log('No data loaded from API, using fallback data');
          loadFallbackData();
        }

      } catch (error) {
        console.error('Error initializing app:', error);
        setError('Failed to load data from server. Using sample data.');
        loadFallbackData();
      } finally {
        setLoading(false);
      }
    };

    const loadFallbackData = () => {
      // Static data loaded from local files
      const defaultProfile: UserProfile = {
        name: "Siddhesh Chavan",
        title: "Full Stack Developer & UI/UX Designer",
        bio: "Crafting Digital Experiences for Modern Web Applications. Passionate about creating beautiful, functional, and user-centered digital experiences.",
        avatar: "/images/profile.jpg",
        email: "contact@siddheshchavan.dev",
        location: "Maharashtra, India",
        socialLinks: {
          github: "https://github.com/Pseudo-Sid26",
          linkedin: "https://www.linkedin.com/in/siddhesh-chavan-a196a5252/",
        }
      };

      const defaultProjects: Project[] = [
        {
          title: "Modern Portfolio Website",
          description: "A responsive portfolio website built with React, TypeScript, and GitHub API featuring real-time project showcases and modern animations.",
          technologies: ["React", "TypeScript", "GitHub API", "Tailwind CSS", "Framer Motion"],
          images: ["/images/portfolio-preview.jpg"],
          githubUrl: "https://github.com/Pseudo-Sid26",
          category: "Web Development",
          featured: true
        },
        {
          title: "E-Commerce Platform",
          description: "Full-stack e-commerce solution with user authentication, payment integration, and admin dashboard.",
          technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
          images: ["/images/ecommerce-preview.jpg"],
          githubUrl: "https://github.com/Pseudo-Sid26",
          category: "Full Stack",
          featured: true
        },
        {
          title: "Task Management App",
          description: "Collaborative task management application with real-time updates and team collaboration features.",
          technologies: ["React", "Express.js", "Socket.io", "Node.js"],
          images: ["/images/taskapp-preview.jpg"],
          githubUrl: "https://github.com/Pseudo-Sid26",
          category: "Web Development",
          featured: false
        }
      ];

      const defaultExperiences: ExperienceType[] = [
        {
          title: "Senior Frontend Developer",
          company: "Tech Solutions Inc.",
          location: "Remote",
          startDate: new Date('2023-01-01'),
          current: true,
          description: [
            "Led frontend development for multiple client projects using React and TypeScript",
            "Implemented responsive designs and optimized performance for better user experience",
            "Collaborated with design teams to create pixel-perfect UI implementations",
            "Mentored junior developers and conducted code reviews"
          ],
          technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"]
        },
        {
          title: "Full Stack Developer",
          company: "Digital Agency",
          location: "Pune, MH",
          startDate: new Date('2021-06-01'),
          endDate: new Date('2022-12-01'),
          current: false,
          description: [
            "Developed full-stack web applications using modern technologies",
            "Built RESTful APIs and integrated third-party services",
            "Worked with clients to understand requirements and deliver solutions",
            "Maintained and optimized existing applications"
          ],
          technologies: ["React", "Node.js", "GitHub API", "Express.js"]
        }
      ];

      setProfile(defaultProfile);
      setProjects(defaultProjects);
      setExperiences(defaultExperiences);
    };

    initializeApp();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error Loading Portfolio</h1>
          <p className="text-gray-600 dark:text-gray-400">Unable to load profile data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-700 overflow-x-hidden relative"
    >
      {/* Page-wide background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-500/2 via-transparent to-purple-500/2 dark:from-blue-400/4 dark:to-purple-400/4 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-green-500/2 via-transparent to-cyan-500/2 dark:from-green-400/4 dark:to-cyan-400/4 rounded-full blur-3xl"
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 100,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {error && (
        <motion.div 
          className="bg-yellow-100 dark:bg-yellow-900/20 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-300 p-4 mb-4 relative z-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-bold">Notice:</p>
          <p>{error}</p>
        </motion.div>
      )}
      
      <div className="relative z-10">
        <Header />
        <main className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Hero profile={profile} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <About profile={profile} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Projects projects={projects} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Skills />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Experience experiences={experiences} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Contact />
          </motion.div>
        </main>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Footer profile={profile} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default App;
