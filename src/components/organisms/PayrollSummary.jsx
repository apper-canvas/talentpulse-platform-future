import { motion } from 'framer-motion'
      import AppIcon from '../atoms/AppIcon'
      import Button from '../atoms/Button'
      import Card from '../atoms/Card'
      import Text from '../atoms/Text'
      import PayrollDetailItem from '../molecules/PayrollDetailItem'

      const PayrollSummary = ({ calculatedPayroll, onSavePayroll }) => {
        return (
          <Card>
            <Text as="h3" className="text-lg font-semibold text-surface-900 mb-4 flex items-center">
              <AppIcon name="FileText" className="h-5 w-5 mr-2 text-primary" />
              Payroll Summary
            </Text>

            {calculatedPayroll ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                  <Text as="h4" className="font-semibold text-surface-900 mb-2">{calculatedPayroll.employeeName}</Text>
                  <Text as="p" className="text-sm text-surface-600 mb-3">{calculatedPayroll.employeeId} • {calculatedPayroll.month}</Text>

                  <div className="space-y-3">
                    <PayrollDetailItem label="Basic Salary" value={calculatedPayroll.basicSalary} />
                    <PayrollDetailItem label="Gross Salary" value={calculatedPayroll.grossSalary} type="success" />
                    <PayrollDetailItem label="Total Deductions" value={calculatedPayroll.totalDeductions} type="error" />
                    <PayrollDetailItem label="Net Pay" value={calculatedPayroll.netPay} type="primary" />
                  </div>
                </div>

                <Button
                  onClick={onSavePayroll}
                  className="w-full"
                  icon="Save"
                >
                  Save Payroll
                </Button>
              </motion.div>
            ) : (
              <div className="text-center py-8">
                <AppIcon name="Calculator" className="h-12 w-12 text-surface-300 mx-auto mb-3" />
                <Text as="p" className="text-surface-500">Calculate payroll to see summary</Text>
              </div>
            )}
          </Card>
        )
      }

      export default PayrollSummary