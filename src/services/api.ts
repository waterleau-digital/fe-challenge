const API_BASE_URL = 'http://localhost:3001/api';

export interface InventoryRecord {
  id: string;
  date: string;
  category: string;
  value: number;
  responsible: string;
  status: "pending" | "approved" | "rejected";
}

export interface Theme {
  id: string;
  name: string;
  tagline: string;
  description: string;
  colors: {
    primary: string;
    gradient: string;
  };
}

export interface DesignSystem {
  id: string;
  name: string;
  description: string;
}

export interface PresentationMode {
  version: string;
  fidelity: string;
  label: string;
  description: string;
  icon: string;
  badge: string;
  badgeVariant: string;
}

class ApiService {
  private async fetchData<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
    try {
      let url = `${API_BASE_URL}${endpoint}`;
      
      if (params) {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          searchParams.append(key, value.toString());
        });
        url += `?${searchParams.toString()}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  async getInventoryRecords(offset?: number, limit?: number): Promise<InventoryRecord[]> {
    const params: Record<string, number> = {};
    if (offset !== undefined) params.offset = offset;
    if (limit !== undefined) params.limit = limit;
    
    return this.fetchData<InventoryRecord[]>('/inventory-records', Object.keys(params).length > 0 ? params : undefined);
  }

  async getCategories(): Promise<string[]> {
    return this.fetchData<string[]>('/categories');
  }

  async getThemes(): Promise<Theme[]> {
    return this.fetchData<Theme[]>('/themes');
  }

  async getDesignSystems(): Promise<DesignSystem[]> {
    return this.fetchData<DesignSystem[]>('/design-systems');
  }

  async getPresentationModes(): Promise<PresentationMode[]> {
    return this.fetchData<PresentationMode[]>('/presentation-modes');
  }
}

export const apiService = new ApiService();