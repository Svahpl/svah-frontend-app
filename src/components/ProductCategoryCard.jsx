import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProductCategoryCard = ({ product }) => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const {
    title,
    description,
    price,
    images,
    category,
    quantity,
    rating,
    ratingCount,
  } = product;

  const roundedRating = Math.round(rating);
  const navigate = useNavigate();

  useEffect(()=>{},)

  return (
    <div
      onClick={() => navigate("/view-product/123")}
      data-aos="fade-up"
      data-aos-duration="600"
      data-aos-anchor-placement="top-bottom"
      className="max-w-sm w-full bg-white rounded-2xl shadow-lg overflow-hidden mx-auto flex flex-col"
    >
      <img src={images[0]} alt={title} className="w-full h-64 object-cover" />

      <div className="p-5 flex flex-col flex-grow">
        <div className="space-y-2 flex-grow">
          <h2 className="text-xl cursor-pointer font-semibold text-gray-800">
            {title}
          </h2>
          <p className="text-sm text-gray-500 line-clamp-3">{description}</p>

          <div className="flex justify-between text-sm text-gray-600">
            <span className="capitalize">Category: {category}</span>
          </div>
          <div className="flex items-center space-x-1 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < roundedRating ? "fill-current" : "text-gray-300"
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09L5.822 12 1 7.91l6.06-.88L10 2l2.94 5.03L19 7.91 14.178 12l1.7 6.09z" />
              </svg>
            ))}
            <span className="ml-1 text-sm text-gray-500">({ratingCount})</span>
          </div>

          <div className="text-lg font-bold text-black">
            ${price.toFixed(2)}
          </div>
        </div>

        {quantity > 0 ? (
          <>
            <button
              onClick={() => toast("Item Added")}
              className="w-full mt-4 bg-green-950 text-white py-2 px-4 rounded-full transition-colors duration-200"
            >
              Add to cart
            </button>
          </>
        ) : (
          <>
            <button
              disabled
              className="w-full mt-4 bg-gray-100 text-black py-2 px-4 rounded-full transition-colors duration-200"
            >
              Out of Stock
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCategoryCard;
