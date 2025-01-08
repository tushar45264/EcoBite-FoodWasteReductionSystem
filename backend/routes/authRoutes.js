import express from 'express';
import { Register,Login, Logout } from '../controllers/authControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router =express.Router();

router.post('/register',Register);
router.post('/login',Login);
router.post('/logout',authMiddleware,Logout);

export default router;