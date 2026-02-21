/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useQuery } from "@tanstack/react-query";
import {
  Check,
  ChevronRight,
  Loader2,
  Minus,
  Plus,
  Ruler,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductByCode } from "../../api/productApi";
import { useCartStore } from "../../store/useCartStore";

const ProductDetails = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", code],
    queryFn: () => fetchProductByCode(code),
    enabled: !!code,
  });

  useEffect(() => {
    if (product?.sizes) {
      const firstAvailable = product.sizes.find((s) => s.stock > 0);
      if (firstAvailable) setSelectedSize(firstAvailable.size);
    }
    setSelectedImage(0);
    setQuantity(1);
    setIsAdded(false);
  }, [product]);

  const handleAddToCart = () => {
    if (!selectedSize) return alert("Please select a size");
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Helper function to render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < Math.floor(rating) ? "text-brand-accent fill-brand-accent" : "text-gray-300"}`}
      />
    ));
  };

  if (isLoading)
    return (
      <div className="min-h-[70vh] flex justify-center items-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-brand-accent" />
      </div>
    );
  if (isError || !product)
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        Product Not Found
      </div>
    );

  return (
    <div className="bg-white min-h-screen pb-24 pt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-brand-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
          <Link
            to="/shop"
            className="hover:text-brand-primary transition-colors"
          >
            Shop
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
          <Link
            to={`/shop?category=${product.category}`}
            className="hover:text-brand-primary transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
          <span className="text-brand-primary font-medium truncate">
            {product.name}
          </span>
        </nav>

        {/* --- MAIN PRODUCT BLOCK --- */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-24">
          {/* LEFT: Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-24 h-fit">
            <div className="flex md:flex-col gap-4 overflow-x-auto md:w-20 lg:w-24 shrink-0 custom-scrollbar pb-2 md:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-24 md:w-full md:h-32 shrink-0 border-2 transition-all ${selectedImage === idx ? "border-brand-primary" : "border-transparent hover:border-gray-200"}`}
                >
                  <img
                    src={img}
                    alt={`view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            <div className="w-full bg-brand-muted aspect-3/4 relative overflow-hidden group">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT: Details & Add to Cart */}
          <div className="w-full lg:w-1/2 flex flex-col pt-2 lg:pt-0">
            <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-primary mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Quick Rating Preview */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {renderStars(product.averageRating || 5)}
              </div>
              <span className="text-sm text-gray-500">
                ({product.totalReviews || 0} Reviews)
              </span>
            </div>

            <div className="flex items-end gap-3 mb-6">
              <span className="text-2xl font-bold text-brand-primary">
                ৳{product.finalPrice}
              </span>
              {product.discount?.value > 0 && (
                <span className="text-lg text-gray-400 line-through mb-0.5">
                  ৳{product.price}
                </span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="border-t border-b border-gray-100 py-8 mb-8 space-y-8">
              {/* Size Selector */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-brand-primary">
                    Select Size
                  </span>
                  <button className="text-sm text-gray-500 flex items-center gap-1 hover:text-brand-primary">
                    <Ruler className="w-4 h-4" /> Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((variant) => {
                    const isAvailable = variant.stock > 0;
                    const isSelected = selectedSize === variant.size;
                    return (
                      <button
                        key={variant.size}
                        disabled={!isAvailable}
                        onClick={() => setSelectedSize(variant.size)}
                        className={`w-14 h-14 border flex justify-center items-center text-sm transition-all relative
                          ${isSelected ? "border-brand-primary bg-brand-primary text-white font-bold" : ""}
                          ${!isSelected && isAvailable ? "border-gray-200 text-gray-700 hover:border-brand-primary" : ""}
                          ${!isAvailable ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed" : ""}
                        `}
                      >
                        {variant.size}
                        {!isAvailable && (
                          <div className="absolute w-full h-px bg-gray-300 rotate-45"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-gray-200 w-fit h-14 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-brand-primary hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold text-brand-primary">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-brand-primary hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className={`flex-1 h-14 font-semibold flex justify-center items-center gap-2 uppercase tracking-widest text-sm transition-all
                    ${!selectedSize ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-brand-primary text-white hover:bg-brand-accent"}
                    ${isAdded ? "bg-green-600 text-white" : ""}
                  `}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5" /> Added
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" /> Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-gray-50 p-6 rounded-sm space-y-4">
              <div className="flex items-start gap-4">
                <Truck className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-brand-primary">
                    Nationwide Delivery
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Inside Chittagong: ৳80 | Outside Chittagong: ৳150
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- CUSTOMER REVIEWS SECTION --- */}
        <div className="border-t border-gray-200 pt-16 mt-16">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-primary">
              Customer Reviews
            </h2>
            <button className="text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors underline underline-offset-4 border-b-transparent">
              Write a Review
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Reviews Summary (Left) */}
            <div className="w-full lg:w-1/3">
              <div className="bg-gray-50 p-8 text-center border border-gray-100">
                <h3 className="text-5xl font-display font-bold text-brand-primary mb-4">
                  {product.averageRating || "5.0"}
                </h3>
                <div className="flex justify-center mb-2">
                  {renderStars(product.averageRating || 5)}
                </div>
                <p className="text-sm text-gray-500">
                  Based on {product.totalReviews || 0} Reviews
                </p>
              </div>
            </div>

            {/* Individual Reviews List (Right) */}
            <div className="w-full lg:w-2/3 space-y-8">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-100 pb-8 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-brand-primary flex items-center gap-2">
                          {review.user}
                          <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                            Verified
                          </span>
                        </p>
                        <div className="flex mt-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      "{review.comment}"
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">
                  No reviews yet. Be the first to review this product!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
