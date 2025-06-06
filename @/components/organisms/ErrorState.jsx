import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen zen-gradient flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center p-8"
      >
        <ApperIcon name="AlertCircle" className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-heading font-semibold text-surface-800 mb-2">
          Something went wrong
        </h2>
        <p className="text-surface-600 mb-6">{error}</p>
        <motion.button
          as={Button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="px-6 py-3 bg-primary text-white rounded-xl shadow-zen"
        >
          Try again
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ErrorState;