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
  Filter,
  SortDesc,
  Search,
  AlertTriangle,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Cancel order states
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [cancelLoading, setCancelLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [orders, orderStatusFilter, paymentStatusFilter, sortBy, searchTerm]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const uid = localStorage.getItem("uid");
      if (!uid) {
        throw new Error("User ID not found in localStorage");
      }

      const response = await fetch(`${backendUrl}/api/order/get-order/${uid}`);
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

  const handleCancelOrder = async () => {
    if (!cancelReason.trim()) {
      alert("Please provide a reason for cancellation");
      return;
    }

    try {
      setCancelLoading(true);
      const uid = localStorage.getItem("uid");

      if (!uid) {
        throw new Error("User ID not found");
      }

      const response = await axios.delete(
        `${backendUrl}/api/order/cancel-order`,
        {
          data: {
            orderId: selectedOrderId,
            userId: uid,
            reason: cancelReason.trim(),
          },
        }
      );

      if (response.status === 200) {
        // Refresh orders after successful cancellation
        await fetchOrders();
        setShowCancelModal(false);
        setCancelReason("");
        setSelectedOrderId("");
        alert("Order cancelled successfully!");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert(
        error.response?.data?.message ||
          "Failed to cancel order. Please try again."
      );
    } finally {
      setCancelLoading(false);
    }
  };

  const openCancelModal = (orderId) => {
    setSelectedOrderId(orderId);
    setShowCancelModal(true);
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);
    setCancelReason("");
    setSelectedOrderId("");
  };

  const canCancelOrder = (orderStatus, paymentStatus) => {
    const cancelableStatuses = ["pending", "confirmed", "processing"];
    return (
      cancelableStatuses.includes(orderStatus.toLowerCase()) &&
      paymentStatus.toLowerCase() === "success"
    );
  };

  const applyFiltersAndSort = () => {
    let filtered = [...orders];

    // Apply order status filter
    if (orderStatusFilter !== "all") {
      filtered = filtered.filter(
        (order) =>
          order.orderStatus.toLowerCase() === orderStatusFilter.toLowerCase()
      );
    }

    // Apply payment status filter
    if (paymentStatusFilter !== "all") {
      filtered = filtered.filter(
        (order) =>
          order.paymentStatus.toLowerCase() ===
          paymentStatusFilter.toLowerCase()
      );
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.items.some((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.placedAt) - new Date(a.placedAt);
        case "oldest":
          return new Date(a.placedAt) - new Date(b.placedAt);
        case "amount-high":
          return b.totalAmount - a.totalAmount;
        case "amount-low":
          return a.totalAmount - b.totalAmount;
        default:
          return new Date(b.placedAt) - new Date(a.placedAt);
      }
    });

    setFilteredOrders(filtered);
  };

  const resetFilters = () => {
    setOrderStatusFilter("all");
    setPaymentStatusFilter("all");
    setSortBy("recent");
    setSearchTerm("");
  };

  const getUniqueOrderStatuses = () => {
    const statuses = [...new Set(orders.map((order) => order.orderStatus))];
    return statuses;
  };

  const getUniquePaymentStatuses = () => {
    const statuses = [...new Set(orders.map((order) => order.paymentStatus))];
    return statuses;
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
      case "confirmed":
        return "text-green-700 bg-green-100";
      case "processing":
        return "text-purple-700 bg-purple-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "success":
      case "paid":
        return "text-green-600";
      case "pending":
        return "text-amber-600";
      case "failed":
      case "refunded":
        return "text-red-600";
      default:
        return "text-gray-600";
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
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "processing":
        return <Package className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const downloadInvoice = async (orderId) => {
    try {
      const orderData = orders.find((order) => order._id === orderId);
      if (!orderData) return;

      // Prevent downloading invoice for cancelled orders
      if (orderData.orderStatus.toLowerCase() === "cancelled") {
        alert("Cannot download invoice for cancelled orders");
        return;
      }

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
          {/* Search and Filter Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search orders by ID, name, email, or item..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter Toggle & Sort */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors"
                >
                  <Filter className="w-5 h-5" />
                  Filters
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="recent">Recent First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="amount-high">Amount: High to Low</option>
                  <option value="amount-low">Amount: Low to High</option>
                </select>
              </div>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Status
                    </label>
                    <select
                      value={orderStatusFilter}
                      onChange={(e) => setOrderStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="all">All Statuses</option>
                      {getUniqueOrderStatuses().map((status) => (
                        <option key={status} value={status.toLowerCase()}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Status
                    </label>
                    <select
                      value={paymentStatusFilter}
                      onChange={(e) => setPaymentStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="all">All Payment Status</option>
                      {getUniquePaymentStatuses().map((status) => (
                        <option key={status} value={status.toLowerCase()}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={resetFilters}
                      className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Results Summary */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <span>
                Showing {filteredOrders.length} of {orders.length} orders
              </span>
              {(orderStatusFilter !== "all" ||
                paymentStatusFilter !== "all" ||
                searchTerm) && (
                <span className="text-green-600 font-medium">
                  Filters applied
                </span>
              )}
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="text-center bg-white rounded-2xl shadow-lg p-12">
              <Package className="w-24 h-24 text-green-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {orders.length === 0 ? "No Orders Found" : "No Matching Orders"}
              </h2>
              <p className="text-gray-600 mb-6">
                {orders.length === 0
                  ? "You haven't placed any orders yet. Start shopping to see your orders here!"
                  : "No orders match your current filters. Try adjusting your search criteria."}
              </p>
              {orders.length === 0 ? (
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                  Start Shopping
                </button>
              ) : (
                <button
                  onClick={resetFilters}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
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
                          {/* Order ID in uppercase */}
                          <h3 className="text-xl font-bold">
                            Order ID #{order._id.slice(-8).toUpperCase()}
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

                        {/* Invoice button with validation */}
                        {order.orderStatus.toLowerCase() !== "cancelled" ? (
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
                        ) : (
                          <button
                            disabled
                            className="bg-gray-300 text-gray-500 px-4 py-2 rounded-full flex items-center gap-2 cursor-not-allowed"
                            title="Cannot view invoice for cancelled orders"
                          >
                            <XCircle className="w-4 h-4" />
                            Invoice Unavailable
                          </button>
                        )}

                        {/* Cancel button with validation */}
                        {canCancelOrder(
                          order.orderStatus,
                          order.paymentStatus
                        ) ? (
                          <button
                            onClick={() => openCancelModal(order._id)}
                            className="bg-red-500/20 hover:bg-red-500/30 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                            Cancel
                          </button>
                        ) : (
                          order.orderStatus.toLowerCase() !== "cancelled" && (
                            <button
                              disabled
                              className="bg-gray-300 text-gray-500 px-4 py-2 rounded-full flex items-center gap-2 cursor-not-allowed"
                              title={
                                order.paymentStatus.toLowerCase() !== "success"
                                  ? "Only orders with successful payment can be cancelled"
                                  : "This order cannot be cancelled"
                              }
                            >
                              <XCircle className="w-4 h-4" />
                              Cancel Unavailable
                            </button>
                          )
                        )}
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
                            className={`font-semibold ${getPaymentStatusColor(
                              order.paymentStatus
                            )}`}
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
                            {/* <button
                              onClick={() => downloadInvoice(order._id)}
                              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                              disabled={
                                order.orderStatus.toLowerCase() === "cancelled"
                              }
                              title={
                                order.orderStatus.toLowerCase() === "cancelled"
                                  ? "Cannot download invoice for cancelled orders"
                                  : "Download invoice"
                              }
                            >
                              <Download className="w-4 h-4" />
                              Invoice
                            </button> */}
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

        {/* Cancel Order Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 rounded-full p-2">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Cancel Order
                    </h3>
                  </div>
                  <button
                    onClick={closeCancelModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <p className="text-gray-600 mb-4">
                  Are you sure you want to cancel this order? Please provide a
                  reason for cancellation.
                </p>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cancellation Reason *
                  </label>
                  <textarea
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="Please provide a reason for cancellation..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    rows="4"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={closeCancelModal}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    disabled={cancelLoading}
                  >
                    Keep Order
                  </button>
                  <button
                    onClick={handleCancelOrder}
                    disabled={cancelLoading || !cancelReason.trim()}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {cancelLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Cancelling...
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        Cancel Order
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyOrdersPage;
