import { MongoRoleManager } from "@mongodb-solution-assurance/iam-util";
import { RectificationOption, RectificationResponse } from "../models/rectification";

export class IAMService {

    async rectify(options: RectificationOption): Promise<RectificationResponse> {
        // Collect options to carry out the rectification process
        let dbUsername = options.username || "dorottya";
        let dbPassword = options.password || "passwordone";
        let dbHost = options.host || "solutionsassurance.n0kts.mongodb.net";
        let dbApp = options.app || "MyLocalApp";
        let connectionString = options.connection || `mongodb+srv://${dbUsername}:${dbPassword}@${dbHost}/?retryWrites=true&w=majority&appName=${dbApp}`;
        let requiredPermissions = options.permissions || [
            "search",
            "read",
            "find",
            "insert",
            "update",
            "remove",
            "collMod",
        ];

        // Create the role manager instance
        let roleManager = new MongoRoleManager(connectionString);

        // Perform the rectification acction
        return roleManager.verifyPermissions(requiredPermissions)
    }

}