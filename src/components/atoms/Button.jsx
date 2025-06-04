import { motion } from 'framer-motion'

      const Button = ({
        children,
        onClick,
        className = '',
        variant = 'primary', // 'primary', 'secondary', 'ghost'
        size = 'md', // 'sm', 'md', 'lg'
        icon: Icon,
        disabled = false,
        whileHover = { scale: 1.02 },
        whileTap = { scale: 0.98 },
        type = 'button'
      }) => {
        const baseStyles = 'flex items-center justify-center font-medium transition-all duration-200 rounded-lg'
        const variantStyles = {
          primary: 'bg-primary text-white shadow-button hover:bg-primary-600',
          secondary: 'bg-secondary text-white shadow-button hover:bg-secondary-600',
          ghost: 'bg-surface-100 text-surface-700 hover:bg-surface-200 border border-surface-200',
          link: 'text-primary hover:underline'
        }
        const sizeStyles = {
          sm: 'px-3 py-1.5 text-sm',
          md: 'px-4 py-2 text-base',
          lg: 'px-5 py-2.5 text-lg'
        }
        const disabledStyles = 'opacity-50 cursor-not-allowed'

        return (
          <motion.button
            type={type}
            onClick={onClick}
            whileHover={!disabled ? whileHover : {}}
            whileTap={!disabled ? whileTap : {}}
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${
              disabled ? disabledStyles : ''
            }`}
            disabled={disabled}
          >
            {Icon && <Icon className={`h-5 w-5 ${children ? 'mr-2' : ''}`} />}
            {children}
          </motion.button>
        )
      }

      export default Button