export const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchLimitedProducts = async (limit = 5) => {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products?limit=${limit}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch limited products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching limited products:", error);
    throw error;
  }
};
