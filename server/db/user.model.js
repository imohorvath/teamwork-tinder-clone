// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  name: String,
  gender: String, 
  age: Number,
  hobbies: [String],
  introduction: String,
  image: String,
  liked: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  rejected: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
