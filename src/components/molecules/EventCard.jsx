import AppIcon from '../atoms/AppIcon'
      import Text from '../atoms/Text'

      const EventCard = ({ title, date, icon, color }) => {
        const bgColorClass = `bg-${color}/5`
        const iconBgClass = `bg-${color}`
        const iconColorClass = `text-white`

        return (
          <div className={`flex items-center space-x-3 p-3 rounded-lg ${bgColorClass}`}>
            <div className={`w-10 h-10 ${iconBgClass} rounded-lg flex items-center justify-center`}>
              <AppIcon name={icon} className={`h-5 w-5 ${iconColorClass}`} />
            </div>
            <div>
              <Text as="p" className="font-medium text-surface-900">{title}</Text>
              <Text as="p" className="text-sm text-surface-600">{date}</Text>
            </div>
          </div>
        )
      }

      export default EventCard