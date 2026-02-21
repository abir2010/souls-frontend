import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getSettings } from "../api/settingsApi";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import ScrollToTopButton from "../components/shared/ScrollToTopButton";
import { useCartStore } from "../store/useCartStore";

const MainLayout = () => {
  const setDiscountConfig = useCartStore((state) => state.setDiscountConfig);

  // Fetch the live settings from MongoDB
  const { data: settings } = useQuery({
    queryKey: ["store-settings"],
    queryFn: getSettings,
  });

  // Whenever the settings load or change, update the Zustand store
  useEffect(() => {
    if (settings?.promotions) {
      setDiscountConfig(
        settings.promotions.globalDiscountThreshold,
        settings.promotions.globalDiscountPercentage,
        settings.logistics.deliveryChargeInside,
        settings.logistics.deliveryChargeOutside,
      );
    }
  }, [settings, setDiscountConfig]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-slate-900">
      <Navbar />
      <main>
        <Outlet /> {/* This renders the specific page (Home, Shop, etc.) */}
      </main>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default MainLayout;

//  <main className="grow container mx-auto px-4 py-8"></main>
