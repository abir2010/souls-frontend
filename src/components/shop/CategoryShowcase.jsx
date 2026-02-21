import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./ProductCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

const CategoryShowcase = ({
  categoryName,
  categoryImage,
  products,
  reverse = false,
  ctaLink = "#",
}) => {
  return (
    <section className="py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col lg:flex-row gap-8 lg:gap-12 ${reverse ? "lg:flex-row-reverse" : ""}`}
        >
          {/* 1. Category Feature Image (Left/Right side) */}
          <div className="w-full lg:w-1/3 shrink-0 group relative overflow-hidden h-100 md:h-125">
            <img
              src={categoryImage}
              alt={categoryName}
              className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Dark Gradient Overlay for Text */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
                {categoryName}
              </h2>
              <Link
                to={ctaLink}
                className="inline-flex items-center text-sm font-semibold text-white hover:text-brand-accent transition-colors uppercase tracking-widest"
              >
                Explore Collection <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 2. Horizontal Product Carousel (Right/Left side) */}
          <div className="w-full lg:w-2/3 flex items-center min-w-0">
            {/* Note: min-w-0 is crucial to prevent flexbox from blowing out Swiper's width */}
            <Swiper
              modules={[Navigation, FreeMode]}
              spaceBetween={20}
              freeMode={true} // Allows smooth drag scrolling like native mobile apps
              navigation={true}
              breakpoints={{
                // Mobile: Show 1.5 cards so user knows they can swipe
                320: { slidesPerView: 1.2 },
                // Tablet
                640: { slidesPerView: 2.2 },
                // Desktop
                1024: { slidesPerView: 2.5 },
                1280: { slidesPerView: 3 },
              }}
              className="w-full pb-10! category-swiper"
            >
              {products.map((product) => (
                <SwiperSlide key={product._id} className="h-auto">
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Minor CSS tweak to format Swiper's default navigation arrows for this section */}
      <style>{`
        .category-swiper .swiper-button-next,
        .category-swiper .swiper-button-prev {
          top: auto;
          bottom: 0;
          width: 20px;
          height: 20px;
          background-color: transparent;
          color: #1a1a1a;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #f4f4f4;
        }
        .category-swiper .swiper-button-next:after,
        .category-swiper .swiper-button-prev:after {
          font-size: 14px;
          font-weight: bold;
        }
        .category-swiper .swiper-button-prev { left: 40%; transform: translateX(-120%); }
        .category-swiper .swiper-button-next { right: 40%; transform: translateX(120%); }
        @media (min-width: 1024px) {
          .category-swiper .swiper-button-prev { left: auto; right: 60px; }
          .category-swiper .swiper-button-next { right: 40px; }
        }
      `}</style>
    </section>
  );
};

export default CategoryShowcase;
