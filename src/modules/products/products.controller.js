import { log } from "console";
import { findAllProductsServices, insertOneProductServices, updateOneProductServices, deleteOneProductServices } from "./products.services.js"


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
                message: "Duplicated SKU"
            })
        }
        next(error)
    }

}

export async function updateOneProductController(req, res, next) {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updated = await updateOneProductServices(id, updates);

        const data = updated?.value ?? updated;

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data
        });
    } catch (err) {

        if (err?.code === "SKU_DUPLICATE" || (err?.code === 11000 && err?.keyPattern?.sku)) {
            return res.status(409).json({
                success: false,
                message: "SKU already exists"
            });
        }

        if (err?.code === "PRODUCT_NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return next(err);
    }
}

//for deleting one product
export async function deleteOneProductController(req, res, next) {
    try {
        const { id } = req.params;

        const deleted = await deleteOneProductServices(id);

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: deleted   
        });
    } catch (err) {
        if (err?.code === "PRODUCT_NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Product not found "
            });
        }
        return next(err);
    }
}
