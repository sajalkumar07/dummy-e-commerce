"use client";
import { useState, useEffect } from "react";
import { X, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "../Components/common/Navbar";
import { getUserCart, fetchProducts } from "../lib/api"; // Adjust import path

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [products, setProducts] = useState([]);

  // Fetch all products on mount (to get details for cart items)
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const allProducts = await fetchProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchAllProducts();
  }, []);

  // Get user ID from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.id) {
      setUserId(userData.id);
    }
  }, []);

  // Fetch user cart when userId changes
  useEffect(() => {
    const fetchUserCart = async () => {
      if (userId) {
        try {
          setIsLoading(true);
          const cartData = await getUserCart(userId);

          // Map cart items with full product details
          const itemsWithDetails = cartData.products.map((cartItem) => {
            const product = products.find((p) => p.id === cartItem.productId);
            return {
              id: cartItem.productId,
              title: product?.title || "Unknown Product",
              price: product?.price || 0,
              quantity: cartItem.quantity,
              image: product?.image || "/placeholder-product.jpg",
              category: product?.category || "uncategorized",
            };
          });

          setCartItems(itemsWithDetails);
        } catch (error) {
          console.error("Failed to fetch user cart:", error);
          // Fallback to localStorage if API fails
          const savedCart = localStorage.getItem("cart");
          if (savedCart) {
            setCartItems(JSON.parse(savedCart));
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        // No user logged in - use localStorage
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
        setIsLoading(false);
      }
    };

    fetchUserCart();
  }, [userId, products]);

  const removeFromCart = async (productId) => {
    if (userId) {
      // In a real app, you would call an API to remove from server cart
      // For demo, we'll just update local state
      setCartItems((prevItems) => {
        const updatedItems = prevItems.filter((item) => item.id !== productId);
        return updatedItems;
      });
    } else {
      // No user - just update localStorage
      setCartItems((prevItems) => {
        const updatedItems = prevItems.filter((item) => item.id !== productId);
        localStorage.setItem("cart", JSON.stringify(updatedItems));
        return updatedItems;
      });
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    if (userId) {
      // In a real app, you would call an API to update quantity on server
      setCartItems((prevItems) => {
        const updatedItems = prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        return updatedItems;
      });
    } else {
      setCartItems((prevItems) => {
        const updatedItems = prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedItems));
        return updatedItems;
      });
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const clearCart = async () => {
    if (userId) {
      // In a real app, you would call an API to clear server cart
      setCartItems([]);
    } else {
      setCartItems([]);
      localStorage.removeItem("cart");
    }
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

        {cartItems.length === 0 ? (
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
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row"
                    >
                      <div className="flex-shrink-0 bg-gray-50 rounded-lg w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <div className="flex-1 sm:ml-6 mt-4 sm:mt-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-base font-medium text-gray-900 line-clamp-2">
                              {item.title}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-gray-500"
                            >
                              <X size={18} />
                            </button>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 capitalize">
                            {item.category}
                          </p>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="px-3 py-1 text-black hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 border-x border-gray-300 text-black">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-3 py-1 text-black hover:bg-gray-100"
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
                <div className="p-4 border-t border-gray-200 flex justify-between">
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
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

                <button className="mt-6 w-full bg-black text-white rounded-lg py-3 px-4 hover:bg-gray-800 transition-colors">
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
    </>
  );
};

export default CartPage;
