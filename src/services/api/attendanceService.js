import attendanceData from '../mockData/attendances.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class AttendanceService {
  constructor() {
    this.data = [...attendanceData]
  }

  async getAll() {
    await delay(300)
    return [...this.data]
  }

  async getById(id) {
    await delay(200)
    const attendance = this.data.find(item => item.attendanceId === id)
    if (!attendance) {
      throw new Error(`Attendance with ID ${id} not found`)
    }
    return { ...attendance }
  }

  async getByEmployeeId(employeeId) {
    await delay(250)
    const attendances = this.data.filter(item => item.employeeId === employeeId)
    return attendances.map(attendance => ({ ...attendance }))
  }

  async getByDate(date) {
    await delay(250)
    const attendances = this.data.filter(item => item.date === date)
    return attendances.map(attendance => ({ ...attendance }))
  }

  async create(attendance) {
    await delay(400)
    const newAttendance = {
      ...attendance,
      attendanceId: `ATT${Date.now()}`,
      date: attendance.date || new Date().toISOString().split('T')[0],
      status: attendance.status || 'present'
    }
    this.data.push(newAttendance)
    return { ...newAttendance }
  }

  async update(id, updatedData) {
    await delay(350)
    const index = this.data.findIndex(item => item.attendanceId === id)
    if (index === -1) {
      throw new Error(`Attendance with ID ${id} not found`)
    }
    this.data[index] = { ...this.data[index], ...updatedData }
    return { ...this.data[index] }
  }

  async delete(id) {
    await delay(250)
    const index = this.data.findIndex(item => item.attendanceId === id)
    if (index === -1) {
      throw new Error(`Attendance with ID ${id} not found`)
    }
    const deleted = this.data.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default new AttendanceService()