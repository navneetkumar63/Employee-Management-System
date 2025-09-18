import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js';
import { addLeave, getLeave, getLeaveDetail, getLeaves, updateLeave } from '../controller/leaveContoller.js';



const router = express.Router();


router.post('/add', authMiddleware,addLeave)
router.get('/:id', authMiddleware,getLeave)
router.get('/detail/:id', authMiddleware,getLeaveDetail)
router.put('/:id', authMiddleware,updateLeave)
router.get('/', authMiddleware,getLeaves)

export  default router