import React from 'react';

/**
 * Props for the ConnectionStringInput component
 */
interface ConnectionStringInputProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Component for inputting and managing connection strings
 */
export const ConnectionStringInput: React.FC<ConnectionStringInputProps> = ({ value, onChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Connection String
      </label>
      <textarea
        className="w-full h-40 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter the connection string to analyze..."
      />
    </div>
  );
};