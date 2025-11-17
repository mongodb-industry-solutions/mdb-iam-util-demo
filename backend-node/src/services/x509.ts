import { MongoRoleManager } from "@mongodb-solution-assurance/iam-util";
import { RectificationResponse, RectificationX509Option } from "../models/rectification";
import { AuthOptions } from "@mongodb-solution-assurance/iam-util/dist/models/AuthOptions";
import tls from 'tls';

export class X509Service {

    async rectify(options: RectificationX509Option): Promise<RectificationResponse> {
        // Collect options to carry out the rectification process
        let requiredPermissions = options.permissions || [
            "search",
            "read",
            "find",
            "insert",
            "update",
            "remove",
            "collMod",
        ];

        // Create a custom secure context for TLS using Node.js `tls` library
        const secureContext = tls.createSecureContext({
            cert: options.cert, // PEM-formatted certificate (includes private key)
            key: options.key, // Private key in PEM format
            ca: options.ca,  // CA certificate for validation (optional)
        });

        // Specify TLS options for MongoClient using the custom secure context
        const ops = {
            tls: true,                      // Enable TLS encryption
            secureContext,                  // Pass the custom secure context
            authMechanism: 'MONGODB-X509',  // Enable X.509 authentication,
            uri: options.uri
        };

        // Create the role manager instance
        let roleManager = new MongoRoleManager(ops as AuthOptions);

        // Perform the rectification acction
        return roleManager.verifyPermissions(requiredPermissions);
    }

}