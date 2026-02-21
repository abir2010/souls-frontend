import axiosInstance from "./axiosInstance";

// Submit a new order to the backend
export const createOrder = async (orderPayload) => {
  // Updated to match your specific route
  const response = await axiosInstance.post("/orders/checkout", orderPayload);
  return response.data;
};

// Fetch tracking details
export const trackOrder = async ({ orderId, phone }) => {
  const response = await axiosInstance.get("/orders/track", {
    params: { orderId, phone },
  });
  return response.data.data;
};

// Admin: Get all orders for the dashboard table
export const adminGetOrders = async () => {
  // Make sure this route matches your Express admin routes
  // (e.g., it might be '/admin/orders' depending on your backend setup)
  const response = await axiosInstance.get("/admin/orders");
  return response.data.data;
};

// Admin: Update the details of a specific order
export const adminUpdateOrder = async ({
  orderId,
  status,
  internalNotes,
  paymentType,
}) => {
  const response = await axiosInstance.patch(`/admin/orders/${orderId}`, {
    status,
    internalNotes,
    paymentType,
  });
  return response.data;
};
