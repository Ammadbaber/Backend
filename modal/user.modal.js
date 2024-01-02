const mongoose = require("mongoose");
const UserdataSchema = new mongoose.Schema(
    {
      title:{
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
      username: {
        type: String,
        required: true,
        trim: true,
      },
      firstname: {
        type: String,
        required: true,
        trim: true,
      },
      lastname: {
        type: String,
        required: true,
        trim: true,
      },
      num: {
        type: Number,
        required: true,
        trim: true,
      },

    },
    { timestamps: true }
  );

  module.exports = mongoose.model("Userdata", UserdataSchema);

