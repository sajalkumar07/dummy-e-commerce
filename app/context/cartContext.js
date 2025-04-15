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
  const [displayItems, setDisplayItems] = useState([]);

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

  // Initialize cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Error parsing cart data:", error);
        setCartItems([]);
      }
    }
  }, []);

  // Fetch API cart when user ID changes
  useEffect(() => {
    const fetchApiCart = async () => {
      if (!userId) {
        setApiCartItems([]);
        return;
      }

      setIsLoading(true);
      try {
        const apiCart = await getUserCart(userId);
        console.log("API Cart Response:", apiCart);

        const formattedApiCart = apiCart.products
          .map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return product
              ? {
                  ...product,
                  id: item.productId,
                  quantity: item.quantity,
                }
              : null;
          })
          .filter(Boolean);

        setApiCartItems(formattedApiCart);
      } catch (error) {
        console.error("Failed to fetch API cart:", error);
        setApiCartItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (products.length > 0 && userId) {
      fetchApiCart();
    } else {
      setIsLoading(false);
    }
  }, [userId, products]);

  // Merge and prepare display items whenever cart sources change
  useEffect(() => {
    if (isLoading) return;

    // If user is logged in, show API cart items with local additions
    // If not logged in, just show local cart
    const mergedItems = userId
      ? [...apiCartItems, ...cartItems]
      : [...cartItems];

    // De-duplicate items by product ID and combine quantities
    const itemMap = new Map();
    mergedItems.forEach((item) => {
      if (!item || !item.id) return;

      const existingItem = itemMap.get(item.id);
      if (existingItem) {
        itemMap.set(item.id, {
          ...existingItem,
          quantity: existingItem.quantity + item.quantity,
        });
      } else {
        itemMap.set(item.id, { ...item });
      }
    });

    setDisplayItems(Array.from(itemMap.values()));
  }, [cartItems, apiCartItems, isLoading, userId]);

  // Save to localStorage whenever local cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

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

  // Function to directly fetch user cart from API
  const refreshApiCart = async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const apiCart = await getUserCart(userId);

      const formattedApiCart = apiCart.products
        .map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return product
            ? {
                ...product,
                id: item.productId,
                quantity: item.quantity,
              }
            : null;
        })
        .filter(Boolean);

      setApiCartItems(formattedApiCart);
    } catch (error) {
      console.error("Failed to refresh API cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems, // Local cart items
        apiCartItems, // API cart items
        displayItems, // Merged items for display
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isLoading,
        isLoggedIn: !!userId,
        refreshApiCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
