import React from 'react';

export default function FormField({ label, name, type = 'text', value, onChange, required = false, ...props }) {
  const commonClasses = "block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm";
  
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={3}
          className={commonClasses}
          required={required}
          {...props}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={commonClasses}
          required={required}
          {...props}
        />
      )}
    </div>
  );
}