import { body } from "express-validator";

const TYPE_ENUM = ["game", "console"];
const STATUS_ENUM = ["active", "inactive", "discontinued"];

export const createProductExpressValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("The name field is required"),
  
  body("type")
    .notEmpty()
    .withMessage("The type field is required")
    .isIn(TYPE_ENUM)
    .withMessage(`Type must be one of: ${TYPE_ENUM.join(", ")}`),
  
  body("price")
    .notEmpty()
    .withMessage("The price field is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a number greater than or equal to 0"),
  
  body("quantity")
    .notEmpty()
    .withMessage("The quantity field is required")
    .isInt({ min: 0 })
    .withMessage("Quantity must be an integer greater than or equal to 0"),
  
  body("sku")
    .notEmpty()
    .withMessage("The sku field is required")
    .isString()
    .withMessage("Sku must be a string"),
  
  body("platform")
    .notEmpty()
    .withMessage("The platform field is required")
    .isString()
    .withMessage("Platform must be a string"),
  
  body("brand")
    .notEmpty()
    .withMessage("The brand field is required")
    .isString()
    .withMessage("Brand must be a string"),
  
  body("status")
    .notEmpty()
    .withMessage("The status field is required")
    .isIn(STATUS_ENUM)
    .withMessage(`Status must be one of: ${STATUS_ENUM.join(", ")}`)
];
