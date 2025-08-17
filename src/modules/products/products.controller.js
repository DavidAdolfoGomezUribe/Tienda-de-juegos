import { findAllProductsServices, insertOneProductServices } from "./products.services.js"


export async function findAllProductsController(req, res, next) {
    try {
        const data = await findAllProductsServices();
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export async function insertOneProductController(req, res, next) {
    try {
        const product = await insertOneProductServices(req.body);
        return res.status(201).json(product)

    } catch (error) {
        if (error.code === "SKU_DUPLICATE") {
            return res.status(409).json({
                message:"Duplicated SKU"
            })
        }
        next(error)
    }

}
