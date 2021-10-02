/* 
    Need to create the User Model for the database
    Bring in mongoose, declare a UserSchema and 
    give it properties
*/

const mongoose = require("mongoose");

/* 
    To declare properites of an Entity object
    declare the name of the attribute (i.e. name)
    declare the type of this attribute (i.e. {String})
    IF required to create object specify
*/
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  //Will Be hashed
  password: {
    type: String,
    required: true,
  },
  //TimeStamp creation date
  date: {
    type: Date,
    default: Date.now,
  },
});

// export the schema
module.exports = mongoose.model("user", UserSchema);
