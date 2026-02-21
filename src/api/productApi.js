import axiosInstance from "./axiosInstance";

// ==========================================
// PUBLIC / SHARED APIs
// ==========================================

/**
 * Public and Admin : Fetches all published products. Accepts optional query parameters for filtering/sorting.
 */
export const fetchProducts = async (filters = {}) => {
  const response = await axiosInstance.get("/products", { params: filters });
  return response.data.data;
};

/**
 * Public : Fetches a single product by its unique code.
 */
export const fetchProductByCode = async (productCode) => {
  const response = await axiosInstance.get(`/products/${productCode}`);
  return response.data.data;
};

// ==========================================
// ADMIN ONLY APIs
// ==========================================

/**
 * Admin: Create or Update a product (Upsert)
 * Hits the POST /api/admin/products/manage route
 */
export const adminManageProduct = async (productData) => {
  const response = await axiosInstance.post("/products/manage", productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

/**
 * Admin: Delete a product
 * Hits the DELETE /api/admin/products/:id route
 */
export const adminDeleteProduct = async (id) => {
  const response = await axiosInstance.delete(`/admin/products/${id}`);
  return response.data;
};
