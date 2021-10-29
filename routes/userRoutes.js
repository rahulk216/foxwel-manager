import express from 'express';
const router = express.Router();
import {
	authUser,
	registerUser,
	addEmployee,
	getEmps,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/login', authUser);
router.post('/register', registerUser);
router.post('/addemp', protect, addEmployee);
router.get('/getemp', protect, getEmps);

export default router;
