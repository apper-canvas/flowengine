import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const FocusModeModal = ({ focusTask, onCompleteTask, onExitFocus }) => {
  return (
    <AnimatePresence>
      {focusTask && (
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
                as={Button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCompleteTask(focusTask.id)}
                className="flex-1 py-3 bg-zen-sage text-white rounded-xl font-medium"
              >
                Complete Task
              </motion.button>
              <motion.button
                as={Button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onExitFocus}
                className="flex-1 py-3 bg-surface-200 dark:bg-surface-600 text-surface-800 dark:text-surface-200 rounded-xl font-medium"
              >
                Exit Focus
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FocusModeModal;