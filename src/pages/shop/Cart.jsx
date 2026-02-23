import {
  AlertCircle,
  ArrowRight,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "../../components/shared/PageTransition";
import { useCartStore } from "../../store/useCartStore";

const Cart = () => {
  // Pull data and functions from Zustand
  const { items, removeItem, updateQuantity, getCartTotal, discountConfig } =
    useCartStore();
  const { subTotal, discount, total } = getCartTotal();

  // Dynamic Discount Logic
  const discountThreshold = discountConfig.threshold;
  const amountNeeded = discountThreshold - subTotal;
  const progressPercentage = Math.min(
    (subTotal / discountThreshold) * 100,
    100,
  );

  // If cart is empty, show the Empty State
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm text-gray-300">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-display font-bold text-brand-primary mb-3">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. Explore our
          latest collections to find something you love.
        </p>
        <Link
          to="/shop"
          className="bg-brand-primary text-white px-8 py-4 font-semibold hover:bg-brand-accent transition-colors uppercase tracking-widest text-sm"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="bg-gray-50 min-h-screen py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-primary mb-10">
            Shopping Cart{" "}
            <span className="text-gray-400 text-xl font-normal">
              ({items.length} items)
            </span>
          </h1>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* LEFT COLUMN: Cart Items */}
            <div className="w-full lg:w-2/3 space-y-6">
              {/* Discount Progress Bar */}
              <div className="bg-white p-6 border border-gray-100 shadow-sm">
                {amountNeeded > 0 ? (
                  <>
                    <p className="text-brand-primary font-medium mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-brand-accent" />
                      Add{" "}
                      <span className="font-bold text-brand-accent">
                        ৳{amountNeeded}
                      </span>{" "}
                      more to unlock a {discountConfig.percentage}% discount!
                    </p>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-brand-accent h-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </>
                ) : (
                  <p className="text-green-600 font-medium flex items-center gap-2">
                    🎉 Congratulations! You've unlocked the{" "}
                    {discountConfig.percentage}% store-wide discount.
                  </p>
                )}
              </div>

              {/* Items List */}
              <div className="bg-white border border-gray-100 shadow-sm">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 border-b border-gray-100 last:border-0"
                  >
                    {/* Product Image */}
                    <Link
                      to={`/product/${item.productCode}`}
                      className="w-24 h-32 shrink-0 bg-gray-100 block"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 space-y-1">
                      <p className="text-xs text-gray-500 uppercase tracking-wider">
                        {item.category}
                      </p>
                      <Link
                        to={`/product/${item.productCode}`}
                        className="text-lg font-bold font-display text-brand-primary hover:text-brand-accent transition-colors block"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500">
                        Size:{" "}
                        <span className="font-semibold text-brand-primary">
                          {item.size}
                        </span>
                      </p>
                      <p className="text-brand-primary font-semibold mt-2 block sm:hidden">
                        ৳{item.finalPrice}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-200 w-fit">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.size,
                            item.quantity - 1,
                          )
                        }
                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-brand-primary hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center text-sm font-semibold text-brand-primary">
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
                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-brand-primary hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price & Remove (Desktop) */}
                    <div className="hidden sm:flex flex-col items-end justify-between h-full space-y-8 min-w-25">
                      <p className="text-brand-primary font-bold text-lg">
                        ৳{item.finalPrice * item.quantity}
                      </p>
                      <button
                        onClick={() => removeItem(item.productId, item.size)}
                        className="text-gray-400 hover:text-red-500 flex items-center gap-1 text-sm transition-colors"
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                    </div>

                    {/* Remove (Mobile) */}
                    <button
                      onClick={() => removeItem(item.productId, item.size)}
                      className="sm:hidden text-gray-400 hover:text-red-500 flex items-center gap-1 text-sm mt-2 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white p-8 border border-gray-100 shadow-sm sticky top-28">
                <h2 className="text-xl font-display font-bold text-brand-primary mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 text-sm mb-6 border-b border-gray-100 pb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-brand-primary">
                      ৳{subTotal}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-brand-accent font-medium">
                      <span>Discount ({discountConfig.percentage}%)</span>
                      <span>- ৳{discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-gray-400 text-xs text-right">
                      Calculated at checkout
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="text-brand-primary font-bold">
                    Estimated Total
                  </span>
                  <span className="text-2xl font-display font-bold text-brand-primary">
                    ৳{total}
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className="w-full bg-brand-primary text-white py-4 font-semibold hover:bg-brand-accent transition-colors flex justify-center items-center gap-2 uppercase tracking-widest text-sm"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>

                <p className="text-xs text-gray-400 text-center mt-4 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Secure checkout processing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Cart;
