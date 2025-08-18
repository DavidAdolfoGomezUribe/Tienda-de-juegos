import { getDB, connect } from "../../db/config.js";
import { ObjectId } from "mongodb";
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


    return { _id: response.insertedId, ...product }
}


// Update one product by id
export async function updateOneProductServices(id, updates) {

    const productsDb = db.collection("products");

    if (updates.sku) {
        const exist = await productsDb.findOne({
            sku: updates.sku,
            _id: { $ne: new ObjectId(id) }
        });
        if (exist) {
            const error = new Error("SKU_DUPLICATE");
            error.code = "SKU_DUPLICATE";
            throw error;
        }
    }

    updates.updatedAt = new Date();

    const result = await productsDb.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updates },
        { returnDocument: "after" }
    );

    if (!result) {
        const error = new Error("PRODUCT_NOT_FOUND");
        error.code = "PRODUCT_NOT_FOUND";
        throw error;
    }

    return result;
}

//for deleting one product
export async function deleteOneProductServices(id) {

    const db = getDB();
    const productsDb = db.collection("products");

    const result = await productsDb.findOneAndDelete({ _id: new ObjectId(id) });
    
    if (!result) {
        const error = new Error("PRODUCT_NOT_FOUND");
        error.code = "PRODUCT_NOT_FOUND";
        throw error;
    }

    return result;
}