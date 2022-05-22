const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    authorId: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    likes: [
      {
        like: {
          type: String,
          required: true,
          unique: true,
        },
      },
    ],
    comments: [
      {
        authorId: {
          type: String,
          required: true,
        },
        body: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
