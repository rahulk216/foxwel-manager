import asyncHandler from 'express-async-handler';
import { Event, Employee } from '../models/Event.js';

const addEvent = asyncHandler(async (req, res) => {
	const {
		etype,
		edate,
		edesc,
		eprice,
		employee,
		client,
		location,
		album,
		advance,
		payMethod,
	} = req.body;

	console.log(advance);

	const employeeTotalPrice =
		employee.reduce(function (prev, current) {
			return prev + parseInt(current.empprice);
		}, 0) + parseInt(album.albumPrice);
	console.log(album);
	const remPrice = parseInt(eprice) - parseInt(advance);
	const profit = eprice - employeeTotalPrice;
	const event = new Event({
		etype,
		eprice,
		employee,
		client,
		location,
		edate,
		album,
		edesc,
		profit,
		remPrice,
		createdDate: new Date().toISOString(),
		employeeTotalPrice: employeeTotalPrice.toString(),
		status: 'Pending',
		advancePayment: [
			{
				price: advance,
				payMethod: payMethod,
			},
		],
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
	const { id, newstatus, eventEmployee } = req.body;

	const statusUpdate = await Event.updateOne(
		{ _id: id },
		{
			$set: { status: newstatus },
		}
	);
	console.log(eventEmployee);
	if (statusUpdate) {
		eventEmployee.map(async (emp) => {
			//const empdata = await Employee.find({ empname: emp.empname });
			const ans = await Employee.updateOne(
				{ empname: emp.empname, 'empbooking._id': id },
				{
					$set: {
						'empbooking.$.status': newstatus,
					},
				}
			);
		});
	}

	res.send(statusUpdate);
});

const editEvent = asyncHandler(async (req, res) => {
	const {
		eid,
		etype,
		edate,
		edesc,
		eprice,
		etime,
		employee,
		client,
		location,
		album,
		status,
	} = req.body;
	console.log(
		eid,
		etype,
		edate,
		edesc,
		eprice,
		employee,
		client,
		location,
		album,
		status,
		etime
	);
	const employeeTotalPrice =
		employee.reduce(function (prev, current) {
			return prev + parseInt(current.empprice);
		}, 0) + parseInt(album.albumPrice);
	//console.log(employeeTotalPrice);
	const profit = eprice - employeeTotalPrice;
	const event = new Event({
		etype,
		eprice,
		employee,
		client,
		location,
		edate,
		album,
		edesc,
		profit,
		etime,
		createdDate: new Date().toISOString(),
		employeeTotalPrice: employeeTotalPrice.toString(),
		status: 'Pending',
	});
	console.log(eid);
	const ans = await Event.updateOne(
		{ _id: eid },
		{
			$set: {
				etype: etype,
				eprice: eprice,
				album: album,
				etime: etime,
				client: client,
				edate: edate,
				edesc: edesc,
				location: location,
				employeeTotalPrice: employeeTotalPrice,
				profit: profit,
			},
		}
	);
	employee.map(async (emp) => {
		
	});
	console.log(ans);
	res.send(ans);
});

const addAdvance = asyncHandler(async (req, res) => {
	const { advance, payMethod, eid } = req.body;
	const ans = await Event.updateOne(
		{ _id: eid },
		{
			$push: {
				advancePayment: {
					price: advance,
					payMethod: payMethod,
				},
			},
		}
	);
	res.send(ans);
});
export { addEvent, getEvents, updateStatus, editEvent, addAdvance };
