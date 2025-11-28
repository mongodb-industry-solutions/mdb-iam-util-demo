import { useState } from 'react';
import { Search, RefreshCcw } from 'lucide-react';
import { ConnectionStringInput } from './components/ConnectionStringInput';
import { PermissionList } from './components/PermissionList';
import { PrivilegeSelector } from './components/PrivilegeSelector';
import { AnalysisResults } from './components/AnalysisResults';
import { AnalysisResponse, RectifyRequest } from './types';
import { IAMService } from './services/iam.service';

/**
 * Main application component for permission analysis
 */
function App() {
  const [connectionString, setConnectionString] = useState('');
  const [currentPermission, setCurrentPermission] = useState('');
  const [permissionList, setPermissionList] = useState<string[]>([]);
  const [results, setResults] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddPermission = (permission: string) => {
    setPermissionList([...permissionList, permission]);
    setCurrentPermission('');
    setError(null); // Clear error when adding permissions
  };

  const handleRemovePermission = (index: number) => {
    setPermissionList(permissionList.filter((_, i) => i !== index));
  };

  const handlePermissionToggle = (permission: string) => {
    if (permissionList.includes(permission)) {
      setPermissionList(permissionList.filter(p => p !== permission));
    } else {
      setPermissionList([...permissionList, permission]);
    }
    setError(null);
  };

  const handleReser = async () => {
    setConnectionString('');
    setCurrentPermission('');
    setPermissionList([]);
    setError(null);
    setResults(null);
  }

  const handleAnalyze = async () => {
    // Validate permission list
    if (permissionList.length === 0) {
      setError('Please add at least one permission to analyze');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setResults(null);

      const request: RectifyRequest = {
        connection: connectionString,
        permissions: permissionList,
      };

      const iamService = IAMService.getInstance();
      const { extra, missing, present } = await iamService.rectify(request);

      setResults({ extra, missing, valid: present, status: !present?.length ? "none" : (present?.length === permissionList.length ? "full" : "partial") });
    } catch (error) {
      console.error('Analysis failed:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Permission Analyzer for SCRAM Authentication
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PrivilegeSelector
              selectedPermissions={permissionList}
              onPermissionToggle={handlePermissionToggle}
            />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <ConnectionStringInput
              value={connectionString}
              onChange={setConnectionString}
            />
            <PermissionList
              permissions={permissionList}
              currentPermission={currentPermission}
              onPermissionChange={setCurrentPermission}
              onPermissionAdd={handleAddPermission}
              onPermissionRemove={handleRemovePermission}
              error={permissionList.length === 0 ? 'At least one permission is required' : undefined}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">

          <div className='flex flex-row items-center gap-4'>
            <button
              onClick={handleAnalyze}
              disabled={isLoading || permissionList.length === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${isLoading || permissionList.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
              <Search size={20} />
              {isLoading ? 'Analyzing...' : 'Analyze Permissions'}
            </button>

            <button
              onClick={handleReser}
              disabled={isLoading}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white`}
            >
              <RefreshCcw size={20} />
              {isLoading ? 'Analyzing...' : 'Reset'}
            </button>
          </div>

          {error && (
            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
        </div>

        {results && <AnalysisResults results={results} />}
      </div>
    </div>
  );
}

export default App;