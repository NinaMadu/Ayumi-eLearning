// // routes/paymentRoutes.js
// import express from 'express';
// import { createPayment, getPayments } from '../controllers/payment.controller.js';

// const router = express.Router();

// // Route to create a new payment
// router.post('/payment', createPayment);

// // Route to get all payments (optional, for testing or admin purposes)
// router.get('/payments', getPayments);

// export default router;


import express from 'express';
import { createPaymentIntent, getPayments } from '../controllers/payment.controller.js';

const router = express.Router();

// Route to create a payment intent
router.post('/create-payment-intent', createPaymentIntent);
router.get('/get', getPayments);
export default router;
