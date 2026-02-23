import { CheckCircle, Copy, ShoppingBag, Truck } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageTransition from "../../components/shared/PageTransition";

const OrderSuccess = () => {
  // Get the order data from the location state
  const location = useLocation();

  // For redirecting if no order data is present
  const navigate = useNavigate();

  // Extract the order data passed from the Checkout page
  const orderData = location.state?.orderData;

  // If someone manually navigates to this page without an order, kick them back to the shop
  useEffect(() => {
    if (!orderData) {
      navigate("/shop");
    }
  }, [orderData, navigate]);

  if (!orderData) return null; // Prevent flash before redirect

  // Function to copy Order ID to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(orderData.orderId);
    alert("Order ID copied to clipboard!");
  };

  return (
    <PageTransition>
      <div className="bg-gray-50 min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full bg-white p-8 md:p-12 border border-gray-100 shadow-sm text-center">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>

          <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-primary mb-2">
            Thank you for your order!
          </h1>
          <p className="text-gray-500 mb-8 text-sm md:text-base">
            Your order has been placed successfully and is currently being
            processed. We will send you a confirmation SMS shortly.
          </p>

          {/* Order Details Box */}
          <div className="bg-gray-50 p-6 border border-gray-100 rounded-sm mb-8 text-left">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-200 pb-4 mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Number</p>
                <div className="flex items-center gap-2">
                  <p className="font-display font-bold text-xl text-brand-primary">
                    {orderData.orderId || "ORD-XXXXXX"}
                  </p>
                  <button
                    onClick={copyToClipboard}
                    className="text-gray-400 hover:text-brand-primary transition-colors"
                    title="Copy Order ID"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <div className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                    Copy this ID to track your Order
                  </div>
                </div>
              </div>
              <div className="md:text-right">
                <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                <p className="font-semibold text-brand-primary">
                  Cash on Delivery
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm text-gray-600">
              <Truck className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
              <p>
                Your items will be shipped to{" "}
                <strong>{orderData.customer?.city || "your city"}</strong>.
                Please keep the exact amount ready for the delivery executive.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/track"
              className="flex-1 sm:flex-none inline-flex justify-center items-center border-2 border-brand-primary text-brand-primary px-8 py-4 font-semibold hover:bg-brand-primary hover:text-white transition-colors uppercase tracking-widest text-sm"
            >
              Track Order
            </Link>
            <Link
              to="/shop"
              className="flex-1 sm:flex-none inline-flex justify-center items-center bg-brand-primary text-white px-8 py-4 font-semibold hover:bg-brand-accent transition-colors uppercase tracking-widest text-sm"
            >
              <ShoppingBag className="w-4 h-4 mr-2" /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default OrderSuccess;
