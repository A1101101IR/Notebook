const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const { db } = require("../models/user");
const { ObjectId } = require("mongodb");

/* Router for add like to like list */
router.post("/like/:id", (req, res) => {
  db.collection("posts")
    .updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $addToSet: {
          likes: {
            like: req.body.like,
          },
        },
      }
    )
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/* Router for delete lie from like list */
router.delete("/like/:id", (req, res) => {
  db.collection("posts")
    .updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $pull: {
          likes: {
            like: req.body.like,
          },
        },
      }
    )
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
