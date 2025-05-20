import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import LoadingSpinner from './LoadingSpinner'

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      as = 'button',
      to,
      href,
      isLoading = false,
      fullWidth = false,
      icon,
      iconPosition = 'left',
      className = '',
      ...props
    },
    ref
  ) => {
    // Base button styles
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2'
    
    // Size variations
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg',
    }
    
    // Variant styles
    const variantStyles = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
      secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
      accent: 'bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-500',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
      danger: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500',
      success: 'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500',
    }
    
    const allStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`
    
    // Handle icon positioning
    const iconElement = icon && (
      <span className={`${iconPosition === 'left' ? 'mr-2' : 'ml-2'}`}>
        {icon}
      </span>
    )
    
    // Content with optional loading spinner
    const content = (
      <>
        {isLoading && (
          <span className="mr-2">
            <LoadingSpinner size="sm" color={variant === 'primary' ? 'white' : 'primary'} />
          </span>
        )}
        {icon && iconPosition === 'left' && iconElement}
        {children}
        {icon && iconPosition === 'right' && iconElement}
      </>
    )
    
    // Render as Link if "to" prop is provided
    if (to) {
      return (
        <Link to={to} className={allStyles} ref={ref} {...props}>
          {content}
        </Link>
      )
    }
    
    // Render as anchor if "href" prop is provided
    if (href) {
      return (
        <a href={href} className={allStyles} ref={ref} {...props}>
          {content}
        </a>
      )
    }
    
    // Custom component rendering
    if (as !== 'button') {
      const Component = motion[as] || as
      return (
        <Component className={allStyles} ref={ref} {...props}>
          {content}
        </Component>
      )
    }
    
    // Default button rendering
    return (
      <motion.button
        whileTap={{ scale: 0.98 }}
        className={allStyles}
        disabled={isLoading}
        ref={ref}
        {...props}
      >
        {content}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button