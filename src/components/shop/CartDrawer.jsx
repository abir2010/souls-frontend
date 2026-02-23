import {
  AlertCircle,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";

const CartDrawer = () => {
  // Pull exactly what we need from your Zustand store
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    getCartTotal,
  } = useCartStore();

  // Calculate subtotal for the cart
  const { subTotal } = getCartTotal();

  // Dynamic Discount Logic
  const discountThreshold = 5000;
  const amountNeeded = discountThreshold - subTotal;
  const progressPercentage = Math.min(
    (subTotal / discountThreshold) * 100,
    100,
  );

  // Prevent the background page from scrolling when the drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  return (
    <>
      {/* Dark Overlay (Clicking it closes the drawer) */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-60 transition-opacity duration-300"
          onClick={closeDrawer}
        />
      )}

      {/* The Sliding Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-100 bg-white z-70 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <span className="font-display font-bold text-lg text-brand-primary flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Your Cart ({items.length})
          </span>
          <button
            onClick={closeDrawer}
            className="p-1 text-gray-400 hover:text-brand-primary transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Gamified Discount Progress Bar */}
        {items.length > 0 && (
          <div className="p-4 bg-gray-50 border-b border-gray-100">
            {amountNeeded > 0 ? (
              <>
                <p className="text-xs text-brand-primary font-medium mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-brand-accent" />
                  Add{" "}
                  <span className="font-bold text-brand-accent">
                    ৳{amountNeeded}
                  </span>{" "}
                  more for a 5% discount!
                </p>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-accent h-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </>
            ) : (
              <p className="text-xs text-green-600 font-medium flex items-center gap-1.5">
                🎉 You've unlocked the 5% store-wide discount!
              </p>
            )}
          </div>
        )}

        {/* Scrollable Items Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-gray-500 font-medium">Your cart is empty.</p>
              <button
                onClick={closeDrawer}
                className="text-brand-primary font-semibold hover:text-brand-accent underline underline-offset-4"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="flex gap-4"
              >
                {/* Item Image */}
                <div className="w-20 h-28 bg-gray-100 shrink-0 block">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Item Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-brand-primary line-clamp-2 pr-4">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.productId, item.size)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Size: {item.size}
                    </p>
                    <p className="text-brand-primary font-semibold text-sm mt-1">
                      ৳{item.finalPrice}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center border border-gray-200 w-fit h-8 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.size,
                          item.quantity - 1,
                        )
                      }
                      disabled={item.quantity <= 1} // Prevent going below 1 here
                      className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-brand-primary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.size,
                          item.quantity + 1,
                        )
                      }
                      className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-brand-primary hover:bg-gray-50"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout Buttons */}
        {items.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="font-bold text-brand-primary text-lg">
                ৳{subTotal}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-4 text-center">
              Shipping and discounts calculated at checkout.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                to="/cart"
                onClick={closeDrawer}
                className="w-full border border-brand-primary text-brand-primary py-3 font-semibold hover:bg-brand-primary hover:text-white transition-colors text-center uppercase tracking-widest text-xs"
              >
                View Full Cart
              </Link>
              <Link
                to="/checkout"
                onClick={closeDrawer}
                className="w-full bg-brand-primary text-white py-3 font-semibold hover:bg-brand-accent transition-colors flex justify-center items-center gap-2 uppercase tracking-widest text-xs"
              >
                Checkout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
