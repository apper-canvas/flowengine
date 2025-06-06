import React from 'react';
import { motion } from 'framer-motion';
import ProgressIndicator from '@/components/molecules/ProgressIndicator';

const AppHeader = ({ completedToday }) => {
  return (
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

      <ProgressIndicator completedCount={completedToday} />
    </motion.div>
  );
};

export default AppHeader;