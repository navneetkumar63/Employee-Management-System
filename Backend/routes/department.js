import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js';
import {createDepartment, getDepartments ,getDepartment,updateDepartment, deleteDepartment } from '../controller/departmentController.js';

const router = express.Router();

router.get('/', authMiddleware, getDepartments )
router.post('/add', authMiddleware, createDepartment)
router.get('/:id', authMiddleware, getDepartment)
router.put('/:id', authMiddleware, updateDepartment)
router.delete('/:id', authMiddleware, deleteDepartment)




export  default router
