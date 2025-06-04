import AppIcon from '../atoms/AppIcon'
      import Button from '../atoms/Button'
      import Card from '../atoms/Card'
      import Text from '../atoms/Text'
      import FormField from '../molecules/FormField'
      import PayrollTaxBreakdown from '../molecules/PayrollTaxBreakdown'

      const PayrollCalculator = ({
        payrollData,
        calculatedPayroll,
        onBasicSalaryChange,
        onCalculate,
        selectedEmployee
      }) => {
        return (
          <Card>
            <Text as="h3" className="text-lg font-semibold text-surface-900 mb-4 flex items-center">
              <AppIcon name="Calculator" className="h-5 w-5 mr-2 text-primary" />
              Salary Calculator
            </Text>

            <div className="space-y-4">
              <FormField
                label="Basic Salary (₹)"
                type="number"
                value={payrollData.basicSalary}
                onChange={onBasicSalaryChange}
                placeholder="Enter basic salary"
              />

              <Button
                onClick={onCalculate}
                disabled={!payrollData.basicSalary || !selectedEmployee}
                className="w-full"
                icon="Calculator"
              >
                Calculate Payroll
              </Button>

              <PayrollTaxBreakdown calculatedPayroll={calculatedPayroll} />
            </div>
          </Card>
        )
      }

      export default PayrollCalculator