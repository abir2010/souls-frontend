/* eslint-disable react-hooks/set-state-in-effect */
import {
  CreditCard,
  FileText,
  MapPin,
  Package,
  Save,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const OrderDetailsModal = ({
  order,
  isOpen,
  onClose,
  onUpdate,
  isUpdating,
}) => {
  // Local state for the editable fields
  const [formData, setFormData] = useState({
    status: "",
    paymentType: "",
    internalNotes: "",
  });

  // Sync local state when a new order is opened
  useEffect(() => {
    if (order) {
      setFormData({
        status: order.status || "Pending",
        paymentType: order.paymentType || "Cash On Delivery",
        internalNotes: order.internalNotes || "",
      });
    }
  }, [order]);

  if (!isOpen || !order) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(order._id, formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-gray-50 rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 bg-white border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-xl font-display font-bold text-brand-primary">
              Order Details: {order.orderId}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Placed on {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-brand-primary hover:bg-gray-50 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Customer & Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Info Card */}
              <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="font-bold text-brand-primary mb-4 flex items-center gap-2 border-b border-gray-50 pb-2">
                  <User className="w-4 h-4 text-gray-400" /> Customer
                  Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Name & Contact</p>
                    <p className="font-medium text-brand-primary">
                      {order.customer.name}
                    </p>
                    <p className="text-gray-600">{order.customer.phone}</p>
                    <p className="text-gray-600">{order.customer.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Shipping Address
                    </p>
                    <p className="font-medium text-brand-primary">
                      {order.customer.city}
                    </p>
                    <p className="text-gray-600 mt-1 leading-relaxed">
                      {order.customer.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Items Card */}
              <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="font-bold text-brand-primary mb-4 flex items-center gap-2 border-b border-gray-50 pb-2">
                  <Package className="w-4 h-4 text-gray-400" /> Purchased Items
                </h3>
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-sm"
                    >
                      <div>
                        <p className="font-bold text-brand-primary line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5">
                          SKU: {item.productCode} | Size:{" "}
                          <span className="font-semibold text-brand-primary">
                            {item.size}
                          </span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {item.quantity} × ৳{item.priceAtPurchase}
                        </p>
                        <p className="font-bold text-brand-primary mt-0.5">
                          ৳{item.quantity * item.priceAtPurchase}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Financial Summary */}
                <div className="mt-6 pt-4 border-t border-gray-100 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>৳{order.billing.subTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping Charge</span>
                    <span>৳{order.billing.shippingCharge}</span>
                  </div>
                  {order.billing.discountApplied > 0 && (
                    <div className="flex justify-between text-brand-accent font-medium">
                      <span>Discount</span>
                      <span>- ৳{order.billing.discountApplied}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg text-brand-primary pt-2 border-t border-gray-50 mt-2">
                    <span>Total Amount</span>
                    <span>৳{order.billing.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Admin Controls */}
            <div className="space-y-6">
              <form
                id="admin-update-form"
                onSubmit={handleSubmit}
                className="bg-white p-5 rounded-lg border border-brand-primary/20 shadow-sm shadow-brand-primary/5"
              >
                <h3 className="font-bold text-brand-primary mb-4 flex items-center gap-2 border-b border-gray-50 pb-2">
                  ⚙️ Admin Controls
                </h3>

                <div className="space-y-5">
                  {/* Status Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase">
                      Order Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Payment Type Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                      <CreditCard className="w-3 h-3" /> Payment Type
                    </label>
                    <select
                      value={formData.paymentType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          paymentType: e.target.value,
                        })
                      }
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                    >
                      <option value="Cash On Delivery">Cash On Delivery</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </div>

                  {/* Internal Notes Textarea */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                      <FileText className="w-3 h-3" /> Internal Notes
                    </label>
                    <textarea
                      value={formData.internalNotes}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          internalNotes: e.target.value,
                        })
                      }
                      rows="4"
                      placeholder="Add private notes (e.g., tracking number, customer requests)..."
                      className="w-full p-2.5 bg-yellow-50/50 border border-yellow-200 rounded-md text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary resize-none"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-md text-sm font-semibold text-gray-600 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="admin-update-form"
            disabled={isUpdating}
            className="bg-brand-primary text-white px-6 py-2.5 rounded-md font-semibold hover:bg-brand-accent transition-colors flex items-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isUpdating ? (
              "Saving..."
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
