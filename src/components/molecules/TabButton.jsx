import Button from '../atoms/Button'

      const TabButton = ({ label, isActive, onClick }) => {
        return (
          <Button
            onClick={onClick}
            variant={isActive ? 'ghost' : 'ghost'} // Custom styling for tabs
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 capitalize ${
              isActive
                ? 'bg-white text-primary shadow-card'
                : 'text-surface-600 hover:text-surface-900'
            }`}
            whileHover={{}} // Disable default hover scale for tabs
            whileTap={{}} // Disable default tap scale for tabs
          >
            {label}
          </Button>
        )
      }

      export default TabButton