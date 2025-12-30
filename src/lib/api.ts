import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4068';

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use((config) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth
  async login(otp: string) {
    const response = await this.client.post('/api/auth/login', { otp });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  }

  async verify() {
    const response = await this.client.get('/api/auth/verify');
    return response.data;
  }

  async changePassword(currentPassword: string, newPassword: string) {
    const response = await this.client.post('/api/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  // Config
  async getConfig() {
    const response = await this.client.get('/api/config');
    return response.data;
  }

  async getConfigPath(path: string) {
    const response = await this.client.get(`/api/config/${path}`);
    return response.data;
  }

  async updateConfig(path: string, value: any) {
    const response = await this.client.put(`/api/config/${path}`, { value });
    return response.data;
  }

  async reloadConfig() {
    const response = await this.client.post('/api/config/reload');
    return response.data;
  }

  // Modules
  async getModules() {
    const response = await this.client.get('/api/modules');
    return response.data;
  }

  async getModule(name: string) {
    const response = await this.client.get(`/api/modules/${name}`);
    return response.data;
  }

  async enableModule(name: string) {
    const response = await this.client.post(`/api/modules/${name}/enable`);
    return response.data;
  }

  async disableModule(name: string) {
    const response = await this.client.post(`/api/modules/${name}/disable`);
    return response.data;
  }

  async updateModuleAction(name: string, action: string) {
    const response = await this.client.put(`/api/modules/${name}/action`, { action });
    return response.data;
  }

  // Whitelist
  async getWhitelist() {
    const response = await this.client.get('/api/whitelist');
    return response.data;
  }

  async addToWhitelist(type: string, id: string) {
    const response = await this.client.post(`/api/whitelist/${type}/${id}`);
    return response.data;
  }

  async removeFromWhitelist(type: string, id: string) {
    const response = await this.client.delete(`/api/whitelist/${type}/${id}`);
    return response.data;
  }

  // Audit
  async getAuditLogs(filters?: any) {
    const params = new URLSearchParams(filters).toString();
    const response = await this.client.get(`/api/audit?${params}`);
    return response.data;
  }

  async getAuditStats(guildId?: string) {
    const params = guildId ? `?guildId=${guildId}` : '';
    const response = await this.client.get(`/api/audit/stats${params}`);
    return response.data;
  }

  // Security
  async getSecurityStats() {
    const response = await this.client.get('/api/security/stats');
    return response.data;
  }

  async getViolations(userId: string) {
    const response = await this.client.get(`/api/security/violations/${userId}`);
    return response.data;
  }

  async clearViolations(userId: string) {
    const response = await this.client.delete(`/api/security/violations/${userId}`);
    return response.data;
  }

  async evaluateThreat(userId: string) {
    const response = await this.client.get(`/api/security/threat/${userId}`);
    return response.data;
  }

  // Punishments
  async getQuarantined(guildId: string) {
    const response = await this.client.get(`/api/punishments/quarantine/${guildId}`);
    return response.data;
  }

  // Stats
  async getOverviewStats(guildId?: string) {
    const params = guildId ? `?guildId=${guildId}` : '';
    const response = await this.client.get(`/api/stats/overview${params}`);
    return response.data;
  }

  // Health
  async getHealth() {
    const response = await this.client.get('/health');
    return response.data;
  }
}

export const apiClient = new APIClient();
export default apiClient;
