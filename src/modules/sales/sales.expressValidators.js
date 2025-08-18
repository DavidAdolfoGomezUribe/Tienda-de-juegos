
import { body } from "express-validator";

export const createSaleValidators = [
  body("customerId")
    .notEmpty().withMessage("Customer ID is required.")
    .isMongoId().withMessage("Customer ID must be a valid Mongo ObjectId."),

  body("paymentMethod")
    .notEmpty().withMessage("Payment method is required.")
    .isString().withMessage("Payment method must be a string.")
    .isIn(["cash", "card", "transfer"])
    .withMessage("Payment method must be one of: cash, card, transfer."),

  body("items")
    .isArray({ min: 1 }).withMessage("Items must be a non-empty array."),

  body("items.*.productId")
    .notEmpty().withMessage("Product ID is required for each item.")
    .isMongoId().withMessage("Product ID must be a valid Mongo ObjectId."),

  body("items.*.quantity")
    .notEmpty().withMessage("Quantity is required for each item.")
    .isInt({ min: 1 }).withMessage("Quantity must be an integer greater than 0."),
];
