const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");




const SignupSchema = new mongoose.Schema(
  {
    username:{
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
    password: {
      type: String,
    required: [true, "Your password is required"],

    },

  },
  { timestamps: true }
);

SignupSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12); 
});

module.exports = mongoose.model("SignUp", SignupSchema);