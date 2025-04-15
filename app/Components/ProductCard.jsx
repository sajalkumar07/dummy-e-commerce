"use client";
import { motion } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import { useCart } from "../context/cartContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductCard = ({ product, onQuickLook }) => {
  const { addToCart } = useCart();
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Check if product is in wishlist on component mount
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsWishlisted(wishlist.some((item) => item.id === product.id));
  }, [product.id]);

  // Function to handle adding to cart with animation
  const handleAddToCart = () => {
    setIsAddingToCart(true);

    // Add product to cart
    addToCart(product);

    // Reset button state after animation
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  // Function to toggle wishlist status
  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (isWishlisted) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } else {
      // Add to wishlist
      const updatedWishlist = [...wishlist, product];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }

    setIsWishlisted(!isWishlisted);
  };

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
              onQuickLook(product);
            }}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <Eye size={18} className="text-gray-700" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist();
            }}
            className={`p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors ${
              isWishlisted ? "text-red-500" : "text-gray-700"
            }`}
          >
            <Heart size={18} className={isWishlisted ? "fill-current" : ""} />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-95 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className={`w-full py-2 px-4 text-sm flex items-center justify-center rounded-lg transition-colors ${
              isAddingToCart
                ? "bg-green-600 text-white"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {isAddingToCart ? "Added! ✓" : "Add to Cart"}
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
              {product.rating?.rate || 0} ({product.rating?.count || 0})
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
