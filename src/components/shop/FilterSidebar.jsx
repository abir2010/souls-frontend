const FilterSidebar = ({
  categories,
  sizes,
  selectedCategory,
  setSelectedCategory,
  selectedSizes,
  handleSizeToggle,
  priceRange,
  setPriceRange,
}) => {
  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-semibold text-brand-primary uppercase tracking-widest mb-4">
          Categories
        </h3>
        <ul className="space-y-3">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setSelectedCategory(cat)}
                className={`text-sm hover:text-brand-accent transition-colors ${
                  selectedCategory === cat
                    ? "text-brand-accent font-semibold"
                    : "text-gray-500"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Size Filter */}
      <div>
        <h3 className="text-sm font-semibold text-brand-primary uppercase tracking-widest mb-4">
          Size
        </h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`w-10 h-10 border text-sm flex items-center justify-center transition-colors ${
                selectedSizes.includes(size)
                  ? "bg-brand-primary text-white border-brand-primary"
                  : "bg-white text-gray-600 border-gray-200 hover:border-brand-primary hover:text-brand-primary"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="text-sm font-semibold text-brand-primary uppercase tracking-widest mb-4">
          Max Price: ৳{priceRange}
        </h3>
        <input
          type="range"
          min="500"
          max="5000"
          step="100"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
        />
      </div>
    </div>
  );
};

export default FilterSidebar;
