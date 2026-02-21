const VideoSection = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-brand-primary">
      {/* 1. HTML5 Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline // CRITICAL for iOS autoplay
        className="absolute inset-0 w-full h-full object-cover scale-105" // Slight scale to avoid edge bleeding
      >
        {/* Replace this src with your actual Cloudinary video URL later */}
        <source
          src="https://res.cloudinary.com/dati8bges/video/upload/v1771592514/M_S_Men_s_Style__The_Art_of_Tailoring_-_TV_AD_2016_zxqpsb.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* 2. Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 3. Text Overlay */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center z-10">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 drop-shadow-lg tracking-tight">
          Crafted for the <span className="text-brand-accent">Modern Era</span>.
        </h2>

        <p className="text-gray-200 text-lg md:text-xl max-w-2xl drop-shadow-md font-medium leading-relaxed">
          Experience the perfect blend of traditional craftsmanship and
          contemporary style. Elevate your everyday wardrobe with Souls
          Lifestyle.
        </p>

        {/* A subtle scroll indicator or secondary CTA */}
        <div className="mt-12 flex gap-1 space-x-4 animate-bounce">
          <div className="w-20 h-16 bg-linear-to-b from-brand-accent to-transparent mx-auto"></div>
          <div className="w-20 h-16 bg-linear-to-b from-brand-primary to-transparent mx-auto"></div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
