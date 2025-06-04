import AppIcon from '../atoms/AppIcon'
      import Card from '../atoms/Card'
      import Text from '../atoms/Text'
      import PayrollHistoryItem from '../molecules/PayrollHistoryItem'

      const PayrollHistoryList = ({ payrolls, employees }) => {
        const recentPayrolls = payrolls?.slice(-5) || []

        return (
          <Card>
            <Text as="h3" className="text-lg font-semibold text-surface-900 mb-4 flex items-center">
              <AppIcon name="History" className="h-5 w-5 mr-2 text-primary" />
              Recent Payroll Records
            </Text>

            {recentPayrolls?.length > 0 ? (
              <div className="space-y-3">
                {recentPayrolls.map((payroll, index) => {
                  const employeeName = employees?.find(emp => emp?.employeeId === payroll?.employeeId)?.personalInfo?.name || 'Unknown Employee'
                  return (
                    <PayrollHistoryItem
                      key={`${payroll?.employeeId}-${payroll?.month}-${index}`}
                      payroll={payroll}
                      employeeName={employeeName}
                      index={index}
                    />
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <AppIcon name="FileText" className="h-12 w-12 text-surface-300 mx-auto mb-3" />
                <Text as="p" className="text-surface-500">No payroll records found</Text>
              </div>
            )}
          </Card>
        )
      }

      export default PayrollHistoryList