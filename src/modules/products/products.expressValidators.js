import { body, param } from "express-validator";

const TYPE_ENUM = ["game", "console"];
const STATUS_ENUM = ["active", "inactive", "discontinued"];

//for validate how to create a product
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

//Validating :id , need to be a mongoid type
export const idParamValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid product id")
];

//for validating pacht route
export const patchProductValidator = [
  
  body().custom((value, { req }) => {
    const allowed = ["name", "type", "price", "quantity", "sku", "platform", "brand", "status"];
    const keys = Object.keys(req.body || {});
    if (keys.length === 0) {
      throw new Error("At least one updatable field is required");
    }
    const invalid = keys.filter(k => !allowed.includes(k));
    if (invalid.length > 0) {
      throw new Error(`Field '${invalid[0]}' is not allowed`);
    }
    return true;
  }),

  //atleast one field need to be filled
  body("name")
    .optional({ nullable: false })
    .isString().withMessage("Name must be a non-empty string")
    .trim().notEmpty().withMessage("Name must be a non-empty string")
    .isLength({ max: 120 }).withMessage("Name must be at most 120 characters"),

  body("type")
    .optional({ nullable: false })
    .isIn(TYPE_ENUM).withMessage(`Type must be one of: ${TYPE_ENUM.join(", ")}`),

  body("price")
    .optional({ nullable: false })
    .isFloat({ min: 0 }).withMessage("Price must be a number greater than or equal to 0"),

  body("quantity")
    .optional({ nullable: false })
    .isInt({ min: 0 }).withMessage("Quantity must be an integer greater than or equal to 0"),

  body("sku")
    .optional({ nullable: false })
    .isString().withMessage("Sku must be a non-empty string")
    .trim().notEmpty().withMessage("Sku must be a non-empty string")
    .isLength({ max: 40 }).withMessage("Sku must be at most 40 characters"),

  body("platform")
    .optional({ nullable: false })
    .isString().withMessage("Platform must be a non-empty string")
    .trim().notEmpty().withMessage("Platform must be a non-empty string")
    .isLength({ max: 60 }).withMessage("Platform must be at most 60 characters"),

  body("brand")
    .optional({ nullable: false })
    .isString().withMessage("Brand must be a non-empty string")
    .trim().notEmpty().withMessage("Brand must be a non-empty string")
    .isLength({ max: 60 }).withMessage("Brand must be at most 60 characters"),

  body("status")
    .optional({ nullable: false })
    .isIn(STATUS_ENUM).withMessage(`Status must be one of: ${STATUS_ENUM.join(", ")}`)
];