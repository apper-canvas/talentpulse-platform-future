import React from 'react'

      const Text = React.forwardRef(({ children, className = '', as = 'p', ...props }, ref) => {
        const Component = as
        return (
          <Component ref={ref} className={className} {...props}>
            {children}
          </Component>
        )
      })

      export default Text