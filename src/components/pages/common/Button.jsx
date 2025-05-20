import useAuth from "../../hooks/useAuth";

const Button = ({
  children,
  onClick,
  variant = "default",
  size = "default",
  type = "button",
  isLoading = false,
  className = "",
  icon = null,
}) => {
  const { isDarkMode } = useAuth();

  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: `${
      isDarkMode
        ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white focus:ring-purple-500"
        : "bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white focus:ring-purple-500"
    }`,
    secondary: `${
      isDarkMode
        ? "bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500"
        : "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-300"
    }`,
    outline: `${
      isDarkMode
        ? "border border-gray-600 hover:border-gray-500 bg-transparent hover:bg-gray-800 text-gray-300 focus:ring-gray-500"
        : "border border-gray-300 hover:border-gray-400 bg-transparent hover:bg-gray-50 text-gray-800 focus:ring-gray-300"
    }`,
    danger: `${
      isDarkMode
        ? "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
        : "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400"
    }`,
    default: `${
      isDarkMode
        ? "bg-gray-800 hover:bg-gray-700 text-white focus:ring-gray-500"
        : "bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 focus:ring-blue-500"
    }`,
  };

  const sizes = {
    small: "px-3 py-1.5 text-xs",
    default: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
  };

  const loadingClasses = isLoading
    ? "opacity-80 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${loadingClasses} ${className}`}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {icon && <span className={`${children ? "mr-2" : ""}`}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
