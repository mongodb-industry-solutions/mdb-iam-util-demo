import express, { Request, Response } from "express";
import { SCRAMController } from "../controllers/scram";

const controller = new SCRAMController()
const router = express.Router();

router.post('/rectify', async (req: Request, res: Response) => controller.rectify(req, res));

export default router;
