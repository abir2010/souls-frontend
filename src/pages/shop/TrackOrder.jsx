import { useMutation } from "@tanstack/react-query";
import {
  CheckCircle2,
  Clock,
  Loader2,
  Package,
  Search,
  Truck,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { trackOrder } from "../../api/orderApi";
import PageTransition from "../../components/shared/PageTransition";

const TrackOrder = () => {
  // Form state for tracking inputs
  const [formData, setFormData] = useState({
    orderId: "",
    phone: "",
  });

  // Handle input changes for both fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Mutation for tracking order
  const trackMutation = useMutation({
    mutationFn: trackOrder,
    onError: (error) => {
      console.error("Tracking failed:", error);
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.orderId || !formData.phone) return;
    trackMutation.mutate(formData);
  };

  // Extract order data from mutation result
  const orderData = trackMutation.data;

  // Visual Timeline Logic
  const statuses = ["Pending", "Confirmed", "Shipped", "Delivered"];
  const currentStatusIndex = orderData
    ? statuses.indexOf(orderData.status)
    : -1;
  const isCancelled = orderData?.status === "Cancelled";

  return (
    <PageTransition>
      <div className="bg-white min-h-[80vh] py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          {/* Header & Form Area */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-primary mb-4">
              Track Your Order
            </h1>
            <p className="text-gray-500 mb-8">
              Enter your Order ID and Phone Number to check your delivery
              status.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
            >
              <input
                type="text"
                name="orderId"
                required
                value={formData.orderId}
                onChange={handleInputChange}
                placeholder="Order ID (e.g., ORD-12345)"
                className="flex-1 px-4 py-4 border border-gray-200 focus:outline-none focus:border-brand-primary bg-gray-50 text-sm"
              />
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="flex-1 px-4 py-4 border border-gray-200 focus:outline-none focus:border-brand-primary bg-gray-50 text-sm"
              />
              <button
                type="submit"
                disabled={trackMutation.isPending}
                className="bg-brand-primary text-white px-8 py-4 font-semibold hover:bg-brand-accent transition-colors flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest text-sm shrink-0"
              >
                {trackMutation.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Search className="w-4 h-4" /> Track
                  </>
                )}
              </button>
            </form>

            {/* Error Message */}
            {trackMutation.isError && (
              <p className="text-red-500 mt-6 bg-red-50 p-4 border border-red-100 text-sm">
                {trackMutation.error?.response?.data?.message ||
                  "Order not found. Please check your details and try again."}
              </p>
            )}
          </div>

          {/* Results Area */}
          {orderData && (
            <div className="bg-gray-50 border border-gray-100 p-8">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8 border-b border-gray-200 pb-6">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                    Order Details
                  </p>
                  <h2 className="text-2xl font-display font-bold text-brand-primary">
                    {orderData.orderId}
                  </h2>
                </div>
                <div className="md:text-right">
                  <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                  <p className="font-bold text-brand-primary text-xl">
                    ৳{orderData.billing?.totalAmount}
                  </p>
                </div>
              </div>

              {/* Visual Progress Tracker */}
              <div className="mb-12">
                {isCancelled ? (
                  <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 border border-red-100">
                    <XCircle className="w-6 h-6" />
                    <div>
                      <p className="font-bold">Order Cancelled</p>
                      <p className="text-sm">
                        This order has been cancelled. Please contact support
                        for more details.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative flex justify-between">
                    {/* Background Track line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>

                    {/* Active Track line */}
                    <div
                      className="absolute top-1/2 left-0 h-1 bg-brand-primary -translate-y-1/2 z-0 transition-all duration-500"
                      style={{
                        width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%`,
                      }}
                    ></div>

                    {/* Status Nodes */}
                    {statuses.map((status, index) => {
                      const isCompleted = index <= currentStatusIndex;
                      const isActive = index === currentStatusIndex;

                      return (
                        <div
                          key={status}
                          className="relative z-10 flex flex-col items-center"
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 bg-white
                          ${isCompleted ? "border-brand-primary text-brand-primary" : "border-gray-300 text-gray-300"}
                          ${isActive ? "ring-4 ring-brand-primary/20" : ""}
                        `}
                          >
                            {index === 0 && <Clock className="w-5 h-5" />}
                            {index === 1 && <Package className="w-5 h-5" />}
                            {index === 2 && <Truck className="w-5 h-5" />}
                            {index === 3 && (
                              <CheckCircle2 className="w-5 h-5" />
                            )}
                          </div>
                          <p
                            className={`mt-3 text-xs sm:text-sm font-semibold uppercase tracking-wider absolute -bottom-8 w-max
                          ${isCompleted ? "text-brand-primary" : "text-gray-400"}
                        `}
                          >
                            {status}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Items Summary */}
              <div className="mt-16 pt-8 border-t border-gray-200">
                <h3 className="font-bold text-brand-primary mb-4">
                  Items in this Order
                </h3>
                <div className="space-y-3">
                  {orderData.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-sm bg-white p-4 border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-brand-primary">
                          {item.quantity}x
                        </span>
                        <div>
                          <p className="font-medium text-gray-800 line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-gray-500 text-xs">
                            Size: {item.size}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-brand-primary">
                        ৳{item.priceAtPurchase * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default TrackOrder;
