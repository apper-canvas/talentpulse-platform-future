import NavbarLink from '../molecules/NavbarLink'

      const SidebarNavigation = ({ navigationItems, activeModule, setActiveModule }) => {
        return (
          <aside className="hidden lg:block w-64 bg-white border-r border-surface-200 min-h-screen shadow-soft">
            <nav className="p-4 space-y-2">
              {navigationItems.map((item) => (
                <NavbarLink
                  key={item.id}
                  item={item}
                  activeModule={activeModule}
                  onClick={setActiveModule}
                />
              ))}
            </nav>
          </aside>
        )
      }

      export default SidebarNavigation