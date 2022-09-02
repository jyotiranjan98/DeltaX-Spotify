const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User.model");
const router = express.Router();

router.post(
  "/register",
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters"),
  body("email")
    .isEmail()
    .not()
    .isEmpty()
    .withMessage("email cannot be empty")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email is already taken");
      }
      return true;
    }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      console.log({ errors });
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      const user = await User.create(req.body);
      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }
  
);

module.exports = router;
