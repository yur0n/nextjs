// import { PipelineStage } from 'mongoose';
// import { User, Revenue, Customer, Invoice } from './definitions-mongo';
// import { formatCurrency } from './utils';



// export async function fetchRevenue() {
//   // Add noStore() here to prevent the response from being cached.
//   // This is equivalent to in fetch(..., {cache: 'no-store'}).

//   try {
//     // Artificially delay a response for demo purposes.
//     // Don't do this in production :)

//     // console.log('Fetching revenue data...');
//     // await new Promise((resolve) => setTimeout(resolve, 3000));

//     const data = await Revenue.find({});

//     // console.log('Data fetch completed after 3 seconds.');

//     return data
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch revenue data.');
//   }
// }

// export async function fetchLatestInvoices() {
//   try {

//     const data = await Invoice.find({})
//       .sort({ date: -1 })
//       .limit(5)
//       .populate('customer_id', 'name email image_url');

//     const latestInvoices = data.map((invoice) => ({
//       ...invoice,
//       amount: formatCurrency(invoice.amount ?? 0),
//     }));
//     return latestInvoices;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch the latest invoices.');
//   }
// }

// export async function fetchCardData() {
//   try {
//     const [invoiceCount, customerCount, invoiceStatus] = await Promise.all([
//       Invoice.countDocuments(),
//       Customer.countDocuments(),
//       Invoice.aggregate([
//         {
//           $group: {
//             _id: null,
//             paid: {
//               $sum: {
//                 $cond: [{ $eq: ['$status', 'paid'] }, '$amount', 0],
//               },
//             },
//             pending: {
//               $sum: {
//                 $cond: [{ $eq: ['$status', 'pending'] }, '$amount', 0],
//               },
//             },
//           },
//         },
//       ]),
//     ]);

//     return {
//       numberOfCustomers: customerCount,
//       numberOfInvoices: invoiceCount,
//       totalPaidInvoices: formatCurrency(invoiceStatus[0].paid ?? 0),
//       totalPendingInvoices: formatCurrency(invoiceStatus[0].pending ?? 0),
//     };
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch card data.');
//   }
// }

// const ITEMS_PER_PAGE = 6;
// export async function fetchFilteredInvoices(query: string, currentPage: number) {
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;
//   try {
//     const invoices = await Invoice.find({
//       $text: { $search: query }, // Text search across multiple fields
//     })
//       .sort({ date: -1 }) // Sort by date descending
//       .limit(ITEMS_PER_PAGE)
//       .skip(offset)
//       .populate('customer_id', 'name email image_url'); // Populate customer details

//     return invoices;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch invoices.');
//   }
// }


// export async function fetchInvoicesPages(query: string) {
//   try {
//     const count = await Invoice.find({
//       $text: { $search: query }, // Text search across multiple fields
//     }).countDocuments(); // Count matching documents

//     const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
//     return totalPages;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch total number of invoices.');
//   }
// }

// export async function fetchInvoiceById(id: string) {
//   try {
//     const invoice = await Invoice.findById(id); // Find invoice by ID

//     if (!invoice) {
//       return null; // Handle case where invoice is not found
//     }

//     return {
//       ...invoice.toObject(), // Convert mongoose doc to plain object
//       amount: invoice.amount ?? 0 / 100, // Convert amount from cents to dollars with a default value of 0
//     };
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch invoice.');
//   }
// }


// export async function fetchCustomers() {
//   try {
//     const customers = await Customer.find({}).sort({ name: 1 }); // Find all sorted by name

//     return customers;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch all customers.');
//   }
// }

// export async function fetchFilteredCustomers(query: string) {
//   try {
//     const aggregation = [
//       {
//         $match: {
//           $text: { $search: query }, // Text search on customer name and email
//         },
//       },
//       {
//         $lookup: {
//           from: 'invoices', // Lookup invoices collection
//           localField: '_id', // Join on customer ID
//           foreignField: 'customer_id', // Match with invoice's customer_id
//           as: 'invoices', // Alias for joined invoices data
//         },
//       },
//       {
//         $unwind: '$invoices', // Deconstruct the invoices array (optional, needed if you want to project individual invoice fields)
//       },
//       {
//         $group: {
//           _id: '$_id', // Group by customer ID
//           id: { $first: '$id' }, // Keep the first ID
//           name: { $first: '$name' }, // Keep the first name
//           email: { $first: '$email' }, // Keep the first email
//           image_url: { $first: '$image_url' }, // Keep the first image_url
//           total_invoices: { $sum: 1 }, // Count total invoices
//           total_pending: {
//             $sum: {
//               $cond: [{ $eq: ['$invoices.status', 'pending'] }, '$invoices.amount', 0],
//             },
//           },
//           total_paid: {
//             $sum: {
//               $cond: [{ $eq: ['$invoices.status', 'paid'] }, '$invoices.amount', 0],
//             },
//           },
//         },
//       },
//       {
//         $sort: { name: 1 }, // Sort by name ascending
//       },
//     ];

//     const customers = await Customer.aggregate(aggregation as PipelineStage[]);

//     return customers.map((customer) => ({
//       ...customer,
//       total_pending: formatCurrency(customer.total_pending),
//       total_paid: formatCurrency(customer.total_paid),
//     }));
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch customer table.');
//   }
// }

// export async function getUser(email: string) {
//   try {
//     const user = await User.findOne({ email });
//     return user;
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     throw new Error('Failed to fetch user.');
//   }
// }
