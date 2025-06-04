import AppIcon from '../atoms/AppIcon'
      import Text from '../atoms/Text'

      const QuickActionButton = ({ icon, text, onClick }) => {
        return (
          <button
            onClick={onClick}
            className="w-full flex items-center space-x-3 p-3 rounded-lg bg-surface-50 hover:bg-surface-100 transition-colors text-left"
          >
            <AppIcon name={icon} className="h-5 w-5 text-primary" />
            <Text as="span" className="font-medium">{text}</Text>
          </button>
        )
      }

      export default QuickActionButton