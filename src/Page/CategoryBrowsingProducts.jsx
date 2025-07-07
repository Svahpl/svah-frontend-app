import React, { useEffect, useState } from "react";
import { ProductCategoryCard, ScreenLoaders } from "../components/compIndex";
import { dummyProducts as products } from "../data/dummyProduct.js";
import { X } from "lucide-react";
import axios from "axios";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useSearchParams } from "react-router-dom";

const CategoryProducts = () => {
  const [searchParams] = useSearchParams();
  const browseCategory = searchParams.get("category");
  const browseSubcategory = searchParams.get("subcategory");

  const [price, setPrice] = useState(1000);
  const [dummyProducts, setDummyProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [ratingFilter, setRatingFilter] = useState([4, 3, 2, 1]);
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isApiLoading, setIsApiLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      setIsApiLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/get-all`);
      setAllProducts(res.data.products);
      setDummyProducts(res.data.products);
    } catch (error) {
      console.log(`Error fetching all products: ${error}`);
      setAllProducts(products);
      setDummyProducts(products);
    } finally {
      setIsApiLoading(false);
    }
  };

  // Fetch all products on mount
  useEffect(() => {
    getAllProducts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Apply category filter from URL
  useEffect(() => {
    if (!allProducts.length || !browseCategory) return;

    const filtered = allProducts.filter((pd) => {
      const pdCategory =
        typeof pd.category === "string"
          ? pd.category
          : pd.category?.name || "";

      const normalizedPdCat = pdCategory.toLowerCase().trim();
      const normalizedQuery = browseCategory.toLowerCase().trim();

      console.log("Comparing:", normalizedQuery, "vs", normalizedPdCat);
      return normalizedPdCat.includes(normalizedQuery);
    });

    console.log("Filtered Products:", filtered.length);
    setSelectedCategory(browseCategory.toLowerCase().trim());
    setDummyProducts(filtered);
  }, [browseCategory, allProducts]);

  const executeWithLoading = (filterFunction) => {
    setIsLoading(true);
    setTimeout(() => {
      filterFunction();
      setIsLoading(false);
    }, 800);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    executeWithLoading(() => {
      const filteredProducts = allProducts.filter((pd) => {
        const pdCategory =
          typeof pd.category === "string"
            ? pd.category
            : pd.category?.name || "";
        return pdCategory.toLowerCase().trim() === category.toLowerCase().trim();
      });
      setDummyProducts(filteredProducts);
    });
  };

  const handleSubCategoryChange = (subcategory) => {
    executeWithLoading(() => {
      const filteredProducts = allProducts.filter((pd) => {
        const pdSubcategory =
          typeof pd.subcategory === "string"
            ? pd.subcategory
            : pd.subcategory?.name || "";
        return pdSubcategory === subcategory;
      });
      setDummyProducts(filteredProducts);
    });
  };

  const handleRatingChange = (n) => {
    setSelectedRating(n);
    executeWithLoading(() => {
      if (n === "") {
        setDummyProducts(allProducts);
        return;
      }
      const stringNum = parseFloat(n);
      const filteredProducts = allProducts.filter(
        (pd) => pd.rating >= stringNum
      );
      setDummyProducts(filteredProducts);
    });
  };

  const handlePriceFilter = (price) => {
    const priceFiltered = allProducts.filter(
      (product) => product.price <= price
    );
    setDummyProducts(priceFiltered);
    setPrice(price);
    setSelectedRating("");
    setRatingFilter([4, 3, 2, 1]);
  };

  const clearFilter = () => {
    executeWithLoading(() => {
      setDummyProducts(allProducts);
      setSelectedRating("");
      setPrice(1000);
      setSelectedCategory("");
    });
  };

  const LoadingOverlay = () => (
    <ScreenLoaders text={"Filtering products..."} />
  );

  const ApiLoadingOverlay = () => (
    <ScreenLoaders text={"Loading products..."} />
  );

  if (isApiLoading) return <ApiLoadingOverlay />;

  return (
    <>
      <Header />
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
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {[...new Set(
                  allProducts.map((product) =>
                    typeof product.category === "string"
                      ? product.category?.toLowerCase().trim()
                      : product.category?.name?.toLowerCase().trim()
                  ).filter(Boolean)
                )]
                  .sort()
                  .map((category, index) => (
                    <option key={index} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
              </select>
            </div>

            {/* Subcategory Filter */}
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-1">
                Key Ingredients
              </label>
              <select
                onChange={(e) => handleSubCategoryChange(e.target.value)}
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {[...new Set(
                  allProducts.map((product) =>
                    typeof product.subcategory === "string"
                      ? product.subcategory
                      : product.subcategory?.name
                  )
                )]
                  .filter(Boolean)
                  .map((subcategory, index) => (
                    <option key={index}>{subcategory}</option>
                  ))}
              </select>
            </div>

            {/* Price Filter */}
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
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-black disabled:opacity-50"
              />
              <p className="text-sm mt-1 text-gray-400">Up to ${price}</p>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-1">
                Customer Rating
              </label>
              <select
                value={selectedRating}
                onChange={(e) => handleRatingChange(e.target.value)}
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
              >
                <option value="">All Ratings</option>
                {ratingFilter.map((n) => (
                  <option key={n} value={n}>
                    {`${n} ★`} & up
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Button */}
            <div className="mb-4">
              <button
                onClick={clearFilter}
                disabled={isLoading}
                className="flex items-center gap-2 bg-green-800 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-900 disabled:opacity-50"
              >
                <X size={18} />
                Clear Filters
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div
            className={`w-full mt-5 lg:w-2/3 xl:w-3/4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 transition-opacity duration-300 ${isLoading ? "opacity-50" : "opacity-100"
              }`}
          >
            {dummyProducts.length ? (
              dummyProducts.map((product, index) => (
                <ProductCategoryCard key={index} product={product} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No products found.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryProducts;
