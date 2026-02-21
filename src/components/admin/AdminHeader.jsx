import { Bell, Menu, Search } from "lucide-react";

const AdminHeader = ({ openMobileSidebar }) => {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
      {/* Left side: Mobile Toggle & Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={openMobileSidebar}
          className="p-2 -ml-2 text-gray-400 hover:text-brand-primary lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden sm:flex items-center bg-gray-50 px-3 py-2 rounded-md border border-gray-100 w-full max-w-md focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary transition-all">
          <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search orders, products, or customers..."
            className="bg-transparent border-none outline-none text-sm w-full text-brand-primary placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Right side: Notifications & Profile */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-brand-primary relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-accent rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-8 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
          A
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
