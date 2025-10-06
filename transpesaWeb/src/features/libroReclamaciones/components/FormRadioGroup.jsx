import React from 'react';

export default function FormRadioGroup({ label, name, value, onChange, options, inline = false }) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <div className={`flex ${inline ? 'space-x-4' : 'flex-col space-y-2'}`}>
        {options.map(option => (
          <label key={option} className="inline-flex items-center">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={onChange}
              className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
            />
            <span className="ml-2 text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}