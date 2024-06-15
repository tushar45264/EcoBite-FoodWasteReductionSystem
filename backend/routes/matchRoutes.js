import express from 'express';
import { createMatch, GetMatch } from '../controllers/matchingControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/match',authMiddleware,createMatch);
router.get('/match',authMiddleware,GetMatch);

export default router;