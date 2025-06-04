import payrollData from '../mockData/payrolls.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class PayrollService {
  constructor() {
    this.data = [...payrollData]
  }

  async getAll() {
    await delay(300)
    return [...this.data]
  }

  async getById(id) {
    await delay(200)
    const payroll = this.data.find(item => item.payrollId === id)
    if (!payroll) {
      throw new Error(`Payroll with ID ${id} not found`)
    }
    return { ...payroll }
  }

  async getByEmployeeId(employeeId) {
    await delay(250)
    const payrolls = this.data.filter(item => item.employeeId === employeeId)
    return payrolls.map(payroll => ({ ...payroll }))
  }

  async create(payroll) {
    await delay(400)
    const newPayroll = {
      ...payroll,
      payrollId: `PAY${Date.now()}`,
      status: payroll.status || 'processed',
      generatedDate: new Date().toISOString().split('T')[0]
    }
    this.data.push(newPayroll)
    return { ...newPayroll }
  }

  async update(id, updatedData) {
    await delay(350)
    const index = this.data.findIndex(item => item.payrollId === id)
    if (index === -1) {
      throw new Error(`Payroll with ID ${id} not found`)
    }
    this.data[index] = { ...this.data[index], ...updatedData }
    return { ...this.data[index] }
  }

  async delete(id) {
    await delay(250)
    const index = this.data.findIndex(item => item.payrollId === id)
    if (index === -1) {
      throw new Error(`Payroll with ID ${id} not found`)
    }
    const deleted = this.data.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default new PayrollService()