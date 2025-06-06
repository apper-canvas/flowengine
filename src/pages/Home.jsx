import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, isToday, isTomorrow, isThisWeek, startOfWeek, endOfWeek } from 'date-fns'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { taskService, categoryService, dailyProgressService } from '../services'
import { toast } from 'react-toastify'

const Home = ({ darkMode, toggleDarkMode }) => {
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [dailyProgress, setDailyProgress] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeView, setActiveView] = useState('today')
  const [focusMode, setFocusMode] = useState(false)
  const [focusTask, setFocusTask] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [tasksData, categoriesData, progressData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll(),
        dailyProgressService.getAll()
      ])
      setTasks(tasksData)
      setCategories(categoriesData)
      setDailyProgress(progressData)
    } catch (err) {
      setError(err.message || 'Failed to load data')
      toast.error('Failed to load your zen garden')
    } finally {
      setLoading(false)
    }
  }

  const filteredTasks = tasks.filter(task => {
    if (!task.dueDate) return activeView === 'today'
    const dueDate = new Date(task.dueDate)
    
    switch (activeView) {
      case 'today':
        return isToday(dueDate) && !task.completed
      case 'tomorrow':
        return isTomorrow(dueDate) && !task.completed
      case 'week':
        return isThisWeek(dueDate, { weekStartsOn: 1 }) && !task.completed
      default:
        return true
    }
  })

  const completedToday = tasks.filter(task => 
    task.completed && task.completedAt && isToday(new Date(task.completedAt))
  ).length

  const handleTaskComplete = async (taskId) => {
    try {
      const completedTask = await taskService.update(taskId, { 
        completed: true, 
        completedAt: new Date().toISOString() 
      })
      setTasks(prev => prev.map(task => 
        task.id === taskId ? completedTask : task
      ))
      toast.success('Task completed! 🌱 Your garden grows')
    } catch (err) {
      toast.error('Failed to complete task')
    }
  }

  const handleTaskCreate = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData)
      setTasks(prev => [...prev, newTask])
      toast.success('Task planted in your zen garden')
    } catch (err) {
      toast.error('Failed to create task')
    }
  }

  const enterFocusMode = (task) => {
    setFocusTask(task)
    setFocusMode(true)
  }

  const exitFocusMode = () => {
    setFocusMode(false)
    setFocusTask(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen zen-gradient">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            {/* Header skeleton */}
            <div className="text-center space-y-4">
              <div className="h-12 bg-surface-200 rounded-lg w-64 mx-auto animate-pulse"></div>
              <div className="h-6 bg-surface-200 rounded w-96 mx-auto animate-pulse"></div>
            </div>
            
            {/* View tabs skeleton */}
            <div className="flex justify-center space-x-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 w-24 bg-surface-200 rounded-xl animate-pulse"></div>
              ))}
            </div>
            
            {/* Task cards skeleton */}
            <div className="max-w-2xl mx-auto space-y-4">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-zen animate-pulse"
                >
                  <div className="space-y-3">
                    <div className="h-6 bg-surface-200 rounded w-3/4"></div>
                    <div className="h-4 bg-surface-200 rounded w-1/2"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen zen-gradient flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-8"
        >
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-heading font-semibold text-surface-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-surface-600 mb-6">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadData}
            className="px-6 py-3 bg-primary text-white rounded-xl shadow-zen"
          >
            Try again
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen zen-gradient paper-texture">
      {/* Dark mode toggle */}
      <div className="fixed top-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleDarkMode}
          className="p-3 bg-white dark:bg-surface-800 rounded-full shadow-zen"
        >
          <ApperIcon 
            name={darkMode ? 'Sun' : 'Moon'} 
            size={20} 
            className="text-primary dark:text-zen-mint" 
          />
        </motion.button>
      </div>

      {/* Focus Mode Overlay */}
      <AnimatePresence>
        {focusMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 glass-morphism flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-3xl p-8 shadow-float max-w-lg w-full"
            >
              <div className="text-center mb-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="w-16 h-16 bg-zen-mint rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <ApperIcon name="Focus" size={28} className="text-primary" />
                </motion.div>
                <h2 className="text-2xl font-heading font-semibold text-surface-800 dark:text-surface-100">
                  Focus Mode
                </h2>
                <p className="text-surface-600 dark:text-surface-400 mt-2">
                  Breathe and focus on this task
                </p>
              </div>

              {focusTask && (
                <div className="bg-zen-mist dark:bg-surface-700 rounded-2xl p-6 mb-6">
                  <h3 className="text-lg font-medium text-surface-800 dark:text-surface-100 mb-2">
                    {focusTask.title}
                  </h3>
                  {focusTask.estimatedMinutes && (
                    <p className="text-surface-600 dark:text-surface-400">
                      Estimated: {focusTask.estimatedMinutes} minutes
                    </p>
                  )}
                </div>
              )}

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTaskComplete(focusTask.id)}
                  className="flex-1 py-3 bg-zen-sage text-white rounded-xl font-medium"
                >
                  Complete Task
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={exitFocusMode}
                  className="flex-1 py-3 bg-surface-200 dark:bg-surface-600 text-surface-800 dark:text-surface-200 rounded-xl font-medium"
                >
                  Exit Focus
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <motion.h1
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="text-4xl md:text-5xl font-heading font-light text-primary dark:text-zen-mint mb-4"
          >
            Zen Flow
          </motion.h1>
          <p className="text-surface-600 dark:text-surface-400 text-lg">
            Find your rhythm in the garden of productivity
          </p>
          
          {/* Progress indicator */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex items-center justify-center space-x-4"
          >
            <div className="flex items-center space-x-2">
              <ApperIcon name="Leaf" size={20} className="text-zen-sage" />
              <span className="text-surface-700 dark:text-surface-300 font-medium">
                {completedToday} completed today
              </span>
            </div>
            <div className="w-2 h-2 bg-zen-mint rounded-full animate-breathe"></div>
          </motion.div>
        </motion.div>

        {/* View Tabs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white dark:bg-surface-800 rounded-2xl p-2 shadow-zen">
            {['today', 'tomorrow', 'week'].map((view) => (
              <motion.button
                key={view}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveView(view)}
                className={`px-6 py-3 rounded-xl font-medium transition-all capitalize ${
                  activeView === view
                    ? 'bg-zen-sage text-white shadow-soft'
                    : 'text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-zen-mint'
                }`}
              >
                {view}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Task Management */}
        <MainFeature
          tasks={filteredTasks}
          categories={categories}
          onTaskComplete={handleTaskComplete}
          onTaskCreate={handleTaskCreate}
          onFocusMode={enterFocusMode}
          activeView={activeView}
        />

        {/* Progress Garden */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-heading font-semibold text-surface-800 dark:text-surface-100 mb-6">
            Your Progress Garden
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
            {[...Array(Math.min(completedToday, 8))].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="aspect-square bg-gradient-to-br from-zen-mint to-zen-sage rounded-2xl flex items-center justify-center shadow-soft"
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3 + i * 0.5 }}
                >
                  <ApperIcon name="Sprout" size={24} className="text-white" />
                </motion.div>
              </motion.div>
            ))}
            {completedToday === 0 && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="col-span-2 md:col-span-4 py-8"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <ApperIcon name="Seedling" size={32} className="text-surface-400 mx-auto mb-2" />
                </motion.div>
                <p className="text-surface-500 dark:text-surface-400">
                  Complete tasks to grow your garden
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home