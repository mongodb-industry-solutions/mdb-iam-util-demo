/**
 * Represents the request payload for permission analysis
 */
export interface AnalysisRequest {
  connection_string: string;
  profile_actions: string[];
}

/**
 * Represents the response from the permission analysis API
 */
export interface AnalysisResponse {
  missing: string[];
  extra: string[];
  valid: string[];
  status: 'full' | 'partial' | 'none';
}

/**
 * Represents the status message configuration
 */
export interface StatusConfig {
  message: string;
  className: string;
}