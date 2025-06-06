import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen zen-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="mb-8"
        >
          <ApperIcon name="MapPin" size={64} className="text-zen-sage mx-auto" />
        </motion.div>
        
        <h1 className="text-4xl font-heading font-semibold text-surface-800 mb-4">
          Lost in the Garden
        </h1>
        
        <p className="text-surface-600 mb-8 leading-relaxed">
          This path doesn't exist in your zen garden. Let's guide you back to your peaceful productivity flow.
        </p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-zen-sage text-white rounded-xl shadow-zen font-medium"
          >
            <ApperIcon name="Home" size={20} />
            <span>Return Home</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound