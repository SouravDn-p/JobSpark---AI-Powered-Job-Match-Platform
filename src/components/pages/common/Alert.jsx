import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX, FiAlertTriangle } from 'react-icons/fi'

function Alert({
  type = 'info',
  title,
  message,
  dismissible = true,
  autoClose = false,
  duration = 5000,
  className,
  onClose,
  icon,
}) {
  const [visible, setVisible] = useState(true)

  const handleClose = () => {
    setVisible(false)
    if (onClose) onClose()
  }

  const alertIcons = {
    info: <FiInfo className="w-5 h-5" />,
    success: <FiCheckCircle className="w-5 h-5" />,
    warning: <FiAlertTriangle className="w-5 h-5" />,
    error: <FiAlertCircle className="w-5 h-5" />,
  }

  const alertStyles = {
    info: 'bg-primary-50 text-primary-700 border-primary-200',
    success: 'bg-success-50 text-success-700 border-success-200',
    warning: 'bg-warning-50 text-warning-700 border-warning-200',
    error: 'bg-error-50 text-error-700 border-error-200',
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0, padding: 0 }}
          transition={{ duration: 0.3 }}
          className={`rounded-lg border p-4 ${alertStyles[type]} ${className}`}
          role="alert"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {icon || alertIcons[type]}
            </div>
            <div className="ml-3 flex-1">
              {title && (
                <h3 className="text-sm font-medium">{title}</h3>
              )}
              {message && (
                <div className={`${title ? 'mt-1' : ''} text-sm`}>{message}</div>
              )}
            </div>
            {dismissible && (
              <button
                type="button"
                onClick={handleClose}
                className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 hover:bg-opacity-20 hover:bg-gray-500 focus:outline-none"
              >
                <span className="sr-only">Dismiss</span>
                <FiX className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Alert