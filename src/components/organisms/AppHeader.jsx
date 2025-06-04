import AppIcon from '../atoms/AppIcon'
      import Text from '../atoms/Text'
      import SearchInput from '../molecules/SearchInput'
      import Button from '../atoms/Button'

      const AppHeader = ({ onSearchChange, searchTerm }) => {
        return (
          <header className="bg-white border-b border-surface-200 shadow-soft sticky top-0 z-40">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16 sm:h-20">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <AppIcon name="Zap" className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <Text as="h1" className="text-lg sm:text-xl lg:text-2xl font-bold text-surface-900">TalentPulse</Text>
                    <Text as="p" className="text-sm text-surface-600 hidden sm:block">HR Management Platform</Text>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className="relative hidden md:block">
                    <SearchInput
                      value={searchTerm}
                      onChange={(e) => onSearchChange(e.target.value)}
                      placeholder="Search employees..."
                      className="w-64"
                    />
                  </div>
                  <Button variant="ghost" onClick={() => console.log('Notifications clicked')} className="p-2">
                    <AppIcon name="Bell" className="h-5 w-5 text-surface-700" />
                  </Button>
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <AppIcon name="User" className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </header>
        )
      }

      export default AppHeader