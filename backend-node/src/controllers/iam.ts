import { IAMService } from "../services/iam";
import { Request, Response } from "express";

export class IAMController {

    private srv: IAMService;

    constructor() {
        this.srv = new IAMService();
    }

    async rectify(req: Request, res: Response): Promise<void> {
        try {
            let username = req.body?.username || process.env.DB_USERNAME;
            let password = req.body?.password || process.env.DB_PASSWORD;
            let host = req.body?.host || process.env.DB_HOST || "solutionsassurance.n0kts.mongodb.net";
            let app = req.body?.app || process.env.DB_APP || "MyLocalApp";
            let connection = req.body?.connection || `mongodb+srv://${username}:${password}@${host}/?retryWrites=true&w=majority&appName=${app}`;

            let permissions = req.body?.permissions || [
                "search",
                "read",
                "find",
                "insert",
                "update",
                "remove",
                "collMod",
            ];

            let { extra, missing, present } = await this.srv.rectify({ connection, permissions });

            res.json({
                // over-privileged
                extra: extra,
                // under-privilidged
                missing: !missing.length && !present.length && !extra.length ? permissions : missing,
                // required-privileged
                present
            });
        }
        catch (error) {
            res.status(500).json({ message: "Something were wrong" })
        }
    }

}