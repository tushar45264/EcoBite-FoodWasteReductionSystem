import express from 'express';
import { GetDonation,CreateDonation } from '../controllers/donationControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/donation',authMiddleware, CreateDonation);
router.get('/donation',authMiddleware, GetDonation);

export default router;