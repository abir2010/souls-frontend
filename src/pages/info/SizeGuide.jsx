const SizeGuide = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 animate-in fade-in">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-brand-primary mb-4">
            Size Guide
          </h1>
          <p className="text-gray-500">
            Find your perfect fit. Measurements are in inches.
          </p>
        </div>

        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 space-y-12 animate-in fade-in">
          {/* Panjabi Size Chart */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-brand-primary border-b border-gray-100 pb-3">
              Premium Panjabi
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                    <th className="px-6 py-4 font-bold rounded-tl-lg">Size</th>
                    <th className="px-6 py-4 font-bold">Chest</th>
                    <th className="px-6 py-4 font-bold">Length</th>
                    <th className="px-6 py-4 font-bold rounded-tr-lg">
                      Sleeve
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-brand-primary">
                      S (38)
                    </td>
                    <td className="px-6 py-4">40"</td>
                    <td className="px-6 py-4">38"</td>
                    <td className="px-6 py-4">24"</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-brand-primary">
                      M (40)
                    </td>
                    <td className="px-6 py-4">42"</td>
                    <td className="px-6 py-4">40"</td>
                    <td className="px-6 py-4">24.5"</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-brand-primary">
                      L (42)
                    </td>
                    <td className="px-6 py-4">44"</td>
                    <td className="px-6 py-4">42"</td>
                    <td className="px-6 py-4">25"</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-brand-primary">
                      XL (44)
                    </td>
                    <td className="px-6 py-4">46"</td>
                    <td className="px-6 py-4">44"</td>
                    <td className="px-6 py-4">25.5"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Note */}
          <div className="bg-brand-primary/5 p-4 rounded-lg border border-brand-primary/20 text-sm text-brand-primary font-medium">
            💡 Pro Tip: Measure a well-fitting garment from your wardrobe flat
            on a table, and compare it against our chart above to find your
            ideal fit.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
