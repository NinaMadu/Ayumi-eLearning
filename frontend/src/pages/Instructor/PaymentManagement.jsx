import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";

export default function PaymentManagement() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchPayments = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/payment/get`
        );
        const data = await res.json();

        if (res.ok) {
          // Ensure we're getting an array, use default empty array if undefined
          setPayments(data.payments || []);
        } else {
          setError(data.message || "Failed to fetch payments");
        }
      } catch (error) {
        setError("Error fetching payments");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const maskCardNumber = (number) => {
    return number?.replace(/\d(?=\d{4})/g, '*') || '';
  };

  return (
    <AdminLayout>
      <div className="p-6 w-full">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Payment Records</h1>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              ⚠️ {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading payment records...</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Card Number</th>
                    <th className="px-6 py-3">Expiry</th>
                    <th className="px-6 py-3">CVV</th>
                    <th className="px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Add optional chaining and null check */}
                  {payments?.length > 0 ? (
                    payments.map((payment) => (
                      <tr key={payment._id} className="bg-white hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {payment.name}
                        </td>
                        <td className="px-6 py-4 font-mono text-sm text-blue-600">
                          {maskCardNumber(payment.cardNumber)}
                        </td>
                        <td className="px-6 py-4">{payment.expiry}</td>
                        <td className="px-6 py-4 font-mono">{payment.cvv}</td>
                        <td className="px-6 py-4">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        No payment records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}