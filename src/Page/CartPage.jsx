import { useEffect, useState } from "react";
import { CartProduct, LocationUI, UseTitle } from "../components/compIndex";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  UseTitle("Your Cart");

  const [userCartItems, setUserCartItems] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const userId = localStorage.getItem("uid");
  // fetch user cart from API endpoint
  const getCart = async () => {
    console.log(userId);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/getcart/${userId}`
      );
      setUserCartItems(res.data.items);
    } catch (error) {
      console.error(`Error fetching user's cart`, error);
    }
  };

  const refreshComponent = () => {
    setRefresh((prev) => prev + 1);
  };

  useEffect(() => {
    getCart();
  }, [refresh]);

  const deleteCartItem = async (id, qty, action, cartItemId) => {
    try {
      if (action === "delete") {
        const res = await axios.delete(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/cart/delete-cart-item?userId=${userId}&productId=${id}`
        );
        toast("Deleted");
        refreshComponent();
      } else {
        const res = await axios.put(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/cart/update-cart/${userId}/${cartItemId}`,
          {
            newQuantity: qty,
            action: action,
          }
        );
        console.log(res);
      }
    } catch (error) {
      console.log("Cart Item Deletion error", error);
    }
  };

  const addToWishList = async (productId) => {
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/wishlist/add-to-wishlist/${userId}/${productId}`
      );
      if (res.status === 200) toast("Added to wishlist!");
    } catch (error) {
      console.log("Error adding item to wishlist", error);
      toast("Internal Error");
    }
  };

  return (
    <>
      <LocationUI />
      {/* Cart Links */}
      <div className="bg-gray-100 lg:bg-white h-9 font-medium text-black lg:max-w-7xl lg:mx-auto lg:px-4 sm:px-6">
        <ul className="flex content-center">
          <li className="mx-2 lg:underline lg:text-blue-500 mt-1">Cart</li>
          <li className="mx-2 lg:underline lg:text-blue-500 mt-1">Lists</li>
          <li className="mx-2 lg:underline lg:text-blue-500 mt-1">Buy Again</li>
        </ul>
      </div>

      {/* Desktop Layout Container */}
      <div className="lg:max-w-7xl lg:mx-auto lg:px-4 sm:px-6">
        <div className="lg:flex lg:gap-6 lg:mt-4">
          {/* Main Content - Cart Items (Left Column on Desktop) */}
          <div className="lg:flex-1">
            {/* Mobile Subtotal - Hidden on Desktop */}
            <div className="flex lg:hidden">
              <div className="">
                <h5 className="ml-4 font-medium mt-3 text-xl">
                  Subtotal
                  <span className="font-bold mx-3">
                    <sup>$</sup>1999<sup>00</sup>
                  </span>
                </h5>
              </div>
            </div>

            {/* Mobile Proceed To Buy Button - Hidden on Desktop */}
            <div className="buy-btn text-center content-center mt-5 lg:hidden">
              <button
                onClick={() => {}}
                className="rounded-lg bg-green-800 text-white w-96 py-2"
              >
                Proceed To Buy
              </button>
            </div>

            {/* Thematic Break */}
            <div className="mt-5">
              <hr />
            </div>

            {/* Shopping Cart Header - Desktop Only */}
            <div className="hidden lg:block">
              <h1 className="text-3xl font-normal mb-4">Shopping Cart</h1>
            </div>

            {/* Deselect All Items */}
            <div className="deselect-div mt-2 mb-4">
              <span className="ml-4 lg:ml-0 text-blue-600 text-sm cursor-pointer hover:underline">
                Deselect all items
              </span>
            </div>

            {/* Cart Product Items */}
            {userCartItems?.map((item, index) => {
              console.log("Parent Comp ID", item);
              return (
                <>
                  <CartProduct
                    product={item}
                    onDelete={deleteCartItem}
                    onAddToWishlist={addToWishList}
                  />
                </>
              );
            })}
          </div>

          {/* Sidebar - Checkout Section (Right Column on Desktop) */}
          <div className="hidden lg:block lg:w-80">
            <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-4">
              {/* Subtotal Section */}
              <div className="mb-4">
                <h3 className="text-lg font-normal mb-2">
                  Subtotal (1 items):{" "}
                  <span className="font-bold">$1,297.00</span>
                </h3>
              </div>

              {/* Proceed to Buy Button */}
              <button
                onClick={() => {}}
                className="w-full bg-green-800 text-lg lg:text-white text-black font-medium py-2 px-4 rounded-lg mb-4 transition-colors"
              >
                Proceed to Buy
              </button>

              {/* EMI Available */}
              <div className="border-t hidden pt-4">
                <div className="flex justify-between items-center cursor-pointer">
                  <span className="text-sm font-medium">EMI Available</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Beauty Bestsellers Section */}
            <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium mb-4">
                Natural Wellness Favorites You’ll Love
              </h3>
              <div className="space-y-4">
                {/* Sample product recommendations would go here */}
                <div className="text-sm text-gray-600">
                  Product recommendations handpicked for your health and
                  lifestyle.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
