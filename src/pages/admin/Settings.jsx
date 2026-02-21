/* eslint-disable react-hooks/set-state-in-effect */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Loader2, Percent, Save, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../../api/settingsApi";

const Settings = () => {
  const queryClient = useQueryClient();

  const { data: initialSettings, isLoading } = useQuery({
    queryKey: ["store-settings"],
    queryFn: getSettings,
  });

  const [formData, setFormData] = useState({
    shippingInsideChittagong: 80,
    shippingOutsideChittagong: 150,
    globalDiscountThreshold: 5000,
    globalDiscountPercentage: 5,
  });

  useEffect(() => {
    if (initialSettings) {
      setFormData({
        shippingInsideChittagong:
          initialSettings.logistics.deliveryChargeInside,
        shippingOutsideChittagong:
          initialSettings.logistics.deliveryChargeOutside,
        globalDiscountThreshold:
          initialSettings.promotions.globalDiscountThreshold,
        globalDiscountPercentage:
          initialSettings.promotions.globalDiscountPercentage,
      });
    }
  }, [initialSettings]);

  const mutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries(["store-settings"]);
      alert("Settings updated successfully!");
    },
    onError: (error) => {
      console.error(
        "Failed to update settings:",
        error.response?.data || error.message,
      );
      alert("Failed to update settings. Check console for details.");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      logistics: {
        deliveryChargeInside: formData.shippingInsideChittagong,
        deliveryChargeOutside: formData.shippingOutsideChittagong,
      },
      promotions: {
        globalDiscountThreshold: formData.globalDiscountThreshold,
        globalDiscountPercentage: formData.globalDiscountPercentage,
      },
    };

    mutation.mutate(payload);
  };

  if (isLoading)
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-primary" />
      </div>
    );

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-brand-primary">
          Store Configuration
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage global variables like shipping rates and discounts.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Shipping Settings */}
        <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm space-y-4">
          <h3 className="font-bold text-brand-primary border-b pb-2 flex items-center gap-2">
            <Truck className="w-5 h-5 text-gray-400" /> Shipping Rates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Inside Chittagong (৳)
              </label>
              <input
                type="number"
                name="shippingInsideChittagong"
                value={formData.shippingInsideChittagong}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Outside Chittagong (৳)
              </label>
              <input
                type="number"
                name="shippingOutsideChittagong"
                value={formData.shippingOutsideChittagong}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
              />
            </div>
          </div>
        </div>

        {/* Global Discount Settings */}
        <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm space-y-4">
          <h3 className="font-bold text-brand-primary border-b pb-2 flex items-center gap-2">
            <Percent className="w-5 h-5 text-gray-400" /> Automated Cart
            Discounts
          </h3>
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-md flex items-start gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              When a customer's cart subtotal reaches the{" "}
              <strong>Threshold</strong>, the system will automatically apply
              the <strong>Percentage</strong> discount to their order.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Cart Threshold (৳)
              </label>
              <input
                type="number"
                name="globalDiscountThreshold"
                value={formData.globalDiscountThreshold}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Discount Percentage (%)
              </label>
              <input
                type="number"
                name="globalDiscountPercentage"
                value={formData.globalDiscountPercentage}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-brand-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-brand-accent transition-colors flex items-center gap-2 shadow-lg disabled:opacity-70"
          >
            {mutation.isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" /> Save Configuration
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
