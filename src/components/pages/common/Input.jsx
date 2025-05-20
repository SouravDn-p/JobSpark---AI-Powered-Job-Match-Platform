import { forwardRef } from 'react'

const Input = forwardRef(({
  id,
  label,
  type = 'text',
  error,
  helperText,
  fullWidth = true,
  className = '',
  containerClassName = '',
  required = false,
  ...props
}, ref) => {
  const inputClasses = `
    px-4 py-2 
    border rounded-lg
    focus:ring-2 focus:outline-none
    transition-all duration-200
    ${error 
      ? 'border-error-500 focus:border-error-500 focus:ring-error-200' 
      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200'
    }
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `

  return (
    <div className={`${containerClassName} ${fullWidth ? 'w-full' : ''}`}>
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
        aria-invalid={error ? 'true' : 'false'}
        className={inputClasses}
        {...props}
      />
      {(error || helperText) && (
        <p 
          className={`mt-1 text-sm ${error ? 'text-error-500' : 'text-gray-500'}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input