import { Router } from "express";
//controllers
import {
    findAllProductsController,
    insertOneProductController,
    updateOneProductController,
    deleteOneProductController
    } from "../modules/products/products.controller.js"
//express validators
import { createProductExpressValidator,idParamValidator,patchProductValidator } from "../modules/products/products.expressValidators.js";
//request validators
import { validateRequest } from "../modules/products/products.requestValidators.js";
//global middelwares
import checkJsonContentType from "../middlewares/checkJsonContentType.js"
//i dont want to type console.log() every f time
import {log} from "console"

const router = Router();

router.get("/",findAllProductsController)
router.post("/",checkJsonContentType,createProductExpressValidator,validateRequest,insertOneProductController)
router.patch("/:id",checkJsonContentType,idParamValidator,patchProductValidator,validateRequest,updateOneProductController)
router.delete("/:id",idParamValidator,validateRequest,deleteOneProductController)




export default router