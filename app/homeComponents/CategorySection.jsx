"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export const CategorySection = () => {
  const categories = [
    { name: "Electronics", image: "/assets/Electronics.jpg", link: "#" },
    { name: "Jewelry", image: "/assets/Jewelry.jpg", link: "#" },
    { name: "Men's Clothing", image: "/assets/menClothes.png", link: "#" },
    { name: "Women's Clothing", image: "/assets/womenCloting.png", link: "#" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900">
            Shop by Category
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Explore our wide range of products carefully selected for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-xl"
            >
              <div className="aspect-w-1 aspect-h-1 bg-slate-100 w-full">
                <div className="h-48 w-full flex items-center justify-center">
                  <p className="text-slate-400">{category.name}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-white text-xl font-medium">
                    {category.name}
                  </h3>
                  <motion.a
                    href={category.link}
                    className="inline-flex items-center mt-4 text-white border-b border-white pb-1"
                    whileHover={{ x: 5 }}
                  >
                    Shop Now <ChevronRight size={16} className="ml-1" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
