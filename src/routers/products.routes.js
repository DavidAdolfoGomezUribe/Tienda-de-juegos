import { Router } from "express";
import {findAllProductsController,insertOneProductController} from "../modules/products/products.controller.js"
import { createProductExpressValidator } from "../modules/products/products.expressValidators.js";
import { validateRequest } from "../modules/products/products.requestValidators.js";
import checkJsonContentType from "../middlewares/checkJsonContentType.js"
import {log} from "console"

const router = Router();

router.get("/",findAllProductsController)
router.post("/",checkJsonContentType,createProductExpressValidator,validateRequest,insertOneProductController)



export default router