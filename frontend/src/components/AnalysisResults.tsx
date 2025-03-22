import React from 'react';
import { AnalysisResponse } from '../types';

/**
 * Props for the AnalysisResults component
 */
interface AnalysisResultsProps {
  results: AnalysisResponse;
}

/**
 * Component for displaying permission analysis results
 */
export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'full':
        return {
          message: '✓ Full Match',
          className: 'bg-green-100 text-green-800'
        };
      case 'none':
        return {
          message: '✕ No Match',
          className: 'bg-red-100 text-red-800'
        };
      default:
        return {
          message: '⚠ Partial Match',
          className: 'bg-yellow-100 text-yellow-800'
        };
    }
  };

  const statusConfig = getStatusConfig(results.status);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {/* Missing Permissions */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold text-red-600 mb-3">
          Missing Permissions
        </h2>
        <ul className="space-y-2">
          {results.missing.map((permission, index) => (
            <li key={index} className="text-gray-700 bg-red-50 p-2 rounded">
              {permission}
            </li>
          ))}
          {results.missing.length === 0 && (
            <li className="text-gray-500 italic">No missing permissions</li>
          )}
        </ul>
      </div>

      {/* Extra Permissions */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold text-yellow-600 mb-3">
          Extra Permissions
        </h2>
        <ul className="space-y-2">
          {results.extra.map((permission, index) => (
            <li key={index} className="text-gray-700 bg-yellow-50 p-2 rounded">
              {permission}
            </li>
          ))}
          {results.extra.length === 0 && (
            <li className="text-gray-500 italic">No extra permissions</li>
          )}
        </ul>
      </div>

      {/* Valid Permissions */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold text-green-600 mb-3">
          Valid Permissions
        </h2>
        <ul className="space-y-2">
          {results.valid.map((permission, index) => (
            <li key={index} className="text-gray-700 bg-green-50 p-2 rounded">
              {permission}
            </li>
          ))}
          {results.valid.length === 0 && (
            <li className="text-gray-500 italic">No valid permissions</li>
          )}
        </ul>
      </div>

      {/* Status Message */}
      <div className="md:col-span-3">
        <div className={`p-4 rounded-lg text-center font-medium ${statusConfig.className}`}>
          {statusConfig.message}
        </div>
      </div>
    </div>
  );
};