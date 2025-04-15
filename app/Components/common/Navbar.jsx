"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Menu,
  X,
  User,
  LogOut,
  Package,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState(null);
  const profileRef = useRef(null);

  // Handle hydration - only access localStorage on client
  useEffect(() => {
    setIsClient(true);

    // Function to update cart count
    const updateCartCount = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        const count = cartItems.reduce(
          (total, item) => total + (item.quantity || 1),
          0
        );
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    };

    // Check for logged in user
    const checkUser = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };

    // Initial load
    updateCartCount();
    checkUser();

    // Set up a regular polling interval to check for cart updates and user status
    const intervalId = setInterval(() => {
      updateCartCount();
      checkUser();
    }, 300);

    // Also listen for storage events for cross-tab updates
    window.addEventListener("storage", () => {
      updateCartCount();
      checkUser();
    });

    // Close profile dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("storage", updateCartCount);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userCart");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");

    setUser(null);
    setIsProfileOpen(false);
    // Redirect to home page if needed
    window.location.href = "/";
  };

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
            <Link href="/" className="text-gray-700 hover:text-black">
              Home
            </Link>
            <Link href="/Products" className="text-gray-700 hover:text-black">
              Products
            </Link>
            <Link href="#" className="text-gray-700 hover:text-black">
              Categories
            </Link>
            <Link href="#" className="text-gray-700 hover:text-black">
              About
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/Wishlist">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-1 text-gray-700 hover:text-black relative cursor-pointer"
              >
                <Heart size={20} />
              </motion.button>
            </Link>
            <Link href="/cart">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-1 text-gray-700 hover:text-black relative cursor-pointer"
              >
                <ShoppingCart size={20} />
                {isClient && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </motion.button>
            </Link>

            {/* Conditional rendering based on authentication status */}
            {isClient && user ? (
              <div className="relative" ref={profileRef}>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={`${user.name?.firstname || "User"}'s avatar`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User size={18} className="text-gray-500" />
                    )}
                  </div>
                  <span className="hidden md:block text-sm font-medium text-black">
                    {user.name?.firstname || user.username || "User"}
                  </span>
                </div>

                {/* Profile dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                    >
                      <Link
                        href="/#"
                        className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User size={16} className="mr-2" />
                        Your Profile
                      </Link>
                      <Link
                        href="/orders"
                        className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Package size={16} className="mr-2" />
                        Order History
                      </Link>
                      <button
                        onClick={handleLogout}
                        className=" w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut size={16} className="mr-2" />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex w-full justify-between items-center gap-4">
                <Link
                  href="/login"
                  className="text-black cursor-pointer hover:text-gray-700"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-black text-white p-2 rounded-md cursor-pointer hover:bg-gray-800"
                >
                  Signup
                </Link>
              </div>
            )}

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
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
              >
                Home
              </Link>
              <Link
                href="/Products"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
              >
                Products
              </Link>
              <Link
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
              >
                Categories
              </Link>
              <Link
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
              >
                About
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
