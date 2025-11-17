import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';

const taskService = new TaskService();

export class TaskController {
  async getTasks(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { status, search, page, limit } = req.query;

      const filters = {
        status: status as string,
        search: search as string,
        page: page ? parseInt(page as string) : 1,
        limit: limit ? parseInt(limit as string) : 10,
      };

      const result = await taskService.getTasks(userId, filters);

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  }

  async getTaskById(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      const task = await taskService.getTaskById(id, userId);

      res.json(task);
    } catch (error: any) {
      if (error.message === 'Task not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Failed to fetch task' });
    }
  }

  async createTask(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const taskData = req.body;

      const task = await taskService.createTask(userId, taskData);

      res.status(201).json({
        message: 'Task created successfully',
        task,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create task' });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { id } = req.params;
      const taskData = req.body;

      const task = await taskService.updateTask(id, userId, taskData);

      res.json({
        message: 'Task updated successfully',
        task,
      });
    } catch (error: any) {
      if (error.message === 'Task not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Failed to update task' });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      await taskService.deleteTask(id, userId);

      res.json({ message: 'Task deleted successfully' });
    } catch (error: any) {
      if (error.message === 'Task not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }

  async toggleTask(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      const task = await taskService.toggleTaskStatus(id, userId);

      res.json({
        message: 'Task status toggled successfully',
        task,
      });
    } catch (error: any) {
      if (error.message === 'Task not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Failed to toggle task status' });
    }
  }
}