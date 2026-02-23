import { useEffect, useState } from "react";
import PageLoader from "../../components/shared/PageLoader";
import PageTransition from "../../components/shared/PageTransition";
import AllCategories from "../../components/shop/AllCategories";
import FeaturesSection from "../../components/shop/FeaturesSection";
import HeroSection from "../../components/shop/HeroSection";
import NewArrivals from "../../components/shop/NewArrivals";
import SocialSection from "../../components/shop/SocialSection";
import VideoSection from "../../components/shop/VideoSection";

const Home = () => {
  // State to control the display of the splash screen
  const [showSplash, setShowSplash] = useState(true);

  // useEffect to hide the splash screen after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Render the splash screen if showSplash is true, otherwise render the main content
  if (showSplash) {
    return <PageLoader />;
  }

  return (
    <>
      <PageTransition>
        <div className="animate-in fade-in duration-700 ease-out">
          <HeroSection />
          <NewArrivals />
          <AllCategories />
          <VideoSection />
          <FeaturesSection />
          <SocialSection />
        </div>
      </PageTransition>
    </>
  );
};

export default Home;
