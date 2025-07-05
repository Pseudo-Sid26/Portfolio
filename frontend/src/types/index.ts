// Project interfaces
export interface Project {
  _id?: string;
  title: string;
  description: string;
  technologies: string[];
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  domain?: string;
  featured: boolean;
  stars?: number;
  forks?: number;
  language?: string;
  created_at?: string;
  updated_at?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Skills interfaces
export interface Skill {
  _id?: string;
  name: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  icon?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface SkillStats {
  yearsExperience: string;
  projectsCompleted: string;
  technologies: string;
  clientSatisfaction: string;
}

// Contact form interface
export interface ContactForm {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: Date;
}

// Experience interface
export interface Experience {
  _id?: string;
  title: string;
  company: string;
  location: string;
  startDate: Date | string;
  endDate?: Date | string;
  current: boolean;
  description: string[];
  technologies: string[];
}

// Education interface
export interface Education {
  _id?: string;
  degree: string;
  institution: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description?: string;
  gpa?: number;
}

// User/Profile interface
export interface UserProfile {
  _id?: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  email: string;
  phone?: string;
  location: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  resume?: string;
  experience?: Experience[];
}

// API Response interfaces
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Component prop interfaces
export interface HeroProps {
  profile: UserProfile;
}

export interface ProjectCardProps {
  project: Project;
  index: number;
}

export interface SkillsProps {
  skills: SkillCategory[];
}

export interface ContactFormProps {
  onSubmit: (formData: ContactForm) => Promise<void>;
}

export interface ExperienceProps {
  experiences: Experience[];
}

export interface EducationProps {
  education: Education[];
}
