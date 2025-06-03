import React from "react";

const InvoiceTemplate = ({
  invoiceData = {
    invoiceNumber: "INV-001",
    date: "2025-06-03",
    dueDate: "2025-07-03",
    company: {
      name: "Your Company Name",
      address: "123 Business Street",
      city: "Business City, BC 12345",
      email: "contact@yourcompany.com",
      phone: "+1 (555) 123-4567",
    },
    client: {
      name: "Client Company Ltd.",
      address: "456 Client Avenue",
      city: "Client City, CC 67890",
      email: "billing@clientcompany.com",
    },
    items: [
      {
        id: 1,
        description: "Web Development Services",
        quantity: 40,
        rate: 75.0,
        amount: 3000.0,
      },
      {
        id: 2,
        description: "UI/UX Design",
        quantity: 20,
        rate: 85.0,
        amount: 1700.0,
      },
      {
        id: 3,
        description: "Project Management",
        quantity: 10,
        rate: 95.0,
        amount: 950.0,
      },
    ],
    subtotal: 5650.0,
    taxRate: 0.08,
    tax: 452.0,
    total: 6102.0,
    notes: "Payment is due within 30 days. Thank you for your business!",
    paymentTerms: "Net 30",
  },
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg print:shadow-none">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">INVOICE</h1>
          <div className="text-sm text-gray-600">
            <p className="font-semibold">
              Invoice #: {invoiceData.invoiceNumber}
            </p>
            <p>Date: {formatDate(invoiceData.date)}</p>
            <p>Due Date: {formatDate(invoiceData.dueDate)}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {invoiceData.company.name}
          </h2>
          <div className="text-sm text-gray-600">
            <p>{invoiceData.company.address}</p>
            <p>{invoiceData.company.city}</p>
            <p className="mt-2">{invoiceData.company.email}</p>
            <p>{invoiceData.company.phone}</p>
          </div>
        </div>
      </div>

      {/* Bill To Section */}
      <div className="mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Bill To:</h3>
          <div className="text-sm text-gray-700">
            <p className="font-semibold text-base">{invoiceData.client.name}</p>
            <p>{invoiceData.client.address}</p>
            <p>{invoiceData.client.city}</p>
            <p className="mt-1">{invoiceData.client.email}</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="text-left py-3 px-4 font-semibold">Description</th>
              <th className="text-center py-3 px-4 font-semibold w-20">Qty</th>
              <th className="text-right py-3 px-4 font-semibold w-24">Rate</th>
              <th className="text-right py-3 px-4 font-semibold w-32">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-3 px-4 text-gray-700">{item.description}</td>
                <td className="py-3 px-4 text-center text-gray-700">
                  {item.quantity}
                </td>
                <td className="py-3 px-4 text-right text-gray-700">
                  {formatCurrency(item.rate)}
                </td>
                <td className="py-3 px-4 text-right font-semibold text-gray-800">
                  {formatCurrency(item.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals Section */}
      <div className="flex justify-end mb-8">
        <div className="w-80">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-700">Subtotal:</span>
              <span className="font-semibold text-gray-800">
                {formatCurrency(invoiceData.subtotal)}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-700">
                Tax ({(invoiceData.taxRate * 100).toFixed(1)}%):
              </span>
              <span className="font-semibold text-gray-800">
                {formatCurrency(invoiceData.tax)}
              </span>
            </div>
            <div className="flex justify-between py-3 mt-2">
              <span className="text-lg font-bold text-gray-800">Total:</span>
              <span className="text-lg font-bold text-gray-800">
                {formatCurrency(invoiceData.total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Terms and Notes */}
      <div className="border-t pt-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Payment Terms:</h4>
            <p className="text-sm text-gray-600">{invoiceData.paymentTerms}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Notes:</h4>
            <p className="text-sm text-gray-600">{invoiceData.notes}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t text-center">
        <p className="text-sm text-gray-500">
          Thank you for your business! For questions about this invoice, please
          contact {invoiceData.company.email}
        </p>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
