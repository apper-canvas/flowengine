import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const ProgressIndicator = ({ completedCount }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-6 flex items-center justify-center space-x-4"
    >
      <div className="flex items-center space-x-2">
        <ApperIcon name="Leaf" size={20} className="text-zen-sage" />
        <span className="text-surface-700 dark:text-surface-300 font-medium">
          {completedCount} completed today
        </span>
      </div>
      <div className="w-2 h-2 bg-zen-mint rounded-full animate-breathe"></div>
    </motion.div>
  );
};

export default ProgressIndicator;