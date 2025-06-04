import { motion } from 'framer-motion'
      import Text from '../atoms/Text'

      const PayrollTaxBreakdown = ({ calculatedPayroll }) => {
        if (!calculatedPayroll) return null

        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 p-4 bg-primary/5 rounded-lg border border-primary/20"
          >
            <Text as="h4" className="font-semibold text-surface-900">Tax Breakdown</Text>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <Text as="span" className="text-surface-600">HRA (40%):</Text>
                <Text as="span" className="font-medium">₹{calculatedPayroll.allowances.hra.toLocaleString()}</Text>
              </div>
              <div className="flex justify-between">
                <Text as="span" className="text-surface-600">Special Allowance:</Text>
                <Text as="span" className="font-medium">₹{calculatedPayroll.allowances.specialAllowance.toLocaleString()}</Text>
              </div>
              <div className="flex justify-between">
                <Text as="span" className="text-surface-600">PF (12%):</Text>
                <Text as="span" className="font-medium text-error">-₹{calculatedPayroll.deductions.providentFund.toLocaleString()}</Text>
              </div>
              <div className="flex justify-between">
                <Text as="span" className="text-surface-600">Professional Tax:</Text>
                <Text as="span" className="font-medium text-error">-₹{calculatedPayroll.deductions.professionalTax.toLocaleString()}</Text>
              </div>
              <div className="flex justify-between">
                <Text as="span" className="text-surface-600">TDS:</Text>
                <Text as="span" className="font-medium text-error">-₹{calculatedPayroll.deductions.tds.toLocaleString()}</Text>
              </div>
            </div>
          </motion.div>
        )
      }

      export default PayrollTaxBreakdown