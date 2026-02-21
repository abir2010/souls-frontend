import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  Clock,
  DollarSign,
  Loader2,
  ShoppingBag,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { getDashboardStats } from "../../api/dashboardApi";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("7days");

  // Fetch real data based on the selected time range
  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dashboard-stats", timeRange],
    queryFn: () => getDashboardStats(timeRange),
    keepPreviousData: true, // Keeps the old charts visible while fetching new data
  });

  // Helper function for status badge colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (isLoading && !stats) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-brand-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 p-6 rounded-xl border border-red-100 flex items-start gap-3">
        <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
        <div>
          <h3 className="font-bold text-red-800">
            Failed to load Dashboard data
          </h3>
          <p className="text-sm text-red-600 mt-1">
            Check your backend server connection or the `/api/admin/dashboard`
            endpoint.
          </p>
        </div>
      </div>
    );
  }

  // Safely fallback data if backend properties are missing
  const kpi = stats?.kpi || {
    totalRevenue: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalCustomers: 0,
  };
  const salesData = stats?.salesTrend || [];
  const categoryData = stats?.categorySales || [];
  const recentOrders = stats?.recentOrders || [];

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* 1. Page Header & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-primary">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time metrics for your storefront.
          </p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border border-gray-200 rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary bg-white shadow-sm"
        >
          <option value="today">Today</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Total Revenue */}
        <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Total Revenue
              </p>
              <h3 className="text-2xl font-bold text-brand-primary">
                ৳{kpi.totalRevenue.toLocaleString()}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Total Orders
              </p>
              <h3 className="text-2xl font-bold text-brand-primary">
                {kpi.totalOrders}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-brand-primary" />
            </div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Pending Orders
              </p>
              <h3 className="text-2xl font-bold text-brand-primary">
                {kpi.pendingOrders}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Total Customers
              </p>
              <h3 className="text-2xl font-bold text-brand-primary">
                {kpi.totalCustomers}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Area Chart */}
        <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-brand-primary mb-6">
            Revenue Trend
          </h3>
          <div className="h-75 min-h-75 w-full">
            {salesData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={salesData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#111827" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#111827" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f3f4f6"
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickFormatter={(value) => `৳${value}`}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    formatter={(value) => [`৳${value}`, "Revenue"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#111827"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                No revenue data for this period.
              </div>
            )}
          </div>
        </div>

        {/* Category Sales Bar Chart */}
        <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-brand-primary mb-6">
            Sales by Category
          </h3>
          <div className="h-75 min-h-75 w-full">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  layout="vertical"
                  margin={{ top: 0, right: 0, left: 20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    stroke="#f3f4f6"
                  />
                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#374151", fontWeight: 500 }}
                  />
                  <RechartsTooltip
                    cursor={{ fill: "#f9fafb" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar
                    dataKey="sales"
                    fill="#111827"
                    radius={[0, 4, 4, 0]}
                    barSize={24}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                No category data.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Recent Orders Table */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-brand-primary">
            Recent Orders
          </h3>
          <Link
            to="/admin/orders"
            className="text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors"
          >
            View All Orders
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-brand-primary">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {order.customer?.name}
                    </td>
                    <td className="px-6 py-4 font-semibold text-brand-primary">
                      ৳{order.billing?.totalAmount}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(order.status)}`}
                      >
                        {order.status?.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
