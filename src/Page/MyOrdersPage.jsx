import React, { useState, useEffect } from "react";
import {
  Download,
  Package,
  Calendar,
  CreditCard,
  MapPin,
  Phone,
  User,
  CheckCircle,
  Clock,
  XCircle,
  Truck,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const localUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const uid = localStorage.getItem("uid");
      if (!uid) {
        throw new Error("User ID not found in localStorage");
      }

      const response = await fetch(`${localUrl}/api/order/get-order/${uid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data.OrdersFound || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "text-emerald-700 bg-emerald-100";
      case "shipped":
        return "text-blue-700 bg-blue-100";
      case "pending":
        return "text-amber-700 bg-amber-100";
      case "cancelled":
        return "text-red-700 bg-red-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const downloadInvoice = async (orderId) => {
    try {
      // Simulate PDF generation - replace with actual API call
      const orderData = orders.find((order) => order._id === orderId);
      if (!orderData) return;

      // Create a simple PDF content as text (in real implementation, use proper PDF library)
      const invoiceContent = `
NATURAL STORE INVOICE
=====================

Order ID: ${orderData._id}
Customer: ${orderData.userName}
Email: ${orderData.userEmail}
Phone: ${orderData.phoneNumber}

Shipping Address:
${orderData.shippingAddress}

Order Date: ${new Date(orderData.placedAt).toLocaleDateString()}
Payment Status: ${orderData.paymentStatus}
Order Status: ${orderData.orderStatus}

Items:
${orderData.items
  .map(
    (item) => `- ${item.title} (Qty: ${item.quantity}) - $${item.price} each`
  )
  .join("\n")}

Total Amount: $${orderData.totalAmount.toFixed(2)}

Thank you for shopping with Natural Store!
      `;

      // Create and download the file
      const blob = new Blob([invoiceContent], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${orderId}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-green-700 text-lg font-medium">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-4">
          <div className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Error Loading Orders
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchOrders}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-green-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                My Orders
              </h1>
              <p className="text-gray-600">
                Track and manage your natural store orders
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {orders.length === 0 ? (
            <div className="text-center bg-white rounded-2xl shadow-lg p-12">
              <Package className="w-24 h-24 text-green-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                No Orders Found
              </h2>
              <p className="text-gray-600 mb-6">
                You haven't placed any orders yet. Start shopping to see your
                orders here!
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-white/20 rounded-full p-3">
                          <Package className="w-6 h-6" />
                        </div>
                        <div className="capitalize">
                          <h3 className="text-xl font-bold">
                            Order ID #{order._id.slice(-8)}
                          </h3>
                          <p className="text-green-100">
                            Placed on {formatDate(order.placedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div
                          className={`px-4 py-2 rounded-full flex items-center gap-2 ${getStatusColor(
                            order.orderStatus
                          )} bg-white/20 text-white`}
                        >
                          {getStatusIcon(order.orderStatus)}
                          <span className="font-semibold">
                            {order.orderStatus}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            navigate(
                              `/my-account/orders/view-invoice/${order._id}`
                            )
                          }
                          className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Invoice
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Order Content */}
                  <div className="p-6">
                    {/* Customer Info */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                        <User className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm text-gray-500">Customer</p>
                          <p className="font-semibold text-gray-800">
                            {order.userName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                        <Phone className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-semibold text-gray-800">
                            {order.phoneNumber}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                        <CreditCard className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="text-sm text-gray-500">Payment</p>
                          <p
                            className={`font-semibold ${
                              order.paymentStatus === "Success"
                                ? "text-green-600"
                                : "text-amber-600"
                            }`}
                          >
                            {order.paymentStatus}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl">
                        <Calendar className="w-5 h-5 text-amber-600" />
                        <div>
                          <p className="text-sm text-gray-500">
                            Expected Delivery
                          </p>
                          <p className="font-semibold text-gray-800">
                            {order.expectedDelivery
                              ? formatDate(order.expectedDelivery)
                              : "TBD"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <MapPin className="w-5 h-5 text-green-600" />
                        <h4 className="font-semibold text-gray-800">
                          Shipping Address
                        </h4>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-gray-700">{order.shippingAddress}</p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Package className="w-5 h-5 text-green-600" />
                        Order Items ({order.items.length})
                      </h4>
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div
                            key={item._id}
                            className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl"
                          >
                            <img
                              src={item.images[0]}
                              alt={item.title}
                              className="w-20 h-20 object-cover rounded-lg shadow-md"
                            />
                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-800 text-lg">
                                {item.title}
                              </h5>
                              <p className="text-gray-600">
                                Weight: {item.weight}kg
                              </p>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="text-green-600 font-semibold">
                                  ${item.price?.toFixed(2)}
                                </span>
                                <span className="text-gray-500">
                                  Qty: {item.quantity}
                                </span>
                                <span className="text-gray-800 font-semibold">
                                  Total: $
                                  {(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Total */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-800">
                          Total Amount:
                        </span>
                        <span className="text-2xl font-bold text-green-600">
                          ${order.totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrdersPage;
