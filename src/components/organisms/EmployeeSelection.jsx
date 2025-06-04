import AppIcon from '../atoms/AppIcon'
      import Card from '../atoms/Card'
      import Text from '../atoms/Text'
      import SearchInput from '../molecules/SearchInput'
      import EmployeeCard from '../molecules/EmployeeCard'

      const EmployeeSelection = ({
        filteredEmployees,
        searchTerm,
        setSearchTerm,
        selectedEmployee,
        setSelectedEmployee,
        setPayrollData
      }) => {
        return (
          <Card>
            <Text as="h3" className="text-lg font-semibold text-surface-900 mb-4 flex items-center">
              <AppIcon name="Users" className="h-5 w-5 mr-2 text-primary" />
              Select Employee
            </Text>

            <div className="relative mb-4">
              <SearchInput
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search employees..."
                className="input-field"
              />
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto scrollbar-hide">
              {filteredEmployees?.map((employee) => (
                <EmployeeCard
                  key={employee?.employeeId}
                  employee={employee}
                  isSelected={selectedEmployee?.employeeId === employee?.employeeId}
                  onClick={(emp) => {
                    setSelectedEmployee(emp)
                    setPayrollData(prev => ({ ...prev, basicSalary: emp?.salary?.toString() || '' }))
                  }}
                />
              ))}
            </div>
          </Card>
        )
      }

      export default EmployeeSelection