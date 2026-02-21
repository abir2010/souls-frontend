import { useEffect, useState } from "react";
import PageLoader from "../../components/shared/PageLoader";
import AllCategories from "../../components/shop/AllCategories";
import FeaturesSection from "../../components/shop/FeaturesSection";
import HeroSection from "../../components/shop/HeroSection";
import NewArrivals from "../../components/shop/NewArrivals";
import SocialSection from "../../components/shop/SocialSection";
import VideoSection from "../../components/shop/VideoSection";

const Home = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <PageLoader />;
  }
  return (
    <>
      <div className="animate-in fade-in duration-700 ease-out">
        <HeroSection />
        <NewArrivals />
        <AllCategories />
        <VideoSection />
        <FeaturesSection />
        <SocialSection />
      </div>
    </>
  );
};

export default Home;
