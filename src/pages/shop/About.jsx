import { ArrowRight, Heart, Scissors, ShieldCheck, Target } from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "../../components/shared/PageTransition";

// Core values data for the grid section
const coreValues = [
  {
    icon: Scissors,
    title: "Master Craftsmanship",
    description:
      "Every stitch is intentional. We partner with expert tailors who bring decades of experience to every garment.",
  },
  {
    icon: ShieldCheck,
    title: "Premium Fabrics",
    description:
      "We source only the finest, most breathable materials to ensure our clothes look impeccable and last for years.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Your confidence is our priority. We design with your comfort, fit, and lifestyle at the forefront of our minds.",
  },
  {
    icon: Target,
    title: "Modern Tradition",
    description:
      "We respect traditional silhouettes, like the classic Panjabi, but reimagine them for the modern gentleman.",
  },
];

const About = () => {
  return (
    <PageTransition>
      <div className="bg-white min-h-screen pb-20">
        {/* Hero Section */}
        <div className="relative h-[50vh] md:h-[60vh] w-full bg-brand-primary overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1511511653800-5938a6a319a9?q=80&w=2070&auto=format&fit=crop"
            alt="Inside Souls Lifestyle Studio"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 tracking-tight">
              Our <span className="text-brand-accent">Story</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl max-w-2xl font-medium">
              Redefining contemporary menswear from the heart of Chattogram to
              the world.
            </p>
          </div>
        </div>

        {/* The Journey (Split Layout) */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Image Side */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute inset-0 bg-brand-accent transform translate-x-4 translate-y-4 -z-10 transition-transform group-hover:translate-x-6 group-hover:translate-y-6 duration-500"></div>
              <img
                src="https://images.unsplash.com/photo-1739117441029-9f2a8e59e8b2?q=80&w=1000&auto=format&fit=crop"
                alt="Designing process"
                className="w-full h-100 md:h-125 object-cover shadow-lg"
              />
            </div>

            {/* Text Side */}
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-sm font-bold text-brand-accent uppercase tracking-widest">
                How It Started
              </h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-brand-primary leading-tight">
                Born from a passion for <br className="hidden md:block" />{" "}
                impeccable style.
              </h3>
              <div className="space-y-4 text-gray-500 leading-relaxed text-sm md:text-base">
                <p>
                  Founded in Chattogram, Bangladesh, Souls Lifestyle began with
                  a simple observation: men shouldn't have to choose between
                  traditional elegance and modern comfort.
                </p>
                <p>
                  We noticed a gap in the market for premium, well-fitted
                  Panjabis and casual wear that felt as good as they looked.
                  What started as a small collection of custom-tailored shirts
                  has rapidly evolved into a full-fledged lifestyle brand.
                </p>
                <p>
                  Today, our mission remains unchanged. We create timeless
                  pieces that elevate your everyday wardrobe, ensuring you walk
                  into every room with quiet confidence.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="bg-gray-50 py-16 md:py-24 border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-primary mb-4">
                Our Core Values
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                These are the principles that guide every sketch we draw, every
                fabric we cut, and every order we ship.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="w-14 h-14 bg-gray-50 flex items-center justify-center rounded-none mb-6 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                      <Icon className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-display font-bold text-brand-primary mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Commitment to Quality Banner */}
        <div className="relative py-24 bg-brand-primary overflow-hidden">
          {/* Abstract background pattern/image */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'url("https://www.transparenttextures.com/patterns/fabric-plaid.png")',
            }}
          ></div>

          <div className="relative container mx-auto px-4 text-center z-10">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              Experience the Souls Standard.
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-10">
              We don't just sell clothes; we provide a canvas for your personal
              style. Explore our latest collections and feel the difference of
              true craftsmanship.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center bg-white text-brand-primary px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-brand-accent hover:text-white transition-colors group"
            >
              Explore the Collection
              <ArrowRight className="ml-3 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
