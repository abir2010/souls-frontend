import { FileText } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-brand-primary mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-500">Last updated: February 2026</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-6">
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
            <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-brand-primary text-lg">
                Agreement to Terms
              </h3>
              <p className="text-sm text-gray-500">
                By accessing or shopping with Souls Lifestyle, you agree to be
                bound by these terms.
              </p>
            </div>
          </div>

          <div className="space-y-8 text-gray-600 leading-relaxed text-sm md:text-base">
            <section>
              <h3 className="text-xl font-bold text-brand-primary mb-3">
                1. General Conditions
              </h3>
              <p>
                We reserve the right to refuse service to anyone for any reason
                at any time. You understand that your content (not including
                credit card information), may be transferred unencrypted and
                involve transmissions over various networks.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-brand-primary mb-3">
                2. Products and Pricing
              </h3>
              <p className="mb-2">
                Certain products or services may be available exclusively online
                through the website. These products may have limited quantities
                and are subject to return or exchange only according to our
                Return Policy.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-500">
                <li>
                  We have made every effort to display the colors and images of
                  our products as accurately as possible. We cannot guarantee
                  that your computer monitor's display of any color will be
                  accurate.
                </li>
                <li>
                  Prices for our products are subject to change without notice.
                </li>
                <li>
                  We reserve the right at any time to modify or discontinue the
                  Service (or any part or content thereof) without notice at any
                  time.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-brand-primary mb-3">
                3. Accuracy of Billing and Account Information
              </h3>
              <p>
                We reserve the right to refuse any order you place with us. We
                may, in our sole discretion, limit or cancel quantities
                purchased per person, per household, or per order. In the event
                that we make a change to or cancel an order, we may attempt to
                notify you by contacting the e-mail and/or billing address/phone
                number provided at the time the order was made.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-brand-primary mb-3">
                4. User Comments and Feedback
              </h3>
              <p>
                If, at our request, you send certain specific submissions (for
                example, reviews) or without a request from us you send creative
                ideas, suggestions, proposals, plans, or other materials, you
                agree that we may, at any time, without restriction, edit, copy,
                publish, distribute, translate, and otherwise use in any medium
                any comments that you forward to us.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-brand-primary mb-3">
                5. Governing Law
              </h3>
              <p>
                These Terms of Service and any separate agreements whereby we
                provide you Services shall be governed by and construed in
                accordance with the laws of Bangladesh, with jurisdiction in
                Chattogram.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-brand-primary mb-3">
                6. Contact Information
              </h3>
              <p>
                Questions about the Terms of Service should be sent to us at{" "}
                <strong>support@soulslifestyle.com</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
