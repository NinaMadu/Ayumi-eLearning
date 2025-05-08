// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
// import { FaLock } from "react-icons/fa";

// const stripePromise = loadStripe("pk_test_51QrNO7Q1RO73bAfeNF6ZRm1cYTZiPfvpw5chvd9mLmiZfiAJgYEotvSLEfZw9rpeBKBvdfkD8NDXBkjlT4qPztKQ00ENoImvvf");

// const CheckoutForm = () => {
//   const { id } = useParams();
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const [clientSecret, setClientSecret] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [cardholderName, setCardholderName] = useState("");
//   const [price, setPrice] = useState("");
//   const [course, setCourse] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/course/${id}`);
//         const data = await res.json();

//         if (res.ok) {
//           setCourse(data.course);
//           setPrice(data.course.customPrice.$numberDecimal);
//         } else {
//           setError(data.message || "Failed to fetch course details");
//         }
//       } catch (err) {
//         setError("Error fetching course details");
//       }
//     };

//     fetchCourse();
//   }, [id]);

//   useEffect(() => {
//     if (price && parseFloat(price) > 0) {
//       fetch("http://localhost:5000/api/payment/create-payment-intent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           amount: (parseFloat(price) * 0.00339256).toFixed(0),
//           currency: "usd",
//         }),
//       })
//         .then((res) => res.json())
//         .then((data) => setClientSecret(data.clientSecret));
//     }
//   }, [price]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;
  
//     setLoading(true);
//     setMessage("");
  
//     const cardElement = elements.getElement(CardNumberElement);
  
//     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: cardElement,
//         billing_details: { name: cardholderName },
//       },
//     });
  
//     if (error) {
//       setMessage(error.message);
//       setLoading(false);
//       return;
//     }
  
//     if (paymentIntent.status === "succeeded") {
//       setMessage("✅ Payment Successful!");
  
//       // Now save payment to DB
//       await fetch("http://localhost:5000/api/payment/save-payment", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: cardholderName,
//           cardNumber: "**** **** **** 4242", // Masked or sample data; never send real numbers
//           expiry: "12/34",
//           cvv: "***"
//         }),
//       });
  
//       setTimeout(() => {
//         navigate(`/user/course-content/${id}`);
//       }, 2000);
//     }
  
//     setLoading(false);
//   };
  

//   return (
//     <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-2xl mx-auto">
//       <h2 className="text-3xl font-bold text-blue-900 text-center mb-6">Pay Here</h2>

//       <div>
//         <label className="block text-gray-700 font-medium">Name on Card</label>
//         <input
//           type="text"
//           value={cardholderName}
//           onChange={(e) => setCardholderName(e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
//           placeholder="John Doe"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-gray-700 font-medium">Course Price</label>
//         <input
//           type="number"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
//           placeholder="Enter course price"
//           min="0.01"
//           step="0.01"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-gray-700 font-medium">Card Number</label>
//         <div className="w-full p-3 border border-gray-300 rounded-lg bg-white">
//           <CardNumberElement className="w-full" />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-gray-700 font-medium">Expiry Date</label>
//           <div className="w-full p-3 border border-gray-300 rounded-lg bg-white">
//             <CardExpiryElement className="w-full" />
//           </div>
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium">CVC</label>
//           <div className="w-full p-3 border border-gray-300 rounded-lg bg-white">
//             <CardCvcElement className="w-full" />
//           </div>
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="w-full flex justify-center items-center gap-3 bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition disabled:bg-gray-400"
//         disabled={!stripe || loading || !price || parseFloat(price) <= 0}
//       >
//         {loading ? (
//           <span className="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full"></span>
//         ) : (
//           <>
//             <FaLock className="text-white" /> Pay Now
//           </>
//         )}
//       </button>

//       {message && (
//         <p className={`text-center ${message.includes("Successful") ? "text-green-600" : "text-red-500"}`}>
//           {message}
//         </p>
//       )}
//     </form>
//   );
// };

// const Payment = () => {
//   return (
//     <div className="min-h-screen flex">
//       {/* Left side with payment instructions */}
//       <div className="w-1/2 p-10 flex flex-col justify-center bg-blue-100">
//         <h2 className="text-3xl font-bold text-blue-900 mb-4">Payment Information</h2>
//         <p className="text-lg text-blue-800">
//           Welcome to the secure payment portal. Please follow the instructions below to complete your transaction:
//         </p>
//         <ul className="mt-4 text-blue-700 space-y-2">
//           <li>✅ Select your preferred payment method.</li>
//           <li>✅ Enter your payment details carefully.</li>
//           <li>✅ Double-check the course fee before proceeding.</li>
//           <li>✅ Click the "Pay Now" button to complete the process.</li>
//           <li>✅ After payment, you will receive a confirmation email.</li>
//         </ul>
//       </div>

