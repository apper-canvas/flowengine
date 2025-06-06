import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const ProgressGarden = ({ completedToday }) => {
  return (
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
  );
};

export default ProgressGarden;