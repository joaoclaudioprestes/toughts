import express from 'express';
import { ToughtsController } from '../controllers/ToughtsController.js';
import { AuthController } from '../controllers/AuthController.js';

const router = express.Router();

router.get('/', ToughtsController.showAll);
router.get('/login', AuthController.login);
router.get('/register', AuthController.register);
router.post('/register', AuthController.registerPost);

export default router;