import { findAllSalesServices,createSaleServices } from "./sales.services.js";

export async function findAllSalesController(req, res, next) {
    try {
        const data = await findAllSalesServices();
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}


export async function createSaleController(req, res) {
    try {
        const { customerId, paymentMethod, items } = req.body; // already validated by middleware

        const sale = await createSaleServices({ customerId, paymentMethod, items });

        return res.status(201).json(sale);
    } catch (err) {
        const { status, body } = mapServiceErrorToHttp(err);
        return res.status(status).json(body);
    }
}

function mapServiceErrorToHttp(err) {
    const code = err?.message || "INTERNAL_ERROR";

    const map = {
        CUSTOMER_ID_REQUIRED: { status: 400, message: "Customer ID is required." },
        PAYMENT_METHOD_REQUIRED: { status: 400, message: "Payment method is required." },
        ITEMS_REQUIRED: { status: 400, message: "Items array is required and cannot be empty." },

        PRODUCT_NOT_FOUND: { status: 404, message: "Product not found." },
        PRODUCT_INACTIVE: { status: 409, message: "Product is inactive." },
        STOCK_INSUFFICIENT: { status: 409, message: "Insufficient stock for the requested product." },
        STOCK_UPDATE_FAILED: { status: 409, message: "Failed to update stock (possible concurrency issue)." },
    };

    if (map[code]) {
        return {
            status: map[code].status,
            body: { error: code, message: map[code].message },
        };
    }

    return {
        status: 500,
        body: { error: "INTERNAL_ERROR", message: "Internal server error." },
    };
}
