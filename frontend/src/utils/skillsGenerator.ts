/**
 * Frontend Skills Generator
 * Generates skill categories and levels from project data
 */

import type { Project, SkillCategory } from '../types';

// Technology categorization mapping
const TECH_CATEGORIES: Record<string, string[]> = {
  'Programming Languages': [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'PHP', 'C++', 'C#', 'Go', 'Rust'
  ],
  'Frontend Development': [
    'React', 'Next.js', 'Vue.js', 'Angular', 'Svelte', 'HTML5', 'CSS3',
    'Tailwind CSS', 'Bootstrap', 'Material-UI', 'Chakra UI', 'SASS', 'SCSS',
    'Framer Motion', 'React Router', 'Redux', 'Vite', 'Webpack'
  ],
  'Backend Development': [
    'Node.js', 'Express.js', 'Django', 'Flask', 'FastAPI', 'Spring Boot', 'Laravel',
    'Ruby on Rails', 'ASP.NET', 'Koa.js', 'Nest.js', 'GraphQL', 'Apollo Server'
  ],
  'Databases': [
    'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'DynamoDB', 'Cassandra',
    'Neo4j', 'InfluxDB', 'Firebase', 'Supabase'
  ],
  'Cloud & DevOps': [
    'AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions',
    'GitLab CI', 'Terraform', 'Ansible', 'Nginx', 'Apache', 'Vercel', 'Netlify', 'Heroku'
  ],
  'AI & Machine Learning': [
    'TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV', 'Pandas', 'NumPy',
    'Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision',
    'OpenAI API', 'LangChain', 'Hugging Face', 'AI Agents'
  ],
  'Mobile Development': [
    'React Native', 'Flutter', 'Ionic', 'Xamarin', 'Swift', 'Kotlin', 'Cordova'
  ],
  'Tools & Technologies': [
    'Git', 'GitHub', 'GitLab', 'Bitbucket', 'VS Code', 'IntelliJ', 'Eclipse',
    'Postman', 'Insomnia', 'Figma', 'Adobe XD', 'REST API', 'Socket.io',
    'JWT', 'bcrypt', 'CORS', 'Stripe', 'PayPal', 'Twilio'
  ]
};

// Special mappings for complex or alternate technology names
const TECH_MAPPINGS: Record<string, string> = {
  'Express.js': 'Express.js',
  'Node.js': 'Node.js',
  'Next.js': 'Next.js',
  'Vue.js': 'Vue.js',
  'HTML': 'HTML5',
  'CSS': 'CSS3',
  'Machine Learning': 'Machine Learning',
  'Natural Language Processing': 'Natural Language Processing',
  'Computer Vision': 'Computer Vision',
  'Deep Learning': 'Deep Learning',
  'REST API': 'REST API',
  'Socket.io': 'Socket.io',
  'AI Agents': 'AI Agents',
  'Log Analysis': 'AI & Machine Learning',
  'Server-side Logic': 'Backend Development',
  'Database Design': 'Databases',
  'Authentication': 'Tools & Technologies',
  'IoT': 'Tools & Technologies',
  'Hibernate': 'Tools & Technologies',
  'Spring Security': 'Tools & Technologies',
  'Axios': 'Tools & Technologies'
};

/**
 * Categorizes a technology into its appropriate skill category
 */
function categorizeTechnology(tech: string): string {
  // Check direct mappings first
  if (TECH_MAPPINGS[tech]) {
    const mapped = TECH_MAPPINGS[tech];
    // If it maps to a category name, return that category
    if (Object.keys(TECH_CATEGORIES).includes(mapped)) {
      return mapped;
    }
    tech = mapped;
  }

  // Find category for the technology
  for (const [category, technologies] of Object.entries(TECH_CATEGORIES)) {
    if (technologies.some(t => t.toLowerCase() === tech.toLowerCase())) {
      return category;
    }
  }

  // Default categorization based on common patterns
  const techLower = tech.toLowerCase();
  
  if (techLower.includes('react') || techLower.includes('vue') || techLower.includes('angular')) {
    return 'Frontend Development';
  }
  if (techLower.includes('node') || techLower.includes('express') || techLower.includes('api')) {
    return 'Backend Development';
  }
  if (techLower.includes('database') || techLower.includes('db') || techLower.includes('sql')) {
    return 'Databases';
  }
  if (techLower.includes('ai') || techLower.includes('ml') || techLower.includes('learning')) {
    return 'AI & Machine Learning';
  }
  if (techLower.includes('cloud') || techLower.includes('aws') || techLower.includes('docker')) {
    return 'Cloud & DevOps';
  }

  // Default to Tools & Technologies for unrecognized items
  return 'Tools & Technologies';
}

/**
 * Determines proficiency level based on usage frequency and project characteristics
 */
