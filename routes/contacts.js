// Bring in Express
const express = require("express");
const router = express.Router();

//Create routes
/* @route   GET api/contacts
   @desc    Get all { user } contacts
   @access  Private
*/
router.get("/", (req, res) => {
  res.json({ msg: "Return Users Contacts" });
});

/* @route   POST api/contacts
   @desc    Add new { contact } to { user } contacts
   @access  Private
*/
router.post("/", (req, res) => {
  res.json({ msg: "Create Contact" });
});
/* @route   PUT api/contacts/:id
   @desc    Update { user } contact
   @access  Private
*/
router.put("/:id", (req, res) => {
  res.json({ msg: "Update Contacts" });
});
/* @route   DELETE api/contacts/:id
   @desc    Remove { user } contact
   @access  Private
*/
router.delete("/:id", (req, res) => {
  res.json({ msg: "Delete Contacts" });
});

module.exports = router;
