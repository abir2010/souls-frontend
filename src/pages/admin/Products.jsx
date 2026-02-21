import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Edit3,
  ExternalLink,
  Loader2,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { adminDeleteProduct, fetchProducts } from "../../api/productApi";

const AdminProducts = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Fetch Products using your actual API function
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => fetchProducts(), // No filters passed by default, fetches all
  });

  // 2. Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: adminDeleteProduct,
    onSuccess: () => {
      // Refresh the table instantly after a successful deletion
      queryClient.invalidateQueries(["admin-products"]);
    },
    onError: (error) => {
      alert(
        "Failed to delete product. " + (error.response?.data?.message || ""),
      );
    },
  });

  // Handle Delete Click
  const handleDelete = (id, name) => {
    if (
      window.confirm(
        `Are you absolutely sure you want to delete "${name}"? This cannot be undone.`,
      )
    ) {
      deleteMutation.mutate(id);
    }
  };

  // 3. Client-Side Search Filter (Instant visual filtering)
  const filteredProducts = products?.filter((product) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      product.name?.toLowerCase().includes(searchLower) ||
      product.productCode?.toLowerCase().includes(searchLower) ||
      product.category?.toLowerCase().includes(searchLower)
    );
  });

  // Loading State
  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-brand-primary" />
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-100 font-medium">
        Failed to load products. Please check your backend connection.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-primary">
            Products Inventory
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your catalog, stock levels, and pricing.
          </p>
        </div>
        <Link
          to="/admin/products/add"
          className="bg-brand-primary text-white px-5 py-2.5 rounded-md font-semibold hover:bg-brand-accent transition-colors flex items-center gap-2 text-sm shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </Link>
      </div>

      {/* Search Toolbar */}
      <div className="bg-white p-4 border border-gray-100 rounded-xl shadow-sm flex items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, SKU, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-sm transition-all"
          />
        </div>
      </div>

      {/* Products Data Table */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Product Details
                </th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Category
                </th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Pricing
                </th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Total Stock
                </th>
                <th className="px-6 py-4 font-medium text-right whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {!filteredProducts || filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    {products?.length === 0
                      ? "Your inventory is currently empty. Click 'Add New Product' to get started!"
                      : `No products found matching "${searchTerm}".`}
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  // Calculate total stock dynamically by summing up all sizes (S, M, L, XL)
                  const totalStock =
                    product.sizes?.reduce(
                      (sum, sizeObj) => sum + sizeObj.stock,
                      0,
                    ) || 0;

                  return (
                    <tr
                      key={product._id}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      {/* Image + Name + SKU */}
                      <td className="px-6 py-4 min-w-62.5">
                        <div className="flex items-center gap-4">
                          <img
                            src={product.images?.[0] || "/placeholder.png"}
                            alt={product.name}
                            className="w-12 h-16 object-cover bg-gray-100 rounded border border-gray-200 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-brand-primary line-clamp-2">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-500 font-mono mt-1">
                              SKU: {product.productCode}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-700 bg-gray-100 px-2.5 py-1 rounded text-xs font-medium">
                          {product.category}
                        </span>
                      </td>

                      {/* Pricing */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-bold text-brand-primary text-base">
                            ৳{product.finalPrice}
                          </span>
                          {product.price > product.finalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              ৳{product.price}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Stock Badges */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {totalStock === 0 ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-700 border border-red-200">
                            OUT OF STOCK
                          </span>
                        ) : totalStock <= 10 ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-100 text-orange-700 border border-orange-200">
                            LOW STOCK ({totalStock})
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 border border-green-200">
                            IN STOCK ({totalStock})
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex justify-end gap-1 items-center">
                          {/* View on Live Store */}
                          <Link
                            to={`/product/${product.productCode}`}
                            target="_blank"
                            title="View on Storefront"
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          {/* Edit Product - Using productCode as you requested previously */}
                          <Link
                            to={`/admin/products/edit/${product.productCode}`}
                            title="Edit Product"
                            className="p-2 text-gray-400 hover:text-brand-primary hover:bg-gray-100 rounded-md transition-all"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>

                          {/* Delete Product */}
                          <button
                            onClick={() =>
                              handleDelete(product._id, product.name)
                            }
                            disabled={deleteMutation.isPending}
                            title="Delete Product"
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all disabled:opacity-50"
                          >
                            {deleteMutation.isPending ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
