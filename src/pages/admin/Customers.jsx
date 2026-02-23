import { useQuery } from "@tanstack/react-query";
import { Loader2, Mail, MapPin, Phone, Search, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { adminGetOrders } from "../../api/orderApi";

const Customers = () => {
  // Local state for search term
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all orders to aggregate customer data
  const { data: orders, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: adminGetOrders,
  });

  // Aggregate customer data from orders
  const customers = useMemo(() => {
    if (!orders) return [];

    const customerMap = {};

    orders.forEach((order) => {
      const { name, email, phone, city, address } = order.customer;

      // Use phone as the unique identifier for guest checkouts
      if (!customerMap[phone]) {
        customerMap[phone] = {
          name,
          email,
          phone,
          city,
          address,
          totalOrders: 0,
          totalSpent: 0,
          lastActive: new Date(order.createdAt),
        };
      }

      customerMap[phone].totalOrders += 1;
      customerMap[phone].totalSpent += order.billing.totalAmount;

      // Update last active date if this order is newer
      const orderDate = new Date(order.createdAt);
      if (orderDate > customerMap[phone].lastActive) {
        customerMap[phone].lastActive = orderDate;
      }
    });

    // Convert to array and sort by highest spender
    return Object.values(customerMap).sort(
      (a, b) => b.totalSpent - a.totalSpent,
    );
  }, [orders]);

  // Filter based on search
  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm),
  );

  // Show loader while fetching data
  if (isLoading)
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-primary w-8 h-8" />
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-primary">
            Customers
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Showing {filteredCustomers.length} unique customers.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-brand-primary text-sm shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Customer Profile</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium text-center">
                  Total Orders
                </th>
                <th className="px-6 py-4 font-medium text-right">
                  Lifetime Value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredCustomers.map((customer, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-brand-primary">
                      {customer.name}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      Last active: {customer.lastActive.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 space-y-1">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-3 h-3 text-gray-400" />{" "}
                      {customer.phone}
                    </div>
                    {customer.email && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-3 h-3 text-gray-400" />{" "}
                        {customer.email}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-900 font-medium">
                      <MapPin className="w-3 h-3 text-gray-400" />{" "}
                      {customer.city}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center bg-gray-100 text-brand-primary font-bold px-3 py-1 rounded-full text-xs">
                      {customer.totalOrders}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="font-bold text-brand-primary flex items-center justify-end gap-1">
                      ৳{customer.totalSpent}{" "}
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
