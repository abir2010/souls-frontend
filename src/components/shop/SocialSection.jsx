import { Instagram } from "lucide-react";

// Dummy Instagram feed images
const instaImages = [
  "https://images.unsplash.com/photo-1667839410402-c4266dc7f1d0?w=500&q=80",
  "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=500&q=80",
  "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&q=80",
  "https://images.unsplash.com/photo-1687541160824-366bd3581699?w=500&q=80",
  "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=500&q=80",
];

const SocialSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-primary mb-3">
          Follow Us on Instagram
        </h2>
        <p className="text-gray-500 text-sm md:text-base mb-6">
          Tag{" "}
          <span className="text-brand-accent font-semibold">
            @SoulsLifestyle
          </span>{" "}
          to be featured on our page.
        </p>

        {/* Optional Follow Button */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 border-2 border-brand-primary text-brand-primary px-6 py-2 text-sm font-semibold hover:bg-brand-primary hover:text-white transition-colors"
        >
          <Instagram className="w-4 h-4" />
          <span>@SoulsLifestyle</span>
        </a>
      </div>

      {/* Edge-to-edge Instagram Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-1 md:gap-2 px-1 md:px-2">
        {instaImages.map((img, index) => (
          <a
            key={index}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-square overflow-hidden bg-gray-100"
          >
            <img
              src={img}
              alt={`Instagram post ${index + 1}`}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Instagram className="w-8 h-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default SocialSection;
