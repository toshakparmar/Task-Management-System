import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;

      const result = await authService.register(email, password, name);

      res.status(201).json({
        message: 'User registered successfully',
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    } catch (error: any) {
      if (error.message === 'User already exists') {
        return res.status(409).json({ error: error.message });
      }
      res.status(500).json({ error: 'Registration failed' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await authService.login(email, password);

      res.json({
        message: 'Login successful',
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    } catch (error: any) {
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({ error: error.message });
      }
      res.status(500).json({ error: 'Login failed' });
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token required' });
      }

      const result = await authService.refresh(refreshToken);

      res.json({
        message: 'Token refreshed successfully',
        accessToken: result.accessToken,
      });
    } catch (error: any) {
      res.status(401).json({ error: 'Invalid or expired refresh token' });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const userId = req.user!.id;

      await authService.logout(userId);

      res.json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ error: 'Logout failed' });
    }
  }
}
