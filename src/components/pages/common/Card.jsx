import { motion } from 'framer-motion'

function Card({ 
  children, 
  className, 
  hover = true, 
  animate = true,
  elevation = 'md',
  ...props 
}) {
  const baseClasses = 'bg-white rounded-xl overflow-hidden'
  
  const elevationClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    none: '',
  }
  
  const hoverClasses = hover 
    ? 'hover:shadow-lg transition-shadow duration-300' 
    : ''
  
  const classes = `${baseClasses} ${elevationClasses[elevation]} ${hoverClasses} ${className || ''}`
  
  if (animate) {
    return (
      <motion.div
        className={classes}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export default Card