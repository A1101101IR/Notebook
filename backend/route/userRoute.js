const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { db } = require("../models/user");
const { ObjectId } = require("mongodb");
const upload = require("../models/upload");
/* get all users */

router.get("/users", (req, res) => {
  User.find()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/* get singel user by id */
router.get("/users/:id", (req, res) => {
  db.collection("users")
    .findOne({ _id: ObjectId(req.params.id) })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/* add avatar */
router.post("/users/:id", upload.single("file"), (req, res) => {
  console.log(req.file.path);
  db.collection("users")
    .updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $set: {
          avatar: req.file.path,
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

/* uppdate user info */
router.patch("/users/:id", (req, res) => {
  console.log(req.body);
  db.collection("users")
    .updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          biography: req.body.biography,
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
