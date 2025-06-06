import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen zen-gradient">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header skeleton */}
          <div className="text-center space-y-4">
            <div className="h-12 bg-surface-200 rounded-lg w-64 mx-auto animate-pulse"></div>
            <div className="h-6 bg-surface-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>

          {/* View tabs skeleton */}
          <div className="flex justify-center space-x-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 w-24 bg-surface-200 rounded-xl animate-pulse"></div>
            ))}
          </div>

          {/* Task cards skeleton */}
          <div className="max-w-2xl mx-auto space-y-4">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-zen animate-pulse"
              >
                <div className="space-y-3">
                  <div className="h-6 bg-surface-200 rounded w-3/4"></div>
                  <div className="h-4 bg-surface-200 rounded w-1/2"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;