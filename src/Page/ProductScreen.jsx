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
} from "lucide-react";
import { useEffect, useState } from "react";

const ProductScreen = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState("250g");
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Default weights - could also come from API
  const weights = ["100g", "250g", "500g", "1kg"];

  // Mock API call - replace with your actual API endpoint
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Replace this with your actual API call
        // const response = await fetch('/api/products/[id]');
        // const data = await response.json();

        // Mock API response for demonstration
        setTimeout(() => {
          const mockProduct = {
            title: "Mechanical Gaming Keyboard",
            description:
              "RGB backlit mechanical keyboard with tactile switches and programmable keys.",
            price: 149,
            images: [
              "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
            ],
            category: "WOOD AND BAMBOO PRODUCTS",
            subcategory: "BAMBOO PRODUCTS",
            categoryId: 5,
            subcategoryId: 502,
            quantity: 62,
            keyIngredients: ["Mechanical Switches", "RGB Lighting"],
            ratings: [
              { user: "60f7b3a16c9d3c39d8e9b007", rating: 4 },
              { user: "60f7b3a16c9d3c39d8e9b008", rating: 5 },
            ],
            rating: 3.5,
            ratingCount: 2,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          setProduct(mockProduct);
          setLoading(false);
        }, 1000); // Simulate API delay
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  const prevImage = () =>
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  const goToImage = (index) => setCurrentImageIndex(index);

  const goBack = () => {
    console.log("Go back");
  };

  const handleBuyNow = () => {
    setShowPaymentModal(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    // Restore body scroll
    document.body.style.overflow = "unset";
  };

  // Function to render star rating
  const renderStarRating = (rating, size = "w-4 h-4") => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className={`${size} fill-yellow-400 text-yellow-400`} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className={`${size} text-gray-300`} />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className={`${size} fill-yellow-400 text-yellow-400`} />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className={`${size} text-gray-300`} />
      );
    }

    return stars;
  };

  // Payment Modal Component
  const PaymentModal = () => {
    if (!showPaymentModal) return null;

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
                  <h3 className="text-lg font-semibold text-gray-900">
                    Payment
                  </h3>
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
                      Weight: {selectedWeight}
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-green-600" />
                <span>256-bit SSL encrypted payment</span>
              </div>

              {/* PayPal Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white font-semibold py-4 px-6 rounded-2xl transition duration-200 flex items-center justify-center space-x-2">
                  <span className="text-lg font-bold">Pay</span>
                  <span className="text-lg font-bold">Pal</span>
                </button>

                <button className="w-full bg-[#ffc439] hover:bg-[#ffb800] text-black font-semibold py-4 px-6 rounded-2xl transition duration-200">
                  <span>Pay in 4 with PayPal</span>
                </button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">or</span>
                  </div>
                </div>

                <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 px-6 rounded-2xl transition duration-200">
                  Debit or Credit Card
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Modal */}
          <div className="hidden md:block bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
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
                          Weight: {selectedWeight}
                        </p>
                        <p className="text-sm text-gray-500">Quantity: 1</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">
                          ${product.price}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="text-gray-900">${product.price}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold mt-4 pt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span>${product.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span>
                      Your payment information is secure and encrypted
                    </span>
                  </div>
                </div>

                {/* Right - Payment Methods */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Payment Method
                  </h4>

                  <div className="space-y-4">
                    <button className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white font-semibold py-4 px-6 rounded-2xl transition duration-200 flex items-center justify-center space-x-3">
                      <span className="text-xl font-bold">Pay</span>
                      <span className="text-xl font-bold">Pal</span>
                    </button>

                    <button className="w-full bg-[#ffc439] hover:bg-[#ffb800] text-black font-semibold py-4 px-6 rounded-2xl transition duration-200">
                      <span>Pay in 4 interest-free payments</span>
                    </button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">
                          or pay with card
                        </span>
                      </div>
                    </div>

                    <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 px-6 rounded-2xl transition duration-200">
                      Debit or Credit Card
                    </button>

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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-950 mx-auto mb-4" />
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading product: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-green-950 text-white rounded-full hover:bg-green-800 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No product found
  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Header */}
        <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-200">
          <ChevronLeft
            onClick={goBack}
            size={16}
            className="w-6 h-6 text-gray-700"
          />
          <h1 className="text-lg font-medium text-gray-900">
            {product.category}
          </h1>
          <div className="w-6" />
        </div>

        {/* Product Images */}
        <div className="px-8 py-12 relative">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition z-20"
          >
            <Heart
              className={`w-5 h-5 ${
                isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition z-20"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition z-20"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {product.images.map((img, i) => (
                <div key={i} className="w-full flex-shrink-0">
                  <img
                    src={img}
                    alt={`${product.title} ${i}`}
                    className="w-full h-64 object-contain drop-shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={() => goToImage(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentImageIndex === i
                    ? "bg-green-950"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="bg-white px-4 py-6">
          <div className="text-sm text-emerald-600 font-medium mb-2">
            {product.category} • {product.subcategory}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {product.title}
          </h2>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {renderStarRating(product.rating)}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {product.rating} ({product.ratingCount} reviews)
            </span>
          </div>

          <div className="flex items-center mb-6">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price}
            </span>
            <span className="ml-3 text-green-600 font-medium">
              {product.quantity} in stock
            </span>
          </div>

          {/* Key Ingredients */}
          {product.keyIngredients && product.keyIngredients.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Key Features
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.keyIngredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full font-medium"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Select Weight
            </h4>
            <div className="flex flex-wrap gap-2">
              {weights.map((w) => (
                <button
                  key={w}
                  onClick={() => setSelectedWeight(w)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                    selectedWeight === w
                      ? "bg-green-950 text-white shadow scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-semibold py-3 px-4 rounded-full flex items-center justify-center space-x-2 transition shadow hover:shadow-lg transform hover:scale-105">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-sm">Add To Bag</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-full transition shadow hover:shadow-lg transform hover:scale-105"
            >
              <span className="text-sm">Buy Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Images */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <ChevronLeft
                className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-900"
                onClick={goBack}
              />
              <h1 className="text-xl font-medium text-gray-900">
                {product.category}
              </h1>
            </div>

            <div className="rounded-3xl p-12 relative overflow-hidden">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition shadow-lg hover:shadow-xl transform hover:scale-110 z-20"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isLiked
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                />
              </button>

              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition shadow-lg z-20"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition shadow-lg z-20"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>

              <div className="relative z-10 overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateX(-${currentImageIndex * 100}%)`,
                  }}
                >
                  {product.images.map((img, i) => (
                    <div key={i} className="w-full flex-shrink-0">
                      <img
                        src={img}
                        alt={`${product.title} ${i + 1}`}
                        className="w-full h-96 object-contain drop-shadow-2xl"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-8 space-x-3">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToImage(i)}
                    className={`w-3 h-3 rounded-full ${
                      i === currentImageIndex
                        ? "bg-green-950"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right - Details */}
          <div className="space-y-8">
            <div>
              <div className="text-sm text-emerald-600 font-medium mb-3">
                {product.category} • {product.subcategory}
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {product.title}
              </h2>

              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {renderStarRating(product.rating, "w-5 h-5")}
                </div>
                <span className="ml-3 text-gray-600">
                  {product.rating} ({product.ratingCount} reviews)
                </span>
              </div>

              <div className="flex items-center mb-8">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="ml-4 text-green-600 font-medium text-lg">
                  {product.quantity} in stock
                </span>
              </div>
            </div>

            {/* Key Ingredients */}
            {product.keyIngredients && product.keyIngredients.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Key Features
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.keyIngredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-emerald-50 text-emerald-700 text-sm rounded-full font-medium"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Weight Options
              </h3>
              <div className="flex flex-wrap gap-3">
                {weights.map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      selectedWeight === w
                        ? "bg-green-950 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-green-950 text-white font-semibold py-4 px-6 rounded-full flex items-center justify-center space-x-3 transition shadow hover:shadow-xl transform hover:scale-105">
                <ShoppingBag className="w-5 h-5" />
                <span>Add To Bag</span>
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-full transition shadow hover:shadow-xl transform hover:scale-105"
              >
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal />
    </div>
  );
};

export default ProductScreen;
