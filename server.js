import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import mongoose from 'mongoose';
import { MONGODB } from './config.js';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes)
app.get('/', (req, res) => {
	res.send('Express connected');
});

mongoose.connect(MONGODB, { useNewUrlParser: true }).then(() => {
	app.listen(5000, (req, res) => {
		console.log('Server running in 5000');
	});
});
