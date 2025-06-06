import { X509Service } from "../services/x509";
import { Request, Response } from "express";

export class X509Controller {

    private srv: X509Service;

    constructor() {
        this.srv = new X509Service();
    }

    async rectify(req: Request, res: Response): Promise<void> {
        try {
            let key = req.body?.key || process.env.DB_KEY;
            let cert = req.body?.cert || process.env.DB_CERT;
            let ca = req.body?.ca || process.env.DB_CA;
            let uri = req.body?.connection || req.body?.uri;

            let permissions = req.body?.permissions || [
                "search",
                "read",
                "find",
                "insert",
                "update",
                "remove",
                "collMod",
            ];

            let { extra, missing, present } = await this.srv.rectify({ uri, permissions });

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