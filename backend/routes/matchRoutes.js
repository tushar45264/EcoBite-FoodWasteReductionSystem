import express from 'express';
import { createMatch, GetMatch,DeleteMatch } from '../controllers/matchingControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/match/:id',createMatch);
router.get('/match',authMiddleware,GetMatch);
router.delete('/matches/:id', DeleteMatch);

export default router;