import { Package, Trash2 } from "lucide-react";

const CartProduct = ({
  product = {
    id: 1,
    image: "https://m.media-amazon.com/images/I/61328ii81+L._AC_AA270_.jpg",
    title:
      "Biotique Micro Clove Action Toothpaste - For Teeth Whitening - 140gm (Pack of 2) Toothpaste (280 g, Pack of 2)",
    price: 1999,
    currency: "$",
    deliveryDate: "Sat 31, May",
    inStock: true,
    soldBy: "SVAH | Agros & Herbs",
    quantity: 1,
  },
  onQuantityChange,
  onDelete,
  onAddToWishlist,
}) => {
  const handleQuantityDecrease = () => {
    if (product.quantity > 1) {
      onQuantityChange?.(product.id, product.quantity - 1);
    }
  };

  const handleQuantityIncrease = () => {
    onQuantityChange?.(product.id, product.quantity + 1);
  };

  const handleDelete = () => {
    onDelete?.(product.id);
  };

  const handleAddToWishlist = () => {
    onAddToWishlist?.(product.id);
  };

  return (
    <div className="mt-2 bg-gray-50 py-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="product-image block">
        <div className="p-img flex ml-4">
          <img
            className="h-32 w-32 object-cover rounded-md shadow-sm"
            src={product.image}
            alt={product.title}
          />
          <div className="productTitle flex-1">
            {/* Product Title */}
            <p className="text-sm ml-4 leading-relaxed text-gray-800 font-medium">
              {product.title}
            </p>

            {/* Pricing */}
            <div className="ml-4 text-xl mt-3">
              <h5 className="text-gray-900">
                <sup className="text-sm">{product.currency}</sup>
                <span className="font-bold">
                  {product.price.toLocaleString()}
                </span>
                <sup className="text-sm">00</sup>
              </h5>
            </div>

            {/* Delivery Details */}
            <div className="mt-3 ml-4">
              <span className="uppercase text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                free delivery
              </span>
              <span className="ml-3 text-sm font-semibold text-gray-700">
                {product.deliveryDate}
              </span>
              <span className="text-xs text-gray-500 ml-1">
                for SVAH Members
              </span>
            </div>

            {/* Stock Check */}
            <div
              className={`text-sm ml-4 mt-2 font-semibold ${
                product.inStock ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>

            {/* Sold By */}
            <div className="flex text-sm ml-4 mt-2 text-gray-600">
              Sold By
              <span className="mx-1 text-blue-500 underline hover:text-blue-600 cursor-pointer transition-colors">
                {product.soldBy}
              </span>
            </div>

            {/* Delivered By */}
            <div className="flex items-center ml-4 mt-2">
              <Package className="text-gray-600" size={18} />
              <span className="text-sm ml-2 text-gray-600">SVAH Delivered</span>
            </div>
          </div>
        </div>

        {/* Cart Action Buttons */}
        <div className="flex mt-4 ml-4 gap-3 items-center">
          {/* Quantity Controller */}
          <div className="relative w-32 border-2 border-green-200 bg-white rounded-full py-2 text-center shadow-sm hover:shadow-md transition-all duration-200">
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-red-500 cursor-pointer transition-colors duration-200 hover:scale-110"
              onClick={handleQuantityDecrease}
              disabled={product.quantity <= 1}
            >
              <Trash2 size={16} />
            </button>
            <span className="block text-sm font-semibold text-gray-800">
              {product.quantity}
            </span>
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-lg text-gray-600 hover:text-green-500 cursor-pointer transition-colors duration-200 hover:scale-110"
              onClick={handleQuantityIncrease}
            >
              +
            </button>
          </div>

          {/* Delete Button */}
          <button
            className="w-20 border-2 border-red-200 bg-white rounded-full py-2 text-center hover:bg-red-50 hover:border-red-300 cursor-pointer transition-all duration-200 hover:shadow-md"
            onClick={handleDelete}
          >
            <span className="block text-sm font-medium text-red-600 hover:text-red-700">
              Delete
            </span>
          </button>

          {/* Add to Wishlist Button */}
          <button
            className="w-36 border-2 border-blue-200 bg-white rounded-full py-2 text-center hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all duration-200 hover:shadow-md"
            onClick={handleAddToWishlist}
          >
            <span className="capitalize text-sm font-medium text-blue-600 hover:text-blue-700">
              add to wishlist
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
