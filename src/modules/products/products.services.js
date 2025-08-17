import { getDB, connect } from "../../db/config.js";
import { error, log } from "console"

await connect()

const db = getDB()

//const products = await db.collection("products").find().toArray()

//function for list all the products
export async function findAllProductsServices() {
    const products = await db.collection("products").find().toArray()
    return products
}

//insert one product to the collection products
export async function insertOneProductServices(bodyObject) {
    const productsDb = db.collection("products")

    if (bodyObject.sku) {
        const exist = await productsDb.findOne({ sku: bodyObject.sku });
        if (exist) {
            const error = new Error("SKU DUPLICATE")
            error.code = "SKU_DUPLICATE"
            throw error;
        }
    }

    const now = new Date();
    const product = {
        name: bodyObject.name,
        type: bodyObject.type,                      
        price: Number(bodyObject.price),
        quantity: Number(bodyObject.quantity),
        sku: bodyObject.sku ?? null,
        platform: bodyObject.platform ?? null,
        brand: bodyObject.brand ?? null,
        status: bodyObject.status ?? "active",
        createdAt: now,
        updatedAt: now
    };

    const response = await db.collection("products").insertOne(product)

    
    return {_ud:response.insertedId,...product}
}


