const express = require("express");
const router = express.Router();
const { db } = require("../models/user");
const { ObjectId } = require("mongodb");

/* Router for add following id to following list */
router.post("/following/:id", (req, res) => {
  try {
    db.collection("users").updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $push: {
          following: {
            followingId: req.body.followingId,
          },
        },
      }
    );
    res.status(200).json({ status: "ok" });
  } catch (err) {
    console.log(err);
  }
});

/* Router for delete following id from following list */
router.delete("/following/:id", (req, res) => {
  try {
    db.collection("users").updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $pull: {
          following: {
            followingId: req.body.followingId,
          },
        },
      }
    );
    res.status(200).json({ status: "ok" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
