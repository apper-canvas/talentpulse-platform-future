import { motion } from 'framer-motion'
      import Card from '../atoms/Card'
      import Text from '../atoms/Text'
      import QuickActionButton from '../molecules/QuickActionButton'
      import ActivityItem from '../molecules/ActivityItem'
      import EventCard from '../molecules/EventCard'

      const QuickActionsSection = () => {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <Text as="h3" className="text-lg font-semibold text-surface-900 mb-4">Quick Actions</Text>
              <div className="space-y-3">
                <QuickActionButton icon="UserPlus" text="Add New Employee" onClick={() => console.log('Add Employee')} />
                <QuickActionButton icon="FileText" text="Generate Payroll" onClick={() => console.log('Generate Payroll')} />
                <QuickActionButton icon="Calendar" text="Approve Leaves" onClick={() => console.log('Approve Leaves')} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <Text as="h3" className="text-lg font-semibold text-surface-900 mb-4">Recent Activities</Text>
              <div className="space-y-3">
                <ActivityItem type="success" description="Salary processed for March" time="2 hours ago" />
                <ActivityItem type="accent" description="Leave request from John Doe" time="5 hours ago" />
                <ActivityItem type="primary" description="New employee onboarded" time="1 day ago" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card md:col-span-2 xl:col-span-1"
            >
              <Text as="h3" className="text-lg font-semibold text-surface-900 mb-4">Upcoming Events</Text>
              <div className="space-y-3">
                <EventCard title="Payroll Processing" date="March 28, 2024" icon="Calendar" color="primary" />
                <EventCard title="Team Meeting" date="March 30, 2024" icon="Users" color="secondary" />
              </div>
            </motion.div>
          </div>
        )
      }

      export default QuickActionsSection