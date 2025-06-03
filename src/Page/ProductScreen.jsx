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
import PaymentModal from "../components/PaymentModal";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductScreen = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(5);
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Default weights - could also come from API
  const weights = [1, 5, 10, 20, 25, 50, 100];
  const { id } = useParams();

  // Mock API call - replace with your actual API endpoint
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/get-product/${id}`
        );
        setProduct(res.data.product);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      } finally {
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
  const HandlePaymentModal = () => {
    if (!showPaymentModal) return null;

    return (
      <>
        <PaymentModal
          showPaymentModal={showPaymentModal}
          closePaymentModal={closePaymentModal}
          product={product}
          selectedWeight={selectedWeight}
        />
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

  const addToCart = async (req, res) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/add-to-cart`,
        {
          userId: localStorage.getItem("uid"),
          productId: id,
          quantity: 1,
        }
      );
      res.status === 200 ? toast("Added to cart") : null;
    } catch (error) {
      console.log("Add to cart error", error);
    }
  };

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
              ${product.price} <span className="text-xs">/kg</span>
            </span>
            <span className="ml-3 text-green-600 text-sm font-medium">
              {product.quantity > 0 ? "In Stock" : "Out of stock"}
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
                  {`${w}kg`}
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
            <button
              onClick={() => addToCart()}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-semibold py-3 px-4 rounded-full flex items-center justify-center space-x-2 transition shadow hover:shadow-lg transform hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-sm">Add To Bag</span>
            </button>
            {product.quantity <= 0 ? (
              <>
                <button
                  disabled
                  onClick={() => toast("Out of stock")}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-full transition shadow hover:shadow-lg transform hover:scale-105"
                >
                  <span className="text-sm">Out of stock</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-full transition shadow hover:shadow-lg transform hover:scale-105"
                >
                  <span className="text-sm">Buy Now</span>
                </button>
              </>
            )}
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
                  ${product.price} <span className="text-xs">/kg</span>
                </span>
                <span className="ml-4 text-green-600 font-medium text-lg">
                  {product.quantity > 0 ? "In Stock" : "Out of stock"}
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
                    {`${w} kg`}
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
              <button
                onClick={() => addToCart()}
                className="w-full bg-green-950 text-white font-semibold py-4 px-6 rounded-full flex items-center justify-center space-x-3 transition shadow hover:shadow-xl transform hover:scale-105"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add To Bag</span>
              </button>
              {product.quantity <= 0 ? (
                <>
                  <button
                    disabled
                    onClick={() => toast("Out of stock")}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-full transition shadow hover:shadow-lg transform hover:scale-105"
                  >
                    <span className="text-sm">Out of stock</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-full transition shadow hover:shadow-lg transform hover:scale-105"
                  >
                    <span className="text-sm">Buy Now</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <HandlePaymentModal />
    </div>
  );
};

export default ProductScreen;
