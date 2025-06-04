import { motion } from 'framer-motion'
      import AppIcon from '../atoms/AppIcon'
      import MetricValue from '../atoms/MetricValue'
      import Text from '../atoms/Text'

      const MetricCard = ({ title, value, trend, trendUp, icon, color, delay }) => {
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay }}
            className="metric-card group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${color} rounded-xl flex items-center justify-center`}>
                <AppIcon name={icon} className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className={`flex items-center text-sm font-medium ${
                trendUp ? 'text-success' : 'text-error'
              }`}>
                <AppIcon
                  name={trendUp ? 'TrendingUp' : 'TrendingDown'}
                  className="h-4 w-4 mr-1"
                />
                {trend}
              </div>
            </div>
            <div>
              <MetricValue value={value} />
              <Text as="p" className="text-sm text-surface-600">{title}</Text>
            </div>
          </motion.div>
        )
      }

      export default MetricCard