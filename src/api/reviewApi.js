import axiosInstance from "./axiosInstance";

/**
 * Public: Fetch approved reviews for a specific product
 * Assumes backend route: GET /api/reviews/product/:productId
 */
export const fetchProductReviews = async (productId) => {
  const response = await axiosInstance.get(
    `/products/reviews/product/${productId}`,
  );
  return response.data.data;
};

/**
 * Public: Submit a new review
 * Hits the POST /api/reviews route you provided
 */
export const submitReview = async (reviewData) => {
  const response = await axiosInstance.post("/reviews", reviewData);
  return response.data;
};
