export { default as taskService } from './api/taskService.js'
export { default as categoryService } from './api/categoryService.js'
export { default as dailyProgressService } from './api/dailyProgressService.js'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export { delay }