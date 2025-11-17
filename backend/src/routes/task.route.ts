import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { validateTask } from '../vaildators/task.validator';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const taskController = new TaskController();

// All task routes require authentication
router.use(authenticate);

router.get('/', (req, res) => taskController.getTasks(req, res));

router.get('/:id', (req, res) => taskController.getTaskById(req, res));

router.post('/', validateTask, (req, res) =>
  taskController.createTask(req, res)
);

router.patch('/:id', validateTask, (req, res) =>
  taskController.updateTask(req, res)
);

router.delete('/:id', (req, res) => taskController.deleteTask(req, res));

router.post('/:id/toggle', (req, res) => taskController.toggleTask(req, res));

export default router;