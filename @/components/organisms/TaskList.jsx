import React from 'react';
import { AnimatePresence } from 'framer-motion';
import TaskCard from '@/components/molecules/TaskCard';

const TaskList = ({ tasks, onTaskComplete, onFocusMode }) => {
  return (
    <div className="space-y-4">
      <AnimatePresence>
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            index={index}
            onComplete={onTaskComplete}
            onFocusMode={onFocusMode}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;