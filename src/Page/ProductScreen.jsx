import { ChevronLeft, Heart, ShoppingBag, ChevronRight } from "lucide-react";
import { useState } from "react";

const ProductScreen = ({
  productName = "Organic Rose Clay Face Mask",
  category = "SKINCARE • NATURAL",
  price = 45,
  discount = 15,
  images = [
    "https://images.unsplash.com/photo-1614961234274-f204d01c115e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNlcmVhbHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1614961234274-f204d01c115e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNlcmVhbHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1614961234274-f204d01c115e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNlcmVhbHxlbnwwfHwwfHx8MA%3D%3D",
  ],
  description = "Nourish your skin with our premium organic rose clay mask. Infused with natural botanicals for deep cleansing and radiant glow.",
  weights = ["100g", "250g", "500g", "1kg"],
  defaultWeight = "250g",
}) => {
  const [selectedWeight, setSelectedWeight] = useState(defaultWeight);
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-white md:bg-white">
      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Header */}
        <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-200">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
          <h1 className="text-lg font-medium text-gray-900">
            Natural Cereals
          </h1>
          <div className="w-6"></div>
        </div>

        {/* Product Image Carousel */}
        <div className="px-8 py-12 relative">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-20"
          >
            <Heart
              className={`w-5 h-5 ${
                isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </button>

          {/* Carousel Navigation */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-20"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-20"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img
                    src={image}
                    alt={`${productName} ${index + 1}`}
                    className="w-full h-64 object-contain drop-shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex
                    ? "bg-emerald-400 shadow-sm"
                    : "bg-gray-400 hover:bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white px-4 py-6">
          <div className="text-sm text-emerald-600 font-medium mb-2">
            {category}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {productName}
          </h2>

          <div className="flex items-center mb-6">
            <span className="text-3xl font-bold text-gray-900">${price}</span>
            <span className="ml-3 text-red-500 font-medium">-{discount}%</span>
          </div>

          {/* Weight Selection */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Select Weight
            </h4>
            <div className="flex flex-wrap gap-2">
              {weights.map((weight) => (
                <button
                  key={weight}
                  onClick={() => setSelectedWeight(weight)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    selectedWeight === weight
                      ? "bg-emerald-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102"
                  }`}
                >
                  {weight}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-semibold py-3 px-4 rounded-full flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-102">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-sm">Add To Bag</span>
            </button>
            <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-102">
              <span className="text-sm">Buy Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image */}
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4">
              <ChevronLeft className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-900" />
              <h1 className="text-xl font-medium text-gray-900">
                Natural Cereals
              </h1>
            </div>

            {/* Product Image Carousel */}
            <div className="rounded-3xl p-12 relative overflow-hidden">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110 z-20"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isLiked
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                />
              </button>

              {/* Carousel Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl z-20"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl z-20"
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
                  {images.map((image, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <img
                        src={image}
                        alt={`${productName} ${index + 1}`}
                        className="w-full h-96 object-contain drop-shadow-2xl"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots indicator */}
              <div className="flex justify-center mt-8 space-x-3">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentImageIndex
                        ? "bg-emerald-400 shadow-sm"
                        : "bg-gray-400 hover:bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            <div>
              <div className="text-sm text-emerald-600 font-medium mb-3">
                {category}
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {productName}
              </h2>

              <div className="flex items-center mb-8">
                <span className="text-4xl font-bold text-gray-900">
                  ${price}
                </span>
                <span className="ml-4 text-red-500 font-medium text-lg">
                  -{discount}%
                </span>
              </div>
            </div>

            {/* Weight Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Weight Options
              </h3>
              <div className="flex flex-wrap gap-3">
                {weights.map((weight) => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedWeight === weight
                        ? "bg-emerald-600 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102"
                    }`}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-semibold py-4 px-6 rounded-full flex items-center justify-center space-x-3 transition-all duration-200 text-base shadow-lg hover:shadow-xl transform hover:scale-102">
                <ShoppingBag className="w-5 h-5" />
                <span>Add To Bag</span>
              </button>
              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-full transition-all duration-200 text-base shadow-lg hover:shadow-xl transform hover:scale-102">
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
