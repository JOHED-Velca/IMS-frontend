import axios, { AxiosResponse } from 'axios';
import { Part, SearchPart, PartSearchParams, PartCreateInput, PartUpdateInput, ApiResponse, ApiError, PaginatedResponse } from '@/types/part';

class ApiService {
  private baseURL: string;
  private api;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        const apiError: ApiError = {
          message: error.response?.data?.message || error.message || 'An error occurred',
          status: error.response?.status || 500,
          details: error.response?.data
        };
        return Promise.reject(apiError);
      }
    );
  }

  // Helper function to convert SearchPart to Part format
  private convertSearchPartToPart = (searchPart: SearchPart): Part => {
    return {
      ...searchPart,
      level: {
        id: 0, // We don't have this info from search
        levelNumber: searchPart.level,
        shelf: {
          id: 0, // We don't have this info from search
          side: searchPart.side,
          aisle: {
            id: 0, // We don't have this info from search
            number: searchPart.aisle
          }
        }
      }
    };
  }

  // Get all parts
  getAllParts = async (): Promise<Part[]> => {
    try {
      const response: AxiosResponse<Part[] | ApiResponse<Part[]>> = await this.api.get('/api/parts');
      return Array.isArray(response.data) ? response.data : response.data.data;
    } catch (error) {
      console.error('Error fetching all parts:', error);
      throw error;
    }
  }

  // Get part by ID
  getPartById = async (id: string): Promise<Part> => {
    try {
      const response: AxiosResponse<Part | ApiResponse<Part>> = await this.api.get(`/api/parts/${id}`);
      return 'data' in response.data ? response.data.data : response.data;
    } catch (error) {
      console.error(`Error fetching part ${id}:`, error);
      throw error;
    }
  }

  // Create new part
  createPart = async (partData: PartCreateInput): Promise<Part> => {
    try {
      const response: AxiosResponse<Part | ApiResponse<Part>> = await this.api.post('/api/parts', partData);
      return 'data' in response.data ? response.data.data : response.data;
    } catch (error) {
      console.error('Error creating part:', error);
      throw error;
    }
  }

  // Update part
  updatePart = async (id: string, partData: Partial<PartCreateInput>): Promise<Part> => {
    try {
      const response: AxiosResponse<Part | ApiResponse<Part>> = await this.api.put(`/api/parts/${id}`, partData);
      return 'data' in response.data ? response.data.data : response.data;
    } catch (error) {
      console.error(`Error updating part ${id}:`, error);
      throw error;
    }
  }

  // Delete part
  deletePart = async (id: string): Promise<void> => {
    try {
      await this.api.delete(`/api/parts/${id}`);
    } catch (error) {
      console.error(`Error deleting part ${id}:`, error);
      throw error;
    }
  }

  // Search parts
  searchParts = async (searchParams: PartSearchParams): Promise<Part[]> => {
    try {
      const params = new URLSearchParams();
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });
      
      const response: AxiosResponse<PaginatedResponse<SearchPart>> = await this.api.get(`/api/parts/search?${params.toString()}`);
      return response.data.content.map(this.convertSearchPartToPart);
    } catch (error) {
      console.error('Error searching parts:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
export default apiService;