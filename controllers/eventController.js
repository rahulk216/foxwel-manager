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
		etime,
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
		etime,
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
		payMethod,
		advance,
	} = req.body;

	const getEvent = await Event.find({ _id: eid });
	console.log(getEvent);
	const employeeTotalPrice =
		employee.reduce(function (prev, current) {
			return prev + parseInt(current.empprice);
		}, 0) + parseInt(album.albumPrice);

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

	if (payMethod && advance) {
		console.log(parseInt(getEvent[0].remPrice));
		console.log(parseInt(advance));
		const remPrice = parseInt(getEvent[0].remPrice) - parseInt(advance);
		console.log(remPrice);
		const ans = await Event.updateOne(
			{ _id: eid },
			{
				$push: {
					advancePayment: {
						price: advance,
						payMethod: payMethod,
					},
				},
				$set: {
					remPrice: remPrice,
				},
			}
		);
	}

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
	employee.map(async (emp) => {});
	console.log(ans);
	res.send(ans);
});

const deleteEmployee = asyncHandler(async (req, res) => {
	const { empname, eid } = req.body;
	console.log(req.body);
	console.log(empname, eid);
	const delfromEvent = await Event.updateOne(
		{ _id: eid },
		{
			$pull: {
				employee: { empname: empname },
			},
		}
	);
	if (delfromEvent) {
		const delFromEmp = await Employee.updateOne(
			{ empname: empname },
			{
				$pull: {
					empbooking: {
						_id: eid,
					},
				},
			}
		);
		console.log(delFromEmp);
		const getEvent = await Event.find({ _id: eid });
		const employeeTotalPrice =
			getEvent[0].employee.reduce(function (prev, current) {
				return prev + parseInt(current.empprice);
			}, 0) + parseInt(getEvent[0].album.albumPrice);
		const profit =
			parseInt(getEvent[0].eprice) - parseInt(employeeTotalPrice);
		const ctcUpdate = await Event.updateOne(
			{ _id: eid },
			{
				$set: {
					employeeTotalPrice: employeeTotalPrice,
					profit: profit,
				},
			}
		);
	}
	res.send(delfromEvent);
});

const addEmployeeForEvent = asyncHandler(async (req, res) => {
	const { eid, empname, empdesignation, empprice } = req.body;
	const emp = {
		empname,
		empdesignation,
		empprice,
	};
	const addEmp = await Event.updateOne(
		{ _id: eid },
		{
			$push: {
				employee: emp,
			},
		}
	);
	const getEvent = await Event.find({ _id: eid });
	const employeeTotalPrice =
		getEvent[0].employee.reduce(function (prev, current) {
			return prev + parseInt(current.empprice);
		}, 0) + parseInt(getEvent[0].album.albumPrice);
	const profit = parseInt(getEvent[0].eprice) - parseInt(employeeTotalPrice);
	if (addEmp) {
		const ans = await Employee.updateOne(
			{ empname: empname },
			{
				$push: {
					empbooking: getEvent,
				},
			}
		);
		console.log(addEmp);
		const ctcUpdate = await Event.updateOne(
			{ _id: eid },
			{
				$set: {
					employeeTotalPrice: employeeTotalPrice,
					profit: profit,
				},
			}
		);
	}
	res.send(addEmp);
});

export {
	addEvent,
	getEvents,
	updateStatus,
	editEvent,
	deleteEmployee,
	addEmployeeForEvent,
};
