// Bring in Express
const express = require("express");
const router = express.Router();

//Create routes
/* @route   POST api/users
   @desc    Register a user
   @access  Public
*/
router.post("/", (req, res) => {
  res.json({ msg: "Registers a user" });
});

module.exports = router;
