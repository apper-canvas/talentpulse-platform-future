import { motion } from 'framer-motion'
      import AppIcon from '../atoms/AppIcon'
      import Text from '../atoms/Text'

      const NavbarLink = ({ item, activeModule, onClick }) => {
        return (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onClick(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left font-medium transition-all duration-200 ${
              activeModule === item.id
                ? 'bg-primary text-white shadow-card'
                : 'text-surface-700 hover:bg-surface-100'
            }`}
          >
            <AppIcon name={item.icon} className="h-5 w-5" />
            <Text as="span">{item.label}</Text>
          </motion.button>
        )
      }

      export default NavbarLink