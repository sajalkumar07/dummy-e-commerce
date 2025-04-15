"use client";
import { useEffect, useCallback, useState } from "react";
import { X, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "../Components/common/Navbar";
import { useCart } from "../context/cartContext";
import CheckoutModal from "../Components/ChekoutModel"; // Import the CheckoutModal

const CartPage = () => {
  const {
    displayItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    isLoading,
    isLoggedIn,
    refreshApiCart,
  } = useCart();

  // State for checkout modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Calculate subtotal with memoization
  const calculateSubtotal = useCallback(() => {
    return displayItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [displayItems]);

  // Refresh cart when authentication status changes
  useEffect(() => {
    const fetchCart = async () => {
      if (isLoggedIn) {
        try {
          await refreshApiCart();
        } catch (error) {
          console.error("Failed to refresh cart:", error);
        }
      }
    };

    fetchCart();
  }, [isLoggedIn]);

  // Handlers for quantity changes
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleIncrease = (id, currentQuantity) => {
    handleQuantityChange(id, currentQuantity + 1);
  };

  const handleDecrease = (id, currentQuantity) => {
    handleQuantityChange(id, currentQuantity - 1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Your Cart</h1>

        {displayItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="flex justify-center mb-4">
              <ShoppingBag size={64} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              href="/Products"
              className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {isLoggedIn && (
                  <div className="bg-blue-50 p-4 text-blue-600 text-sm border-b border-blue-100">
                    <p>Your cart includes both account items and local items</p>
                  </div>
                )}

                <ul className="divide-y divide-gray-200">
                  {displayItems.map((item) => (
                    <li
                      key={`${item.id}-${item.quantity}`}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0 bg-gray-50 rounded-lg w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain p-2"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder-product.jpg";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <ShoppingBag size={24} className="text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 sm:ml-6 mt-4 sm:mt-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-base font-medium text-gray-900 line-clamp-2">
                              {item.title || "Unknown Product"}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-gray-500"
                              aria-label="Remove item"
                            >
                              <X size={18} />
                            </button>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 capitalize">
                            {item.category || "uncategorized"}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                handleDecrease(item.id, item.quantity)
                              }
                              className="px-3 py-1 text-black hover:bg-gray-100 disabled:opacity-50"
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 border-x border-gray-300 text-black">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleIncrease(item.id, item.quantity)
                              }
                              className="px-3 py-1 text-black hover:bg-gray-100"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-base font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Cart Actions */}
                <div className="p-4 border-t border-gray-200 flex justify-between">
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                    aria-label="Clear cart"
                  >
                    Clear Cart
                  </button>
                  <Link
                    href="/Products"
                    className="text-black hover:text-black text-sm font-medium flex items-center"
                  >
                    <ArrowLeft size={16} className="mr-1" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p className="text-black">Subtotal</p>
                    <p className="font-medium text-black">
                      ${calculateSubtotal().toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-black">Shipping</p>
                    <p className="font-medium text-black">
                      Calculated at next step
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-black">Tax</p>
                    <p className="font-medium text-black">
                      Calculated at next step
                    </p>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <p className="text-lg font-bold text-black">Total</p>
                    <p className="text-lg font-bold text-black">
                      ${calculateSubtotal().toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  className="mt-6 w-full bg-black text-white rounded-lg py-3 px-4 hover:bg-gray-800 transition-colors disabled:opacity-50"
                  disabled={displayItems.length === 0}
                  onClick={() => setIsCheckoutOpen(true)}
                >
                  Proceed to Checkout
                </button>

                <div className="mt-4 text-xs text-gray-500 text-center">
                  Taxes and shipping calculated at checkout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={displayItems}
        subtotal={calculateSubtotal()}
      />
    </>
  );
};

export default CartPage;
