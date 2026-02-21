import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../api/productApi";
import CategoryShowcase from "./CategoryShowcase";

// A smart sub-component that handles its own data fetching
const CategorySection = ({
  categoryName,
  apiCategory,
  categoryImage,
  ctaLink,
  reverse,
}) => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["category-showcase", apiCategory],
    queryFn: () => fetchProducts({ category: apiCategory, isPublished: true }),
  });

  // Show a loading spinner while this specific category fetches
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-75">
        <Loader2 className="w-8 h-8 animate-spin text-brand-primary/50" />
      </div>
    );
  }

  // Gracefully hide the section if there are no products in this category yet
  if (isError || !products || products.length === 0) {
    return null;
  }

  return (
    <CategoryShowcase
      categoryName={categoryName}
      categoryImage={categoryImage}
      ctaLink={ctaLink}
      products={products.slice(0, 4)} // Pass only the top 4 products to the carousel/showcase
      reverse={reverse}
    />
  );
};

// The Main Component
const AllCategories = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Section Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-primary">
            Shop by Category
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Explore our diverse range of clothing categories to find your
            perfect style.
          </p>
        </div>

        <Link
          to="/shop"
          className="hidden md:flex items-center text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors"
        >
          View All <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-2 md:space-y-4">
        {/* 1. Panjabi Section */}
        <CategorySection
          categoryName="Premium Panjabi"
          apiCategory="Panjabi" // Must match Mongoose Enum exactly
          categoryImage="https://images.unsplash.com/photo-1765776748692-ce409b809816?w=800&q=80"
          ctaLink="/shop?category=Panjabi"
        />

        {/* 2. Casual Shirts Section (Image on Right) */}
        <CategorySection
          categoryName="Casual Shirts"
          apiCategory="Shirt"
          categoryImage="https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80"
          ctaLink="/shop?category=Shirt"
          reverse={true}
        />

        {/* 3. Pants Section */}
        <CategorySection
          categoryName="Trousers & Pants"
          apiCategory="Pant"
          categoryImage="https://images.unsplash.com/photo-1714729382668-7bc3bb261662?w=800&q=80"
          ctaLink="/shop?category=Pant"
        />

        {/* 4. T-Shirts Section (Image on Right) */}
        <CategorySection
          categoryName="T-Shirts & Tees"
          apiCategory="T-Shirt" // Corrected from "Tshirt" to match your DB schema
          categoryImage="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80"
          ctaLink="/shop?category=T-Shirt"
          reverse={true}
        />
      </div>
    </div>
  );
};

export default AllCategories;
