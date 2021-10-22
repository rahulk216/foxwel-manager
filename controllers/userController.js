import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';
import { Employee } from '../models/Event.js';

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

const addEmployee = asyncHandler(async (req, res) => {
	const { empname, empdesignation, empemail } = req.body;
	console.log(req.body);
	const emp = new Employee({
		empname,
		empdesignation,
		empemail,
	});

	const employeeAdded = await emp.save();
	res.json(employeeAdded);
});

const getEmps = asyncHandler(async (req, res) => {
	const events = await Employee.find();
	res.send(events);
});

export { authUser, registerUser, addEmployee, getEmps };
