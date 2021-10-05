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
  const { name, email, phone, type } = req.body;

  // Build a contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = Contact.findById(req.params.id);
    if (!contact)
      return res.status(404).json({
        msg: `No contact found by the id ${req.params.id} created by user ${req.user.id}`,
      });
    // Make sure {user} owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      // Update the fields with the contactFields
      { $set: contactFields },
      // If doesnt exist, create it instead
      { new: true }
    );

    // Send back updated Contact
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// @route     DELETE api/contacts/:id
// @desc      Delete contact
// @access    Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.status(200).json({ msg: "Contact removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
