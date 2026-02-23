import {
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const AdminSidebar = ({ isMobileOpen, closeMobileSidebar }) => {
  // Define navigation links with their respective icons
  const navLinks = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
    { name: "Products", path: "/admin/products", icon: Package },
    { name: "Customers", path: "/admin/customers", icon: Users },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  // Define active and inactive link styles
  const activeClass =
    "flex items-center gap-3 px-4 py-3 bg-brand-primary text-white rounded-md transition-colors";
  const inactiveClass =
    "flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-brand-primary rounded-md transition-colors";

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`fixed inset-y-0 left-0 bg-white w-64 border-r border-gray-100 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Brand Logo */}
        <div className="h-20 flex items-center px-6 border-b border-gray-100 shrink-0">
          <Link
            to="/admin"
            className="font-display font-bold text-2xl tracking-tight text-brand-primary"
          >
            Souls<span className="text-brand-accent">Admin</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/admin"} // Exact match for dashboard root
                onClick={closeMobileSidebar}
                className={({ isActive }) =>
                  isActive ? activeClass : inactiveClass
                }
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{link.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 space-y-2 shrink-0">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-brand-primary rounded-md transition-colors w-full"
          >
            <ExternalLink className="w-5 h-5" />
            <span className="font-medium">View Storefront</span>
          </a>
          <button
            className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-md transition-colors w-full"
            onClick={() => {
              // Handle Logout Logic Here Later
              alert("Logging out...");
            }}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
