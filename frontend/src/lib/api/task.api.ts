import { apiClient } from './client';
import { Task, TaskResponse } from '@/types';

interface TaskFilters {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * API methods for task management
 * Get Tasks, Get Task by ID, Create, Update, Delete, Toggle Task
 */
export const taskApi = {
  getTasks: async (filters: TaskFilters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    const response = await apiClient.get<TaskResponse>(
      `/tasks?${params.toString()}`
    );
    return response.data;
  },

  getTaskById: async (id: string) => {
    const response = await apiClient.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (data: Partial<Task>) => {
    const response = await apiClient.post<{ message: string; task: Task }>(
      '/tasks',
      data
    );
    return response.data;
  },

  updateTask: async (id: string, data: Partial<Task>) => {
    const response = await apiClient.patch<{ message: string; task: Task }>(
      `/tasks/${id}`,
      data
    );
    return response.data;
  },

  deleteTask: async (id: string) => {
    const response = await apiClient.delete<{ message: string }>(
      `/tasks/${id}`
    );
    return response.data;
  },

  toggleTask: async (id: string) => {
    const response = await apiClient.post<{ message: string; task: Task }>(
      `/tasks/${id}/toggle`
    );
    return response.data;
  },
};