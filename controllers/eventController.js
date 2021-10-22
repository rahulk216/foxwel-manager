import asyncHandler from 'express-async-handler';
import { Event, Employee } from '../models/Event.js';

const addEvent = asyncHandler(async (req, res) => {
	const { etype, edate, edesc, eprice, employee, client, location } = req.body;

	const employeeTotalPrice = employee.reduce(function (prev, current) {
		return prev + parseInt(current.empprice);
	}, 0);

	const event = new Event({
		etype,
		eprice,
		employee,
		client,
		location,
		createdDate: new Date().toISOString().slice(0, 10),
		employeeTotalPrice: employeeTotalPrice.toString(),
		status: 'pending',
	});

	employee.map(async (emp) => {
		console.log(emp.empname);
		const empdata = await Employee.find({ empname: emp.empname });
		const booking = await Employee.updateOne(
			{ empname: emp.empname },
			{
				$push: { empbooking: event },
			}
		);
	});

	const addedEvent = await event.save();
	res.send(addedEvent);
});

const getEvents = asyncHandler(async (req, res) => {
	const events = await Event.find().sort({ createdDate: -1 });
	res.send(events);
});

const updateStatus = asyncHandler(async (req, res) => {
	const { id, newstatus, event } = req.body;

	const statusUpdate = await Event.updateOne(
		{ _id: id },
		{
			$set: { status: newstatus },
		}
	);
	event.employee.map(async (emp) => {
		console.log(emp.empname);
		const empdata = await Employee.find({ empname: emp.empname });
		console.log(empData);
		// const eventstatus = await Employee.updateOne(
		// 	{ empname: emp.empname },
		// 	{
		// 		$set: { status: newstatus },
		// 	}
		// );
	});

	res.send(statusUpdate);
});
export { addEvent, getEvents, updateStatus };
