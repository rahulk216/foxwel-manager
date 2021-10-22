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
router.post('/addemp', addEmployee);
router.get('/getemp', getEmps);

export default router;
