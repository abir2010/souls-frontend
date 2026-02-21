import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../api/productApi";
import ProductCard from "./ProductCard";

const NewArrivals = () => {
  // Fetch real data from the backend, passing the isNewProduct filter
  const {
    data: newProducts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["new-arrivals"],
    queryFn: () => fetchProducts({ isNewProduct: true, isPublished: true }),
  });

  // Loading State
  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-white flex justify-center items-center min-h-100">
        <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
      </section>
    );
  }

  // If there is an error or no new products, gracefully hide the section entirely
  if (isError || !newProducts || newProducts.length === 0) {
    return null;
  }

  // Limit to 4 products so the homepage grid stays perfectly balanced
  const displayProducts = newProducts.slice(0, 4);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-primary">
              New Arrivals
            </h2>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Explore the latest additions to our collection.
            </p>
          </div>

          <Link
            to="/shop?isNewProduct=true"
            className="hidden md:flex items-center text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors"
          >
            View All <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {displayProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Mobile "View All" Button */}
        <div className="mt-10 md:hidden flex justify-center">
          <Link
            to="/shop?isNewProduct=true"
            className="w-full border border-brand-primary text-brand-primary py-3 font-semibold text-center hover:bg-brand-primary hover:text-white transition-colors rounded-md"
          >
            View All Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
