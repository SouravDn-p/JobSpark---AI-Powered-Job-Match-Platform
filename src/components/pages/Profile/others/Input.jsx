import useAuth from "../../../hooks/useAuth";

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  error = "",
  icon = null,
  className = "",
  ...props
}) => {
  const { isDarkMode } = useAuth();

  return (
    <div className={`${className}`}>
      {label && (
        <label
          className={`block text-sm font-medium mb-1 ${
            isDarkMode ? "text-gray-300" : "text-gray-800"
          }`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div
            className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2 ${
            icon ? "pl-10" : ""
          } rounded-lg transition-all duration-200 ${
            isDarkMode
              ? "bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500"
              : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          } ${
            error
              ? isDarkMode
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-red-500 focus:border-red-500 focus:ring-red-500"
              : ""
          }`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
