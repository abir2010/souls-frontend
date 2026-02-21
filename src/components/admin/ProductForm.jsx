/* eslint-disable react-hooks/set-state-in-effect */
import {
  Image as ImageIcon,
  Loader2,
  Plus,
  Save,
  Settings,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const ProductForm = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    productCode: "",
    category: "Panjabi",
    price: "",
    discountType: "percentage",
    discountValue: 0,
    description: "",
    images: [],
    sizes: [{ size: "M", stock: 10, sku: "" }],
    isPublished: false,
    isFeatured: false,
    isTopSale: false,
    isNewProduct: false,
  });

  // Load initial data if editing
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        discountType: initialData.discount?.type || "percentage",
        discountValue: initialData.discount?.value || 0,
        sizes: initialData.sizes?.length
          ? initialData.sizes
          : [{ size: "M", stock: 10, sku: "" }],
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // --- Native File Upload Handling ---
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (formData.images.length + files.length > 5) {
      alert("You can only upload a maximum of 5 images.");
      return;
    }
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  // --- Dynamic Size Handling ---
  const handleSizeChange = (index, field, value) => {
    const newSizes = [...formData.sizes];
    newSizes[index][field] = field === "stock" ? parseInt(value) || 0 : value;
    setFormData((prev) => ({ ...prev, sizes: newSizes }));
  };

  const addSizeField = () =>
    setFormData((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { size: "", stock: 0, sku: "" }],
    }));
  const removeSizeField = (index) =>
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index),
    }));

  // --- Packaging FormData ---
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("productCode", formData.productCode);
    payload.append("category", formData.category);
    payload.append("price", formData.price);
    payload.append("description", formData.description);

    // Append nested Discount object
    payload.append("discount[type]", formData.discountType);
    payload.append("discount[value]", formData.discountValue);

    // Append Boolean Flags
    payload.append("isPublished", formData.isPublished);
    payload.append("isFeatured", formData.isFeatured);
    payload.append("isTopSale", formData.isTopSale);
    payload.append("isNewProduct", formData.isNewProduct);

    // Append nested Sizes array
    formData.sizes.forEach((item, index) => {
      payload.append(`sizes[${index}][size]`, item.size);
      payload.append(`sizes[${index}][stock]`, item.stock);
      if (item.sku) payload.append(`sizes[${index}][sku]`, item.sku);
    });

    // Append Images
    formData.images.forEach((image) => {
      payload.append("images", image);
    });

    onSubmit(payload);
  };

  // Calculate final price for UI preview
  const finalPrice =
    formData.discountType === "percentage"
      ? formData.price - formData.price * (formData.discountValue / 100)
      : formData.price - formData.discountValue;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Basic Info, Sizes, & Admin Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm space-y-4">
            <h3 className="font-bold text-brand-primary border-b pb-2">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2.5 border rounded-md focus:ring-1 focus:ring-brand-primary outline-none text-sm"
                  placeholder="Premium Silk Panjabi"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Product Code (SKU)
                </label>
                <input
                  type="text"
                  name="productCode"
                  required
                  value={formData.productCode}
                  onChange={handleChange}
                  className="w-full p-2.5 border rounded-md focus:ring-1 focus:ring-brand-primary outline-none text-sm uppercase"
                  placeholder="SL-101"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md focus:ring-1 focus:ring-brand-primary outline-none text-sm"
              >
                <option value="Panjabi">Panjabi</option>
                <option value="Pajama">Pajama</option>
                <option value="Shirt">Shirt</option>
                <option value="T-Shirt">T-Shirt</option>
                <option value="Pant">Pant</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Description
              </label>
              <textarea
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md focus:ring-1 focus:ring-brand-primary outline-none resize-none text-sm"
                placeholder="Describe the fabric, fit, and style..."
              ></textarea>
            </div>
          </div>

          {/* Inventory & Sizes */}
          <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-brand-primary">
                Inventory & Sizes
              </h3>
              <button
                type="button"
                onClick={addSizeField}
                className="text-xs font-bold text-brand-primary hover:text-brand-accent flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Size
              </button>
            </div>
            <div className="space-y-3">
              {formData.sizes.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-end animate-in fade-in slide-in-from-top-1 bg-gray-50 p-3 rounded-md border border-gray-100"
                >
                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">
                      Size
                    </label>
                    <input
                      type="text"
                      required
                      value={item.size}
                      onChange={(e) =>
                        handleSizeChange(index, "size", e.target.value)
                      }
                      className="w-full p-2 border rounded-md text-sm outline-none focus:border-brand-primary"
                      placeholder="e.g. 42, M"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">
                      Stock
                    </label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={item.stock}
                      onChange={(e) =>
                        handleSizeChange(index, "stock", e.target.value)
                      }
                      className="w-full p-2 border rounded-md text-sm outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">
                      Sub-SKU (Opt)
                    </label>
                    <input
                      type="text"
                      value={item.sku}
                      onChange={(e) =>
                        handleSizeChange(index, "sku", e.target.value)
                      }
                      className="w-full p-2 border rounded-md text-sm outline-none focus:border-brand-primary"
                      placeholder="SL-101-M"
                    />
                  </div>
                  {formData.sizes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSizeField(index)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Admin Controls / Visibility */}
          <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm space-y-4">
            <h3 className="font-bold text-brand-primary border-b pb-2 flex items-center gap-2">
              <Settings className="w-4 h-4" /> Storefront Visibility
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  className="w-4 h-4 text-brand-primary focus:ring-brand-primary rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">
                  Published
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-4 h-4 text-brand-primary focus:ring-brand-primary rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">
                  Featured
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isTopSale"
                  checked={formData.isTopSale}
                  onChange={handleChange}
                  className="w-4 h-4 text-brand-primary focus:ring-brand-primary rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">
                  Top Sale
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isNewProduct"
                  checked={formData.isNewProduct}
                  onChange={handleChange}
                  className="w-4 h-4 text-brand-primary focus:ring-brand-primary rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">
                  New Arrival
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Images */}
        <div className="space-y-6">
          {/* Pricing */}
          <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm space-y-4">
            <h3 className="font-bold text-brand-primary border-b pb-2">
              Pricing Structure
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Base Price (৳)
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2.5 border rounded-md text-sm outline-none focus:border-brand-primary"
                />
              </div>

              <div className="flex gap-2">
                <div className="space-y-1 flex-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Discount Type
                  </label>
                  <select
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleChange}
                    className="w-full p-2.5 border rounded-md text-sm outline-none focus:border-brand-primary bg-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Amount (৳)</option>
                  </select>
                </div>
                <div className="space-y-1 flex-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Value
                  </label>
                  <input
                    type="number"
                    name="discountValue"
                    min="0"
                    value={formData.discountValue}
                    onChange={handleChange}
                    className="w-full p-2.5 border rounded-md text-sm outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              <div className="p-4 bg-brand-primary/5 rounded-md border border-brand-primary/20">
                <p className="text-xs font-semibold text-brand-primary uppercase mb-1">
                  Final Selling Price
                </p>
                <p className="text-2xl font-bold text-brand-primary">
                  ৳{isNaN(finalPrice) ? 0 : Math.max(0, finalPrice.toFixed(0))}
                </p>
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-brand-primary flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Media
              </h3>
              <span className="text-xs text-gray-400">
                {formData.images.length}/5
              </span>
            </div>

            {formData.images.length < 5 && (
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-brand-primary/5 hover:border-brand-primary transition-colors cursor-pointer group">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <UploadCloud className="mx-auto h-8 w-8 text-gray-400 group-hover:text-brand-primary transition-colors" />
                <span className="mt-2 block text-xs font-semibold text-gray-600">
                  Click or drag images here
                </span>
              </div>
            )}

            {formData.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {formData.images.map((image, index) => {
                  const previewUrl =
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image);
                  return (
                    <div
                      key={index}
                      className="relative group rounded-md overflow-hidden border border-gray-200 aspect-3/4"
                    >
                      <img
                        src={previewUrl}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-white/90 text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold hover:bg-brand-accent transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20 disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" /> Save Product
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
