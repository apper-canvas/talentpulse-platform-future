import { motion } from 'framer-motion'
      import AppIcon from '../atoms/AppIcon'
      import Text from '../atoms/Text'

      const PayrollHistoryItem = ({ payroll, employeeName, index }) => {
        const totalDeductions = (
          (payroll?.deductions?.providentFund || 0) +
          (payroll?.deductions?.professionalTax || 0) +
          (payroll?.deductions?.tds || 0)
        )
        const statusClass = payroll?.status === 'processed'
          ? 'bg-success/10 text-success'
          : 'bg-accent/10 text-accent'

        return (
          <motion.div
            key={`${payroll?.employeeId}-${payroll?.month}-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-surface-50 rounded-lg border border-surface-200 hover:shadow-card transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <AppIcon name="User" className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Text as="p" className="font-medium text-surface-900">
                    {employeeName}
                  </Text>
                  <Text as="p" className="text-sm text-surface-500">{payroll?.employeeId}</Text>
                </div>
              </div>
              <div className="text-right">
                <Text as="p" className="font-semibold text-lg text-success">₹{payroll?.netPay?.toLocaleString()}</Text>
                <Text as="p" className="text-sm text-surface-500">{payroll?.month}</Text>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-surface-200">
              <div className="text-center">
                <Text as="p" className="text-xs text-surface-500 mb-1">Basic</Text>
                <Text as="p" className="font-medium">₹{payroll?.basicSalary?.toLocaleString()}</Text>
              </div>
              <div className="text-center">
                <Text as="p" className="text-xs text-surface-500 mb-1">Deductions</Text>
                <Text as="p" className="font-medium text-error">
                  -₹{totalDeductions.toLocaleString()}
                </Text>
              </div>
              <div className="text-center">
                <Text as="p" className="text-xs text-surface-500 mb-1">Status</Text>
                <Text as="span" className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
                  {payroll?.status || 'pending'}
                </Text>
              </div>
            </div>
          </motion.div>
        )
      }

      export default PayrollHistoryItem