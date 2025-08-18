import { findAllSalesServices } from "./sales.services.js";

export default async function findAllSalesController(req, res, next) {
    try {
        const data = await findAllSalesServices();
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}