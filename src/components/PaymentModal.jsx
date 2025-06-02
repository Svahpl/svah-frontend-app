/* eslint-disable no-irregular-whitespace */
import {
  ChevronLeft,
  Heart,
  ShoppingBag,
  ChevronRight,
  Star,
  Loader2,
  X,
  CreditCard,
  Shield,
  Plus,
  Minus,
} from "lucide-react";
import { useEffect, useState } from "react";
import PaypalPayment from "./PaypalPayment";
import axios from "axios";

const PaymentModal = ({
  showPaymentModal,
  closePaymentModal,
  product,
  selectedWeight,
}) => {
  const [shippingMethod, setShippingMethod] = useState("air");
  const [finalPrice, setFinalPrice] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [dollar, setDollar] = useState(85.567517);
  const [quantity, setQuantity] = useState(1);
  const [finalWeight, setFinalWeight] = useState();

  const handleShippingChange = (method) => {
    setShippingMethod(method);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      const newTotalWeight = selectedWeight * newQuantity;
      setFinalWeight(newTotalWeight);

      // If current shipping method is "ship" but new weight is below 100kg, switch to "air"
      if (shippingMethod === "ship" && newTotalWeight < 100) {
        setShippingMethod("air");
      }
    }
  };

  const handleShippingCharges = (
    price,
    shippingMethod,
    qty = 1,
    productWeight
  ) => {
    let shippingPrice = 0;
    const totalWeight = productWeight * qty;

    if (shippingMethod === "ship") {
      shippingPrice = totalWeight * (700 / dollar);
    } else if (shippingMethod === "air") {
      shippingPrice = totalWeight * (1000 / dollar);
    }

    setShippingCost(shippingPrice);
    setFinalPrice(selectedWeight * product.price * quantity + shippingPrice);
  };

  const getCurrentDollarinInr = async () => {
    try {
      const res = await axios.get(`https://open.er-api.com/v6/latest/USD`);
      const inr = res.data.rates.INR;
      setDollar(inr);
      console.log(res);
      console.log(`----debug dollar to inr fought: ${dollar}`);
    } catch (error) {
      console.log(`Error fetching current dollar price in inr: ${error}`);
    }
  };

  // Calculate shipping on component mount and when dependencies change
  useEffect(() => {
    getCurrentDollarinInr();
    const totalWeight = selectedWeight * quantity;
    setFinalWeight(totalWeight);

    // If current shipping method is "ship" but weight is below 100kg, switch to "air"
    if (shippingMethod === "ship" && totalWeight < 100) {
      setShippingMethod("air");
    }

    if (product && selectedWeight) {
      handleShippingCharges(
        product.price,
        shippingMethod,
        quantity,
        selectedWeight
      );
    }
  }, [product, selectedWeight, shippingMethod, quantity]);

  const formatPrice = (price) => {
    return typeof price === "number" ? price.toFixed(2) : "0.00";
  };

  // Check if ship shipping is available based on total weight
  const isShipShippingAvailable = finalWeight >= 100;

  // Calculate product total price based on weight and quantity
  const productTotalPrice = selectedWeight * product.price * quantity;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          showPaymentModal ? "opacity-100" : "opacity-0"
        }`}
        onClick={closePaymentModal}
      />

      {/* Modal */}
      <div
        className={`fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-50 transition-all duration-500 ease-out ${
          showPaymentModal
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        }`}
      >
        {/* Mobile Modal */}
        <div className="md:hidden bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto">
          {/* Handle bar */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Payment</h3>
                <p className="text-sm text-gray-500">Secure checkout</p>
              </div>
            </div>
            <button
              onClick={closePaymentModal}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-16 h-16 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">
                    {product.title}
                  </h4>
                  <p className="text-xs text-gray-500">
                    Weight: {selectedWeight}kg × {quantity} = {finalWeight}kg
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    ${formatPrice(product.price)}/kg
                  </p>
                </div>
              </div>

              {/* Quantity Selector for Mobile */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Quantity
                  </span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="text-lg font-semibold text-gray-900 min-w-[2rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Breakdown for Mobile */}
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Product Price (${formatPrice(product.price)}/kg ×{" "}
                    {selectedWeight}kg × {quantity})
                  </span>
                  <span className="text-gray-900">
                    ${formatPrice(productTotalPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Shipping ({shippingMethod === "air" ? "Air" : "Ship"})
                  </span>
                  <span className="text-gray-900">
                    ${formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-blue-600">
                    ${formatPrice(finalPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Option */}
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-gray-700">
                Choose Shipping Method:
              </h5>
              <div
                className={`grid ${
                  isShipShippingAvailable ? "grid-cols-2" : "grid-cols-1"
                } gap-3`}
              >
                <label
                  className={`flex flex-col items-center space-y-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    shippingMethod === "air"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value="air"
                    checked={shippingMethod === "air"}
                    onChange={() => {
                      handleShippingChange("air");
                    }}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="font-medium text-sm">Air Shipping</div>
                    <div className="text-xs text-gray-500">
                      ${formatPrice(finalWeight * 11.7)}
                    </div>
                    <div className="text-xs text-gray-500">5-7 days</div>
                  </div>
                </label>

                {isShipShippingAvailable && (
                  <label
                    className={`flex flex-col items-center space-y-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      shippingMethod === "ship"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value="ship"
                      checked={shippingMethod === "ship"}
                      onChange={() => {
                        handleShippingChange("ship");
                      }}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="font-medium text-sm">Sea Shipping</div>
                      <div className="text-xs text-gray-500">
                        ${formatPrice(finalWeight * 8.19)}
                      </div>
                      <div className="text-xs text-gray-500">15-25 days</div>
                    </div>
                  </label>
                )}
              </div>

              {!isShipShippingAvailable && (
                <div className="text-xs text-gray-500 text-center bg-gray-100 p-3 rounded-lg">
                  Sea shipping is available for orders of 100kg or more. Current
                  weight: {finalWeight}kg
                </div>
              )}
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-green-600" />
              <span>256-bit SSL encrypted payment</span>
            </div>

            {/* PayPal Buttons */}
            <div className="space-y-3">
              <PaypalPayment
                productPrice={finalPrice}
                uid={"6838698f3eb780270052dc0a"}
                num={"9876543210"}
                sha={"123, Green Street, Springfield, USA"}
                dmode={shippingMethod}
                products={product}
                weight={finalWeight}
                userSelectedWeight={selectedWeight}
                quantity={quantity}
              />
            </div>
          </div>
        </div>

        {/* Desktop Modal */}
        <div className="hidden md:block bg-white rounded-3xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Secure Payment
                </h3>
                <p className="text-gray-500">Complete your purchase</p>
              </div>
            </div>
            <button
              onClick={closePaymentModal}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left - Order Summary */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-gray-900">
                  Order Summary
                </h4>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">
                        {product.title}
                      </h5>
                      <p className="text-sm text-gray-500">
                        Weight: {selectedWeight}kg × {quantity} = {finalWeight}
                        kg
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">
                        ${formatPrice(product.price)}/kg
                      </p>
                    </div>
                  </div>

                  {/* Quantity Selector for Desktop */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Quantity
                      </span>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleQuantityChange(quantity - 1)}
                          className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                          disabled={quantity <= 1}
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="text-lg font-semibold text-gray-900 min-w-[3rem] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(quantity + 1)}
                          className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Option */}
                  <div className="mt-6 space-y-4">
                    <h5 className="text-sm font-medium text-gray-700">
                      Choose Shipping Method:
                    </h5>
                    <div
                      className={`grid ${
                        isShipShippingAvailable ? "grid-cols-2" : "grid-cols-1"
                      } gap-4`}
                    >
                      <label
                        className={`flex flex-col space-y-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          shippingMethod === "air"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="shipping-desktop"
                            value="air"
                            checked={shippingMethod === "air"}
                            onChange={() => {
                              handleShippingChange("air");
                            }}
                            className="w-4 h-4 text-blue-600"
                          />
                          <div>
                            <div className="font-medium text-sm">
                              Air Shipping
                            </div>
                            <div className="text-xs text-gray-500">
                              5-7 business days
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-semibold text-gray-900">
                            ${formatPrice(finalWeight * 11.7)}
                          </span>
                        </div>
                      </label>

                      {isShipShippingAvailable && (
                        <label
                          className={`flex flex-col space-y-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            shippingMethod === "ship"
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="shipping-desktop"
                              value="ship"
                              checked={shippingMethod === "ship"}
                              onChange={() => {
                                handleShippingChange("ship");
                              }}
                              className="w-4 h-4 text-blue-600"
                            />
                            <div>
                              <div className="font-medium text-sm">
                                Sea Shipping
                              </div>
                              <div className="text-xs text-gray-500">
                                15-25 business days
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-semibold text-gray-900">
                              ${formatPrice(finalWeight * 8.19)}
                            </span>
                          </div>
                        </label>
                      )}
                    </div>

                    {!isShipShippingAvailable && (
                      <div className="text-xs text-gray-500 text-center bg-gray-100 p-3 rounded-lg">
                        Sea shipping is available for orders of 100kg or more.
                        Current weight: {finalWeight}kg
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Product Price (${formatPrice(product.price)}/kg ×{" "}
                        {selectedWeight}kg × {quantity})
                      </span>
                      <span className="text-gray-900">
                        ${formatPrice(productTotalPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Shipping ({shippingMethod === "air" ? "Air" : "Sea"})
                      </span>
                      <span className="text-gray-900">
                        ${formatPrice(shippingCost)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-900">$0.00</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold pt-3 border-t border-gray-200">
                      <span>Total</span>
                      <span className="text-blue-600">
                        ${formatPrice(finalPrice)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>

              {/* Right - Payment Methods */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-gray-900">
                  Payment Method
                </h4>

                <div className="space-y-4">
                  <PaypalPayment
                    productPrice={finalPrice}
                    uid={"6838698f3eb780270052dc0a"}
                    num={"9876543210"}
                    sha={"123, Green Street, Springfield, USA"}
                    dmode={shippingMethod}
                    products={[product]}
                    weight={finalWeight}
                    userSelectedWeight={selectedWeight}
                    quantity={quantity}
                  />
                  <div className="text-xs text-gray-500 text-center mt-4">
                    By completing your purchase, you agree to our Terms of
                    Service and Privacy Policy.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentModal;
