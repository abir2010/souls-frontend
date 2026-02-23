import { Award, RefreshCw, ShieldCheck, Truck } from "lucide-react";

// Feature data for the shop features section
const features = [
  {
    id: 1,
    icon: Award,
    title: "Premium Quality",
    description: "Crafted with the finest materials for ultimate comfort.",
  },
  {
    id: 2,
    icon: RefreshCw,
    title: "Cash on Delivery",
    description:
      "Try before you buy. Pay only when you receive your order at your doorstep.",
  },
  {
    id: 3,
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Express delivery across Bangladesh. Order today, wear tomorrow.",
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure checkout with SSL encryption and local gateways.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gray-50 border-t border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                  <Icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-display font-bold text-brand-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-62.5">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
