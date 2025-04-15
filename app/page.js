"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import Navbar from "../app/Components/common/Navbar";
import HeroSection from "../app/Components/HeroSection";
import CategorySection from "../app/Components/CategorySection";
import FeaturedSection from "../app/Components/FeaturedSection";
import Newsletter from "../app/Components/Newsletter";
import Footer from "../app/Components/Footer";
import { fetchLimitedProducts } from "../app/lib/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchLimitedProducts(5);
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <>
      <Navbar />
      <HeroSection />
      <div className="min-h-screen bg-white">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            <CategorySection />
            <FeaturedSection
              title="Featured Products"
              products={products}
              addToCart={addToCart}
            />
          </>
        )}

        <Newsletter />
        <Footer />

        <AnimatePresence>
          {cart.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-4 right-4 bg-black text-white p-3 rounded-xl shadow-lg"
            >
              <div className="flex items-center">
                <ShoppingCart size={20} />
                <span className="ml-2 text-sm font-medium">
                  {cart.length} {cart.length === 1 ? "item" : "items"}
                </span>
                <span className="ml-2 bg-gray-100 text-black text-xs px-2 py-1 rounded-md">
                  View Cart
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Home;
