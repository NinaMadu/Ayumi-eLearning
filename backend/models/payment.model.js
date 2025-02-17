

import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    cardNumber: {
      type: String,
      required: true
    },
    expiry: {
      type: String,
      required: true
    },
    cvv: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Payment = mongoose.model('Payment', paymentSchema);

// Default export
export default Payment;
