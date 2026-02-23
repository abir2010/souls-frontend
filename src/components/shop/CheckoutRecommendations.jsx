import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { fetchProducts } from "../../api/productApi";
import { useCartStore } from "../../store/useCartStore";
import ProductCard from "./ProductCard";

// Map the cart category to the complementary recommendation category
const getTargetCategory = (primaryCartCategory) => {
  switch (primaryCartCategory) {
    case "Panjabi":
      return "Pajama";
    case "Pajama":
      return "Panjabi";
    case "Shirt":
      return "Pant";
    case "T-Shirt":
      return "Shirt";
    case "Pant":
      return "Shirt"; // Pair pants with shirts
    default:
      return "Panjabi"; // Fallback
  }
};

const CheckoutRecommendations = () => {
  // Access the cart items from the Zustand store
  const items = useCartStore((state) => state.items);

  // Identify what the user is primarily buying
  // Looking at the first item in the cart to determine the main outfit piece
  const primaryCartCategory = items.length > 0 ? items[0].category : null;
  const targetCategory = getTargetCategory(primaryCartCategory);

  // Fetch recommendations for that specific target category
  const { data: recommendations, isLoading } = useQuery({
    queryKey: ["recommendations", targetCategory],
    // Assuming fetchProducts API passes filters directly to Axios params
    queryFn: () => fetchProducts({ category: targetCategory }),
    enabled: items.length > 0, // Only run this query if the cart isn't empty
  });

  // Handle loading and empty states
  if (!items.length) return null;

  // Show a loading spinner while fetching recommendations
  if (isLoading) {
    return (
      <div className="mt-8 border-t border-gray-100 pt-6 flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
      </div>
    );
  }

  // Filter the results
  // Get an array of productCodes already in the cart so we don't recommend them again
  const cartProductCodes = items.map((item) => item.productCode);

  // Filter the recommendations to exclude items already in the cart and only show those with available stock, then take the top 3
  const suggestedProducts = recommendations
    ?.filter(
      (product) =>
        !cartProductCodes.includes(product.productCode) &&
        product.sizes.some((s) => s.stock > 0),
    )
    .slice(0, 3); // Grab the top 3 in-stock items

  // If there are no valid recommendations, don't render the section at all
  if (!suggestedProducts || suggestedProducts.length === 0) return null;

  return (
    <div className="bg-white mt-8 border-t border-gray-100 pt-8 animate-in fade-in">
      <h2 className="container mx-auto text-center text-2xl font-display font-bold text-gray-900 mb-4">
        You Might Also Like
      </h2>

      {/* Render the global ProductCard component instead of the inline HTML */}
      <div className="">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <main className="flex-1">
            <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-6">
              {suggestedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CheckoutRecommendations;
