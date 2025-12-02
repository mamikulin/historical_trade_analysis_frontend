import type { Artifact, ArtifactFilters } from '../types/artifact';
import { mockArtifacts } from '../data/mockArtifacts';
import { API_CONFIG } from '../config';

const API_BASE_URL = API_CONFIG.BASE_URL;

class ArtifactService {
  async getAll(filters?: ArtifactFilters): Promise<Artifact[]> {
    try {
      const params = new URLSearchParams();
      
      if (filters?.is_active !== undefined) {
        params.append('is_active', filters.is_active.toString());
      }
      
      if (filters?.production_center) {
        params.append('production_center', filters.production_center);
      }

      if (filters?.query) {
        params.append('query', filters.query);
      }

      const queryString = params.toString();
      const url = `${API_BASE_URL}/artifacts${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      let data = await response.json();
      
      return data;
    } catch (error) {
      console.warn('Failed to fetch from backend, using mock data:', error);
      return this.getMockData(filters);
    }
  }

  async getById(id: number): Promise<Artifact> {
    try {
      const response = await fetch(`${API_BASE_URL}/artifacts/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.warn(`Failed to fetch artifact ${id}, using mock data:`, error);
      
      const artifact = mockArtifacts.find(a => a.id === id);
      if (!artifact) {
        throw new Error('Artifact not found');
      }
      return artifact;
    }
  }

  async addToAnalysis(artifactId: number, quantity: number = 1): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/artifacts/${artifactId}/add-to-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ quantity, comment: '' })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.warn('Failed to add to analysis:', error);
      return { success: true, message: 'Added to analysis (mock)' };
    }
  }

  private applyClientFilters(data: Artifact[], filters?: ArtifactFilters): Artifact[] {
    let filtered = [...data];
    
    if (filters?.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(a => a.name.toLowerCase().includes(query));
    }
    
    return filtered;
  }

  private getMockData(filters?: ArtifactFilters): Artifact[] {
    let data = [...mockArtifacts];
    
    if (filters?.is_active !== undefined) {
      data = data.filter(a => a.is_active === filters.is_active);
    }
    
    if (filters?.production_center) {
      data = data.filter(a => a.production_center === filters.production_center);
    }
    
    return this.applyClientFilters(data, filters);
  }
}

export const artifactService = new ArtifactService();