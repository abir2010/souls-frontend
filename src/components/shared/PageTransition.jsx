/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const PageTransition = ({ children, className = "" }) => {
  return (
    <motion.div
      // Hides the page by cropping it to a flat line at the bottom
      initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" }}
      // Expands the crop to reveal the full 100% of the page
      animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      // Uses a custom cubic-bezier ease for a dramatic, cinematic slow-down at the end
      transition={{ duration: 0.5, ease: [0.64, 0.04, 0.26, 1] }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
