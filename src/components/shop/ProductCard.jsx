import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";

const ProductCard = ({ product }) => {
  // Access the addItem function from the cart store
  const addItem = useCartStore((state) => state.addItem);

  // Extract only sizes that are actually in stock
  const availableSizes =
    product.sizes
      ?.filter((variant) => variant.stock > 0)
      .map((variant) => variant.size) || [];

  // Handle the quick add action
  const handleQuickAdd = (e) => {
    e.preventDefault();
    // Defaults to the first available size for the quick add
    if (availableSizes.length > 0) {
      addItem(product, availableSizes[0]);
    }
  };

  return (
    <Link
      to={`/product/${product.productCode}`}
      className="group flex flex-col cursor-pointer"
    >
      {/* Image Container with Hover Zoom */}
      <div className="relative overflow-hidden bg-brand-muted aspect-3/4 mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNewProduct && (
            <span className="bg-brand-primary text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
              New
            </span>
          )}
          {product.isTopSale > 0 && (
            <span className="bg-brand-accent text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
              Sale
            </span>
          )}
        </div>

        {/* Hover Action: Slide-up Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-white text-brand-primary py-3 text-sm font-semibold shadow-lg hover:bg-brand-accent hover:text-white flex justify-center items-center gap-2 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" /> Quick Add
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col space-y-1 px-1">
        <p className="text-gray-500 text-xs uppercase tracking-wider">
          {product.category}
        </p>
        <h3 className="text-brand-primary font-medium text-base truncate transition-colors group-hover:text-brand-accent">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-brand-primary font-semibold">
            ৳{product.finalPrice}
          </span>
          {product.discount?.value > 0 && (
            <span className="text-gray-400 line-through text-sm">
              ৳{product.price}
            </span>
          )}
        </div>
      </div>
      {/* NEW: Available Sizes UI */}
      <div className="flex flex-wrap gap-1 mt-2">
        {availableSizes.length > 0 ? (
          availableSizes.map((size) => (
            <span
              key={size}
              className="text-[10px] font-medium border border-gray-200 text-gray-500 px-1.5 py-0.5 hover:border-brand-primary hover:text-brand-primary transition-colors"
            >
              {size}
            </span>
          ))
        ) : (
          <span className="text-[10px] text-red-500 font-medium">
            Out of Stock
          </span>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
