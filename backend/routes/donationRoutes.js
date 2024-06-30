import express from 'express';
import { CreateDonation, GetDonation, UpdateDonation, DeleteDonation, GetDonationById, GetUserByDonationId } from '../controllers/donationControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/previousDonation/:id',GetDonationById);
router.get('/DonorLocation/:id',GetUserByDonationId);
router.post('/donate/:id', CreateDonation);
router.get('/donations', GetDonation);
router.put('/donations/:id', UpdateDonation);
router.delete('/donations/:id', DeleteDonation);

export default router;