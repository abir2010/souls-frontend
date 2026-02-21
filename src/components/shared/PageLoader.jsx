import logo from "../../assets/souls-logo.jpg";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white z-100 flex flex-col items-center justify-center">
      {/* Outer Pulse Ring */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-28 h-28 border-4 border-brand-primary/20 rounded animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
        <div className="absolute w-24 h-24 border-4 border-brand-primary/40  animate-pulse"></div>

        {/* Inner Core (Can be text or your logo image) */}
        <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center z-10 shadow-lg shadow-brand-primary/30">
          <span className="text-white font-display font-bold text-xl tracking-tighter">
            <img src={logo} alt="Souls Lifestyle" className="w-full" />
          </span>
        </div>
      </div>

      <p className="mt-8 text-sm font-semibold text-gray-400 tracking-widest uppercase animate-pulse">
        Curating Your Style...
      </p>
    </div>
  );
};

export default PageLoader;
