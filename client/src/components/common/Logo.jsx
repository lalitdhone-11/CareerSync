 

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/logo.png" 
        alt="CareerSync"
        className="h-11 w-11 object-contain"
      />

      <div>
        <h1 className="text-xl font-bold tracking-tight text-[#111633] sm:text-2xl">
          Career<span className="text-[#5B43EA]">Sync</span>
        </h1>

        <p className="text-[10px] text-[#686D84] sm:text-[11px]">
          Better Resumes. Brighter Futures.
        </p>
      </div>
    </div>
  );
};

export default Logo;