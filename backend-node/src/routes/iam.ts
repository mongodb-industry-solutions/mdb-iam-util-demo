import express, { Request, Response } from "express";
import { IAMController } from "../controllers/iam";

const controller = new IAMController()
const router = express.Router();

router.post('/rectify', async (req: Request, res: Response) => controller.rectify(req, res));

export default router;
