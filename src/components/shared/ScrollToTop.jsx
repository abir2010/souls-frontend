import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // Extract the current URL pathname
  const { pathname } = useLocation();

  // Whenever the pathname changes, instantly scroll to X: 0, Y: 0
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // This component doesn't render any UI
  return null;
};

export default ScrollToTop;
