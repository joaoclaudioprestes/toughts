import express from 'express';
import { ToughtsController } from '../controllers/ToughtsController.js';

const router = express.Router();

router.get('/toughts', ToughtsController.showAll);

export default router;