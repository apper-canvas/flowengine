import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const EmptyState = ({ onPlantFirstTask }) => {
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
        as={Button} // Use as prop for motion component with custom Button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPlantFirstTask}
        className="inline-flex items-center space-x-2 px-6 py-3 bg-zen-sage text-white rounded-xl shadow-zen font-medium"
      >
        <ApperIcon name="Plus" size={20} />
        <span>Plant First Task</span>
      </motion.button>
    </motion.div>
  );
};

export default EmptyState;