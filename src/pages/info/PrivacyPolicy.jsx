import { Eye, Lock, Shield } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-brand-primary mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500">Last updated: February 2026</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-100 pb-8 mb-8">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto text-brand-primary">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900">Data Protection</h3>
              <p className="text-xs text-gray-500">
                Your data is securely stored and never sold.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto text-brand-primary">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900">Secure Checkout</h3>
              <p className="text-xs text-gray-500">
                End-to-end encryption for all transactions.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto text-brand-primary">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900">Transparency</h3>
              <p className="text-xs text-gray-500">
                Clear visibility on how we use your information.
              </p>
            </div>
          </div>

          <div className="space-y-8 text-gray-600 leading-relaxed text-sm md:text-base">
            <section>
              <h3 className="text-xl font-bold text-brand-primary mb-3">
                1. Information We Collect
              </h3>
              <p>
                When you visit Souls Lifestyle, we collect certain information
                about your device, your interaction with the site, and the
                information necessary to process your purchases. This includes
                your name, billing/shipping address, payment information, email
                address, and phone number.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-brand-primary mb-3">
                2. How We Use Your Information
              </h3>
              <p className="mb-2">
                We use the Order Information that we collect generally to
                fulfill any orders placed through the Site (including processing
                your payment information, arranging for shipping, and providing
                you with invoices and/or order confirmations). Additionally, we
                use this Order Information to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-500">
                <li>Communicate with you regarding your order.</li>
                <li>Screen our orders for potential risk or fraud.</li>
                <li>
                  Provide you with information or advertising relating to our
                  products or services (if you have opted in).
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-brand-primary mb-3">
                3. Sharing Your Personal Information
              </h3>
              <p>
                We share your Personal Information with third parties to help us
                use your Personal Information, as described above. For example,
                we share your shipping details with our courier partners (like
                Pathao, RedX, or internal logistics) strictly to deliver your
                orders. We may also share your Personal Information to comply
                with applicable laws and regulations.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-brand-primary mb-3">
                4. Data Retention
              </h3>
              <p>
                When you place an order through the Site, we will maintain your
                Order Information for our records unless and until you ask us to
                delete this information.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-brand-primary mb-3">
                5. Contact Us
              </h3>
              <p>
                For more information about our privacy practices, if you have
                questions, or if you would like to make a complaint, please
                contact us by email at{" "}
                <strong>support@soulslifestyle.com</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
