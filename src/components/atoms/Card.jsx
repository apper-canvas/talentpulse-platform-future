import { motion } from 'framer-motion'

      const Card = ({ children, className = '', motionProps = {}, ...props }) => {
        return (
          <motion.div
            className={`bg-white rounded-xl shadow-card p-4 sm:p-6 ${className}`}
            {...motionProps}
            {...props}
          >
            {children}
          </motion.div>
        )
      }

      export default Card