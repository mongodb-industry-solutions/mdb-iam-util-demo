import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import privilegeData from './privilegeActionsList.json';

interface PrivilegeSelectorProps {
  selectedPermissions: string[];
  onPermissionToggle: (permission: string) => void;
}

export const PrivilegeSelector: React.FC<PrivilegeSelectorProps> = ({
  selectedPermissions,
  onPermissionToggle,
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const isPermissionSelected = (permission: string) => {
    return selectedPermissions.includes(permission);
  };

  const renderPermissionButton = (permission: string) => {
    const isSelected = isPermissionSelected(permission);
    return (
      <button
        key={permission}
        onClick={() => onPermissionToggle(permission)}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          isSelected
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {permission}
      </button>
    );
  };

  const renderSubcategory = (subcategory: string, actions: string[], parentKey: string) => {
    const sectionKey = `${parentKey}-${subcategory}`;
    const isExpanded = expandedSections.has(sectionKey);

    return (
      <div key={sectionKey} className="ml-4 mb-2">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 mb-2"
        >
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <span className="capitalize">{subcategory.replace(/([A-Z])/g, ' $1').trim()}</span>
          <span className="text-xs text-gray-500">({actions.length})</span>
        </button>
        {isExpanded && (
          <div className="ml-6 flex flex-wrap gap-2">
            {actions.map(renderPermissionButton)}
          </div>
        )}
      </div>
    );
  };

  const renderCategory = (categoryName: string, categoryData: any) => {
    const isExpanded = expandedSections.has(categoryName);
    const isObject = typeof categoryData === 'object' && !Array.isArray(categoryData);
    
    // Count total actions
    let actionCount = 0;
    if (isObject) {
      Object.values(categoryData).forEach((subcategory: any) => {
        actionCount += Array.isArray(subcategory) ? subcategory.length : 0;
      });
    } else if (Array.isArray(categoryData)) {
      actionCount = categoryData.length;
    }

    return (
      <div key={categoryName} className="mb-3">
        <button
          onClick={() => toggleSection(categoryName)}
          className="flex items-center gap-2 text-base font-semibold text-gray-800 hover:text-gray-900 mb-2"
        >
          {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          <span className="capitalize">
            {categoryName.replace(/([A-Z])/g, ' $1').trim()}
          </span>
          <span className="text-xs text-gray-500 font-normal">({actionCount} actions)</span>
        </button>
        {isExpanded && (
          <div className="ml-2">
            {isObject ? (
              Object.entries(categoryData).map(([subcategory, actions]) =>
                renderSubcategory(subcategory, actions as string[], categoryName)
              )
            ) : (
              <div className="ml-4 flex flex-wrap gap-2">
                {(categoryData as string[]).map(renderPermissionButton)}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Select Privileges
      </h2>
      <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
        {Object.entries(privilegeData).map(([category, data]) =>
          renderCategory(category, data)
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Selected: <span className="font-semibold">{selectedPermissions.length}</span> permission(s)
        </p>
      </div>
    </div>
  );
};
