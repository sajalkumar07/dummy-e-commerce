"use client";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingBag,
  ZoomIn,
} from "lucide-react";
import { useState, useRef } from "react";

const QuickLookModal = ({
  selectedProduct,
  closeQuickLook,
  quickLookIndex,
  setQuickLookIndex,
  addToCart,
}) => {
  // State for zoom functionality
  const [isZoomed, setIsZoomed] = useState(false);
  const imageContainerRef = useRef(null);

  // Motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform for zoomed image position
  const transformX = useTransform(mouseX, (val) => -val * 0.5);
  const transformY = useTransform(mouseY, (val) => -val * 0.5);

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

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current || !isZoomed) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update motion values
    mouseX.set(x - rect.width / 2);
    mouseY.set(y - rect.height / 2);
  };

  // Handle touch gestures for swiping
  const handleTouchStart = useRef({ x: 0 });

  const onTouchStart = (e) => {
    handleTouchStart.current.x = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = handleTouchStart.current.x - touchEndX;

    // Determine swipe direction (threshold of 50px)
    if (Math.abs(diffX) > 50) {
      handleQuickLookSwipe(diffX > 0 ? "right" : "left");
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
          <div className="flex items-center justify-center min-h-screen px-4 py-8 text-center sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={closeQuickLook}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              ></motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="relative inline-block bg-white rounded-xl overflow-hidden shadow-2xl sm:my-8 sm:max-w-5xl sm:w-full"
            >
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:gap-8">
                  {/* Left side - Images */}
                  <div className="flex-1">
                    {/* Main Image with Zoom functionality */}
                    <div
                      ref={imageContainerRef}
                      className={`relative h-96 md:h-[28rem] overflow-hidden rounded-lg bg-gray-50 ${
                        isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                      }`}
                      onClick={() => setIsZoomed(!isZoomed)}
                      onMouseMove={handleMouseMove}
                      onTouchStart={onTouchStart}
                      onTouchEnd={onTouchEnd}
                    >
                      {!isZoomed ? (
                        <motion.img
                          key={`normal-${quickLookIndex}`}
                          src={selectedProduct.images[quickLookIndex]}
                          alt={selectedProduct.title}
                          className="w-full h-full object-contain"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      ) : (
                        <motion.div className="absolute inset-0 cursor-zoom-out">
                          <motion.img
                            key={`zoomed-${quickLookIndex}`}
                            src={selectedProduct.images[quickLookIndex]}
                            alt={selectedProduct.title}
                            className="w-full h-full object-none scale-150"
                            style={{
                              x: transformX,
                              y: transformY,
                            }}
                          />
                        </motion.div>
                      )}

                      {/* Zoom indicator */}
                      {!isZoomed && (
                        <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow-md">
                          <ZoomIn size={20} className="text-gray-700" />
                        </div>
                      )}

                      {/* Navigation Arrows - only show when not zoomed */}
                      {!isZoomed && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuickLookSwipe("left");
                            }}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-md hover:bg-white transition-colors"
                          >
                            <ChevronLeft size={20} className="text-black" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuickLookSwipe("right");
                            }}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-md hover:bg-white transition-colors"
                          >
                            <ChevronRight size={20} className="text-black" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                      {selectedProduct.images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setQuickLookIndex(index);
                            setIsZoomed(false);
                          }}
                          className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden transition-all ${
                            quickLookIndex === index
                              ? "ring-2 ring-black ring-offset-2"
                              : "ring-1 ring-gray-200 opacity-70 hover:opacity-100"
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

                  {/* Right side - Content */}
                  <div className="flex-1 mt-8 md:mt-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-medium text-black tracking-tight">
                          {selectedProduct.title}
                        </h3>
                        <div className="mt-2 flex items-center">
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
                              strokeWidth={1.5}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-500">
                            ({selectedProduct.rating.count} reviews)
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={closeQuickLook}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <X size={20} className="text-gray-500" />
                      </button>
                    </div>

                    <div className="mt-6">
                      <span className="text-3xl font-medium text-black">
                        ${selectedProduct.price}
                      </span>
                    </div>

                    <div className="mt-6 space-y-6">
                      <p className="text-gray-700 leading-relaxed">
                        {selectedProduct.description}
                      </p>

                      <div className="pt-4 border-t border-gray-100">
                        <button
                          onClick={() => {
                            addToCart(selectedProduct);
                            closeQuickLook();
                          }}
                          className="w-full py-3 bg-black text-white rounded-md hover:bg-black/90 transition-colors flex items-center justify-center gap-2 font-medium"
                        >
                          <ShoppingBag size={18} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickLookModal;
