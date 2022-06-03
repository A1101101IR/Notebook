const express = require("express");
const router = express.Router();
const Post = require("../models/post");

/* Router for getting all posts */
router.get("/posts", (req, res) => {
  Post.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

/* Router creating new post */
router.post("/posts/create", (req, res) => {
  const post = new Post(req.body);
  post
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/* Router for getting one single post */
router.get("/posts/:id", (req, res) => {
  db.collection("posts")
    .findOne({ _id: ObjectId(req.params.id) })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

/* Router for delete one single post */
router.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  Post.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/* Router for getting one single user posts */
router.get("/posts/user/:id", (req, res) => {
  Post.find({ authorId: req.params.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
