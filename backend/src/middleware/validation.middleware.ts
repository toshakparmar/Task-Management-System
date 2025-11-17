import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

// Generic validation middleware that works with express-validator
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
      return next();
    }

    // Format errors for response
    const formattedErrors = errors.array().map(err => ({
      field: err.type === 'field' ? err.path : 'unknown',
      message: err.msg
    }));

    return res.status(400).json({
      error: 'Validation failed',
      errors: formattedErrors
    });
  };
};

// Simple validation helper for manual validation
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      errors: errors.array()
    });
  }
  
  next();
};

// Custom validator functions
export const validators = {
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidPassword: (password: string): boolean => {
    return password.length >= 6;
  },

  isValidStatus: (status: string): boolean => {
    return ['pending', 'in_progress', 'completed'].includes(status);
  },

  isValidPriority: (priority: string): boolean => {
    return ['low', 'medium', 'high'].includes(priority);
  }
};
