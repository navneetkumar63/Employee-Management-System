import express from 'express';
import { login , verify } from '../controller/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { registerUser } from '../controller/registerController.js';

const router = express.Router();
router.post("/register", registerUser);

router.post('/login', login);
router.get('/verify', authMiddleware, verify);

export default router;
