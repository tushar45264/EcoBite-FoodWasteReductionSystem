import express from 'express';
import { CreateDonation, GetDonation, UpdateDonation, DeleteDonation, GetDonationById, GetUserByDonationId } from '../controllers/donationControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/previousDonation/:id',authMiddleware,GetDonationById);
router.get('/DonorLocation/:id',authMiddleware,GetUserByDonationId);
router.post('/donate/:id',authMiddleware, CreateDonation);
router.get('/donations',authMiddleware, GetDonation);
router.put('/donations/:id',authMiddleware, UpdateDonation);
router.delete('/donations/:id',authMiddleware, DeleteDonation);

export default router;