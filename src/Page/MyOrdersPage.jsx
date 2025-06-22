import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  Filter,
  AlertCircle,
  Loader,
  ChevronDown,
  ChevronUp,
  Truck,
  CreditCard,
  MapPin,
  Calendar,
  Box,
} from "lucide-react";
import axios from "axios";

const statusIcons = {
  delivered: CheckCircle,
  shipped: Truck,
  pending: Clock,
  cancelled: XCircle,
  default: Package,
};

const statusColors = {
  delivered: "bg-green-100 text-green-800",
  shipped: "bg-blue-100 text-blue-800",
  pending: "bg-amber-100 text-amber-800",
  cancelled: "bg-red-100 text-red-800",
  default: "bg-gray-100 text-gray-800",
};

const paymentStatusColors = {
  success: "bg-green-100 text-green-800",
  pending: "bg-amber-100 text-amber-800",
  failed: "bg-red-100 text-red-800",
  default: "bg-gray-100 text-gray-800",
};

const MyOrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const uid = localStorage.getItem("uid");
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        if (!uid) {
          throw new Error("User ID not found. Please login again.");
        }

        const response = await axios.get(
          `${backendUrl}/api/order/get-order/${uid}`
        );

        if (response.data?.OrdersFound) {
          const sortedOrders = response.data.OrdersFound.sort((a, b) => {
            return new Date(b.placedAt) - new Date(a.placedAt);
          });
          setOrders(sortedOrders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message || "Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Format order items for display
  const formatOrderItems = (items) => {
    if (!items?.length) return "No items";
    const firstItem = items[0];
    return items.length > 1
      ? `${firstItem.title} + ${items.length - 1} more`
      : firstItem.title;
  };

  // Calculate total quantity
  const getTotalQuantity = (items) => {
    return items?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;
  };

  // Filter orders based on search and status
  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      order._id.toLowerCase().includes(searchLower) ||
      formatOrderItems(order.items).toLowerCase().includes(searchLower) ||
      order.userName?.toLowerCase().includes(searchLower);
    const matchesFilter =
      filterStatus === "all" ||
      order.orderStatus?.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  // Calculate order statistics
  const orderStats = orders.reduce(
    (stats, order) => {
      const status = order.orderStatus?.toLowerCase();
      if (status === "delivered") stats.delivered++;
      if (status === "shipped") stats.shipped++;
      if (status === "pending") stats.pending++;
      stats.totalSpent += order.totalAmount || 0;
      return stats;
    },
    { delivered: 0, shipped: 0, pending: 0, totalSpent: 0 }
  );

  // Toggle order expansion
  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Loading state
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center max-w-md w-full"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <Loader className="w-12 h-12 text-green-600 mx-auto mb-4" />
          </motion.div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Loading your orders...
          </h3>
          <p className="text-gray-500">
            Please wait while we fetch your order history
          </p>
        </motion.div>
      </motion.div>
    );
  }

  // Error state
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center max-w-md w-full"
        >
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full"
          >
            Try Again
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Order History
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Track and manage your recent purchases
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400 w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search orders by ID, product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all text-sm sm:text-base"
              />
            </div>
            <div className="relative w-full md:w-48">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="text-gray-400 w-5 h-5" />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="block w-full pl-10 pr-8 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all bg-white text-sm sm:text-base"
              >
                <option value="all">All Orders</option>
                <option value="delivered">Delivered</option>
                <option value="shipped">Shipped</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        {orders.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6"
          >
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <p className="text-xs sm:text-sm text-gray-500 mb-1">
                Total Orders
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {orders.length}
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <p className="text-xs sm:text-sm text-gray-500 mb-1">Delivered</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">
                {orderStats.delivered}
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <p className="text-xs sm:text-sm text-gray-500 mb-1">
                In Transit
              </p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">
                {orderStats.shipped}
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <p className="text-xs sm:text-sm text-gray-500 mb-1">
                Total Spent
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                ${orderStats.totalSpent.toFixed(2)}
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Orders List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-3 sm:space-y-4"
        >
          {filteredOrders.length === 0 ? (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center"
            >
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {orders.length === 0 ? "No orders yet" : "No matching orders"}
              </h3>
              <p className="text-gray-500">
                {orders.length === 0
                  ? "Your order history will appear here"
                  : "Try adjusting your search or filter"}
              </p>
            </motion.div>
          ) : (
            <AnimatePresence>
              {filteredOrders.map((order) => {
                const StatusIcon =
                  statusIcons[order.orderStatus?.toLowerCase()] ||
                  statusIcons.default;
                const statusColor =
                  statusColors[order.orderStatus?.toLowerCase()] ||
                  statusColors.default;
                const paymentColor =
                  paymentStatusColors[order.paymentStatus?.toLowerCase()] ||
                  paymentStatusColors.default;

                return (
                  <motion.div
                    key={order._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                  >
                    {/* Order Summary */}
                    <motion.div
                      layout="position"
                      onClick={() => toggleOrderExpansion(order._id)}
                      className={`p-4 sm:p-6 cursor-pointer ${
                        expandedOrder === order._id
                          ? "border-b border-gray-200"
                          : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start space-x-4 flex-1 min-w-0">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={order.items?.[0]?.images?.[0] || ""}
                              alt={order.items?.[0]?.title || "Product"}
                              className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover border border-gray-200"
                              onError={(e) => {
                                e.target.src =
                                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik03NSA0NUMxMDEuNTEgNDUgMTIzIDY2LjQ5IDEyMyA5M0MxMjMgMTE5LjUxIDEwMS41MSAxNDEgNzUgMTQxQzQ4LjQ5IDE0MSAyNyAxMTkuNTEgMjcgOTNDMjcgNjYuNDkgNDguNDkgNDUgNzUgNDVaIiBzdHJva2U9IiM5Q0E0QUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNNjAgODBIMTAwTTYwIDEwNkg5MCIgc3Ryb2tlPSIjOUNBNEFGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K";
                              }}
                            />
                          </div>

                          {/* Order Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <StatusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                              <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                                Order #{order._id.slice(-8).toUpperCase()}
                              </h3>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-500 truncate">
                              {formatOrderItems(order.items)}
                            </p>
                            <p className="text-xs text-gray-400">
                              {new Date(order.placedAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor} mb-2`}
                          >
                            {order.orderStatus}
                          </span>
                          <p className="font-bold text-gray-900">
                            ${order.totalAmount?.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <button className="text-xs sm:text-sm text-green-600 hover:text-green-700 font-medium flex items-center">
                          {expandedOrder === order._id ? (
                            <>
                              <ChevronUp className="w-4 h-4 mr-1" />
                              Hide details
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4 mr-1" />
                              View details
                            </>
                          )}
                        </button>
                        <div className="flex space-x-2">
                          {order.orderStatus?.toLowerCase() === "delivered" && (
                            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg font-medium transition-colors text-xs sm:text-sm">
                              Buy Again
                            </button>
                          )}
                          {order.orderStatus?.toLowerCase() === "shipped" && (
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-medium transition-colors text-xs sm:text-sm">
                              Track
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Order Details */}
                    <AnimatePresence>
                      {expandedOrder === order._id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-4 sm:px-6 overflow-hidden"
                        >
                          <div className="py-4 border-t border-gray-100">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                              <div className="flex items-start space-x-3">
                                <Box className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">
                                    Items
                                  </p>
                                  <p className="font-medium text-gray-900 text-sm">
                                    {formatOrderItems(order.items)}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {getTotalQuantity(order.items)} items
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3">
                                <CreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">
                                    Payment
                                  </p>
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${paymentColor}`}
                                  >
                                    {order.paymentStatus}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {order.expectedDelivery && (
                              <div className="flex items-start space-x-3 mb-4">
                                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">
                                    Expected Delivery
                                  </p>
                                  <p className="font-medium text-green-600 text-sm">
                                    {new Date(
                                      order.expectedDelivery
                                    ).toLocaleDateString("en-US", {
                                      weekday: "short",
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </p>
                                </div>
                              </div>
                            )}

                            {order.shippingAddress && (
                              <div className="flex items-start space-x-3 mb-4">
                                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">
                                    Shipping Address
                                  </p>
                                  <p className="text-xs text-gray-700">
                                    {order.shippingAddress}
                                  </p>
                                </div>
                              </div>
                            )}

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 border-t border-gray-100 gap-3">
                              <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium text-sm">
                                <Eye className="w-4 h-4" />
                                <span>View full details</span>
                              </button>
                              <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm w-full sm:w-auto text-center">
                                Contact Support
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
