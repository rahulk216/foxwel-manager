import express from 'express';
const router = express.Router();
import {
	addEvent,
	getEvents,
	updateStatus,
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/addevent', addEvent);
router.get('/getevents', getEvents);
router.put('/updatestatus', updateStatus);

export default router;
