import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRegister, validateLogin } from '../vaildators/auth.validator';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const authController = new AuthController();

router.post('/register', validateRegister, (req, res) =>
  authController.register(req, res)
);

router.post('/login', validateLogin, (req, res) =>
  authController.login(req, res)
);

router.post('/refresh', (req, res) => authController.refresh(req, res));

router.post('/logout', authenticate, (req, res) =>
  authController.logout(req, res)
);

export default router;