import { motion } from 'framer-motion'
      import Text from '../atoms/Text'
      import DashboardMetricsGrid from '../organisms/DashboardMetricsGrid'
      import QuickActionsSection from '../organisms/QuickActionsSection'

      const DashboardTemplate = ({ metrics }) => {
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <Text as="h2" className="text-2xl sm:text-3xl font-bold text-surface-900 mb-2">Dashboard</Text>
              <Text as="p" className="text-surface-600">Welcome to your HR management overview</Text>
            </div>

            <DashboardMetricsGrid metrics={metrics} />

            <QuickActionsSection />
          </motion.div>
        )
      }

      export default DashboardTemplate