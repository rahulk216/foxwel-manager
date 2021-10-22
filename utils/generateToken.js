import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';

const generateToken = (id) => {
	return jwt.sign({ id }, SECRET_KEY, {
		expiresIn: '30d',
	});
};

export default generateToken;
