/**
 * Validate an email address format
 * @param email The email address to validate
 * @returns True if the email is valid, otherwise false
 */
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password: string): string | null => {
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  return null;
};

export const validateTaskTitle = (title: string): string | null => {
  if (!title || title.trim().length === 0) {
    return 'Title is required';
  }
  if (title.length > 100) {
    return 'Title must be less than 100 characters';
  }
  return null;
};