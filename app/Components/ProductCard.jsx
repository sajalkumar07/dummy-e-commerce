"use client";
import { motion } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import { useCart } from "../context/cartContext"; // Adjust the import path as needed
import { useRouter } from "next/navigation"; // Import for routing

const ProductCard = ({ product, onQuickLook }) => {
  const { addToCart } = useCart();
  const router = useRouter();

  // Function to handle adding to cart with authentication check
  const handleAddToCart = () => {
    // Check if user data exists in local storage
    const userData = localStorage.getItem("userData");

    if (userData) {
      // User is authenticated, add to cart
      addToCart(product);
    } else {
      // User is not authenticated, redirect to login
      router.push("/login");
    }
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

          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <Heart size={18} className="text-gray-700" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-95 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
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

export default ProductCard;
