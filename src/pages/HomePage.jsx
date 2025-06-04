import { useState, useEffect } from 'react'
      import { motion } from 'framer-motion'
      import AppIcon from '../components/atoms/AppIcon'
      import Text from '../components/atoms/Text'
      import LoadingSpinner from '../components/atoms/LoadingSpinner'
      import PageLayout from '../components/templates/PageLayout'
      import DashboardTemplate from '../components/templates/DashboardTemplate'
      import MainFeatureTemplate from '../components/templates/MainFeatureTemplate'
      import { employeeService, payrollService, leaveService, attendanceService } from '../services'

      const HomePage = () => {
        const [employees, setEmployees] = useState([])
        const [payrolls, setPayrolls] = useState([])
        const [leaves, setLeaves] = useState([])
        const [attendances, setAttendances] = useState([])
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(null)
        const [activeModule, setActiveModule] = useState('dashboard')

        useEffect(() => {
          const loadDashboardData = async () => {
            setLoading(true)
            try {
              const [employeeData, payrollData, leaveData, attendanceData] = await Promise.all([
                employeeService.getAll(),
                payrollService.getAll(),
                leaveService.getAll(),
                attendanceService.getAll()
              ])
              setEmployees(employeeData || [])
              setPayrolls(payrollData || [])
              setLeaves(leaveData || [])
              setAttendances(attendanceData || [])
            } catch (err) {
              setError(err.message)
            } finally {
              setLoading(false)
            }
          }
          loadDashboardData()
        }, [])

        const metrics = [
          {
            title: "Total Employees",
            value: employees?.length || 0,
            trend: "+12%",
            trendUp: true,
            icon: "Users",
            color: "bg-primary"
          },
          {
            title: "Monthly Payroll",
            value: `₹${(payrolls?.reduce((sum, p) => sum + (p?.netPay || 0), 0) / 100000).toFixed(1)}L`,
            trend: "+5.2%",
            trendUp: true,
            icon: "CreditCard",
            color: "bg-secondary"
          },
          {
            title: "Pending Leaves",
            value: leaves?.filter(l => l?.status === 'pending')?.length || 0,
            trend: "-8%",
            trendUp: false,
            icon: "Calendar",
            color: "bg-accent"
          },
          {
            title: "Today's Attendance",
            value: `${((attendances?.filter(a => a?.status === 'present')?.length || 0) / Math.max(employees?.length || 1, 1) * 100).toFixed(1)}%`,
            trend: "+2.1%",
            trendUp: true,
            icon: "Clock",
            color: "bg-success"
          }
        ]

        const navigationItems = [
          { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
          { id: 'employees', label: 'Employee Directory', icon: 'Users' },
          { id: 'payroll', label: 'Payroll Management', icon: 'CreditCard' },
          { id: 'attendance', label: 'Attendance Tracker', icon: 'Clock' },
          { id: 'leaves', label: 'Leave Management', icon: 'Calendar' },
          { id: 'recruitment', label: 'Recruitment', icon: 'UserPlus' }
        ]

        if (loading) {
          return <LoadingSpinner className="h-12 w-12" />
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
          <PageLayout
            navigationItems={navigationItems}
            activeModule={activeModule}
            setActiveModule={setActiveModule}
          >
            {activeModule === 'dashboard' && (
              <DashboardTemplate metrics={metrics} />
            )}

            {activeModule === 'payroll' && (
              <MainFeatureTemplate />
            )}

            {activeModule !== 'dashboard' && activeModule !== 'payroll' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <AppIcon name="Construction" className="h-16 w-16 text-surface-400 mx-auto mb-4" />
                <Text as="h3" className="text-xl font-semibold text-surface-900 mb-2">Module Under Development</Text>
                <Text as="p" className="text-surface-600">
                  The {navigationItems.find(item => item.id === activeModule)?.label} module is coming soon.
                </Text>
              </motion.div>
            )}
          </PageLayout>
        )
      }

      export default HomePage