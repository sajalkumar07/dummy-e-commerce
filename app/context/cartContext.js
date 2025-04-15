"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getUserCart, fetchProducts } from "../lib/api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [apiCartItems, setApiCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  // Load all products once
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };
    loadProducts();
  }, []);

  // Get user ID from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData && parsedData.id) {
          setUserId(parsedData.id);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Initialize cart from localStorage or API
  useEffect(() => {
    const initializeCart = async () => {
      setIsLoading(true);
      const savedCart = localStorage.getItem("cart");
      let localCart = savedCart ? JSON.parse(savedCart) : [];

      try {
        if (userId) {
          // Fetch user cart from API
          const apiCart = await getUserCart(userId);
          const formattedApiCart = apiCart.products
            .map((item) => {
              const product = products.find((p) => p.id === item.productId);
              return {
                ...product,
                id: item.productId,
                quantity: item.quantity,
              };
            })
            .filter((item) => item.id); // Filter out items without product details

          setApiCartItems(formattedApiCart);

          // Merge API cart with local cart
          const mergedCart = mergeCarts(formattedApiCart, localCart);
          setCartItems(mergedCart);
        } else {
          // Guest user - use local storage
          setCartItems(localCart);
        }
      } catch (error) {
        console.error("Failed to initialize cart:", error);
        setCartItems(localCart);
      } finally {
        setIsLoading(false);
      }
    };

    if (products.length > 0) {
      initializeCart();
    }
  }, [userId, products]);

  // Helper function to merge carts
  const mergeCarts = (apiCart, localCart) => {
    const merged = [...apiCart];

    localCart.forEach((localItem) => {
      const existingItem = merged.find((item) => item.id === localItem.id);
      if (existingItem) {
        existingItem.quantity += localItem.quantity;
      } else {
        merged.push(localItem);
      }
    });

    return merged;
  };

  // Save to localStorage whenever cart changes (for guest users)
  useEffect(() => {
    if (!isLoading && !userId) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading, userId]);

  // Add to cart with full product details
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // Other cart methods remain the same...
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        apiCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isLoading,
        isLoggedIn: !!userId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
