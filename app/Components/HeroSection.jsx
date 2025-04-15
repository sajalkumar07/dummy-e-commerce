"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";

const HeroSection = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollRef.current) {
        scrollRef.current.style.transform = `translateY(${
          scrollPosition * 0.05
        }px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative bg-neutral-100 overflow-hidden">
      {/* Minimal background */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-50 to-transparent z-0" />

      <div className="max-w-7xl mx-auto py-8">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Minimal Text */}
          <div className="space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-neutral-900">
                Elevate Your <span className="font-medium">Everyday</span>
              </h1>
              <p className="mt-6 text-lg text-neutral-600 max-w-lg mx-auto lg:mx-0">
                Discover thoughtfully designed objects that combine form and
                function for modern living.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start p-8 md:p-0"
            >
              <button className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-3 rounded-md transition-all duration-300 flex items-center justify-center border border-neutral-900">
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button className="bg-transparent hover:bg-neutral-200 text-neutral-900 px-8 py-3 rounded-md transition-all duration-300 flex items-center justify-center border border-neutral-900">
                View Lookbook
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="pt-8 flex flex-col items-center lg:items-start gap-2 text-sm text-neutral-500"
            >
              <p>Free shipping on all orders over $200</p>
              <p>Handcrafted with premium materials</p>
            </motion.div>
          </div>

          {/* Right Content - E-commerce Illustration */}
          <div
            className="relative h-[400px] lg:h-[500px] xl:h-[600px]"
            ref={scrollRef}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Fixed image path - removed "/public" prefix */}
              <Image
                src="/assets/people.png"
                alt="E-commerce Shopping Illustration"
                width={800}
                height={800}
                className="object-contain w-full "
                priority
                quality={100}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Minimal scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
      >
        <ChevronDown className="text-gray-400 animate-bounce" size={30} />
      </motion.div>
    </section>
  );
};
export default HeroSection;
