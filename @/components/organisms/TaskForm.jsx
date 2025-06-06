import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import FormField from '@/components/molecules/FormField';

const TaskForm = ({ categories, onSubmit, onCancel, showForm, onToggleForm, activeView }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium');
  const [taskCategory, setTaskCategory] = useState(categories[0]?.id || '');
  const [estimatedMinutes, setEstimatedMinutes] = useState('');

  const categoryOptions = categories.map(cat => ({ value: cat.id, label: cat.name }));
  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const dueDate = new Date();
    if (activeView === 'tomorrow') {
      dueDate.setDate(dueDate.getDate() + 1);
    } else if (activeView === 'week') {
      dueDate.setDate(dueDate.getDate() + 3);
    }

    const newTaskData = {
      title: newTaskTitle.trim(),
      priority: taskPriority,
      dueDate: dueDate.toISOString(),
      completed: false,
      category: taskCategory || categories[0]?.id || '',
      estimatedMinutes: estimatedMinutes ? parseInt(estimatedMinutes) : null
    };

    onSubmit(newTaskData);
    setNewTaskTitle('');
    setEstimatedMinutes('');
    onToggleForm(false);
  };

  const handleCancel = () => {
    setNewTaskTitle('');
    setEstimatedMinutes('');
    onToggleForm(false);
    onCancel();
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mb-8"
    >
      <AnimatePresence>
        {!showForm ? (
          <motion.button
            key="add-button"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onToggleForm(true)}
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
              <FormField
                id="newTaskTitle"
                label="What would you like to accomplish?"
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                autoFocus
              />

              {/* Additional options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Priority */}
                <FormField
                  id="taskPriority"
                  label="Priority"
                  type="select"
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value)}
                  options={priorityOptions}
                />

                {/* Category */}
                <FormField
                  id="taskCategory"
                  label="Category"
                  type="select"
                  value={taskCategory}
                  onChange={(e) => setTaskCategory(e.target.value)}
                  options={categoryOptions}
                />

                {/* Estimated time */}
                <FormField
                  id="estimatedMinutes"
                  label="Minutes"
                  type="number"
                  value={estimatedMinutes}
                  onChange={(e) => setEstimatedMinutes(e.target.value)}
                  placeholder="30"
                  min="1"
                  max="480"
                />
              </div>

              {/* Action buttons */}
              <div className="flex space-x-3 pt-2">
                <motion.button
                  as={Button}
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!newTaskTitle.trim()}
                  className="flex-1 py-3 bg-zen-sage text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Plant Task
                </motion.button>
                <motion.button
                  as={Button}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancel}
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
  );
};

export default TaskForm;