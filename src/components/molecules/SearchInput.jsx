import AppIcon from '../atoms/AppIcon'
      import Input from '../atoms/Input'

      const SearchInput = ({ value, onChange, placeholder = 'Search...', className = '', ...props }) => {
        return (
          <div className="relative">
            <AppIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-surface-400" />
            <Input
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className={`pl-10 pr-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none ${className}`}
              {...props}
            />
          </div>
        )
      }

      export default SearchInput