// Bring in Express
const express = require("express");
const router = express.Router();

//Create routes
/* @route   GET api/auth
   @desc    Get logged in user
   @access  Private
*/
router.get("/", (req, res) => {
  res.json({ msg: "Gets a User" });
});

/* @route   POST api/auth
   @desc    Auth user & get Token
   @access  Public
*/
router.post("/", (req, res) => {
  res.json({ msg: "Log in a user" });
});

module.exports = router;
