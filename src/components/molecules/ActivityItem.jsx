import Text from '../atoms/Text'

      const ActivityItem = ({ type, description, time }) => {
        const colorMap = {
          success: 'bg-success',
          accent: 'bg-accent',
          primary: 'bg-primary'
        }
        return (
          <div className="flex items-center space-x-3 p-2">
            <div className={`w-2 h-2 ${colorMap[type] || 'bg-surface-400'} rounded-full animate-pulse-success`}></div>
            <div className="flex-1">
              <Text as="p" className="text-sm font-medium text-surface-900">{description}</Text>
              <Text as="p" className="text-xs text-surface-500">{time}</Text>
            </div>
          </div>
        )
      }

      export default ActivityItem