


// import Payment from '../models/payment.model.js';

// // Create a new payment record
// export const createPayment = async (req, res) => {
//   try {
//     const { name, cardNumber, expiry, cvv } = req.body;

//     // Check if all required fields are provided
//     if (!name || !cardNumber || !expiry || !cvv) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Create a new payment instance
//     const newPayment = new Payment({
//       name,
//       cardNumber,
//       expiry,
//       cvv
//     });

//     // Save the payment record to the database
//     await newPayment.save();

//     res.status(201).json({ message: 'Payment processed successfully', payment: newPayment });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error processing payment', error: error.message });
//   }
// };

// // Get all payments (optional, for testing or admin purposes)
// export const getPayments = async (req, res) => {
//   try {
//     const payments = await Payment.find();
//     res.status(200).json(payments);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching payments', error: error.message });
//   }
// };



import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({ message: "Amount and currency are required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
      payment_method_types: ['card'],
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing payment', error: error.message });
  }
};

