// Base API URL
const API_BASE_URL = "https://fakestoreapi.com";

// Function to handle API requests
async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

// Auth functions
export async function loginUser(username, password) {
  try {
    const response = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    // Get user details after successful login
    if (response.token) {
      const users = await getUsers();
      const user = users.find((u) => u.username === username);

      if (user) {
        return {
          ...user,
          token: response.token,
        };
      }
    }

    return response;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

// Get all users (for demo purposes only - in a real app this would be restricted)
export async function getUsers() {
  return await apiRequest("/users");
}

// Product related functions
export async function fetchProducts() {
  return await apiRequest("/products");
}

export async function fetchLimitedProducts(limit) {
  return await apiRequest(`/products?limit=${limit}`);
}

// Cart related functions
export async function getUserCart(userId) {
  return await apiRequest(`/carts/${userId}`);
}

// For testing/demo purposes: get user by credentials
export async function getUserByCredentials(username, password) {
  try {
    const users = await getUsers();
    return users.find((user) => user.username === username);
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
}

export async function fetchUserCartDirect(userId) {
  try {
    const response = await fetch(`https://fakestoreapi.com/carts/${userId}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const cartData = await response.json();
    console.log("Raw cart data from API:", cartData);
    return cartData;
  } catch (error) {
    console.error("Failed to fetch user cart:", error);
    throw error;
  }
}
