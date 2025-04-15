"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Filter,
  ArrowUpDown,
  Eye,
  Search,
} from "lucide-react";
import { fetchProducts } from "@/app/lib/api";
import Navbar from "../Components/common/Navbar";

const ProductCard = ({ product, addToCart, onQuickLook }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-w-1 aspect-h-1 bg-gray-50 overflow-hidden rounded-t-xl">
        <div className="h-64 w-full flex items-center justify-center p-4">
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickLook();
            }}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <Eye size={18} className="text-gray-700" />
          </button>

          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <Heart size={18} className="text-gray-700" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-95 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-black text-white py-2 px-4 hover:bg-gray-800 transition-colors text-sm flex items-center justify-center rounded-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-sm text-gray-500 capitalize">{product.category}</h3>
        <h3 className="font-medium text-gray-900 mt-1 truncate">
          {product.title}
        </h3>

        <div className="mt-2 flex justify-between items-center">
          <span className="text-lg font-medium text-gray-900">
            ${product.price}
          </span>
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-xs text-gray-500">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quickLookIndex, setQuickLookIndex] = useState(0);
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: [0, 1000],
    rating: 0,
  });
  const [sortOption, setSortOption] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters, sorting, and search
  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.category !== "all") {
      result = result.filter(
        (product) => product.category === filters.category
      );
    }

    // Apply price range filter
    result = result.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Apply rating filter
    if (filters.rating > 0) {
      result = result.filter(
        (product) => product.rating.rate >= filters.rating
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        // "featured" - keep original order
        break;
    }

    setFilteredProducts(result);
  }, [products, filters, sortOption, searchQuery]);

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  const openQuickLook = (product) => {
    setSelectedProduct(product);
    setQuickLookIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeQuickLook = () => {
    setSelectedProduct(null);
    document.body.style.overflow = "auto";
  };

  const handleQuickLookSwipe = (direction) => {
    if (!selectedProduct) return;

    if (direction === "left") {
      setQuickLookIndex((prev) =>
        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
      );
    } else {
      setQuickLookIndex((prev) =>
        prev === selectedProduct.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const addToCart = (product) => {
    console.log("Added to cart:", product);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <div className="h-64 bg-gray-200 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-200 text-black rounded-md"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border text-black border-gray-200 rounded-mdm hover:bg-gray-50 transition-colors"
                >
                  <Filter size={16} />
                  <span>Filters</span>
                </button>

                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2 bg-white border text-black border-gray-200 rounded-md  hover:bg-gray-50 transition-colors"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <ArrowUpDown
                    size={16}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8 overflow-hidden"
              >
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">
                        Category
                      </h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <label
                            key={category}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="radio"
                              name="category"
                              checked={filters.category === category}
                              onChange={() =>
                                setFilters({ ...filters, category })
                              }
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="capitalize">{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">
                        Price Range
                      </h3>
                      <div className="flex items-center justify-between mb-2">
                        <span>${filters.priceRange[0]}</span>
                        <span>${filters.priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={filters.priceRange[1]}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            priceRange: [0, parseInt(e.target.value)],
                          })
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Rating</h3>
                      <div className="space-y-2">
                        {[4, 3, 2, 1].map((rating) => (
                          <label
                            key={rating}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="radio"
                              name="rating"
                              checked={filters.rating === rating}
                              onChange={() =>
                                setFilters({ ...filters, rating })
                              }
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  fill={i < rating ? "currentColor" : "none"}
                                  className={
                                    i < rating
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }
                                />
                              ))}
                              <span className="ml-1 text-sm text-gray-500">
                                & Up
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-sm"
                >
                  <div className="h-64 bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900">
                    No products found
                  </h3>
                  <p className="mt-2 text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setFilters({
                        category: "all",
                        priceRange: [0, 1000],
                        rating: 0,
                      });
                    }}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <AnimatePresence>
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProductCard
                          product={product}
                          addToCart={addToCart}
                          onQuickLook={() =>
                            openQuickLook({
                              ...product,
                              images: [product.image],
                            })
                          }
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </>
          )}

          {/* Quick Look Modal */}
          <AnimatePresence>
            {selectedProduct && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 overflow-y-auto"
              >
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                    onClick={closeQuickLook}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black bg-opacity-75"
                    ></motion.div>
                  </div>

                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {selectedProduct.title}
                              </h3>
                              <div className="mt-1 flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={16}
                                    fill={
                                      i <
                                      Math.round(selectedProduct.rating.rate)
                                        ? "currentColor"
                                        : "none"
                                    }
                                    className={
                                      i <
                                      Math.round(selectedProduct.rating.rate)
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }
                                  />
                                ))}
                                <span className="ml-1 text-sm text-gray-500">
                                  ({selectedProduct.rating.count} reviews)
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={closeQuickLook}
                              className="ml-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
                            >
                              <X size={24} />
                            </button>
                          </div>

                          <div className="mt-6 relative">
                            {/* Main Image */}
                            <div className="relative h-96 overflow-hidden rounded-lg bg-gray-50">
                              <motion.img
                                key={quickLookIndex}
                                src={selectedProduct.images[quickLookIndex]}
                                alt={selectedProduct.title}
                                className="w-full h-full object-contain"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              />

                              {/* Navigation Arrows */}
                              <button
                                onClick={() => handleQuickLookSwipe("left")}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                              >
                                <ChevronLeft size={24} />
                              </button>
                              <button
                                onClick={() => handleQuickLookSwipe("right")}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                              >
                                <ChevronRight size={24} />
                              </button>
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-2 mt-4">
                              {selectedProduct.images.map((img, index) => (
                                <button
                                  key={index}
                                  onClick={() => setQuickLookIndex(index)}
                                  className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                                    quickLookIndex === index
                                      ? "border-indigo-500"
                                      : "border-transparent"
                                  }`}
                                >
                                  <img
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="mt-6">
                            <p className="text-gray-700">
                              {selectedProduct.description}
                            </p>

                            <div className="mt-4 flex items-center justify-between">
                              <span className="text-2xl font-bold text-gray-900">
                                ${selectedProduct.price}
                              </span>

                              <button
                                onClick={() => {
                                  addToCart(selectedProduct);
                                  closeQuickLook();
                                }}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
