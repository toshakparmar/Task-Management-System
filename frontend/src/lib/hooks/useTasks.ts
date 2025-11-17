'use client';

import { useState, useEffect, useCallback } from 'react';
import { taskApi } from '@/lib/api/task.api';
import { Task } from '@/types';

interface UseTasksOptions {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * Custom hook to manage tasks with filtering, pagination, and CRUD operations
 * @param options Filtering and pagination options
 * @returns Task data and methods
 */
export const useTasks = (options: UseTasksOptions = {}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await taskApi.getTasks(options);
      setTasks(response.tasks);
      setPagination(response.pagination);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [options.status, options.search, options.page, options.limit]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (data: Partial<Task>) => {
    try {
      await taskApi.createTask(data);
      await fetchTasks(); 
      return true;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to create task');
    }
  };

  const updateTask = async (id: string, data: Partial<Task>) => {
    try {
      await taskApi.updateTask(id, data);
      await fetchTasks(); 
      return true;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to update task');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await taskApi.deleteTask(id);
      await fetchTasks(); 
      return true;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to delete task');
    }
  };

  const toggleTask = async (id: string) => {
    try {
      await taskApi.toggleTask(id);
      await fetchTasks(); 
      return true;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to toggle task');
    }
  };

  return {
    tasks,
    loading,
    error,
    pagination,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
};