import { CheckCircle, Home, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useUpdateCartCounter } from "../hooks/useUpdateCartCounter";

const PaymentSuccess = () => {
  const [orderDetails] = useState({
    orderId:
      "ORD-2025-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    amount: 1247.85,
    orderDate: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    product: {
      title: "Dev Mode Testing",
      weight: "eg. 25kg × 2 = 50kg",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    },
  });

  const updateCounter = useUpdateCartCounter();

  useEffect(() => {
    updateCounter();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">Thank you for your order</p>

          {/* Order Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <img
                src={orderDetails.product.image}
                alt={orderDetails.product.title}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="text-left flex-1">
                <h3 className="font-medium text-gray-900 text-sm">
                  {orderDetails.product.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {orderDetails.product.weight}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">
                  ${orderDetails.amount}
                </p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-2 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium text-gray-900">
                {orderDetails.orderId}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium text-gray-900">
                {orderDetails.orderDate}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition flex items-center justify-center space-x-2">
            <Home className="w-4 h-4" />
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Simple Footer Message */}
        <p className="text-center text-sm text-gray-500 mt-6">
          We'll send you an email confirmation shortly
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
