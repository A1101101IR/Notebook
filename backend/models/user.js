const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    biography: {
      type: String,
    },
    educations: [
      {
        school: {
          type: String,
          required: true,
        },
        education: {
          type: String,
          required: true,
        },
      },
    ],
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers: [
      {
        followersId: {
          type: String,
          required: true,
        },
      },
    ],
    following: [
      {
        followingId: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
