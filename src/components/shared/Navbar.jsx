import { Menu, Search, ShoppingBag, Truck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";

const Navbar = () => {
  // State to manage mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Calculate total items in cart for the badge
  const cartItems = useCartStore((state) => state.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Prevent background scrolling when the mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Active link styling function
  const navLinkClass = ({ isActive }) =>
    `text-md font-medium transition-colors hover:text-brand-accent ${
      isActive ? "text-brand-accent" : "text-brand-primary"
    }`;

  // Helper to close menu
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="shrink-0 flex items-center">
              <img
                src="/souls-logo.jpg"
                alt="Brand Logo"
                className="h-18 w-auto mr-2"
              />
              <Link
                to="/"
                className="font-display font-bold text-3xl tracking-tight text-brand-primary"
              >
                Souls<span className="text-brand-accent">Lifestyle</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/shop" className={navLinkClass}>
                Shop
              </NavLink>
              <NavLink to="/location" className={navLinkClass}>
                Our Store
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                About Us
              </NavLink>
              <NavLink to="/track" className={navLinkClass}>
                <div className="flex items-center gap-1">
                  <Truck className="w-5 h-5" /> Track Your Order
                </div>
              </NavLink>
            </div>

            {/* Icons (Desktop & Mobile) */}
            <div className="flex items-center space-x-5">
              <input
                type="text"
                placeholder="Search..."
                className="hidden md:block border border-gray-300 rounded-md px-3 py-1 text-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-colors"
              />
              <button className="text-brand-primary hover:text-brand-accent transition-colors">
                <Search className="h-5 w-5" />
              </button>

              {/* Cart Icon with Badge */}
              <Link
                to="/cart"
                className="relative text-brand-primary hover:text-brand-accent transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle - Only Opens Drawer */}
              <button
                className="md:hidden text-brand-primary hover:text-brand-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- MOBILE DRAWER UI --- */}

      {/* Dark Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity"
          onClick={closeMenu}
        />
      )}

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <span className="font-display font-bold text-lg tracking-tight text-brand-primary">
            Menu
          </span>
          <button
            onClick={closeMenu}
            className="p-1 text-gray-400 hover:text-brand-primary transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex flex-col py-4 grow">
          <NavLink
            to="/"
            onClick={closeMenu}
            className="px-6 py-4 text-base font-medium text-gray-900 border-b border-gray-50 hover:bg-gray-50 hover:text-brand-accent transition-colors"
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            onClick={closeMenu}
            className="px-6 py-4 text-base font-medium text-gray-900 border-b border-gray-50 hover:bg-gray-50 hover:text-brand-accent transition-colors"
          >
            Shop
          </NavLink>
          <NavLink
            to="/location"
            onClick={closeMenu}
            className="px-6 py-4 text-base font-medium text-gray-900 border-b border-gray-50 hover:bg-gray-50 hover:text-brand-accent transition-colors"
          >
            Our Store
          </NavLink>
          <NavLink
            to="/about"
            onClick={closeMenu}
            className="px-6 py-4 text-base font-medium text-gray-900 border-b border-gray-50 hover:bg-gray-50 hover:text-brand-accent transition-colors"
          >
            About Us
          </NavLink>
          <NavLink
            to="/track"
            className="flex items-center gap-2 px-3 py-3 text-base font-semibold text-brand-primary bg-brand-primary/5 border-l-4 border-brand-primary"
          >
            <Truck className="w-5 h-5" /> Track Your Order
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;
