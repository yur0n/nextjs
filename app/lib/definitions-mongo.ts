// // This file contains type definitions for your data.
// // It describes the shape of the data, and what data type each property should accept.
// // For simplicity of teaching, we're manually defining these types.
// // However, these types are generated automatically if you're using an ORM such as Prisma.
// import mongoose, { PipelineStage } from 'mongoose';
// mongoose.connect('mongodb://localhost:27017/next');
// const userSchema = new mongoose.Schema({
// 	id: String,
// 	name: String,
// 	email: String,
// 	password: String
// });

// export const User = mongoose.model('User', userSchema);

// const customerSchema = new mongoose.Schema({
// 	id: String,
// 	name: String,
// 	email: String,
// 	image_url: String
// });

// export const Customer = mongoose.model('Customer', customerSchema);

// const invoiceSchema = new mongoose.Schema({
// 	customer_id: { type: String, ref: 'Customer' },
// 	amount: Number,
// 	status: { type: String, enum: ['pending', 'paid'] },
// 	date: String
// });

// export const Invoice = mongoose.model('Invoice', invoiceSchema);

// const revenueSchema = new mongoose.Schema({
// 	month: String,
// 	revenue: Number
// });

// export const Revenue = mongoose.model('Revenue', revenueSchema);

// export type LatestInvoice = {
//   id: string;
//   name: string;
//   image_url: string;
//   email: string;
//   amount: string;
// };

// // The database returns a number for amount, but we later format it to a string with the formatCurrency function
// export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
//   amount: number;
// };

// export type InvoicesTable = {
//   id: string;
//   customer_id: string;
//   name: string;
//   email: string;
//   image_url: string;
//   date: string;
//   amount: number;
//   status: 'pending' | 'paid';
// };

// export type CustomersTableType = {
//   id: string;
//   name: string;
//   email: string;
//   image_url: string;
//   total_invoices: number;
//   total_pending: number;
//   total_paid: number;
// };

// export type FormattedCustomersTable = {
//   id: string;
//   name: string;
//   email: string;
//   image_url: string;
//   total_invoices: number;
//   total_pending: string;
//   total_paid: string;
// };

// export type CustomerField = {
//   id: string;
//   name: string;
// };

// export type InvoiceForm = {
//   id: string;
//   customer_id: string;
//   amount: number;
//   status: 'pending' | 'paid';
// };
