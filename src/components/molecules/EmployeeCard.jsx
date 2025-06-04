import { motion } from 'framer-motion'
      import AppIcon from '../atoms/AppIcon'
      import Text from '../atoms/Text'

      const EmployeeCard = ({ employee, isSelected, onClick }) => {
        return (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onClick(employee)}
            className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
              isSelected
                ? 'bg-primary text-white shadow-card'
                : 'bg-surface-50 hover:bg-surface-100 border border-surface-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isSelected
                  ? 'bg-white/20'
                  : 'bg-primary/10'
              }`}>
                <AppIcon
                  name="User"
                  className={`h-5 w-5 ${
                    isSelected
                      ? 'text-white'
                      : 'text-primary'
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <Text as="p" className="font-medium truncate">{employee?.personalInfo?.name}</Text>
                <Text as="p" className={`text-sm truncate ${
                  isSelected
                    ? 'text-white/80'
                    : 'text-surface-500'
                }`}>
                  {employee?.employeeId} • {employee?.department}
                </Text>
              </div>
            </div>
          </motion.button>
        )
      }

      export default EmployeeCard