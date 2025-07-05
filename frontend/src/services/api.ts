/**
 * Static Data Service - Replaces API calls with local data
 * For frontend-only portfolio application
 */

import { profileData } from '../data/profile';
import { experienceData } from '../data/experience';
import projectsData from '../data/projects.json';
import type { Project } from '../types';

// Transform function to convert raw project data to Project type
const transformProject = (rawProject: any): Project => ({
  title: rawProject.title,
  description: rawProject.description,
  technologies: rawProject.technologies,
  githubUrl: rawProject.githubUrl,
  liveUrl: rawProject.liveUrl,
  category: rawProject.category,
  domain: rawProject.domain,
  featured: rawProject.featured,
  stars: rawProject.stars,
  forks: rawProject.forks,
  language: rawProject.language,
  createdAt: rawProject.createdAt ? new Date(rawProject.createdAt) : undefined,
  updated_at: rawProject.lastUpdated,
  _id: rawProject.id?.toString()
});

class StaticDataService {
  /**
   * Get profile data
   */
  async getProfile() {
    // Simulate API delay for smooth loading experience
    await new Promise(resolve => setTimeout(resolve, 100));
    return profileData;
  }

  /**
   * Get projects with optional filtering
   */
  async getProjects(params?: {
    category?: string;
    featured?: boolean;
    limit?: number;
  }): Promise<Project[]> {
    await new Promise(resolve => setTimeout(resolve, 150));
    
    let projects = projectsData.map(transformProject);

    // Apply filters
    if (params?.category) {
      projects = projects.filter(project => 
        project.category.toLowerCase() === params.category!.toLowerCase()
      );
    }

    if (params?.featured !== undefined) {
      projects = projects.filter(project => project.featured === params.featured);
    }

    // Apply limit
    if (params?.limit) {
      projects = projects.slice(0, params.limit);
    }

    return projects;
  }

  /**
   * Get single project by ID
   */
  async getProject(id: string): Promise<Project | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const rawProject = projectsData.find(p => p.id.toString() === id);
    return rawProject ? transformProject(rawProject) : null;
  }

  /**
   * Get unique project categories
   */
  async getProjectCategories(): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const categories = [...new Set(projectsData.map(project => project.category))];
    return categories;
  }

  /**
   * Get experience data
   */
  async getExperience() {
    await new Promise(resolve => setTimeout(resolve, 100));
    return experienceData;
  }

  /**
   * Health check - always returns success for static data
   */
  async healthCheck() {
    return { status: 'ok', message: 'Static data service ready' };
  }

  /**
   * Get resume URL
   */
  getResumeUrl(): string {
    return profileData.resume;
  }

  /**
   * Get resume download URL
   */
  getResumeDownloadUrl(): string {
    return profileData.resume;
  }
}

export const dataService = new StaticDataService();
export default dataService;
