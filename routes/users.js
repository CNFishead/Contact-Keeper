// Bring in Express
const express = require("express");
const router = express.Router();
// Validator
const { check, validationResult } = require("express-validator");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
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

    // Destructure data coming form body
    const { name, email, password } = req.body;

    try {
      // Search if user is already in the DB
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User Already exists" });
      }

      // otherwise Instantiate a new { User }
      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcyrpt.genSalt(10);
      // take the new { user } and hash the password
      user.password = await bcyrpt.hash(password, salt);

      // Save
      await user.save();
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
      res.satus(500).send("Server Error");
    }
  }
);

module.exports = router;
