/* 
    Need to create the Contact Model for the database
    Bring in mongoose, declare a ContactSchema and 
    give it properties
*/

const mongoose = require("mongoose");

/* 
    To declare properites of an Entity object
    declare the name of the attribute (i.e. name)
    declare the type of this attribute (i.e. {String})
    IF required to create object specify
*/
const ContactSchema = mongoose.Schema({
  // Create a relationship between Contacts and User
  user: {
    // the type is an Object ID, the id is created by mongoose
    type: mongoose.Schema.Types.ObjectId,
    // ref, refers to a collection
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  //Will Be hashed
  phone: {
    type: String,
  },
  type: {
    type: String,
    default: "personal",
  },
  //TimeStamp creation date
  date: {
    type: Date,
    default: Date.now,
  },
});

// export the schema
module.exports = mongoose.model("contact", ContactSchema);
