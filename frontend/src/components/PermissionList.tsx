import React, { KeyboardEvent, ClipboardEvent } from "react";
import { Info, X } from "lucide-react";

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
  error,
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    let current = currentPermission.trim().replace(/['"]/g, '');
    if (e.key === "Enter" && current.trim()) {
      e.preventDefault();

      if (current.includes(",")) {
        processCSVInput(current);
      } else onPermissionAdd(current);
    }
  };

  /**
   * Handles paste events to support CSV data pasting
   */
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("text").replace(/['"]/g, '');

    if (pastedText.includes(",")) {
      e.preventDefault();
      // Combine current input with pasted text
      const combinedInput = currentPermission + pastedText;
      processCSVInput(combinedInput);
    }
  };

  /**
   * Processes CSV input and adds multiple permissions with better error handling
   */
  const processCSVInput = (input: string) => {
    const permissionsToAdd = input
      .split(",")
      .map((permission) => permission.trim())
      .filter((permission) => permission.length > 0);

    const newPermissions: string[] = [];
    const duplicates: string[] = [];

    permissionsToAdd.forEach((permission) => {
      if (
        !permissions.includes(permission) &&
        !newPermissions.includes(permission)
      ) {
        permissions.push(permission);
        newPermissions.push(permission);
      } else {
        duplicates.push(permission);
      }
    });

    console.log("New permissions:", newPermissions); // Debug log
    console.log("Duplicates:", duplicates); // Debug log

    // Add all new permissions
    newPermissions.forEach((permission) => {
      onPermissionAdd(permission);
    });

    // Show feedback for duplicates if any
    if (duplicates.length > 0) {
      setTimeout(() => {
        const event = new CustomEvent("duplicatePermissions", {
          detail: duplicates,
        });
        window.dispatchEvent(event);
      }, 0);
    }

    // Clear the input after processing
    onPermissionChange("");
  };

  /**
   * Handles input changes - simplified to only update the input value
   */
  const handleInputChange = (value: string) => {
    onPermissionChange(value);
    // Removed auto-processing logic that was interfering with natural typing
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center gap-2 mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Required Permissions
        </label>
        <div className="group relative">
          <Info
            size={16}
            className="text-gray-400 hover:text-gray-600 cursor-help"
          />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
            Tip: Use commas to separate multiple permissions (CSV format)
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
          </div>
        </div>
      </div>
      <div
        className={`border rounded-md p-2 min-h-[10rem] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
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
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder="Type a permission and press Enter..."
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};
