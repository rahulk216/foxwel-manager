import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
// app.get('/', (req, res) => {
// 	res.send('Express connected');
// });
if (process.env.NODE_ENV == 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true }).then(() => {
	app.listen(PORT, (req, res) => {
		console.log(`Server running in ${PORT}`);
	});
});
