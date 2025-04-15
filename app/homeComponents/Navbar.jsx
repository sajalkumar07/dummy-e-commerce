"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, Search, Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-neutral-800 tracking-tight">
              <span className="text-primary bg-black p-1 rounded-md text-white">
                Super
              </span>
              Store
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <motion.a
              href="#"
              className="text-gray-700 hover:text-black"
              whileHover={{ scale: 1.05 }}
            >
              Home
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-700 hover:text-black"
              whileHover={{ scale: 1.05 }}
            >
              Products
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-700 hover:text-black"
              whileHover={{ scale: 1.05 }}
            >
              Categories
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-700 hover:text-black"
              whileHover={{ scale: 1.05 }}
            >
              About
            </motion.a>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-1 text-gray-700 hover:text-black"
            >
              <Search size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-1 text-gray-700 hover:text-black"
            >
              <Heart size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-1 text-gray-700 hover:text-black"
            >
              <ShoppingCart size={20} />
            </motion.button>
            <button
              className="md:hidden p-1 text-gray-700 hover:text-black"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-4 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
              >
                Home
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
              >
                Products
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
              >
                Categories
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
              >
                About
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
