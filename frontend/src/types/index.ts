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


/**
 * Represents the request body for the rectify API.
 */
export interface RectifyRequest {
  /**
   * The MongoDB connection string.
   */
  connection: string;
  /**
   * An array of permissions to rectify.
   */
  permissions: string[];
}

/**
* Represents the response from the rectify API.
*/
export interface RectifyResponse {
  /**
   * An array of extra permissions.
   */
  extra: string[];
  /**
   * An array of missing permissions.
   */
  missing: string[];
  /**
   * An array of present permissions.
   */
  present: string[];
}