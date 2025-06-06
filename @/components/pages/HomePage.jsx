import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { isToday, isTomorrow, isThisWeek } from 'date-fns';
import { toast } from 'react-toastify';
import { taskService, categoryService, dailyProgressService } from '@/services';
import ApperIcon from '@/components/ApperIcon';

import AppHeader from '@/components/organisms/AppHeader';
import ViewTabs from '@/components/molecules/ViewTabs';
import TaskForm from '@/components/organisms/TaskForm';
import TaskList from '@/components/organisms/TaskList';
import ProgressGarden from '@/components/organisms/ProgressGarden';
import LoadingSkeleton from '@/components/organisms/LoadingSkeleton';
import ErrorState from '@/components/organisms/ErrorState';
import FocusModeModal from '@/components/organisms/FocusModeModal';
import Button from '@/components/atoms/Button';

const HomePage = ({ darkMode, toggleDarkMode }) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dailyProgress, setDailyProgress] = useState([]); // Not used in refactored UI, but keeping for data fetching consistency
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState('today');
  const [focusMode, setFocusMode] = useState(false);
  const [focusTask, setFocusTask] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [tasksData, categoriesData, progressData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll(),
        dailyProgressService.getAll()
      ]);
      setTasks(tasksData);
      setCategories(categoriesData);
      setDailyProgress(progressData); // Keep the data for consistency
    } catch (err) {
      setError(err.message || 'Failed to load data');
      toast.error('Failed to load your zen garden');
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (!task.dueDate) return activeView === 'today'; // Tasks without due date show in 'today'
    const dueDate = new Date(task.dueDate);

    switch (activeView) {
      case 'today':
        return isToday(dueDate) && !task.completed;
      case 'tomorrow':
        return isTomorrow(dueDate) && !task.completed;
      case 'week':
        return isThisWeek(dueDate, { weekStartsOn: 1 }) && !task.completed;
      default:
        return true;
    }
  });

  const completedToday = tasks.filter(task =>
    task.completed && task.completedAt && isToday(new Date(task.completedAt))
  ).length;

  const handleTaskComplete = async (taskId) => {
    try {
      const completedTask = await taskService.update(taskId, {
        completed: true,
        completedAt: new Date().toISOString()
      });
      setTasks(prev => prev.map(task =>
        task.id === taskId ? completedTask : task
      ));
      toast.success('Task completed! 🌱 Your garden grows');
      if (focusMode && focusTask?.id === taskId) {
        exitFocusMode(); // Exit focus mode if the focused task is completed
      }
    } catch (err) {
      toast.error('Failed to complete task');
    }
  };

  const handleTaskCreate = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [...prev, newTask]);
      toast.success('Task planted in your zen garden');
    } catch (err) {
      toast.error('Failed to create task');
    }
  };

  const enterFocusMode = (task) => {
    setFocusTask(task);
    setFocusMode(true);
  };

  const exitFocusMode = () => {
    setFocusMode(false);
    setFocusTask(null);
  };

  const handleToggleTaskForm = (show) => {
    setShowTaskForm(show);
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={loadData} />;
  }

  return (
    <div className="min-h-screen zen-gradient paper-texture">
      {/* Dark mode toggle */}
      <div className="fixed top-6 right-6 z-50">
        <motion.button
          as={Button}
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
      <FocusModeModal
        focusTask={focusTask}
        onCompleteTask={handleTaskComplete}
        onExitFocus={exitFocusMode}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <AppHeader completedToday={completedToday} />

        <ViewTabs activeView={activeView} onSelectView={setActiveView} />

        {/* Task Management */}
        <div className="max-w-2xl mx-auto">
          {filteredTasks.length === 0 && !showTaskForm ? (
            <EmptyState onPlantFirstTask={() => handleToggleTaskForm(true)} />
          ) : (
            <>
              <TaskForm
                categories={categories}
                onSubmit={handleTaskCreate}
                onCancel={() => handleToggleTaskForm(false)}
                showForm={showTaskForm}
                onToggleForm={handleToggleTaskForm}
                activeView={activeView}
              />
              <TaskList
                tasks={filteredTasks}
                onTaskComplete={handleTaskComplete}
                onFocusMode={enterFocusMode}
              />
            </>
          )}
        </div>

        <ProgressGarden completedToday={completedToday} />
      </div>
    </div>
  );
};

export default HomePage;