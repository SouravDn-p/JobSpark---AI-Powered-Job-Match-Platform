import { motion } from 'framer-motion'

function LoadingSpinner({ size = 'md', color = 'primary' }) {
  const sizeMap = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  const colorMap = {
    primary: 'border-primary-600',
    secondary: 'border-secondary-600',
    accent: 'border-accent-600',
    white: 'border-white',
  }

  return (
    <motion.div
      className={`${sizeMap[size]} rounded-full border-4 border-t-transparent ${colorMap[color]}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  )
}

export default LoadingSpinner