import React, { useEffect, useState } from "react";
import { productCategories } from "../data/categories";
import { ProductCategoryCard, ScreenLoaders } from "../components/compIndex";
import { dummyProducts as products } from "../data/dummyProduct.js";
import { X } from "lucide-react";
import axios from "axios";

const CategoryProducts = () => {
  const [price, setPrice] = useState(1000);
  const [dummyProducts, setDummyProducts] = useState([]);
  const [ratingFilter, setRatingFilter] = useState([4, 3, 2, 1]);
  const [selectedRating, setSelectedRating] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isApiLoading, setIsApiLoading] = useState(true); // New state for API loading

  const getAllProducts = async () => {
    try {
      setIsApiLoading(true); // Start loading
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/get-all`
      );
      console.log("DEBUG PRODUCT API RESPONSE", res.data);
      setDummyProducts(res.data.products);
    } catch (error) {
      console.log(`Error fetching all products: ${error}`);
      // Fallback to dummy products if API fails
      setDummyProducts(products);
    } finally {
      setIsApiLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    getAllProducts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const executeWithLoading = (filterFunction) => {
    setIsLoading(true);
    setTimeout(() => {
      filterFunction();
      setIsLoading(false);
    }, 800);
  };

  const handleCategoryChange = (category) => {
    executeWithLoading(() => {
      const filteredProducts = products.filter(
        (pd) => pd.category === category
      );
      setDummyProducts(filteredProducts);
    });
  };

  const handleSubCategoryChange = (subcategory) => {
    executeWithLoading(() => {
      const filteredProducts = products.filter(
        (pd) => pd.subcategory === subcategory
      );
      setDummyProducts(filteredProducts);
    });
  };

  const handleRatingChange = (n) => {
    setSelectedRating(n);
    executeWithLoading(() => {
      if (n === "") {
        setDummyProducts(products);
        return;
      }
      const stringNum = parseFloat(n);
      const filteredProducts = products.filter((pd) => pd.rating >= stringNum);
      setDummyProducts(filteredProducts);
    });
  };

  const handlePriceFilter = (price) => {
    const priceFiltered = products.filter((product) => product.price <= price);
    setDummyProducts(priceFiltered);
    setPrice(price);
    setSelectedRating("");
    setRatingFilter([4, 3, 2, 1]);
  };

  const clearFilter = () => {
    executeWithLoading(() => {
      setDummyProducts(products);
      setSelectedRating("");
      setPrice(1000);
    });
  };

  const LoadingOverlay = () => (
    <ScreenLoaders text={" Filtering products... "} />
  );

  const ApiLoadingOverlay = () => (
    <ScreenLoaders text={" Loading products... "} />
  );

  // Show API loading screen while fetching initial data
  if (isApiLoading) {
    return <ApiLoadingOverlay />;
  }

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <div className="categorySearchContainer mb-16 px-4 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="w-full lg:w-1/3 xl:w-1/4">
            <h1 className="text-2xl font-semibold mb-4">Filters</h1>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-1">
                Select Category
              </label>
              <select
                onChange={(e) => handleCategoryChange(e.target.value)}
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
              >
                {[...new Set(products.map((product) => product.category))].map(
                  (category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Key Ingredients Filter */}
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-1">
                Key Ingredients
              </label>
              <select
                onChange={(e) => handleSubCategoryChange(e.target.value)}
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
              >
                {[
                  ...new Set(products.map((product) => product.subcategory)),
                ].map((subcategory, index) => (
                  <option key={index}>{subcategory}</option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                value={price}
                disabled={isLoading}
                onChange={(e) => {
                  setPrice(e.target.value);
                  handlePriceFilter(e.target.value);
                }}
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-black disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
              />
              <p className="text-sm mt-1 text-gray-400">Up to ${price}</p>
            </div>

            {/* Customer Rating Filter */}
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-1">
                Customer Rating
              </label>
              <select
                id="ratingValue"
                value={selectedRating}
                onChange={(e) => handleRatingChange(e.target.value)}
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
              >
                <option value="">All Ratings</option>
                {ratingFilter.map((n) => (
                  <option key={n} value={n}>
                    {`${n} ★`} & up
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Rating Options */}
            <div className="mb-4">
              <button
                onClick={clearFilter}
                disabled={isLoading}
                className="flex items-center gap-2 bg-green-950 text-white font-medium py-2 px-4 rounded-full shadow-sm transition duration-300 ease-in-out hover:bg-green-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-950"
              >
                <X size={18} />
                Clear Filters
              </button>
            </div>
          </div>

          {/* Product Listing */}
          <div
            className={`w-full mt-5 lg:w-2/3 xl:w-3/4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 transition-opacity duration-300 ${
              isLoading ? "opacity-50" : "opacity-100"
            }`}
          >
            {dummyProducts?.map((product, index) => (
              <ProductCategoryCard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryProducts;
