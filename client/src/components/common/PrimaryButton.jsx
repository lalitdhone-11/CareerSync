const PrimaryButton = ({
  children,
  type = "button",
  onClick,
  loading = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`
        flex
        w-full
        items-center
        justify-center
        rounded-xl
        bg-[#5B43EA]
        px-6
        py-3.5
        text-sm
        font-semibold
        text-white
        shadow-lg
        shadow-[#5B43EA]/20
        transition
        hover:bg-[#4D35D5]
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${className}
      `}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default PrimaryButton;