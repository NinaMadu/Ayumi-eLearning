import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { FaLock } from "react-icons/fa";

// Stripe public key
const stripePromise = loadStripe("pk_test_51QrNO7Q1RO73bAfeNF6ZRm1cYTZiPfvpw5chvd9mLmiZfiAJgYEotvSLEfZw9rpeBKBvdfkD8NDXBkjlT4qPztKQ00ENoImvvf");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardholderName, setCardholderName] = useState("");  // State for cardholder name
  const [course, setCourse] = useState({ customPrice: { $numberDecimal: 1000 }, priceUnit: "usd" }); // Example course object for testing

  useEffect(() => {
    fetch("http://localhost:5000/api/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: parseFloat(course.customPrice.$numberDecimal).toFixed(2), // Amount in cents (multiply by 100)
        currency: course.priceUnit
      }), 
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [course]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");  // Clear previous message

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: cardholderName,  // Adding cardholder name in billing details
        },
      },
    });

    if (error) {
      setMessage(error.message); // Show error message if payment fails
    } else if (paymentIntent.status === "succeeded") {
      setMessage("✅ Payment Successful!"); // Show success message if payment succeeds
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Secure Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-lg mx-auto">
        {/* Cardholder Name */}
        <div className="p-4 border rounded-lg shadow-sm">
          <label className="block text-gray-600 mb-1">Name on Card</label>
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="John Doe"
            required
          />
        </div>

        {/* Card Number */}
        <div className="p-4 border rounded-lg shadow-sm">
          <label className="block text-gray-600 mb-1">Card Number</label>
          <CardNumberElement className="w-full p-2 border rounded-md" />
        </div>

        {/* Expiry Date */}
        <div className="p-4 border rounded-lg shadow-sm">
          <label className="block text-gray-600 mb-1">Expiry Date</label>
          <CardExpiryElement className="w-full p-2 border rounded-md" />
        </div>

        {/* CVC */}
        <div className="p-4 border rounded-lg shadow-sm">
          <label className="block text-gray-600 mb-1">CVC</label>
          <CardCvcElement className="w-full p-2 border rounded-md" />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          disabled={!stripe || loading}
        >
          {loading ? (
            <span className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></span>
          ) : (
            <>
              <FaLock className="text-white" /> Pay Now
            </>
          )}
        </button>

        {message && (
          <p className={`text-center ${message.includes("Successful") ? "text-green-600" : "text-red-500"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

const Payment = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
