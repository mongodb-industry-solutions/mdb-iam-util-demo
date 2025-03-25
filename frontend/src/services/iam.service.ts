
/**
 * iam.service.ts
 *
 * This service provides an abstraction layer for interacting with the IAM REST API,
 * specifically for the `/rectify` endpoint.
 */

import { RectifyRequest, RectifyResponse } from "../types";

/**
 * IAMService class provides methods to interact with the IAM REST API.
 */
export class IAMService {
    private readonly baseUrl: string;
    private static instance: IAMService;

    /**
     * Constructs a new IAMService instance.
     *
     * @param baseUrl - The base URL of the IAM REST API.
     */
    constructor(baseUrl: string = 'http://localhost:3001/api/node/iam') {
        this.baseUrl = baseUrl;
    }

    /**
     * Gets the singleton instance of the service
     */
    public static getInstance(): IAMService {
        if (!IAMService.instance) {
            IAMService.instance = new IAMService();
        }
        return IAMService.instance;
    }

    /**
     * Rectifies permissions against the IAM service.
     *
     * @param request - The request object containing connection and permissions.
     * @returns A promise that resolves to the RectifyResponse.
     * @throws An error if the request fails.
     */
    async rectify(request: RectifyRequest): Promise<RectifyResponse> {
        const url = `${this.baseUrl}/rectify`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: RectifyResponse = await response.json();
            return data;
        } catch (error) {
            console.error('Error in IAMService.rectify:', error);
            throw error;
        }
    }
}