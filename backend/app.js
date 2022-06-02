const morgan = require("morgan");
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { result } = require("lodash");
const User = require("./models/user");
const Post = require("./models/post");
const { ObjectId } = require("mongodb");
const { db } = require("./models/user");
const PORT = process.env.PORT || 3000;
const app = express();
const databaseURL =
  "mongodb+srv://fullstack:9K4ADMWCdbfPe9bI@cluster0.s6vjp.mongodb.net/fullstack01?retryWrites=true&w=majority";

mongoose
  .connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => app.listen(3001, console.log(`connected to ${PORT}`)))
  .catch((err) => console.log(err));

app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

/* tell me if any req is made */
/* app.use((req, res, next) => {
  console.log("new req made");
  console.log("host: ", req.hostname);
  console.log("path:", req.path);
  console.log("method", req.method);
  next();
}); */

const postRoute = require("./route/postRoute");
const userRoute = require("./route/userRoute");
const likeRoute = require("./route/likeRoute");
const followRoute = require("./route/followRoute");
const followingRoute = require("./route/followingRoute");

app.use(postRoute);
app.use(userRoute);
app.use(likeRoute);
app.use(followRoute);
app.use(followingRoute);

/* SEARCH FUNC */
app.post("/search", async (req, res) => {
  console.log(req.query.users);
  try {
    const userInDatabase = await User.findOne({
      firstname: req.body.firstname,
    });
    res.json({ data: userInDatabase });
  } catch (err) {
    res.json({ status: "cannot find" });
  }
  /* try {
    data = await databaseURL
      .db("fullstack01")
      .collection("users")
      .aggregate([
        {
          $search: {
            index: "default",
            compound: {
              must: [
                {
                  text: {
                    query: req.body.query,
                    path: "firstname",
                    fuzzy: {
                      maxEdits: 1,
                    },
                  },
                },
              ],
            },
          },
        },
        {
          $project: {
            _id: 1,
            firstname: 1,
          },
        },
        {
          $limit: 10,
        },
      ])
      .toArray();
    return res.send("data");
  } catch (err) {
    res.send(err);
  }
  console.log("hello"); */
});
/* user register */
app.post("/register", async (req, res) => {
  try {
    const userInDatabase = await User.findOne({
      email: req.body.email,
    });
    if (userInDatabase) {
      res.json({ status: "user exists" });
    } else {
      const user = await User.create({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        followers: [],
        following: [],
      });
      res.json({ status: "user created" });
    }
  } catch (err) {
    res.json({ status: "error", error: err });
  }
});
/* user login api */
app.post("/login", async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({
    email: req.body.email,
  });
  if (user) {
    /* const userId = user;
    const token = jwt.sign(
      {
        email: req.body.email,
      },
      "secret123"
    ); */
    /* return res.json({ token: token }); */
    return res.json({ currentUser: user });
  } else {
    res.json({ status: "cannot find" });
  }
});
/* add comment to post */
app.post("/comment/:id", (req, res) => {
  db.collection("posts")
    .updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $push: {
          comments: {
            authorId: req.body.authorId,
            body: req.body.comment,
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
