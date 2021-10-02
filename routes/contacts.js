// Bring in Express
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth");
const Contact = require("../models/Contacts");

//Create routes
/* @route   GET api/contacts
   @desc    Get all { user } contacts
   @access  Private
*/
router.get("/", auth, async (req, res) => {
  try {
    // search for contacts based on the user object id, sort by most recent
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

/* @route   POST api/contacts
   @desc    Add new { contact } to { user } contacts
   @access  Private
*/
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
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

    // Pull out data from the body
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        // this registers the contact to the user.
        user: req.user.id,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);
/* @route   PUT api/contacts/:id
   @desc    Update { user } contact
   @access  Private
*/
router.put("/:id", auth, async (req, res) => {
  res.json({ msg: "Update Contacts" });
});
/* @route   DELETE api/contacts/:id
   @desc    Remove { user } contact
   @access  Private
*/
router.delete("/:id", auth, async (req, res) => {
  res.json({ msg: "Delete Contacts" });
});

module.exports = router;
