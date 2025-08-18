import { Router } from "express";
import checkJsonContentType from "../middlewares/checkJsonContentType.js";
import {findAllSalesController , createSaleController} from "../modules/sales/sales.controller.js"
import { createSaleValidators } from "../modules/sales/sales.expressValidators.js";
import { validateRequest } from "../modules/sales/sales.requestValidator.js";

const router = Router();

router.get("/",findAllSalesController)
router.post("/",checkJsonContentType,createSaleValidators,validateRequest,createSaleController)


export default router