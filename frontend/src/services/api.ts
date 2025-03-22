import axios from 'axios';
import { AnalysisRequest, AnalysisResponse } from '../types';

/**
 * Service class for handling permission analysis API calls
 */
export class PermissionAnalysisService {
  private static instance: PermissionAnalysisService;
  private readonly baseUrl: string = 'https://api.example.com'; // Replace with actual API URL

  private constructor() {}

  /**
   * Gets the singleton instance of the service
   */
  public static getInstance(): PermissionAnalysisService {
    if (!PermissionAnalysisService.instance) {
      PermissionAnalysisService.instance = new PermissionAnalysisService();
    }
    return PermissionAnalysisService.instance;
  }

  /**
   * Generates a mock response based on the input permissions
   * @param permissions - List of permissions to analyze
   * @returns A deterministic mock response based on the input
   */
  private getMockResponse(permissions: string[]): AnalysisResponse {
    // Create deterministic responses based on specific permission combinations
    if (permissions.includes('admin')) {
      return {
        missing: [],
        extra: ['admin'], // admin is always considered an extra permission
        valid: ['read', 'write', 'delete'],
        status: 'partial'
      };
    }

    if (permissions.includes('read') && permissions.includes('write')) {
      return {
        missing: ['delete'],
        extra: [],
        valid: ['read', 'write'],
        status: 'partial'
      };
    }

    if (permissions.includes('read')) {
      return {
        missing: ['write', 'delete'],
        extra: [],
        valid: ['read'],
        status: 'partial'
      };
    }

    if (permissions.length === 0) {
      return {
        missing: ['read', 'write', 'delete'],
        extra: [],
        valid: [],
        status: 'none'
      };
    }

    // Default case for unrecognized permissions
    return {
      missing: ['read', 'write', 'delete'],
      extra: permissions,
      valid: [],
      status: 'none'
    };
  }

  /**
   * Analyzes permissions against the connection string
   * @param request - The analysis request payload
   * @returns Promise containing the analysis results
   */
  public async analyzePermissions(request: AnalysisRequest): Promise<AnalysisResponse> {
    try {
      // Log the request for debugging
      console.log('Analysis Request:', request);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate validation errors
      if (!request.connection_string.trim()) {
        throw new Error('Connection string is required');
      }

      if (request.profile_actions.length === 0) {
        throw new Error('At least one permission is required');
      }

      // Randomly simulate a network error (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Network Error: Failed to connect to the server');
      }

      // Return deterministic mock response
      return this.getMockResponse(request.profile_actions);
    } catch (error) {
      console.error('Error in analyzePermissions:', error);
      throw error;
    }
  }
}