const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-4 font-semibold rounded-full transition-all duration-300 ease-out transform active:scale-95 text-sm tracking-wide";
  const variants = {
    primary: "bg-[#00a1ff] text-white hover:bg-[#008ecc] shadow-[0_4px_14px_0_rgba(0,161,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,161,255,0.23)] dark:shadow-blue-500/20",
    outline: "bg-transparent border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:border-[#00a1ff] hover:text-[#00a1ff] dark:hover:border-[#00a1ff] dark:hover:text-[#00a1ff]",
    dark: "bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20",
    white: "bg-white text-gray-900 shadow-lg hover:shadow-xl dark:bg-gray-800 dark:text-white"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;