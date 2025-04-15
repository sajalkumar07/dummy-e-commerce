"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Star } from "lucide-react";

const QuickLookModal = ({
  selectedProduct,
  closeQuickLook,
  quickLookIndex,
  setQuickLookIndex,
  addToCart,
}) => {
  const handleQuickLookSwipe = (direction) => {
    if (!selectedProduct) return;

    if (direction === "left") {
      setQuickLookIndex((prev) =>
        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
      );
    } else {
      setQuickLookIndex((prev) =>
        prev === selectedProduct.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  return (
    <AnimatePresence>
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={closeQuickLook}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black bg-opacity-75"
              ></motion.div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          {selectedProduct.title}
                        </h3>
                        <div className="mt-1 flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              fill={
                                i < Math.round(selectedProduct.rating.rate)
                                  ? "currentColor"
                                  : "none"
                              }
                              className={
                                i < Math.round(selectedProduct.rating.rate)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                          <span className="ml-1 text-sm text-gray-500">
                            ({selectedProduct.rating.count} reviews)
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={closeQuickLook}
                        className="ml-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    <div className="mt-6 relative">
                      {/* Main Image */}
                      <div className="relative h-96 overflow-hidden rounded-lg bg-gray-50">
                        <motion.img
                          key={quickLookIndex}
                          src={selectedProduct.images[quickLookIndex]}
                          alt={selectedProduct.title}
                          className="w-full h-full object-contain"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Navigation Arrows */}
                        <button
                          onClick={() => handleQuickLookSwipe("left")}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button
                          onClick={() => handleQuickLookSwipe("right")}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </div>

                      {/* Thumbnails */}
                      <div className="flex gap-2 mt-4">
                        {selectedProduct.images.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setQuickLookIndex(index)}
                            className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                              quickLookIndex === index
                                ? "border-indigo-500"
                                : "border-transparent"
                            }`}
                          >
                            <img
                              src={img}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="text-gray-700">
                        {selectedProduct.description}
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">
                          ${selectedProduct.price}
                        </span>

                        <button
                          onClick={() => {
                            addToCart(selectedProduct);
                            closeQuickLook();
                          }}
                          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickLookModal;
