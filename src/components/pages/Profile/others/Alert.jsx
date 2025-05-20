import { FaCheck, FaTimes, FaInfo } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const Alert = ({ type = "info", message, className = "" }) => {
  const { isDarkMode } = useAuth();

  const types = {
    success: {
      bg: isDarkMode ? "bg-green-900/30" : "bg-green-50",
      border: isDarkMode ? "border-green-700" : "border-green-200",
      text: isDarkMode ? "text-green-400" : "text-green-800",
      icon: (
        <FaCheck className={isDarkMode ? "text-green-400" : "text-green-500"} />
      ),
    },
    error: {
      bg: isDarkMode ? "bg-red-900/30" : "bg-red-50",
      border: isDarkMode ? "border-red-700" : "border-red-200",
      text: isDarkMode ? "text-red-400" : "text-red-800",
      icon: (
        <FaTimes className={isDarkMode ? "text-red-400" : "text-red-500"} />
      ),
    },
    info: {
      bg: isDarkMode ? "bg-blue-900/30" : "bg-blue-50",
      border: isDarkMode ? "border-blue-700" : "border-blue-200",
      text: isDarkMode ? "text-blue-400" : "text-blue-800",
      icon: (
        <FaInfo className={isDarkMode ? "text-blue-400" : "text-blue-500"} />
      ),
    },
  };

  const { bg, border, text, icon } = types[type];

  return (
    <div
      className={`flex items-center p-4 rounded-lg border ${bg} ${border} ${className}`}
    >
      <div className="flex-shrink-0 mr-3">{icon}</div>
      <div className={`text-sm font-medium ${text}`}>{message}</div>
    </div>
  );
};

export default Alert;
