import express from 'express';
const router = express.Router();
import {
	addEvent,
	getEvents,
	updateStatus,
	editEvent,
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/addevent', addEvent);
router.get('/getevents', getEvents);
router.put('/updatestatus', updateStatus);
router.put('/editevent', editEvent);

export default router;
