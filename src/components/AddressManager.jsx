import React, { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import UseTitle from "./UseTitle";

const initialAddresses = [
  {
    name: "John Doe",
    address: "123 Elm Street, Apt 4B",
    city: "Springfield, IL 62704",
    phone: "555-123-4567",
  },
  {
    name: "Jane Smith",
    address: "456 Oak Avenue, Suite 12",
    city: "Rivertown, NY 10001",
    phone: "555-987-6543",
  },
  {
    name: "Alice Johnson",
    address: "789 Maple Drive",
    city: "Lakeview, CA 90001",
    phone: "555-246-8100",
  },
  {
    name: "Bob Williams",
    address: "101 Pine Lane",
    city: "Mountainville, CO 80439",
    phone: "555-369-1212",
  },
  {
    name: "Carol Brown",
    address: "202 Birch Blvd",
    city: "Ocean City, NJ 08226",
    phone: "555-654-3210",
  },
];

export default function AddressManager() {
  UseTitle('Your Addresses')
  // State for addresses so we can update on edit
  const [addresses, setAddresses] = useState(initialAddresses);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
  });

  // Split the current URL path into segments
  const pathSegments = window.location.pathname.split("/").filter(Boolean);

  let accumulatedPath = "";

  // Open modal for adding new address
  const openAddModal = () => {
    setEditingIndex(null);
    setFormData({
      name: "",
      address: "",
      city: "",
      phone: "",
    });
    setIsModalOpen(true);
  };

  // Open modal and prefill form with address data
  const openEditModal = (index) => {
    setEditingIndex(index);
    setFormData(addresses[index]);
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save changes to address list
  const handleSave = () => {
    setAddresses((prev) => {
      if (editingIndex !== null) {
        // Edit existing address
        const updated = [...prev];
        updated[editingIndex] = formData;
        return updated;
      } else {
        // Add new address
        return [...prev, formData];
      }
    });
    setIsModalOpen(false);
  };

  // Delete address
  const handleDelete = (index) => {
    setAddresses((prev) => prev.filter((_, i) => i !== index));
  };

  // Close modal without saving
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Your Addresses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Add address card */}
        <div
          className="flex items-center justify-center border-dashed border-2 border-gray-300 rounded h-40 cursor-pointer hover:bg-gray-50 transition"
          onClick={openAddModal}
        >
          <div className="text-center text-gray-500">
            <Plus className="mx-auto mb-2" size={24} />
            <p>Add address</p>
          </div>
        </div>

        {/* Existing addresses */}
        {addresses.map((addr, idx) => (
          <div
            key={idx}
            className="relative border rounded shadow-sm p-4 bg-white hover:shadow-md transition"
          >
            <p className="font-semibold">{addr.name}</p>
            <p>{addr.address}</p>
            <p>{addr.city}</p>
            <p className="text-sm text-gray-600 mt-1">
              Phone number: {addr.phone}
            </p>
            <div className="flex gap-4 text-blue-600 text-sm pt-2">
              <button
                className="flex items-center gap-1 hover:underline"
                type="button"
                onClick={() => openEditModal(idx)}
              >
                <Pencil size={14} /> Edit
              </button>
              <button
                className="flex items-center gap-1 hover:underline text-red-600"
                type="button"
                onClick={() => handleDelete(idx)}
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              onClick={handleCancel}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {editingIndex !== null ? "Edit Address" : "Add New Address"}
            </h2>
            <div
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-4"
            >
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 rounded bg-green-950 text-white hover:bg-green-800"
                >
                  {editingIndex !== null ? "Save" : "Add Address"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
