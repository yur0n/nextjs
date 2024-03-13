// import { User, Customer, Invoice, Revenue } from '@/app/lib/defenitions-mongo';
// const {
// 	invoices,
// 	customers,
// 	revenue,
// 	users,
//   } = require('../app/lib/placeholder-data.js');
// const bcrypt = require('bcrypt');

// async function populate() {
// 	try {
// 		const usersDB = await Promise.all(
// 			users.map(async (user) => {
// 				const hashedPassword = await bcrypt.hash(user.password, 10);
// 				const newUser = new User({
// 					id: user.id,
// 					name: user.name,
// 					email: user.email,
// 					password: hashedPassword
// 				});
// 				return newUser.save();
// 			}),
// 		);
// 		console.log(`Seeded ${usersDB.length} users`);

// 		const customersDB = await Promise.all(
// 			customers.map(async (customer) => {
// 				const newCustomer = new Customer({
// 					id: customer.id,
// 					name: customer.name,
// 					email: customer.email,
// 					image_url: customer.image_url
// 				});
// 				return newCustomer.save();
// 			}),
// 		);
// 		console.log(`Seeded ${customersDB.length} customers`);

// 		const invoicesDB = await Promise.all(
// 			invoices.map(async (invoice) => {
// 				const newInvoice = new Invoice({
// 					customer_id: invoice.customer_id,
// 					amount: invoice.amount,
// 					status: invoice.status,
// 					date: invoice.date
// 				});
// 				return newInvoice.save();
// 			}),
// 		);
// 		console.log(`Seeded ${invoicesDB.length} invoices`);

// 		const revenueDB = await Promise.all(
// 			revenue.map(async (revenue) => {
// 				const newRevenue = new Revenue({
// 					month: revenue.month,
// 					revenue: revenue.revenue
// 				});
// 				return newRevenue.save();
// 			}),
// 		);
// 		console.log(`Seeded ${revenueDB.length} revenue`);
// 	} catch (error) {
// 		console.error('Error seeding:', error);
// 		throw error;
// 	}
// }

// populate()
// .then(() => {
// 	mongoose.connection.close();
// 	console.log('Seeding complete');
// })
// .catch((error) => {
// 	console.error('Error seeding:', error);
// })