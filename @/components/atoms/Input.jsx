import React from 'react';

const Input = ({ className, ...props }) => {
  return (
    <input
      className={className}
      {...props}
    />
  );
};

export default Input;