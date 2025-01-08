import express from 'express';
import { createMatch, GetMatch,DeleteMatch, GetMatchByDonationId } from '../controllers/matchingControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/match/:id',authMiddleware,createMatch);
router.get('/match',authMiddleware,GetMatch);
router.delete('/matches/:id',authMiddleware, DeleteMatch);
router.get('/matches/:id',authMiddleware, GetMatchByDonationId)

export default router;