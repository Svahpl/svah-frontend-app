import React, { useState, useEffect } from "react";
import { Download, Building2 } from "lucide-react";
import { useParams } from "react-router-dom";
import logo from "../../public/images/LOGO.png";
import html2pdf from "html2pdf.js";

const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const orderId = id;
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true);
        const uid = localStorage.getItem("uid");

        if (!uid) {
          setError("User ID not found in localStorage");
          return;
        }

        const response = await fetch(
          `${backendUrl}/api/order/get-order/${uid}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch order data");
        }

        const data = await response.json();

        if (data && data.OrdersFound) {
          // Find the specific order by orderId
          const specificOrder = data.OrdersFound.find(
            (order) => order._id === orderId
          );

          if (specificOrder) {
            setInvoiceData(specificOrder);
          } else {
            setError("Order not found");
          }
        } else {
          setError("No orders found");
        }
      } catch (err) {
        setError("Failed to fetch order data");
        console.error("Error fetching order data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderData();
    }
  }, [orderId, backendUrl]);

  async function handleOnclick() {
    const element = document.querySelector("#invoice");
    html2pdf(element);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading invoice...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!invoiceData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No invoice data available</p>
        </div>
      </div>
    );
  }

  // Generate invoice number from order ID
  const invoiceNumber = `INV-${invoiceData._id.slice(-8).toUpperCase()}`;

  // Calculate subtotal from items
  const subtotal = invoiceData.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Calculate shipping and total (no tax)
  const shipping = 15;
  const total = subtotal + shipping;

  // Format date
  const invoiceDate = new Date(invoiceData.placedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <>
      {/* Print-specific styles */}
      <style jsx>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
          .print-container {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 20px !important;
            box-shadow: none !important;
          }
          .print-break {
            page-break-inside: avoid;
          }
        }
        @media screen {
          .print-container {
            background: white;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          }
        }
      `}</style>

      <div
        id="invoice"
        className="min-h-screen bg-gray-100 py-8 px-4 print:bg-white print:py-0 print:px-0"
      >
        <div className="max-w-4xl mx-auto print-container">
          <div className="p-8 print:p-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start mb-12 print-break">
              <div className="mb-6 sm:mb-0">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-wide">
                  INVOICE
                </h1>
                <div className="space-y-1 text-gray-700">
                  <p className="text-sm font-medium">
                    Invoice Number:{" "}
                    <span className="font-bold">{invoiceNumber}</span>
                  </p>
                  <p className="text-sm">Invoice Date: {invoiceDate}</p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                {/* Logo Section */}
                <div className="mb-6 flex justify-start sm:justify-end">
                  <div className="w-16 mt-3 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <img src={logo} />
                  </div>
                  <span className="ml-2 text-xs text-gray-500"></span>
                </div>

                <div className="text-left sm:text-right">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Your Company Name
                  </h2>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>123 Business Street</p>
                    <p>City, State 12345</p>
                    <p>Phone: +1 (555) 123-4567</p>
                    <p>Email: contact@company.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 print-break">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2">
                  BILL TO
                </h3>
                <div className="text-gray-700 space-y-1">
                  <p className="font-semibold text-gray-900">
                    {invoiceData.userName}
                  </p>
                  <p>{invoiceData.userEmail}</p>
                  <p>{invoiceData.phoneNumber}</p>
                  <p className="leading-relaxed">
                    {invoiceData.shippingAddress}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2">
                  PAYMENT STATUS
                </h3>
                <div className="text-gray-700">
                  <p className="text-sm">
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        invoiceData.paymentStatus === "Success"
                          ? "text-green-700"
                          : invoiceData.paymentStatus === "Pending"
                          ? "text-yellow-700"
                          : "text-red-700"
                      }`}
                    >
                      {invoiceData.paymentStatus.toUpperCase()}
                    </span>
                  </p>
                  {/* <p className="text-sm mt-2">
                    Order Status:{" "}
                    <span
                      className={`font-semibold ${
                        invoiceData.orderStatus === "Delivered"
                          ? "text-green-700"
                          : invoiceData.orderStatus === "Shipped"
                          ? "text-blue-700"
                          : invoiceData.orderStatus === "Cancelled"
                          ? "text-red-700"
                          : "text-yellow-700"
                      }`}
                    >
                      {invoiceData.orderStatus.toUpperCase()}
                    </span>
                  </p> */}
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8 print-break">
              <div className="block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-900">
                      <th className="text-left py-3 px-2 font-bold text-gray-900">
                        DESCRIPTION
                      </th>
                      <th className="text-center py-3 px-2 font-bold text-gray-900 hidden sm:table-cell">
                        QTY
                      </th>
                      <th className="text-right py-3 px-2 font-bold text-gray-900 hidden sm:table-cell">
                        UNIT PRICE
                      </th>
                      <th className="text-right py-3 px-2 font-bold text-gray-900">
                        AMOUNT
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.items && invoiceData.items.length > 0 ? (
                      invoiceData.items.map((item, index) => (
                        <tr
                          key={item._id || index}
                          className="border-b border-gray-200"
                        >
                          <td className="py-4 px-2 text-gray-700">
                            <div className="font-medium">{item.title}</div>
                            {item.weight && (
                              <div className="text-sm text-gray-500">
                                Weight: {item.weight}kg
                              </div>
                            )}
                            <div className="sm:hidden text-sm text-gray-600 mt-1">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </div>
                          </td>
                          <td className="py-4 px-2 text-center text-gray-700 hidden sm:table-cell">
                            {item.quantity}
                          </td>
                          <td className="py-4 px-2 text-right text-gray-700 hidden sm:table-cell">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="py-4 px-2 text-right font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="py-8 px-2 text-center text-gray-500"
                        >
                          No items found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals Section */}
            <div className="flex justify-end mb-8 print-break">
              <div className="w-full sm:w-80">
                <div className="space-y-2">
                  <div className="flex justify-between py-2 text-gray-700">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 text-gray-700">
                    <span>Shipping:</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t-2 border-gray-900 pt-2 mt-2">
                    <div className="flex justify-between py-2 text-lg font-bold text-gray-900">
                      <span>TOTAL:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Notes */}
            <div className="border-t border-gray-200 pt-8 print-break">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    PAYMENT TERMS
                  </h4>
                  <p className="text-sm text-gray-700">
                    Payment is due within 30 days of invoice date. Late payments
                    may be subject to fees.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">NOTES</h4>
                  <p className="text-sm text-gray-700">
                    Thank you for your business! For questions about this
                    invoice, please contact us at contact@company.com
                  </p>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div
              data-html2canvas-ignore
              className="flex justify-center mt-8 no-print"
            >
              <button
                onClick={handleOnclick}
                className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Download size={20} />
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
