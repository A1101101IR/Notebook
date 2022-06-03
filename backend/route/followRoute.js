const express = require("express");
const router = express.Router();
const { db } = require("../models/user");
const { ObjectId } = require("mongodb");

/* follow */
router.post("/follow/:id", (req, res) => {
  try {
    db.collection("users").updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $push: {
          followers: {
            followersId: req.body.followersId,
          },
        },
      }
    );
    res.status(200).json({ status: "ok" });
  } catch (err) {
    console.log(err);
  }
});

/* Unfollow */
router.delete("/follow/:id", (req, res) => {
  try {
    db.collection("users").updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $pull: {
          followers: {
            followersId: req.body.followersId,
          },
        },
      }
    );
    res.status(202).json({ status: "ok" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
