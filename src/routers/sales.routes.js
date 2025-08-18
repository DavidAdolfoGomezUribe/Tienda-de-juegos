import { Router } from "express";

import findAllSalesController from "../modules/sales/sales.controller.js"

const router = Router();

router.get("/",findAllSalesController)


export default router