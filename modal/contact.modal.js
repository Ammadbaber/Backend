// making schema

const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");




const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,

    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactUs", UserSchema);


