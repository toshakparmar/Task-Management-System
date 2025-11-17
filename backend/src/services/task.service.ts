import prisma from '../config/database';

interface TaskFilters {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export class TaskService {
  async getTasks(userId: string, filters: TaskFilters) {
    const { status, search, page = 1, limit = 10 } = filters;
    
    // Build where clause based on filters
    const where: any = { userId };
    
    if (status) {
      where.status = status;
    }
    
    if (search) {
      where.title = {
        contains: search,
        mode: 'insensitive',
      };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get tasks with pagination
    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.task.count({ where }),
    ]);

    return {
      tasks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getTaskById(taskId: string, userId: string) {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    });

    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  }

  async createTask(userId: string, data: any) {
    const task = await prisma.task.create({
      data: {
        ...data,
        userId,
      },
    });

    return task;
  }

  async updateTask(taskId: string, userId: string, data: any) {
    // First check if task exists and belongs to user
    const existingTask = await this.getTaskById(taskId, userId);

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data,
    });

    return updatedTask;
  }

  async deleteTask(taskId: string, userId: string) {
    // Check if task exists and belongs to user
    await this.getTaskById(taskId, userId);

    await prisma.task.delete({
      where: { id: taskId },
    });
  }

  async toggleTaskStatus(taskId: string, userId: string) {
    const task = await this.getTaskById(taskId, userId);

    // Cycle through statuses: pending -> in_progress -> completed -> pending
    const statusMap: Record<string, string> = {
      pending: 'in_progress',
      in_progress: 'completed',
      completed: 'pending',
    };

    const newStatus = statusMap[task.status] || 'pending';

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status: newStatus },
    });

    return updatedTask;
  }
}