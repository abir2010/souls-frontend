import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      // --- DATA STATE ---
      items: [],

      // Store the dynamic settings here with default fallbacks
      discountConfig: {
        threshold: 5000,
        percentage: 5,
        deliveryChargeInside: 60,
        deliveryChargeOutside: 120,
      },

      // Action to sync the config from your backend
      setDiscountConfig: (
        threshold,
        percentage,
        deliveryChargeInside,
        deliveryChargeOutside,
      ) =>
        set({
          discountConfig: {
            threshold,
            percentage,
            deliveryChargeInside,
            deliveryChargeOutside,
          },
        }),

      addItem: (product, size) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.productId === product._id && item.size === size,
          );

          // If the exact product and size is already in the cart, just increase quantity
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productId === product._id && item.size === size
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
              isDrawerOpen: true, // Pop drawer open
            };
          }

          // Otherwise, add it as a new item
          return {
            items: [
              ...state.items,
              {
                productId: product._id,
                productCode: product.productCode,
                name: product.name,
                price: product.price,
                finalPrice: product.finalPrice,
                images: product.images,
                category: product.category,
                size,
                quantity: 1,
              },
            ],
            isDrawerOpen: true, // Pop drawer open
          };
        });
      },

      removeItem: (productId, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.productId === productId && item.size === size),
          ),
        }));
      },

      updateQuantity: (productId, size, quantity) => {
        set((state) => ({
          items:
            quantity === 0
              ? state.items.filter(
                  (i) => !(i.productId === productId && i.size === size),
                )
              : state.items.map((i) =>
                  i.productId === productId && i.size === size
                    ? { ...i, quantity }
                    : i,
                ),
        }));
      },

      clearCart: () => set({ items: [] }),

      // Helper to calculate totals instantly anywhere in the app
      getCartTotal: () => {
        const { items, discountConfig } = get();
        const subTotal = items.reduce(
          (total, item) => total + item.finalPrice * item.quantity,
          0,
        );

        // console.log(discountConfig);

        // 5% discount if subtotal is >= ৳5000
        const discount =
          subTotal >= discountConfig.threshold
            ? Math.round(subTotal * (discountConfig.percentage / 100))
            : 0;

        const total = subTotal - discount;

        return { subTotal, discount, total };
      },

      // --- UI STATE ---
      isDrawerOpen: false,
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
    }),
    {
      name: "souls-cart-storage", // The key used in localStorage
      partialize: (state) => ({ items: state.items }), // Only save items to storage
    },
  ),
);
