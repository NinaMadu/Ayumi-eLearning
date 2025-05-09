


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


// controllers/payment.controller.js

// import Stripe from 'stripe';
// import dotenv from 'dotenv';
// import Payment from '../models/payment.model.js';

// dotenv.config();
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const createPaymentIntent = async (req, res) => {
//   try {
//     const { amount, currency } = req.body;

//     if (!amount || !currency) {
//       return res.status(400).json({ message: "Amount and currency are required" });
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount * 100,
//       currency,
//       payment_method_types: ['card'],
//     });

//     res.status(200).json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error creating payment intent', error: error.message });
//   }
// };

// export const savePayment = async (req, res) => {
//   try {
//     const { name, cardNumber, expiry, cvv, userId, courseId } = req.body;

//     if (!name || !cardNumber || !expiry || !cvv || !userId || !courseId) {
//       return res.status(400).json({ message: "All fields including userId and courseId are required" });
//     }

//     const newPayment = new Payment({
//       name,
//       cardNumber,
//       expiry,
//       cvv,
//       user: userId,
//       course: courseId
//     });

//     await newPayment.save();

//     res.status(201).json({ message: "Payment saved to database", payment: newPayment });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error saving payment', error: error.message });
//   }
// };
import Stripe from 'stripe';
import dotenv from 'dotenv';
import Payment from '../models/payment.model.js';
import mongoose from 'mongoose';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({ message: "Amount and currency are required" });
    }

    // Convert to cents for Stripe
    const amountInCents = Math.round(parseFloat(amount) * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency,
      payment_method_types: ['card'],
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment intent error:', error);
    res.status(500).json({ message: 'Error creating payment intent', error: error.message });
  }
};

export const savePayment = async (req, res) => {
  try {
    const { name, cardNumber, expiry, cvv, userId, courseId, amount } = req.body;

    if (!name || !cardNumber || !expiry || !cvv || !userId || !courseId || !amount) {
      return res.status(400).json({ 
        message: "All fields including userId, courseId and amount are required" 
      });
    }

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid userId or courseId format" });
    }

    const newPayment = new Payment({
      name,
      cardNumber,
      expiry,
      cvv,
      amount: parseFloat(amount),
      user: userId,
      course: courseId,
      paymentStatus: 'completed'
    });

    await newPayment.save();

    res.status(201).json({ 
      message: "Payment saved successfully", 
      payment: {
        _id: newPayment._id,
        name: newPayment.name,
        amount: newPayment.amount,
        createdAt: newPayment.createdAt
      } 
    });
  } catch (error) {
    console.error('Save payment error:', error);
    res.status(500).json({ message: 'Error saving payment', error: error.message });
  }
};

export const getUserPayments = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const payments = await Payment.find({ user: userId })
      .populate('course', 'title description customPrice')
      .sort({ createdAt: -1 });
    
    res.status(200).json({ payments });
  } catch (error) {
    console.error('Get user payments error:', error);
    res.status(500).json({ message: 'Error fetching payments', error: error.message });
  }
};