import { useState, useEffect } from 'react'
      import { motion, AnimatePresence } from 'framer-motion'
      import { toast } from 'react-toastify'
      import Text from '../atoms/Text'
      import LoadingSpinner from '../atoms/LoadingSpinner'
      import TabButton from '../molecules/TabButton'
      import EmployeeSelection from '../organisms/EmployeeSelection'
      import PayrollCalculator from '../organisms/PayrollCalculator'
      import PayrollSummary from '../organisms/PayrollSummary'
      import PayrollHistoryList from '../organisms/PayrollHistoryList'
      import { employeeService, payrollService } from '../../services'

      const MainFeatureTemplate = () => {
        const [employees, setEmployees] = useState([])
        const [payrolls, setPayrolls] = useState([])
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(null)
        const [selectedEmployee, setSelectedEmployee] = useState(null)
        const [payrollData, setPayrollData] = useState({
          basicSalary: '',
          hra: '',
          specialAllowance: '',
          providentFund: '',
          professionalTax: '',
          tds: ''
        })
        const [calculatedPayroll, setCalculatedPayroll] = useState(null)
        const [activeTab, setActiveTab] = useState('calculator')
        const [searchTerm, setSearchTerm] = useState('')

        useEffect(() => {
          const loadData = async () => {
            setLoading(true)
            try {
              const [employeeData, payrollData] = await Promise.all([
                employeeService.getAll(),
                payrollService.getAll()
              ])
              setEmployees(employeeData || [])
              setPayrolls(payrollData || [])
            } catch (err) {
              setError(err.message)
              toast.error('Failed to load data')
            } finally {
              setLoading(false)
            }
          }
          loadData()
        }, [])

        const calculateTaxes = (basicSalary) => {
          const basic = parseFloat(basicSalary) || 0
          const annualSalary = basic * 12

          // HRA calculation (40% of basic in metro cities)
          const hra = basic * 0.4

          // Special Allowance (30% of basic)
          const specialAllowance = basic * 0.3

          // PF calculation (12% of basic, max ₹1800)
          const pf = Math.min(basic * 0.12, 1800)

          // Professional Tax (state-specific, assuming ₹200)
          const professionalTax = 200

          // TDS calculation based on annual salary
          let tds = 0
          if (annualSalary > 250000) {
            if (annualSalary <= 500000) {
              tds = (annualSalary - 250000) * 0.05 / 12
            } else if (annualSalary <= 1000000) {
              tds = (12500 + (annualSalary - 500000) * 0.2) / 12
            } else {
              tds = (112500 + (annualSalary - 1000000) * 0.3) / 12
            }
          }

          return {
            hra: Math.round(hra),
            specialAllowance: Math.round(specialAllowance),
            providentFund: Math.round(pf),
            professionalTax,
            tds: Math.round(tds)
          }
        }

        const handleCalculatePayroll = () => {
          const basic = parseFloat(payrollData.basicSalary) || 0
          if (basic <= 0) {
            toast.error('Please enter a valid basic salary')
            return
          }

          const taxes = calculateTaxes(basic)
          const grossSalary = basic + taxes.hra + taxes.specialAllowance
          const totalDeductions = taxes.providentFund + taxes.professionalTax + taxes.tds
          const netPay = grossSalary - totalDeductions

          setCalculatedPayroll({
            employeeId: selectedEmployee?.employeeId || 'N/A',
            employeeName: selectedEmployee?.personalInfo?.name || 'N/A',
            basicSalary: basic,
            allowances: {
              hra: taxes.hra,
              specialAllowance: taxes.specialAllowance
            },
            deductions: {
              providentFund: taxes.providentFund,
              professionalTax: taxes.professionalTax,
              tds: taxes.tds
            },
            grossSalary,
            totalDeductions,
            netPay,
            month: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
          })
        }

        const handleSavePayroll = async () => {
          if (!calculatedPayroll || !selectedEmployee) {
            toast.error('Please calculate payroll first')
            return
          }

          try {
            const newPayroll = {
              employeeId: selectedEmployee.employeeId,
              month: calculatedPayroll.month,
              basicSalary: calculatedPayroll.basicSalary,
              allowances: calculatedPayroll.allowances,
              deductions: calculatedPayroll.deductions,
              taxCalculations: {
                tds: calculatedPayroll.deductions.tds,
                pf: calculatedPayroll.deductions.providentFund,
                professionalTax: calculatedPayroll.deductions.professionalTax
              },
              netPay: calculatedPayroll.netPay,
              status: 'processed'
            }

            const savedPayroll = await payrollService.create(newPayroll)
            setPayrolls(prev => [...prev, savedPayroll])
            toast.success('Payroll saved successfully!')

            // Reset form
            setCalculatedPayroll(null)
            setPayrollData({
              basicSalary: '',
              hra: '',
              specialAllowance: '',
              providentFund: '',
              professionalTax: '',
              tds: ''
            })
            setSelectedEmployee(null)
          } catch (err) {
            toast.error('Failed to save payroll')
          }
        }

        const filteredEmployees = employees?.filter(emp =>
          emp?.personalInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp?.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp?.department?.toLowerCase().includes(searchTerm.toLowerCase())
        ) || []

        if (loading) {
          return <LoadingSpinner />
        }

        if (error) {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-error text-center">
                <AppIcon name="AlertTriangle" className="h-12 w-12 mx-auto mb-4" />
                <Text as="p" className="text-lg">Error loading data: {error}</Text>
              </div>
            </div>
          )
        }

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <Text as="h2" className="text-2xl sm:text-3xl font-bold text-surface-900">Payroll Management</Text>
                <Text as="p" className="text-surface-600 mt-1">Calculate salaries with automated Indian tax deductions</Text>
              </div>

              <div className="flex items-center space-x-2 bg-surface-100 rounded-xl p-1">
                {['calculator', 'history'].map((tab) => (
                  <TabButton
                    key={tab}
                    label={tab}
                    isActive={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'calculator' && (
                <motion.div
                  key="calculator"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                  <EmployeeSelection
                    filteredEmployees={filteredEmployees}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedEmployee={selectedEmployee}
                    setSelectedEmployee={setSelectedEmployee}
                    setPayrollData={setPayrollData}
                  />

                  <PayrollCalculator
                    payrollData={payrollData}
                    calculatedPayroll={calculatedPayroll}
                    onBasicSalaryChange={(e) => {
                      setPayrollData(prev => ({ ...prev, basicSalary: e.target.value }))
                      setCalculatedPayroll(null)
                    }}
                    onCalculate={handleCalculatePayroll}
                    selectedEmployee={selectedEmployee}
                  />

                  <PayrollSummary
                    calculatedPayroll={calculatedPayroll}
                    onSavePayroll={handleSavePayroll}
                  />
                </motion.div>
              )}

              {activeTab === 'history' && (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <PayrollHistoryList
                    payrolls={payrolls}
                    employees={employees}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      }

      export default MainFeatureTemplate