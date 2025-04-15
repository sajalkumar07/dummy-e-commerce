"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";

export const FeaturedSection = ({ title, products, addToCart }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
          <motion.a
            href="#"
            className="text-black font-medium flex items-center"
            whileHover={{ x: 5 }}
          >
            View All <ChevronRight size={16} className="ml-1" />
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
