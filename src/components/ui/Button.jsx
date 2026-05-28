function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-200 hover:-translate-y-px hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
