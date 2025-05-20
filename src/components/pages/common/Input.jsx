import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      id,
      label,
      type = "text",
      error,
      helperText,
      fullWidth = true,
      className = "",
      containerClassName = "",
      required = false,
      ...props
    },
    ref
  ) => {
    const inputClasses = `
    px-4 py-2 
    border rounded-lg
    focus:ring-2 focus:outline-none
    transition-all duration-200
    ${
      error
        ? "border-error-500 focus:border-error-500 focus:ring-error-200"
        : "border-gray-300 focus:border-primary-500 focus:ring-primary-200"
    }
    ${fullWidth ? "w-full" : ""}
    ${className}
  `;

    return (
      <div className={`${containerClassName} ${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          type={type}
          aria-invalid={error ? "true" : "false"}
          className={inputClasses}
          {...props}
        />
        {(error || helperText) && (
          <p
            className={`mt-1 text-sm ${
              error ? "text-error-500" : "text-gray-500"
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

// Custom Input component
// const Input = ({
//   label,
//   name,
//   value,
//   onChange,
//   type = "text",
//   placeholder = "",
//   error = "",
//   icon = null,
//   className = "",
//   ...props
// }) => {
//   const { isDarkMode } = useContext(AuthContexts);

//   return (
//     <div className={`${className}`}>
//       {label && (
//         <label
//           className={`block text-sm font-medium mb-1 ${
//             isDarkMode ? "text-gray-300" : "text-gray-800"
//           }`}
//         >
//           {label}
//         </label>
//       )}
//       <div className="relative">
//         {icon && (
//           <div
//             className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${
//               isDarkMode ? "text-gray-400" : "text-gray-600"
//             }`}
//           >
//             {icon}
//           </div>
//         )}
//         <input
//           type={type}
//           name={name}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           className={`w-full px-4 py-2 ${
//             icon ? "pl-10" : ""
//           } rounded-lg transition-all duration-200 ${
//             isDarkMode
//               ? "bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500"
//               : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
//           } ${
//             error
//               ? isDarkMode
//                 ? "border-red-500 focus:border-red-500 focus:ring-red-500"
//                 : "border-red-500 focus:border-red-500 focus:ring-red-500"
//               : ""
//           }`}
//           {...props}
//         />
//       </div>
//       {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
//     </div>
//   );
// };
