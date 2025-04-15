"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const ProductCard = ({ product, addToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative aspect-w-1 aspect-h-1 bg-gray-50 overflow-hidden rounded-xl">
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
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-95 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex justify-between items-center">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-black text-white py-2  transition-colors text-sm flex items-center justify-center rounded-lg"
            >
              Add to Cart
            </button>
            <button className="ml-2 p-2 text-gray-900 hover:text-indigo-600 transition-colors">
              <Heart size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4">
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
              {product.rating.rate}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default ProductCard;
