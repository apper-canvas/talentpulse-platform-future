import { useState } from 'react'
      import AppIcon from '../atoms/AppIcon'
      import Text from '../atoms/Text'
      import AppHeader from '../organisms/AppHeader'
      import MobileNavigation from '../organisms/MobileNavigation'
      import SidebarNavigation from '../organisms/SidebarNavigation'

      const PageLayout = ({ children, navigationItems, activeModule, setActiveModule }) => {
        const [searchTerm, setSearchTerm] = useState('')

        return (
          <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100">
            <AppHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            <div className="flex">
              <SidebarNavigation
                navigationItems={navigationItems}
                activeModule={activeModule}
                setActiveModule={setActiveModule}
              />

              <MobileNavigation
                navigationItems={navigationItems}
                activeModule={activeModule}
                setActiveModule={setActiveModule}
              />

              <main className="flex-1 min-h-screen">
                <div className="p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
                  {children}
                </div>
              </main>
            </div>
          </div>
        )
      }

      export default PageLayout