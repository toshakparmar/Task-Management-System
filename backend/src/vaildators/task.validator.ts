import { Request, Response, NextFunction } from 'express';

export const validateTask = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, status, priority } = req.body;
  const errors: string[] = [];

  if (!title || title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (status && !['pending', 'in_progress', 'completed'].includes(status)) {
    errors.push('Status must be one of: pending, in_progress, completed');
  }

  if (priority && !['low', 'medium', 'high'].includes(priority)) {
    errors.push('Priority must be one of: low, medium, high');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};