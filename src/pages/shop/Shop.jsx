import { useQuery } from "@tanstack/react-query";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { fetchProducts } from "../../api/productApi";
import PageTransition from "../../components/shared/PageTransition";
import FilterSidebar from "../../components/shop/FilterSidebar";
import ProductCard from "../../components/shop/ProductCard";

const categories = ["All", "Panjabi", "Shirt", "T-Shirt", "Pant"];
const sizes = ["S", "M", "L", "XL", "32", "34"];
const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

const Shop = () => {
  // Mobile filter drawer state
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState(5000);
  const [sortBy, setSortBy] = useState("newest");

  // Toggle Size Selection
  const handleSizeToggle = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  // Data fetching with React Query - Includes all filter parameters in the query key and function
  const {
    data: allProducts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "products",
      { selectedCategory, selectedSizes, priceRange, sortBy },
    ],
    queryFn: () =>
      fetchProducts({
        category: selectedCategory !== "All" ? selectedCategory : undefined,
        sizes: selectedSizes.length > 0 ? selectedSizes.join(",") : undefined,
        maxPrice: priceRange,
        sort: sortBy,
      }),
    keepPreviousData: true,
  });

  // Memoized filtering logic - Swapped useEffect for useMemo
  const filteredProducts = useMemo(() => {
    // Safety check: Return empty array if data hasn't loaded yet
    if (!allProducts) return [];

    let result = [...allProducts];

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some(
          (variant) =>
            selectedSizes.includes(variant.size) && variant.stock > 0,
        ),
      );
    }

    result = result.filter((p) => p.finalPrice <= priceRange);

    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => a.finalPrice - b.finalPrice);
        break;
      case "price_desc":
        result.sort((a, b) => b.finalPrice - a.finalPrice);
        break;
      case "newest":
      default:
        result.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
        break;
    }

    return result;
  }, [selectedCategory, selectedSizes, priceRange, sortBy, allProducts]);

  // Object holding all props for the FilterSidebar to keep JSX clean
  const filterProps = {
    categories,
    sizes,
    selectedCategory,
    setSelectedCategory,
    selectedSizes,
    handleSizeToggle,
    priceRange,
    setPriceRange,
  };

  return (
    <PageTransition>
      <div className="bg-white min-h-screen pb-24">
        {/* Page Header */}
        <div className="bg-brand-primary py-16 md:py-24 text-center mb-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">
              Shop <span className="text-brand-accent">Now</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Explore our exclusive collection of men's fashion. From timeless
              panjabis to modern shirts, find your perfect style with us.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-1/4 shrink-0">
              <div className="sticky top-24">
                <FilterSidebar {...filterProps} />
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1">
              {/* Top Toolbar */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <p className="text-sm text-gray-500">
                  {isLoading
                    ? "Loading..."
                    : `Showing ${filteredProducts.length} results`}
                </p>

                <div className="flex items-center gap-4">
                  <button
                    className="lg:hidden flex items-center gap-2 text-sm font-medium border border-gray-200 px-4 py-2 hover:bg-gray-50"
                    onClick={() => setIsMobileFiltersOpen(true)}
                  >
                    <SlidersHorizontal className="w-4 h-4" /> Filters
                  </button>

                  <div className="relative group">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none border border-gray-200 text-sm font-medium px-4 py-2 pr-10 focus:outline-none focus:border-brand-primary cursor-pointer bg-white"
                    >
                      {sortOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              {isLoading ? (
                <div className="text-center py-24 text-gray-500">
                  Loading products...
                </div>
              ) : isError ? (
                <div className="text-center py-24 text-red-500">
                  Failed to load products.
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24">
                  <h3 className="text-xl font-display font-semibold text-gray-400 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedSizes([]);
                      setPriceRange(5000);
                    }}
                    className="mt-6 text-brand-primary font-semibold hover:text-brand-accent underline underline-offset-4"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>

        {/* Mobile Filters Drawer */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setIsMobileFiltersOpen(false)}
            />

            <div className="relative w-4/5 max-w-sm bg-white h-full shadow-xl ml-auto flex flex-col animate-slide-in-right">
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <span className="font-display font-bold text-lg">Filters</span>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="text-gray-400 hover:text-brand-primary"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                {/* Reuse the exact same component for mobile! */}
                <FilterSidebar {...filterProps} />
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full bg-brand-primary text-white py-3 font-semibold hover:bg-brand-accent transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Shop;
