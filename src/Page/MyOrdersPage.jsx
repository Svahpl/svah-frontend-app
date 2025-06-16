import React, { useState, useEffect } from "react";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  MoreVertical,
  Search,
  Filter,
  AlertCircle,
  Loader,
} from "lucide-react";
import axios from "axios";

const MyOrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from API and sort by date (newest first)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const uid = localStorage.getItem("uid");
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        if (!uid) {
          setError("User ID not found. Please login again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${backendUrl}/api/order/get-order/${uid}`
        );

        if (response.data && response.data.OrdersFound) {
          // Sort orders by date (newest first)
          const sortedOrders = response.data.OrdersFound.sort((a, b) => {
            return new Date(b.placedAt) - new Date(a.placedAt);
          });
          setOrders(sortedOrders);
        } else {
          setOrders([]);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again later.");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "shipped":
        return <Package className="w-5 h-5 text-blue-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case "success":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatOrderItems = (items) => {
    if (!items || items.length === 0) return "No items";

    const firstItem = items[0];
    const remainingCount = items.length - 1;

    if (remainingCount > 0) {
      return `${firstItem.title} + ${remainingCount} more`;
    }
    return firstItem.title;
  };

  const getTotalQuantity = (items) => {
    if (!items || items.length === 0) return 0;
    return items.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatOrderItems(order.items)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      order.orderStatus?.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getOrderStats = () => {
    const stats = {
      delivered: orders.filter(
        (o) => o.orderStatus?.toLowerCase() === "delivered"
      ).length,
      shipped: orders.filter((o) => o.orderStatus?.toLowerCase() === "shipped")
        .length,
      pending: orders.filter((o) => o.orderStatus?.toLowerCase() === "pending")
        .length,
      totalSpent: orders.reduce(
        (sum, order) => sum + (order.totalAmount || 0),
        0
      ),
    };
    return stats;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <Loader className="w-12 h-12 text-green-700 animate-spin mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Loading your orders...
          </h3>
          <p className="text-gray-500">
            Please wait while we fetch your order history
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const stats = getOrderStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order History
          </h1>
          <p className="text-gray-600">
            Track and manage your recent purchases
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by order ID, product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="all">All Orders</option>
                <option value="delivered">Delivered</option>
                <option value="shipped">Shipped</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        {orders.length > 0 && (
          <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="text-gray-500 text-sm mb-1">Total Orders</div>
              <div className="text-2xl font-bold text-gray-900">
                {orders.length}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="text-gray-500 text-sm mb-1">Delivered</div>
              <div className="text-2xl font-bold text-green-700">
                {stats.delivered}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="text-gray-500 text-sm mb-1">In Transit</div>
              <div className="text-2xl font-bold text-blue-600">
                {stats.shipped}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="text-gray-500 text-sm mb-1">Total Spent</div>
              <div className="text-2xl font-bold text-gray-900">
                ${stats.totalSpent.toFixed(2)}
              </div>
            </div>
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-500">
                {orders.length === 0
                  ? "You haven't placed any orders yet"
                  : "No orders match your search criteria"}
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-4">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={order.items?.[0]?.images?.[0] || ""}
                          alt={order.items?.[0]?.title || "Product"}
                          className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                          onError={(e) => {
                            e.target.src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik03NSA0NUMxMDEuNTEgNDUgMTIzIDY2LjQ5IDEyMyA5M0MxMjMgMTE5LjUxIDEwMS41MSAxNDEgNzUgMTQxQzQ4LjQ5IDE0MSAyNyAxMTkuNTEgMjcgOTNDMjcgNjYuNDkgNDguNDkgNDUgNzUgNDVaIiBzdHJva2U9IiM5Q0E0QUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNNjAgODBIMTAwTTYwIDEwNkg5MCIgc3Ryb2tlPSIjOUNBNEFGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K";
                          }}
                        />
                      </div>

                      {/* Order Info */}
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          {getStatusIcon(order.orderStatus)}
                          <h3 className="font-semibold text-gray-900">
                            Order #{order._id.slice(-8).toUpperCase()}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-500">
                          Placed on{" "}
                          {new Date(order.placedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus}
                      </span>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Items</p>
                      <p className="font-medium text-gray-900">
                        {formatOrderItems(order.items)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {getTotalQuantity(order.items)} items
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                      <p className="font-bold text-gray-900">
                        ${order.totalAmount?.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Payment</p>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(
                          order.paymentStatus
                        )}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>

                  {order.expectedDelivery && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">
                        Expected Delivery
                      </p>
                      <p className="font-medium text-green-700">
                        {new Date(order.expectedDelivery).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  )}

                  {order.shippingAddress && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">
                        Shipping Address
                      </p>
                      <p className="text-sm text-gray-700">
                        {order.shippingAddress}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-100 gap-3">
                    <button className="flex items-center space-x-2 text-green-700 hover:text-green-800 font-medium transition-colors">
                      <Eye className="w-4 h-4" />
                      <span>View Order Details</span>
                    </button>
                    <div className="flex space-x-2">
                      {order.orderStatus?.toLowerCase() === "delivered" && (
                        <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                          Buy Again
                        </button>
                      )}
                      {order.orderStatus?.toLowerCase() === "shipped" && (
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                          Track Package
                        </button>
                      )}
                      <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                        Contact Support
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
