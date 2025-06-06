import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, parseISO } from 'date-fns'
import ApperIcon from './ApperIcon'
import { toast } from 'react-toastify'

const MainFeature = ({ tasks, categories, onTaskComplete, onTaskCreate, onFocusMode, activeView }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [taskPriority, setTaskPriority] = useState('medium')
  const [taskCategory, setTaskCategory] = useState('')
  const [estimatedMinutes, setEstimatedMinutes] = useState('')
  const [draggedTask, setDraggedTask] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    const dueDate = new Date()
    if (activeView === 'tomorrow') {
      dueDate.setDate(dueDate.getDate() + 1)
    } else if (activeView === 'week') {
      dueDate.setDate(dueDate.getDate() + 3)
    }

    const newTask = {
      title: newTaskTitle.trim(),
      priority: taskPriority,
      dueDate: dueDate.toISOString(),
      completed: false,
      category: taskCategory || categories[0]?.id || '',
      estimatedMinutes: estimatedMinutes ? parseInt(estimatedMinutes) : null
    }

    onTaskCreate(newTask)
    setNewTaskTitle('')
    setEstimatedMinutes('')
    setShowTaskForm(false)
  }

  const handleTaskComplete = (task) => {
    onTaskComplete(task.id)
  }

  const priorityColors = {
    low: 'bg-blue-100 text-blue-700 border-blue-200',
    medium: 'bg-zen-mint/20 text-zen-sage border-zen-mint/30',
    high: 'bg-orange-100 text-orange-700 border-orange-200'
  }

  const priorityIcons = {
    low: 'Circle',
    medium: 'Minus',
    high: 'AlertCircle'
  }

  if (tasks.length === 0 && !showTaskForm) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-16"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="mb-8"
        >
          <ApperIcon name="Leaf" size={64} className="text-zen-sage mx-auto opacity-60" />
        </motion.div>
        
        <h3 className="text-2xl font-heading font-semibold text-surface-800 dark:text-surface-100 mb-4">
          Your zen garden awaits
        </h3>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-md mx-auto leading-relaxed">
          Plant your first task seed and watch your productivity garden bloom with mindful intention.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowTaskForm(true)}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-zen-sage text-white rounded-xl shadow-zen font-medium"
        >
          <ApperIcon name="Plus" size={20} />
          <span>Plant First Task</span>
        </motion.button>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Quick Add Task Bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <AnimatePresence>
          {!showTaskForm ? (
            <motion.button
              key="add-button"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowTaskForm(true)}
              className="w-full bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-zen border-2 border-dashed border-zen-mint/30 dark:border-zen-mint/20 hover:border-zen-sage/50 transition-all"
            >
              <div className="flex items-center space-x-3 text-surface-600 dark:text-surface-400">
                <ApperIcon name="Plus" size={24} className="text-zen-sage" />
                <span className="text-lg font-medium">Add a new task to your garden...</span>
              </div>
            </motion.button>
          ) : (
            <motion.form
              key="task-form"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onSubmit={handleSubmit}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-zen"
            >
              <div className="space-y-4">
                {/* Task title input with floating label */}
                <div className="relative">
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full px-4 py-4 bg-zen-mist dark:bg-surface-700 rounded-xl border-0 focus:ring-2 focus:ring-zen-sage/50 outline-none text-surface-800 dark:text-surface-100 text-lg peer placeholder-transparent"
                    placeholder="What would you like to accomplish?"
                    autoFocus
                  />
                  <label className={`absolute left-4 transition-all duration-300 pointer-events-none text-surface-500 dark:text-surface-400 ${
                    newTaskTitle ? '-top-2 text-sm bg-zen-mist dark:bg-surface-700 px-2 rounded' : 'top-4 text-lg'
                  }`}>
                    What would you like to accomplish?
                  </label>
                </div>

                {/* Additional options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Priority
                    </label>
                    <select
                      value={taskPriority}
                      onChange={(e) => setTaskPriority(e.target.value)}
                      className="w-full px-3 py-2 bg-zen-mist dark:bg-surface-700 rounded-lg border-0 focus:ring-2 focus:ring-zen-sage/50 outline-none text-surface-800 dark:text-surface-100"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Category
                    </label>
                    <select
                      value={taskCategory}
                      onChange={(e) => setTaskCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-zen-mist dark:bg-surface-700 rounded-lg border-0 focus:ring-2 focus:ring-zen-sage/50 outline-none text-surface-800 dark:text-surface-100"
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Estimated time */}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Minutes
                    </label>
                    <input
                      type="number"
                      value={estimatedMinutes}
                      onChange={(e) => setEstimatedMinutes(e.target.value)}
                      placeholder="30"
                      min="1"
                      max="480"
                      className="w-full px-3 py-2 bg-zen-mist dark:bg-surface-700 rounded-lg border-0 focus:ring-2 focus:ring-zen-sage/50 outline-none text-surface-800 dark:text-surface-100"
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-3 pt-2">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!newTaskTitle.trim()}
                    className="flex-1 py-3 bg-zen-sage text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Plant Task
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowTaskForm(false)
                      setNewTaskTitle('')
                      setEstimatedMinutes('')
                    }}
                    className="px-6 py-3 bg-surface-200 dark:bg-surface-600 text-surface-700 dark:text-surface-300 rounded-xl font-medium"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Task List */}
      <div className="space-y-4">
        <AnimatePresence>
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-zen hover:shadow-float transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                {/* Complete button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleTaskComplete(task)}
                  className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-zen-sage hover:bg-zen-sage hover:text-white transition-all flex items-center justify-center group-hover:scale-110"
                >
                  <ApperIcon name="Check" size={14} className="opacity-0 group-hover:opacity-100" />
                </motion.button>

                {/* Task content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-surface-800 dark:text-surface-100 mb-2 group-hover:text-zen-sage transition-colors">
                        {task.title}
                      </h4>
                      
                      <div className="flex items-center space-x-3 text-sm">
                        {/* Priority badge */}
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
                          <ApperIcon name={priorityIcons[task.priority]} size={12} />
                          <span className="capitalize">{task.priority}</span>
                        </span>

                        {/* Estimated time */}
                        {task.estimatedMinutes && (
                          <span className="flex items-center space-x-1 text-surface-500 dark:text-surface-400">
                            <ApperIcon name="Clock" size={12} />
                            <span>{task.estimatedMinutes}m</span>
                          </span>
                        )}

                        {/* Due date */}
                        {task.dueDate && (
                          <span className="flex items-center space-x-1 text-surface-500 dark:text-surface-400">
                            <ApperIcon name="Calendar" size={12} />
                            <span>{format(parseISO(task.dueDate), 'MMM d')}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Focus mode button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onFocusMode(task)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-zen-sage hover:bg-zen-mist dark:hover:bg-surface-700 rounded-lg transition-all"
                    >
                      <ApperIcon name="Focus" size={16} />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Ripple effect */}
              <motion.div
                className="absolute inset-0 bg-zen-sage/10 rounded-2xl opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MainFeature