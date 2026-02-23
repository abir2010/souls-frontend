import {
  Clock,
  Coffee,
  MapPin,
  Phone,
  Scissors,
  Send,
  ShoppingBag,
} from "lucide-react";
import PageTransition from "../../components/shared/PageTransition";

// Define the store features with their respective icons, titles, and descriptions
const storeFeatures = [
  {
    icon: ShoppingBag,
    title: "Personal Styling",
    description:
      "Book a one-on-one session with our expert stylists to curate your perfect wardrobe.",
  },
  {
    icon: Scissors,
    title: "In-House Alterations",
    description:
      "Get the perfect fit with our complimentary tailoring service on premium Panjabis and suits.",
  },
  {
    icon: Coffee,
    title: "Lounge & Coffee",
    description:
      "Relax in our premium lounge area with complimentary artisanal coffee while you shop.",
  },
];

const OurStore = () => {
  return (
    <PageTransition>
      <div className="bg-white min-h-screen pb-20">
        {/* Page Header */}
        <div className="bg-brand-primary py-16 md:py-24 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">
              Visit <span className="text-brand-accent">Souls Lifestyle</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Experience our fabrics, check your fit, and get personalized
              styling advice at our flagship store in Chattogram.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-20">
          {/* Main Content Grid: Map & Info (Left) + Contact Form (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column: Info & Map */}
            <div className="space-y-10">
              {/* Store Information */}
              <div>
                <h2 className="text-2xl font-display font-bold text-brand-primary mb-6">
                  Store Details
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full shrink-0 text-brand-accent">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-primary text-lg">
                        Flagship Store
                      </h4>
                      <p className="text-gray-500 mt-1 leading-relaxed">
                        Shop no: 50,40 Ground Floor Ali Shah Super Market
                        Bandartila Chittagong
                        <br />
                        Chittagong, Bangladesh, 4202
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full shrink-0 text-brand-accent">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-primary text-lg">
                        Opening Hours
                      </h4>
                      <p className="text-gray-500 mt-1">
                        Saturday - Thursday: 10:00 AM - 9:00 PM
                      </p>
                      <p className="text-gray-500">Friday: 3:00 PM - 9:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full shrink-0 text-brand-accent">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-primary text-lg">
                        Contact Us
                      </h4>
                      <p className="text-gray-500 mt-1">+880 1839-864611</p>
                      <p className="text-gray-500">
                        soulslifestylebd@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Map Embed */}
              <div className="w-full h-80 bg-gray-200 overflow-hidden border border-gray-100 shadow-sm">
                <iframe
                  src="https://maps.google.com/maps?width=600&height=400&hl=en&q=Ali%20Shah%20Super%20Market%2C%20bandar&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Store Location"
                ></iframe>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-gray-50 p-8 md:p-12 border border-gray-100 h-fit">
              <h2 className="text-2xl font-display font-bold text-brand-primary mb-2">
                Send us a Message
              </h2>
              <p className="text-gray-500 mb-8 text-sm">
                Have a question about sizing, stock, or custom orders? Drop us a
                line.
              </p>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-brand-primary">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors bg-white"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-brand-primary">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors bg-white"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-primary">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors bg-white"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-primary">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors bg-white resize-none"
                    placeholder="Write your message here..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-primary text-white py-4 font-semibold hover:bg-brand-accent transition-colors flex justify-center items-center gap-2 uppercase tracking-widest text-sm"
                >
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Store Features Section */}
          <div className="mt-24 pt-16 border-t border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-brand-primary">
                The In-Store Experience
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                More than just a shop. We've designed our space to provide a
                premium, comfortable experience while you elevate your style.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {storeFeatures.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="bg-gray-50 p-8 text-center group hover:bg-brand-primary transition-colors duration-300"
                  >
                    <div className="w-16 h-16 mx-auto bg-white flex items-center justify-center rounded-full shadow-sm mb-6 text-brand-primary group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                      <Icon className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold font-display text-brand-primary group-hover:text-white transition-colors duration-300 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default OurStore;
