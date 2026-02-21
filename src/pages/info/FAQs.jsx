import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqsData = [
  {
    question: "What are your delivery charges?",
    answer:
      "Delivery inside Chittagong is ৳80. For orders outside Chittagong, the delivery charge is ৳150. We also offer free delivery on orders above ৳5000!",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Orders inside Chittagong are typically delivered within 1-2 business days. For the rest of Bangladesh, expect your delivery within 3-5 business days.",
  },
  {
    question: "Can I open the parcel before paying?",
    answer:
      "Yes! We strongly encourage our customers to check the product in front of the delivery rider before making the payment. If there's an issue, you can return it instantly.",
  },
  {
    question: "Do you have a physical store?",
    answer:
      "Currently, we operate exclusively online to bring you premium quality products at the best possible prices.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12 animate-in fade-in">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-brand-primary mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500">
            Everything you need to know about shopping with us.
          </p>
        </div>

        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
          {faqsData.map((faq, index) => (
            <div
              key={index}
              className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index ? "border-brand-primary shadow-md" : "border-gray-200 shadow-sm hover:border-brand-primary/50"}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
              >
                <span className="font-bold text-brand-primary pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openIndex === index ? "rotate-180 text-brand-primary" : ""}`}
                />
              </button>

              <div
                className={`px-6 text-gray-600 leading-relaxed transition-all duration-300 overflow-hidden ${openIndex === index ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"}`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