function determineProficiencyLevel(
  projectCount: number, 
  totalProjects: number, 
  projects: Project[]
): 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' {
  const usageRatio = projectCount / totalProjects;
  
  // Check if used in featured projects (indicates higher proficiency)
  const usedInFeatured = projects.some(p => p.featured);
  
  // Check if used in recent projects (last year)
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const usedRecently = projects.some(p => {
    const projectDate = new Date(p.updated_at || p.updatedAt || p.created_at || p.createdAt || '2024-01-01');
    return projectDate > oneYearAgo;
  });

  // Scoring system
  let score = 0;
  
  // Base score from usage ratio
  if (usageRatio >= 0.6) score += 40;
  else if (usageRatio >= 0.4) score += 30;
  else if (usageRatio >= 0.25) score += 20;
  else score += 10;
  
  // Bonus for featured projects
  if (usedInFeatured) score += 25;
  
  // Bonus for recent usage
  if (usedRecently) score += 15;
  
  // Bonus for multiple projects
  if (projectCount >= 5) score += 20;
  else if (projectCount >= 3) score += 10;
  
  // Determine level based on score
  if (score >= 80) return 'Expert';
  if (score >= 60) return 'Advanced';
  if (score >= 40) return 'Intermediate';
  return 'Beginner';
}

/**
 * Generates dynamic skills from project data
 */
export function generateSkillsFromProjects(projects: Project[]): SkillCategory[] {
  if (!projects || projects.length === 0) {
    return [];
  }

  // Extract and count technologies from all projects
  const techUsage = new Map<string, number>();
  const techProjects = new Map<string, Project[]>();

  projects.forEach(project => {
    if (project.technologies && Array.isArray(project.technologies)) {
      project.technologies.forEach(tech => {
        const normalizedTech = tech.trim();
        if (!techUsage.has(normalizedTech)) {
          techUsage.set(normalizedTech, 0);
          techProjects.set(normalizedTech, []);
        }
        techUsage.set(normalizedTech, techUsage.get(normalizedTech)! + 1);
        techProjects.get(normalizedTech)!.push(project);
      });
    }
  });

  // Group technologies by categories
  const skillCategories = new Map<string, any[]>();

  techUsage.forEach((count, tech) => {
    const category = categorizeTechnology(tech);
    const level = determineProficiencyLevel(count, projects.length, techProjects.get(tech)!);

    if (!skillCategories.has(category)) {
      skillCategories.set(category, []);
    }

    skillCategories.get(category)!.push({
      name: tech,
      level: level,
      projectCount: count,
      category: category
    });
  });

  // Convert to the expected format and sort
  const result = Array.from(skillCategories.entries()).map(([category, skills]) => {
    // Sort skills by proficiency level and usage
    const levelOrder: Record<string, number> = { 'Expert': 4, 'Advanced': 3, 'Intermediate': 2, 'Beginner': 1 };
    const sortedSkills = skills.sort((a, b) => {
      // First sort by level
      const levelDiff = levelOrder[b.level] - levelOrder[a.level];
      if (levelDiff !== 0) return levelDiff;
      // Then by usage count
      return b.projectCount - a.projectCount;
    });

    return {
      category,
      skills: sortedSkills
    };
  });

  // Sort categories by importance/relevance
  const categoryOrder = [
    'Programming Languages',
    'Frontend Development',
    'Backend Development',
    'Databases',
    'AI & Machine Learning',
    'Cloud & DevOps',
    'Tools & Technologies',
    'Mobile Development'
  ];

  result.sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a.category);
    const bIndex = categoryOrder.indexOf(b.category);
    
    // Categories in the order list come first
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    
    // Both not in order list, sort alphabetically
    return a.category.localeCompare(b.category);
  });

  // Filter out categories with no skills
  return result.filter(category => category.skills.length > 0);
}

/**
 * Calculates dynamic stats from projects
 */
export function calculateProjectStats(projects: Project[]): {
  yearsExperience: string;
  projectsCompleted: string;
  technologies: string;
  clientSatisfaction: string;
} {
  if (!projects || projects.length === 0) {
    return {
      yearsExperience: '3+',
      projectsCompleted: '0',
      technologies: '0',
      clientSatisfaction: '99%'
    };
  }

  // Calculate years of experience based on earliest project
  const earliestProject = projects.reduce((earliest, project) => {
    const projectDate = new Date(project.created_at || project.createdAt || project.updated_at || project.updatedAt || '2024-01-01');
    return projectDate < earliest ? projectDate : earliest;
  }, new Date());
  
  const yearsExperience = Math.max(1, Math.floor((new Date().getTime() - earliestProject.getTime()) / (365 * 24 * 60 * 60 * 1000)));

  // Count unique technologies
  const allTechnologies = new Set<string>();
  projects.forEach(project => {
    if (project.technologies) {
      project.technologies.forEach(tech => allTechnologies.add(tech));
    }
  });

  return {
    yearsExperience: `${yearsExperience}+`,
    projectsCompleted: `${projects.length}+`,
    technologies: `${allTechnologies.size}+`,
    clientSatisfaction: '99%'
  };
}
