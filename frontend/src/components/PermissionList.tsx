import React, { KeyboardEvent } from 'react';
import { X } from 'lucide-react';

/**
 * Props for the PermissionList component
 */
interface PermissionListProps {
  permissions: string[];
  currentPermission: string;
  onPermissionChange: (value: string) => void;
  onPermissionAdd: (permission: string) => void;
  onPermissionRemove: (index: number) => void;
  error?: string;
}

/**
 * Component for managing a list of permissions with chip-style display
 */
export const PermissionList: React.FC<PermissionListProps> = ({
  permissions,
  currentPermission,
  onPermissionChange,
  onPermissionAdd,
  onPermissionRemove,
  error
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentPermission.trim()) {
      e.preventDefault();
      onPermissionAdd(currentPermission.trim());
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Profile Permission List
      </label>
      <div className={`border rounded-md p-2 min-h-[10rem] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}>
        <div className="flex flex-wrap gap-2 mb-2">
          {permissions.map((permission, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
            >
              <span>{permission}</span>
              <button
                onClick={() => onPermissionRemove(index)}
                className="hover:text-blue-600 focus:outline-none"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          className="w-full p-2 border-none focus:outline-none bg-transparent"
          value={currentPermission}
          onChange={(e) => onPermissionChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a permission and press Enter..."
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};