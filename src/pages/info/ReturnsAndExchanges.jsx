import { Mail, RefreshCcw, ShieldCheck } from "lucide-react";

const ReturnsAndExchanges = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-brand-primary mb-4">
            Returns & Exchanges
          </h1>
          <p className="text-gray-500">
            Your satisfaction is our priority. Here is how we handle returns.
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 space-y-8 animate-in fade-in slide-in-from-bottom-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-100 pb-8">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto text-brand-primary">
                <RefreshCcw className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900">7-Day Return</h3>
              <p className="text-sm text-gray-500">
                Return items within 7 days of delivery.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto text-brand-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900">Original Condition</h3>
              <p className="text-sm text-gray-500">
                Unworn, unwashed, with all original tags attached.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto text-brand-primary">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900">Easy Process</h3>
              <p className="text-sm text-gray-500">
                Email or inbox us on social media to initiate.
              </p>
            </div>
          </div>

          <div className="space-y-6 text-gray-600 leading-relaxed">
            <h3 className="text-xl font-bold text-brand-primary">
              Return Policy
            </h3>
            <p>
              We want you to love what you ordered from Souls Lifestyle. If
              something is not right, let us know. We gladly accept returns of
              unworn, unwashed, and undamaged merchandise with all tags intact
              within 7 days of delivery.
            </p>

            <h3 className="text-xl font-bold text-brand-primary mt-8">
              How to Exchange an Item
            </h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Contact our support team at{" "}
                <strong>support@soulslifestyle.com</strong> or via our Facebook
                page.
              </li>
              <li>Provide your Order ID and the reason for the exchange.</li>
              <li>Once approved, securely pack the item.</li>
              <li>
                Our delivery rider will pick up the return item and hand over
                the exchanged item simultaneously (applicable for Inside
                Chittagong). For outside Chittagong, you will need to courier
                the item back to our warehouse.
              </li>
            </ol>

            <h3 className="text-xl font-bold text-brand-primary mt-8">
              Non-Returnable Items
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-500">
              <li>Items bought during clearance or flash sales.</li>
              <li>Items without original tags or packaging.</li>
              <li>Items that show signs of wear, wash, or alteration.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsAndExchanges;
