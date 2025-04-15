"use client";
import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard"; // Adjust the import path as needed
import Navbar from "../Components/common/Navbar";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load wishlist from localStorage
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
    setLoading(false);
  }, []);

  // Function to handle quick look (you can implement this as needed)
  const handleQuickLook = (product) => {
    console.log("Quick look at:", product);
    // Implement your quick look modal logic here
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Your Wishlist
          </h1>

          {wishlist.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium text-gray-500">
                Your wishlist is empty
              </h2>
              <p className="mt-2 text-gray-400">
                Start adding products to your wishlist by clicking the heart
                icon
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickLook={handleQuickLook}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistPage;
