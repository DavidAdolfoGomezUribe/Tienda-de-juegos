import { Router } from "express";
import productsRouter from "./products.routes.js";
import salesRouter from "./sales.routes.js"

const router = Router();

router.use("/products",productsRouter);

router.use("/sales",salesRouter)


export default router

