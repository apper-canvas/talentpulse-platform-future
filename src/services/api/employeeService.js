import employeeData from '../mockData/employees.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class EmployeeService {
  constructor() {
    this.data = [...employeeData]
  }

  async getAll() {
    await delay(300)
    return [...this.data]
  }

  async getById(id) {
    await delay(200)
    const employee = this.data.find(item => item.employeeId === id)
    if (!employee) {
      throw new Error(`Employee with ID ${id} not found`)
    }
    return { ...employee }
  }

  async create(employee) {
    await delay(400)
    const newEmployee = {
      ...employee,
      employeeId: `EMP${Date.now()}`,
      joiningDate: employee.joiningDate || new Date().toISOString().split('T')[0],
      leaveBalance: employee.leaveBalance || {
        casual: 12,
        sick: 12,
        earned: 21
      },
      attendanceRecords: []
    }
    this.data.push(newEmployee)
    return { ...newEmployee }
  }

  async update(id, updatedData) {
    await delay(350)
    const index = this.data.findIndex(item => item.employeeId === id)
    if (index === -1) {
      throw new Error(`Employee with ID ${id} not found`)
    }
    this.data[index] = { ...this.data[index], ...updatedData }
    return { ...this.data[index] }
  }

  async delete(id) {
    await delay(250)
    const index = this.data.findIndex(item => item.employeeId === id)
    if (index === -1) {
      throw new Error(`Employee with ID ${id} not found`)
    }
    const deleted = this.data.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default new EmployeeService()