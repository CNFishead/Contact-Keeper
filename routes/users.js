// Bring in Express
const express = require("express");
const router = express.Router();
// Validator
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");

//Create routes
/* @route   POST api/users
   @desc    Register a user
   @access  Public
*/
router.post(
  "/",
  [
    check("name", "Please Include a name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    /* 
      validationResult takes in req as a param
      checks against all values denoted above
      IF errors is NOT empty (There is an error present)
      return errors.
      else: create new user
    */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send("passed");
  }
);

module.exports = router;
