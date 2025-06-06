import React from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button'; // Assuming Button is a basic button

const TaskCard = ({ task, index, onComplete, onFocusMode }) => {
  const priorityColors = {
    low: 'bg-blue-100 text-blue-700 border-blue-200',
    medium: 'bg-zen-mint/20 text-zen-sage border-zen-mint/30',
    high: 'bg-orange-100 text-orange-700 border-orange-200'
  };

  const priorityIcons = {
    low: 'Circle',
    medium: 'Minus',
    high: 'AlertCircle'
  };

  return (
    <motion.div
      key={task.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-zen hover:shadow-float transition-all duration-300 group cursor-pointer relative overflow-hidden"
    >
      <div className="flex items-start space-x-4">
        {/* Complete button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onComplete(task.id)}
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
  );
};

export default TaskCard;