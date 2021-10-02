// Bring in Express
const express = require("express");
const router = express.Router();
// Validator
const { check, validationResult } = require("express-validator");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
// Middleware
const auth = require("../middleware/auth");

//Create routes
/* @route   GET api/auth
   @desc    Get logged in user
   @access  Private
*/
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

/* @route   POST api/auth
   @desc    Auth user & get Token
   @access  Public
*/
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
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

    // destructure body
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      // Take in the plain text password, hash it, compare it against password in database.
      // If its a match will return true.
      const isMatch = await bcyrpt.compare(password, user.password);

      if (!user || !isMatch) {
        // We didnt find a {user}
        return res
          .status(404)
          .json({ msg: "Invalid Credentials / User not found" });
      }

      // Create payload, JWT
      const payload = {
        user: {
          // Send the ID to the client, with this we will be able
          // to access all contacts.
          id: user._id,
        },
      };

      // Sign a jwt token
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          // Token Expires in an hour
          expiresIn: 3600,
        },
        // callback function
        // catch error, no error return token
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
