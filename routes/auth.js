const express = require("express");
const { check, body } = require("express-validator/check");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail(),
  body("password", "Invalid password.")
    .isLength({ min: 5 })
    .isAlphanumeric()
    .trim(),
  authController.postLogin
);

router.post(
  "/signup",
  check("name").notEmpty().withMessage("Please enter your name."),
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail()
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject("A user with that email is already registered");
        }
      });
    }),
  body(
    "password",
    "Please ensure your password is at least 5 characters long and only consists of alphanumeric characters."
  )
    .isLength({ min: 5 })
    .isAlphanumeric(),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),
  authController.postSignup
);

router.post("/logout", authController.postLogout);

module.exports = router;
