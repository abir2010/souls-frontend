import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { adminManageProduct, fetchProductByCode } from "../../api/productApi";
import ProductForm from "../../components/admin/ProductForm";

const EditProduct = () => {
   // Retrieves the productCode from the URL
  const { id: code } = useParams();

  // React Router's navigation hook
  const navigate = useNavigate();

  // React Query's client for managing cache and queries
  const queryClient = useQueryClient();

  // Fetch the existing product data
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", code],
    queryFn: () => fetchProductByCode(code),
  });

  // Setup the save mutation
  const mutation = useMutation({
    mutationFn: adminManageProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-products"]);
      queryClient.invalidateQueries(["product", code]);
      navigate("/admin/products");
    },
    onError: (error) => {
      alert(
        "Failed to update product: " +
          (error.response?.data?.message || error.message),
      );
    },
  });

  // Handle loading
  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-brand-primary" />
      </div>
    );
  }

  // Handle error
  if (isError) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md">
        Error loading product data. Please check the SKU.
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-brand-primary">
          Edit Product: {code}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Update inventory, adjust pricing, or change images.
        </p>
      </div>

      <ProductForm
        initialData={product}
        onSubmit={(data) => mutation.mutate(data)}
        isLoading={mutation.isPending}
      />
    </div>
  );
};

export default EditProduct;
