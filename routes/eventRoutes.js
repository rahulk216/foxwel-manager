import express from 'express';
const router = express.Router();
import {
	addEvent,
	getEvents,
	updateStatus,
	editEvent,
	deleteEmployee,
	addEmployeeForEvent,
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/addevent', protect, addEvent);
router.get('/getevents', protect, getEvents);
router.put('/updatestatus', protect, updateStatus);
router.put('/editevent', protect, editEvent);
router.put('/deleteemployee', protect, deleteEmployee);
router.post('/addemp', protect, addEmployeeForEvent);

export default router;
