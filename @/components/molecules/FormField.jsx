import React from 'react';
import Input from '@/components/atoms/Input';

const FormField = ({ label, id, value, onChange, type = 'text', placeholder, options, min, max, autoFocus, className, ...props }) => {
  const isSelect = type === 'select';
  const isFloatingLabel = !!placeholder; // Floating label logic tied to placeholder presence

  const renderControl = () => {
    if (isSelect) {
      return (
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 bg-zen-mist dark:bg-surface-700 rounded-lg border-0 focus:ring-2 focus:ring-zen-sage/50 outline-none text-surface-800 dark:text-surface-100 ${className || ''}`}
          {...props}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    } else {
      return (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-4 bg-zen-mist dark:bg-surface-700 rounded-xl border-0 focus:ring-2 focus:ring-zen-sage/50 outline-none text-surface-800 dark:text-surface-100 ${isFloatingLabel ? 'peer placeholder-transparent' : ''} ${className || ''}`}
          placeholder={placeholder}
          min={min}
          max={max}
          autoFocus={autoFocus}
          {...props}
        />
      );
    }
  };

  return (
    <div className={isFloatingLabel ? "relative" : ""}>
      {renderControl()}
      {label && (
        isFloatingLabel ? (
          <label
            htmlFor={id}
            className={`absolute left-4 transition-all duration-300 pointer-events-none text-surface-500 dark:text-surface-400 ${
              value ? '-top-2 text-sm bg-zen-mist dark:bg-surface-700 px-2 rounded' : 'top-4 text-lg'
            }`}
          >
            {label}
          </label>
        ) : (
          <label htmlFor={id} className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
            {label}
          </label>
        )
      )}
    </div>
  );
};

export default FormField;