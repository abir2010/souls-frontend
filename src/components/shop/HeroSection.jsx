/* eslint-disable react-hooks/refs */
// src/components/shop/HeroSection.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Dummy Data for the Carousel (Replace with real Cloudinary URLs later)
const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    title: "New Season Collection",
    subtitle: "Discover the latest trends in contemporary fashion.",
    ctaText: "Shop Now",
    ctaLink: "/shop/new",
  },
  {
    id: 2,
    // Using a different style image to show versatility
    image:
      "https://images.unsplash.com/photo-1572611932849-7f0f116fb2f1?q=80&w=2071&auto=format&fit=crop",
    title: "Premium Panjabis",
    subtitle: "Elegance crafted for every occasion.",
    ctaText: "View Panjabis",
    ctaLink: "/shop/panjabi",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?q=80&w=2070&auto=format&fit=crop",
    title: "Casual Redefined",
    subtitle: "Effortless style for your everyday look.",
    ctaText: "Explore Shirts",
    ctaLink: "/shop/shirts",
  },
];

const HeroSection = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] bg-brand-primary">
      {/* Custom CSS for the "Ken Burns" Zoom Effect */}
      <style>
        {`
          .swiper-slide-active .hero-bg-image {
            transform: scale(1.1);
            transition: transform 8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          .hero-bg-image {
              transition: transform 1s ease-out; /* Reset quickly on exit */
              transform: scale(1);
          }
        `}
      </style>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect={"fade"} // Smooth crossfade between slides
        speed={800} // Transition speed in ms
        loop={true}
        autoplay={{
          delay: 5000, // 5 seconds per slide
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        pagination={{ clickable: true }}
        // We need to re-assign refs after initialization for custom nav buttons
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }}
        className="h-full w-full relative group"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative overflow-hidden">
            {/* Background Image Container (for Zoom Effect) */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              {/* The actual image that gets scaled */}
              <div
                className="hero-bg-image w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
                role="img"
                aria-label={slide.title}
              />
            </div>

            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />

            {/* Text Content */}
            <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center z-10">
              <div className="max-w-xl space-y-6 animate-fade-in-up">
                {/* Subtitle with an accent line */}
                <div className="flex items-center space-x-4">
                  <div className="h-0.5 w-12 bg-brand-accent"></div>
                  <p className="text-brand-accent font-medium tracking-widest uppercase text-sm md:text-base">
                    {slide.subtitle}
                  </p>
                </div>

                {/* Main Title */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight drop-shadow-lg">
                  {slide.title}
                </h1>

                {/* CTA Button */}
                <div className="pt-4">
                  <a
                    href={slide.ctaLink}
                    className="inline-block bg-white text-brand-primary font-semibold py-4 px-10 rounded-none hover:bg-brand-accent hover:text-white transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-md tracking-wider uppercase text-sm"
                  >
                    {slide.ctaText}
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Nav Arrows (Hidden on mobile, visible on hover on desktop) */}
        <div className="hidden md:block">
          <button
            ref={navigationPrevRef}
            className="absolute top-1/2 left-4 z-20 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-brand-accent hover:text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            ref={navigationNextRef}
            className="absolute top-1/2 right-4 z-20 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-brand-accent hover:text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </Swiper>

      {/* Customizing Swiper Pagination dots via Tailwind arbitrary values in global CSS is recommended, but this works out of the box */}
    </div>
  );
};

export default HeroSection;
