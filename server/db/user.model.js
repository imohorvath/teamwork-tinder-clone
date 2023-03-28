// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  gender: String, 
  age: Number,
  hobbies: [String],
  introduction: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
