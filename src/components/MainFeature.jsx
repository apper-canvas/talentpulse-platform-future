import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { employeeService, payrollService } from '../services'

const MainFeature = () => {
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

  const recentPayrolls = payrolls?.slice(-5) || []

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-surface-900">Payroll Management</h2>
          <p className="text-surface-600 mt-1">Calculate salaries with automated Indian tax deductions</p>
        </div>
        
        <div className="flex items-center space-x-2 bg-surface-100 rounded-xl p-1">
          {['calculator', 'history'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 capitalize ${
                activeTab === tab
                  ? 'bg-white text-primary shadow-card'
                  : 'text-surface-600 hover:text-surface-900'
              }`}
            >
              {tab}
            </button>
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
            {/* Employee Selection */}
            <div className="card">
              <h3 className="text-lg font-semibold text-surface-900 mb-4 flex items-center">
                <ApperIcon name="Users" className="h-5 w-5 mr-2 text-primary" />
                Select Employee
              </h3>
              
              <div className="relative mb-4">
                <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto scrollbar-hide">
                {filteredEmployees?.map((employee) => (
                  <motion.button
                    key={employee?.employeeId}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedEmployee(employee)
                      setPayrollData(prev => ({ ...prev, basicSalary: employee?.salary?.toString() || '' }))
                    }}
                    className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                      selectedEmployee?.employeeId === employee?.employeeId
                        ? 'bg-primary text-white shadow-card'
                        : 'bg-surface-50 hover:bg-surface-100 border border-surface-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedEmployee?.employeeId === employee?.employeeId
                          ? 'bg-white/20'
                          : 'bg-primary/10'
                      }`}>
                        <ApperIcon 
                          name="User" 
                          className={`h-5 w-5 ${
                            selectedEmployee?.employeeId === employee?.employeeId
                              ? 'text-white'
                              : 'text-primary'
                          }`} 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{employee?.personalInfo?.name}</p>
                        <p className={`text-sm truncate ${
                          selectedEmployee?.employeeId === employee?.employeeId
                            ? 'text-white/80'
                            : 'text-surface-500'
                        }`}>
                          {employee?.employeeId} • {employee?.department}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Payroll Calculator */}
            <div className="card">
              <h3 className="text-lg font-semibold text-surface-900 mb-4 flex items-center">
                <ApperIcon name="Calculator" className="h-5 w-5 mr-2 text-primary" />
                Salary Calculator
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Basic Salary (₹)
                  </label>
                  <input
                    type="number"
                    value={payrollData.basicSalary}
                    onChange={(e) => {
                      setPayrollData(prev => ({ ...prev, basicSalary: e.target.value }))
                      setCalculatedPayroll(null)
                    }}
                    placeholder="Enter basic salary"
                    className="input-field"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCalculatePayroll}
                  disabled={!payrollData.basicSalary || !selectedEmployee}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <ApperIcon name="Calculator" className="h-5 w-5" />
                  <span>Calculate Payroll</span>
                </motion.button>

                {calculatedPayroll && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 p-4 bg-primary/5 rounded-lg border border-primary/20"
                  >
                    <h4 className="font-semibold text-surface-900">Tax Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-surface-600">HRA (40%):</span>
                        <span className="font-medium">₹{calculatedPayroll.allowances.hra.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-surface-600">Special Allowance:</span>
                        <span className="font-medium">₹{calculatedPayroll.allowances.specialAllowance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-surface-600">PF (12%):</span>
                        <span className="font-medium text-error">-₹{calculatedPayroll.deductions.providentFund.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-surface-600">Professional Tax:</span>
                        <span className="font-medium text-error">-₹{calculatedPayroll.deductions.professionalTax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-surface-600">TDS:</span>
                        <span className="font-medium text-error">-₹{calculatedPayroll.deductions.tds.toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Payroll Summary */}
            <div className="card">
              <h3 className="text-lg font-semibold text-surface-900 mb-4 flex items-center">
                <ApperIcon name="FileText" className="h-5 w-5 mr-2 text-primary" />
                Payroll Summary
              </h3>

              {calculatedPayroll ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-surface-900 mb-2">{calculatedPayroll.employeeName}</h4>
                    <p className="text-sm text-surface-600 mb-3">{calculatedPayroll.employeeId} • {calculatedPayroll.month}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="text-surface-600">Basic Salary:</span>
                        <span className="font-semibold text-lg">₹{calculatedPayroll.basicSalary.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-success/5 rounded-lg border border-success/20">
                        <span className="text-surface-600">Gross Salary:</span>
                        <span className="font-semibold text-lg text-success">₹{calculatedPayroll.grossSalary.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-error/5 rounded-lg border border-error/20">
                        <span className="text-surface-600">Total Deductions:</span>
                        <span className="font-semibold text-lg text-error">-₹{calculatedPayroll.totalDeductions.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-gradient-primary rounded-lg text-white">
                        <span className="font-medium">Net Pay:</span>
                        <span className="font-bold text-xl">₹{calculatedPayroll.netPay.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSavePayroll}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <ApperIcon name="Save" className="h-5 w-5" />
                    <span>Save Payroll</span>
                  </motion.button>
                </motion.div>
              ) : (
                <div className="text-center py-8">
                  <ApperIcon name="Calculator" className="h-12 w-12 text-surface-300 mx-auto mb-3" />
                  <p className="text-surface-500">Calculate payroll to see summary</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-surface-900 mb-4 flex items-center">
              <ApperIcon name="History" className="h-5 w-5 mr-2 text-primary" />
              Recent Payroll Records
            </h3>

            {recentPayrolls?.length > 0 ? (
              <div className="space-y-3">
                {recentPayrolls.map((payroll, index) => (
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
                          <ApperIcon name="User" className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-surface-900">
                            {employees?.find(emp => emp?.employeeId === payroll?.employeeId)?.personalInfo?.name || 'Unknown Employee'}
                          </p>
                          <p className="text-sm text-surface-500">{payroll?.employeeId}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg text-success">₹{payroll?.netPay?.toLocaleString()}</p>
                        <p className="text-sm text-surface-500">{payroll?.month}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-surface-200">
                      <div className="text-center">
                        <p className="text-xs text-surface-500 mb-1">Basic</p>
                        <p className="font-medium">₹{payroll?.basicSalary?.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-surface-500 mb-1">Deductions</p>
                        <p className="font-medium text-error">
                          -₹{(
                            (payroll?.deductions?.providentFund || 0) + 
                            (payroll?.deductions?.professionalTax || 0) + 
                            (payroll?.deductions?.tds || 0)
                          ).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-surface-500 mb-1">Status</p>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          payroll?.status === 'processed' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-accent/10 text-accent'
                        }`}>
                          {payroll?.status || 'pending'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ApperIcon name="FileText" className="h-12 w-12 text-surface-300 mx-auto mb-3" />
                <p className="text-surface-500">No payroll records found</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default MainFeature