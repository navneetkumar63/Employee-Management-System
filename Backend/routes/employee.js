import express from 'express';
import { getEmployees,addEmployee,  upload, getEmployee , updateEmployee,fetchEmployeesByDepId } from '../controller/employeeController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getEmployees);
router.post('/add', authMiddleware,upload.single('image'), addEmployee);
router.get('/:id', authMiddleware, getEmployee);
router.put('/:id', authMiddleware, updateEmployee);
router.get('/department/:id', authMiddleware, fetchEmployeesByDepId);

export default router;

