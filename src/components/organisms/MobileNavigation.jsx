import MobileNavItem from '../molecules/MobileNavItem'

      const MobileNavigation = ({ navigationItems, activeModule, setActiveModule }) => {
        return (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-surface-200 z-30">
            <nav className="flex justify-around py-2">
              {navigationItems.slice(0, 5).map((item) => (
                <MobileNavItem
                  key={item.id}
                  item={item}
                  activeModule={activeModule}
                  onClick={setActiveModule}
                />
              ))}
            </nav>
          </div>
        )
      }

      export default MobileNavigation