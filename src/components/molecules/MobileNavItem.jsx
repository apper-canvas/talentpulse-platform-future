import AppIcon from '../atoms/AppIcon'
      import Text from '../atoms/Text'

      const MobileNavItem = ({ item, activeModule, onClick }) => {
        return (
          <button
            onClick={() => onClick(item.id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeModule === item.id ? 'text-primary' : 'text-surface-600'
            }`}
          >
            <AppIcon name={item.icon} className="h-5 w-5" />
            <Text as="span" className="text-xs mt-1">{item.label.split(' ')[0]}</Text>
          </button>
        )
      }

      export default MobileNavItem