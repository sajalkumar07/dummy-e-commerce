"use client";

import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <section className="py-16 bg-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900">
              Join Our Newsletter
            </h2>
            <p className="mt-4 text-slate-600">
              Subscribe to receive updates on new arrivals, special offers and
              other discount information.
            </p>
            <div className="mt-6 flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 py-3 px-4 border border-slate-300 rounded-l-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button className="bg-black text-white px-6 py-3 rounded-r-lg  transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default Newsletter;
