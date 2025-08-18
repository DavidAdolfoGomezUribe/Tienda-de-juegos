import { getDB, connect } from "../../db/config.js";
import { ObjectId } from "mongodb";
import { error, log } from "console"

await connect()
const db = getDB()

export async function findAllSalesServices() {
    const products = await db.collection("sales").find().toArray()
    return products
}

export async function postOneSaleServices() {
    
}


export async function createSaleServices({ customerId, paymentMethod, items }) {
  if (!customerId) throw new Error("CUSTOMER_ID_REQUIRED");
  if (!paymentMethod) throw new Error("PAYMENT_METHOD_REQUIRED");
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("ITEMS_REQUIRED");
  }

  const db = getDB();
  const productsCol = db.collection("products");
  const salesCol = db.collection("sales");

  // get products from db
  const ids = items.map(i => new ObjectId(i.productId));
  const products = await productsCol
    .find({ _id: { $in: ids } })
    .project({ name: 1, type: 1, price: 1, quantity: 1, status: 1 })
    .toArray();

  const productMap = new Map(products.map(p => [String(p._id), p]));

  //validate existance and stock
  for (const it of items) {
    const p = productMap.get(String(it.productId));
    if (!p) throw new Error("PRODUCT_NOT_FOUND");
    if (p.status !== "active") throw new Error("PRODUCT_INACTIVE");
    if (p.quantity < it.quantity) throw new Error("STOCK_INSUFFICIENT");
  }

  // 3) Calcular totales
  const saleItems = [];
  let total = 0;

  for (const it of items) {
    const p = productMap.get(String(it.productId));
    const subtotal = Number((p.price * it.quantity).toFixed(2));
    total += subtotal;

    saleItems.push({
      productId: p._id,
      name: p.name,
      type: p.type,
      unitPrice: p.price,
      quantity: it.quantity,
      subtotal
    });
  }

  total = Number(total.toFixed(2));
  const now = new Date();

  const saleDoc = {
    datetime: now.toISOString(),
    items: saleItems,
    total,
    paymentMethod,
    status: "completed",
    customerId: new ObjectId(customerId),
    createdAt: now.toISOString()
  };

  
  for (const it of items) {
    const res = await productsCol.updateOne(
      { _id: new ObjectId(it.productId), quantity: { $gte: it.quantity } },
      { $inc: { quantity: -it.quantity } }
    );
    if (res.modifiedCount === 0) {
      throw new Error("STOCK_UPDATE_FAILED");
    }
  }

  const result = await salesCol.insertOne(saleDoc);
  return { _id: result.insertedId, ...saleDoc };
}
