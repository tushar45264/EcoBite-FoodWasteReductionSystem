import express from 'express';
import locationController from '../controllers/locationController.js'
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/location/update', authMiddleware, locationController);

export default router;
