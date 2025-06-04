import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <ApperIcon name="FileQuestion" className="h-12 w-12 text-primary" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-6xl sm:text-7xl font-bold text-surface-900 mb-4"
        >
          404
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl sm:text-3xl font-semibold text-surface-800 mb-4"
        >
          Page Not Found
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-surface-600 mb-8 text-lg"
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
        >
          <Link
            to="/"
            className="btn-primary inline-flex items-center space-x-2 w-full sm:w-auto justify-center"
          >
            <ApperIcon name="Home" className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="btn-secondary inline-flex items-center space-x-2 w-full sm:w-auto justify-center"
          >
            <ApperIcon name="ArrowLeft" className="h-5 w-5" />
            <span>Go Back</span>
          </button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 p-6 bg-white rounded-xl border border-surface-200 shadow-soft"
        >
          <h3 className="text-lg font-semibold text-surface-900 mb-3">Need Help?</h3>
          <p className="text-surface-600 mb-4">
            If you believe this is an error, please contact our support team.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <a
              href="mailto:support@talentpulse.com"
              className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors"
            >
              <ApperIcon name="Mail" className="h-4 w-4" />
              <span>support@talentpulse.com</span>
            </a>
            <span className="text-surface-300">|</span>
            <a
              href="tel:+91-800-123-4567"
              className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors"
            >
              <ApperIcon name="Phone" className="h-4 w-4" />
              <span>+91-800-123-4567</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound