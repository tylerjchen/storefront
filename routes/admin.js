const path = require("path");

const express = require("express");
const { body } = require("express-validator");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  body("title")
    .isString()
    .isLength({ min: 5 })
    .trim()
    .withMessage("Please ensure title is at least five characters long."),
  //   body("image").withMessage("Please ensure the image URL is valid."),
  body("price").isFloat().withMessage("Please enter a valid price."),
  body("description")
    .isLength({ min: 5, max: 400 })
    .withMessage(
      "Please ensure description is at least 5-400 characters long."
    ),
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  body("title")
    .isString()
    .isLength({ min: 5 })
    .trim()
    .withMessage("Please ensure title is at least five characters long."),
  body("price").isFloat().withMessage("Please enter a valid price."),
  body("description")
    .isLength({ min: 5, max: 400 })
    .withMessage(
      "Please ensure description is at least 5-400 characters long."
    ),
  isAuth,
  adminController.postEditProduct
);

router.delete("/product/:productId", isAuth, adminController.deleteProduct);

module.exports = router;
