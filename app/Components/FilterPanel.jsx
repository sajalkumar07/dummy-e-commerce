"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ChevronRight } from "lucide-react";

const FilterPanel = ({
  isFilterOpen,
  filters,
  setFilters,
  categories,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isFilterOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/20"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-xl"
          >
            <div className="flex flex-col h-full overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6">
                <h2 className="text-xl font-medium text-black">Filters</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-50 text-gray-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-6 space-y-8">
                {/* Category Filter */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">
                    Category
                  </h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-3 py-3 text-black cursor-pointer group"
                      >
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            name="category"
                            checked={filters.category === category}
                            onChange={() =>
                              setFilters({ ...filters, category })
                            }
                            className="h-5 w-5 text-black border-gray-300 focus:ring-0 focus:ring-offset-0"
                          />
                          {filters.category === category && (
                            <ChevronRight
                              size={14}
                              className="absolute -right-4 text-black opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          )}
                        </div>
                        <span className="capitalize font-medium">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">
                    Price Range
                  </h3>
                  <div className="flex items-center justify-between mb-3 text-black">
                    <span className="font-medium">
                      ${filters.priceRange[0]}
                    </span>
                    <span className="font-medium">
                      ${filters.priceRange[1]}
                    </span>
                  </div>
                  <div className="px-1">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          priceRange: [0, parseInt(e.target.value)],
                        })
                      }
                      className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-black"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">
                    Rating
                  </h3>
                  <div className="space-y-1">
                    {[4, 3, 2, 1].map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center gap-3 py-3 cursor-pointer group"
                      >
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            name="rating"
                            checked={filters.rating === rating}
                            onChange={() => setFilters({ ...filters, rating })}
                            className="h-5 w-5 text-black border-gray-300 focus:ring-0 focus:ring-offset-0"
                          />
                          {filters.rating === rating && (
                            <ChevronRight
                              size={14}
                              className="absolute -right-4 text-black opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          )}
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              fill={i < rating ? "currentColor" : "none"}
                              className={
                                i < rating ? "text-yellow-400" : "text-gray-300"
                              }
                              strokeWidth={1.5}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-500">
                            & Up
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-100 flex gap-4">
                <button
                  onClick={() => {
                    setFilters({
                      category: "all",
                      priceRange: [0, 1000],
                      rating: 0,
                    });
                  }}
                  className="flex-1 px-4 py-3 border border-gray-200 text-black rounded-md hover:bg-gray-50 transition-colors font-medium"
                >
                  Reset
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-black text-white rounded-md hover:bg-black/90 transition-colors font-medium"
                >
                  Apply
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterPanel;
