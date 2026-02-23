import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle,
  Eye,
  Loader2,
  PackageCheck,
  Truck,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { adminGetOrders, adminUpdateOrder } from "../../api/orderApi";
import OrderDetailsModal from "../../components/admin/OrderDetailsModal";

const Orders = () => {
  // Access the QueryClient to invalidate queries after updates
  const queryClient = useQueryClient();

  // State for the modal
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders using React Query
  const { data: orders, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: adminGetOrders,
  });

  // Mutation for updating order status or details
  const updateMutation = useMutation({
    mutationFn: adminUpdateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-orders"]);
      setSelectedOrder(null); // Close modal on success
    },
  });

  // Handle quick actions from the table
  const handleQuickStatusChange = (orderId, newStatus) => {
    updateMutation.mutate({ orderId, status: newStatus });
  };

  // Handle comprehensive updates from the Modal
  const handleModalUpdate = (orderId, updateData) => {
    updateMutation.mutate({ orderId, ...updateData });
  };

  // Function to get status styles based on order status
  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Confirmed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Shipped":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Show loader while fetching orders
  if (isLoading)
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-display font-bold text-brand-primary">
          Order Management
        </h1>
        <div className="text-sm text-gray-500 font-medium">
          Total Orders: {orders?.length}
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">Order ID</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">City</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">
                Update Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {orders?.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50 transition-colors group"
              >
                <td className="px-6 py-4 font-bold text-brand-primary">
                  {order.orderId}
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    {order.customer.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.customer.phone}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {order.customer.city}
                </td>
                <td className="px-6 py-4 font-bold text-brand-primary">
                  ৳{order.billing.totalAmount}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusStyle(order.status)}`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-1 items-center">
                    {/* View Details Button */}
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 text-gray-400 hover:text-brand-primary hover:bg-gray-200 rounded mr-2"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {order.status === "Pending" && (
                      <button
                        onClick={() =>
                          handleQuickStatusChange(order._id, "Confirmed")
                        }
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                        title="Confirm Order"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    {(order.status === "Confirmed" ||
                      order.status === "Pending") && (
                      <button
                        onClick={() =>
                          handleQuickStatusChange(order._id, "Shipped")
                        }
                        className="p-2 text-purple-500 hover:bg-purple-50 rounded"
                        title="Mark as Shipped"
                      >
                        <Truck className="w-4 h-4" />
                      </button>
                    )}
                    {order.status === "Shipped" && (
                      <button
                        onClick={() =>
                          handleQuickStatusChange(order._id, "Delivered")
                        }
                        className="p-2 text-green-500 hover:bg-green-50 rounded"
                        title="Mark as Delivered"
                      >
                        <PackageCheck className="w-4 h-4" />
                      </button>
                    )}
                    {order.status !== "Delivered" &&
                      order.status !== "Cancelled" && (
                        <button
                          onClick={() =>
                            handleQuickStatusChange(order._id, "Cancelled")
                          }
                          className="p-2 text-red-400 hover:bg-red-50 rounded"
                          title="Cancel Order"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdate={handleModalUpdate}
        isUpdating={updateMutation.isPending}
      />
    </div>
  );
};

export default Orders;
