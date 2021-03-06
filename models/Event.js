import mongoose from 'mongoose';
const eventSchema = mongoose.Schema({
	etype: String,
	eprice: String,
	employee: [
		{
			empname: String,
			empprice: String,
			empdesignation: String,
		},
	],
	album: {
		sheets: String,
		quantity: String,
		albumPrice: String,
	},
	client: String,
	edate: String,
	edesc: String,
	location: String,
	createdDate: String,
	employeeTotalPrice: String,
	status: String,
	profit: String,
	etime: String,
	remPrice: String,
	advancePayment: [
		{
			price: String,
			payMethod: String,
		},
	],
});

const employeeSchema = mongoose.Schema({
	empname: String,
	empdesignation: String,
	empemail: String,
	empbooking: [eventSchema],
});

const Event = mongoose.model('Event', eventSchema);
const Employee = mongoose.model('Employee', employeeSchema);
export { Event, Employee };
