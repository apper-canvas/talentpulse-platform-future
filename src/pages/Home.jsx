import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { employeeService, payrollService, leaveService, attendanceService } from '../services'

const Home = () => {
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-error text-center">
          <ApperIcon name="AlertTriangle" className="h-12 w-12 mx-auto mb-4" />
          <p className="text-lg">Error loading data: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100">
      {/* Header */}
      <header className="bg-white border-b border-surface-200 shadow-soft sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <ApperIcon name="Zap" className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-surface-900">TalentPulse</h1>
                <p className="text-sm text-surface-600 hidden sm:block">HR Management Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative hidden md:block">
                <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="pl-10 pr-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none w-64"
                />
              </div>
              <button className="p-2 rounded-lg bg-surface-100 hover:bg-surface-200 transition-colors">
                <ApperIcon name="Bell" className="h-5 w-5 text-surface-700" />
              </button>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-white border-r border-surface-200 min-h-screen shadow-soft">
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left font-medium transition-all duration-200 ${
                  activeModule === item.id
                    ? 'bg-primary text-white shadow-card'
                    : 'text-surface-700 hover:bg-surface-100'
                }`}
              >
                <ApperIcon name={item.icon} className="h-5 w-5" />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </aside>

        {/* Mobile Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-surface-200 z-30">
          <nav className="flex justify-around py-2">
            {navigationItems.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  activeModule === item.id ? 'text-primary' : 'text-surface-600'
                }`}
              >
                <ApperIcon name={item.icon} className="h-5 w-5" />
                <span className="text-xs mt-1">{item.label.split(' ')[0]}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
            {activeModule === 'dashboard' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 sm:space-y-8"
              >
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 mb-2">Dashboard</h2>
                  <p className="text-surface-600">Welcome to your HR management overview</p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {metrics.map((metric, index) => (
                    <motion.div
                      key={metric.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="metric-card group cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 ${metric.color} rounded-xl flex items-center justify-center`}>
                          <ApperIcon name={metric.icon} className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className={`flex items-center text-sm font-medium ${
                          metric.trendUp ? 'text-success' : 'text-error'
                        }`}>
                          <ApperIcon 
                            name={metric.trendUp ? 'TrendingUp' : 'TrendingDown'} 
                            className="h-4 w-4 mr-1" 
                          />
                          {metric.trend}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-surface-900 mb-1">
                          {metric.value}
                        </h3>
                        <p className="text-sm text-surface-600">{metric.title}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="card"
                  >
                    <h3 className="text-lg font-semibold text-surface-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-surface-50 hover:bg-surface-100 transition-colors text-left">
                        <ApperIcon name="UserPlus" className="h-5 w-5 text-primary" />
                        <span className="font-medium">Add New Employee</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-surface-50 hover:bg-surface-100 transition-colors text-left">
                        <ApperIcon name="FileText" className="h-5 w-5 text-secondary" />
                        <span className="font-medium">Generate Payroll</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-surface-50 hover:bg-surface-100 transition-colors text-left">
                        <ApperIcon name="Calendar" className="h-5 w-5 text-accent" />
                        <span className="font-medium">Approve Leaves</span>
                      </button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card"
                  >
                    <h3 className="text-lg font-semibold text-surface-900 mb-4">Recent Activities</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-2">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse-success"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-surface-900">Salary processed for March</p>
                          <p className="text-xs text-surface-500">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-surface-900">Leave request from John Doe</p>
                          <p className="text-xs text-surface-500">5 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-surface-900">New employee onboarded</p>
                          <p className="text-xs text-surface-500">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card md:col-span-2 xl:col-span-1"
                  >
                    <h3 className="text-lg font-semibold text-surface-900 mb-4">Upcoming Events</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                          <ApperIcon name="Calendar" className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-surface-900">Payroll Processing</p>
                          <p className="text-sm text-surface-600">March 28, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-secondary/5 rounded-lg">
                        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                          <ApperIcon name="Users" className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-surface-900">Team Meeting</p>
                          <p className="text-sm text-surface-600">March 30, 2024</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeModule === 'payroll' && (
              <MainFeature />
            )}

            {activeModule !== 'dashboard' && activeModule !== 'payroll' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <ApperIcon name="Construction" className="h-16 w-16 text-surface-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-surface-900 mb-2">Module Under Development</h3>
                <p className="text-surface-600">
                  The {navigationItems.find(item => item.id === activeModule)?.label} module is coming soon.
                </p>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home