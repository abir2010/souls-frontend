import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { adminManageProduct } from "../../api/productApi";
import ProductForm from "../../components/admin/ProductForm";

const AddProduct = () => {
  // Get the navigate function to redirect after successful product addition
  const navigate = useNavigate();

  // Get the query client to invalidate product list after adding a new product
  const queryClient = useQueryClient();

  // Set up the mutation for adding a new product
  const mutation = useMutation({
    mutationFn: adminManageProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-products"]);
      navigate("/admin/products");
    },
    onError: (error) => {
      alert(
        "Failed to save product: " +
          (error.response?.data?.message || error.message),
      );
    },
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-brand-primary">
          Add New Product
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Fill in the details below to add a new item to your catalog.
        </p>
      </div>

      <ProductForm
        onSubmit={(data) => mutation.mutate(data)}
        isLoading={mutation.isPending}
      />
    </div>
  );
};

export default AddProduct;