//       {/* Right side with payment form and background image */}
//       <div
//         className="w-1/2 p-8 flex items-center justify-center bg-white shadow-lg rounded-2xl bg-cover bg-center"
        
//       >
//         <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
//           <Elements stripe={stripePromise}>
//             <CheckoutForm />
//           </Elements>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from "@stripe/react-stripe-js";
import { FaLock } from "react-icons/fa";
import { useSelector } from "react-redux";

// Use environment variable for Stripe public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_51QrNO7Q1RO73bAfeNF6ZRm1cYTZiPfvpw5chvd9mLmiZfiAJgYEotvSLEfZw9rpeBKBvdfkD8NDXBkjlT4qPztKQ00ENoImvvf");

const CheckoutForm = () => {
  const { id } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = currentUser?._id;

  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardholderName, setCardholderName] = useState("");
  const [price, setPrice] = useState("");
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/course/${id}`);
        const data = await res.json();
        if (res.ok) {
          setCourse(data.course);
          setPrice(data.course.customPrice.$numberDecimal);
        } else {
          setError(data.message || "Failed to fetch course details");
        }
      } catch (err) {
        setError("Error fetching course details");
      }
    };

    fetchCourse();
  }, [id]);

  useEffect(() => {
    if (price && parseFloat(price) > 0) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payment/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(price),
          currency: "usd",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            setError("Failed to create payment intent");
          }
        })
        .catch(err => {
          setError("Error creating payment intent");
        });
    }
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !userId) return;

    setLoading(true);
    setMessage("");

    const cardElement = elements.getElement(CardNumberElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { name: cardholderName },
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payment/save-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            name: cardholderName,
            cardNumber: "XXXX XXXX XXXX XXXX", // Masking card number for display
            expiry: "XX/XX", // Not storing actual expiry
            cvv: "XXX", // Not storing actual CVV
            courseId: id,
            amount: price,
          }),
        });

        const data = await response.json();
        
        if (response.ok) {
          setMessage("✅ Payment Successful!");
          setTimeout(() => {
            navigate(`/user/course-content/${id}`);
          }, 2000);
        } else {
          setMessage("Payment processed but failed to save details");
          console.error("Failed to save payment:", data.message);
        }
      } catch (err) {
        setMessage("Payment processed but failed to save details");
        console.error("Error saving payment:", err);
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-900 text-center mb-6">Pay Here</h2>

      <div>
        <label className="block text-gray-700 font-medium">Name on Card</label>
        <input
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
          placeholder="John Doe"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium">Course Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
          placeholder="Enter course price"
          min="0.01"
          step="0.01"
          required
          disabled={course !== null} // Disable if course is loaded
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium">Card Number</label>
        <div className="w-full p-3 border border-gray-300 rounded-lg bg-white">
          <CardNumberElement className="w-full" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium">Expiry Date</label>
          <div className="w-full p-3 border border-gray-300 rounded-lg bg-white">
            <CardExpiryElement className="w-full" />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">CVC</label>
          <div className="w-full p-3 border border-gray-300 rounded-lg bg-white">
            <CardCvcElement className="w-full" />
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <button
        type="submit"
        className="w-full flex justify-center items-center gap-3 bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        disabled={!stripe || loading || !price || parseFloat(price) <= 0 || !userId}
      >
        {loading ? (
          <span className="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full"></span>
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
  );
};

const Payment = () => {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 p-10 flex flex-col justify-center bg-blue-100">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Payment Information</h2>
        <p className="text-lg text-blue-800">
          Welcome to the secure payment portal. Please follow the instructions below to complete your transaction:
        </p>
        <ul className="mt-4 text-blue-700 space-y-2">
          <li>✅ Select your preferred payment method.</li>
          <li>✅ Enter your payment details carefully.</li>
          <li>✅ Double-check the course fee before proceeding.</li>
          <li>✅ Click the "Pay Now" button to complete the process.</li>
          <li>✅ After payment, you will receive a confirmation email.</li>
        </ul>
      </div>

      <div className="w-1/2 p-8 flex items-center justify-center bg-white shadow-lg rounded-2xl">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;