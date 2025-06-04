import leaveData from '../mockData/leaves.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class LeaveService {
  constructor() {
    this.data = [...leaveData]
  }

  async getAll() {
    await delay(300)
    return [...this.data]
  }

  async getById(id) {
    await delay(200)
    const leave = this.data.find(item => item.leaveId === id)
    if (!leave) {
      throw new Error(`Leave with ID ${id} not found`)
    }
    return { ...leave }
  }

  async getByEmployeeId(employeeId) {
    await delay(250)
    const leaves = this.data.filter(item => item.employeeId === employeeId)
    return leaves.map(leave => ({ ...leave }))
  }

  async create(leave) {
    await delay(400)
    const newLeave = {
      ...leave,
      leaveId: `LV${Date.now()}`,
      status: leave.status || 'pending',
      appliedDate: new Date().toISOString().split('T')[0]
    }
    this.data.push(newLeave)
    return { ...newLeave }
  }

  async update(id, updatedData) {
    await delay(350)
    const index = this.data.findIndex(item => item.leaveId === id)
    if (index === -1) {
      throw new Error(`Leave with ID ${id} not found`)
    }
    this.data[index] = { ...this.data[index], ...updatedData }
    return { ...this.data[index] }
  }

  async delete(id) {
    await delay(250)
    const index = this.data.findIndex(item => item.leaveId === id)
    if (index === -1) {
      throw new Error(`Leave with ID ${id} not found`)
    }
    const deleted = this.data.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default new LeaveService()