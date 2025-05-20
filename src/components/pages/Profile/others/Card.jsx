import useAuth from "../../../hooks/useAuth";

const Card = ({ children, className = "" }) => {
  const { isDarkMode } = useAuth();

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
        isDarkMode
          ? "bg-gray-800 border border-gray-700"
          : "bg-white border border-gray-200"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
