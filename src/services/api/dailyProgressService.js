import { delay } from '../index.js'
import dailyProgressData from '../mockData/dailyProgress.json'

let dailyProgress = [...dailyProgressData]

const dailyProgressService = {
  async getAll() {
    await delay(250)
    return [...dailyProgress]
  },

  async getById(date) {
    await delay(150)
    const progress = dailyProgress.find(p => p.date === date)
    if (!progress) {
      throw new Error('Daily progress not found')
    }
    return { ...progress }
  },

  async create(progressData) {
    await delay(300)
    const newProgress = {
      ...progressData,
      date: progressData.date || new Date().toISOString().split('T')[0]
    }
    dailyProgress.push(newProgress)
    return { ...newProgress }
  },

  async update(date, updates) {
    await delay(250)
    const index = dailyProgress.findIndex(p => p.date === date)
    if (index === -1) {
      throw new Error('Daily progress not found')
    }
    dailyProgress[index] = { ...dailyProgress[index], ...updates }
    return { ...dailyProgress[index] }
  },

  async delete(date) {
    await delay(200)
    const index = dailyProgress.findIndex(p => p.date === date)
    if (index === -1) {
      throw new Error('Daily progress not found')
    }
    dailyProgress.splice(index, 1)
    return true
  }
}

export default dailyProgressService