import React from 'react'
      import AppIcon from './AppIcon'

      const Input = React.forwardRef(({
        id,
        label,
        type = 'text',
        value,
        onChange,
        placeholder,
        className = '',
        icon: Icon,
        error,
        ...props
      }, ref) => {
        return (
          <div>
            {label && (
              <label htmlFor={id} className="block text-sm font-medium text-surface-700 mb-2">
                {label}
              </label>
            )}
            <div className="relative">
              {Icon && (
                <AppIcon name={Icon} className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-surface-400" />
              )}
              <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                ref={ref}
                className={`w-full px-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200
                  ${Icon ? 'pl-10' : ''} ${className} ${error ? 'border-error' : ''}`}
                {...props}
              />
            </div>
            {error && <p className="mt-1 text-sm text-error">{error}</p>}
          </div>
        )
      })

      export default Input