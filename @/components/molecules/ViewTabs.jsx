import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';

const ViewTabs = ({ activeView, onSelectView }) => {
  return (
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
            onClick={() => onSelectView(view)}
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
  );
};

export default ViewTabs;