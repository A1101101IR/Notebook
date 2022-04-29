const express = require("express");
const { ObjectId } = require("mongodb");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Post = require("./models/post");
const User = require("./models/user");
const { db } = require("./models/user");
const PORT = process.env.PORT || 3000;
const app = express();
const databaseURL =
  "mongodb+srv://amir:Amir2022@cluster0.s6vjp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => app.listen(3001))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log("new req made");
  console.log("host: ", req.hostname);
  console.log("path:", req.path);
  console.log("method", req.method);
  next();
});

app.get("/", (req, res) => {
  /* res.redirect("/posts"); */
  console.log("user is in homepage");
  res.send(console.log(`Server is listening to ${PORT}`));
});

/* create post */
app.post("/create", (req, res) => {
  console.log("User created new post!");
  const post = new Post(req.body);
  post
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

/* get all posts */
app.get("/posts", (req, res) => {
  Post.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

/* get single post */
app.get("/posts/:id", (req, res) => {
  db.collection("posts")
    .findOne({ _id: ObjectId(req.params.id) })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

/* get all users */
app.get("/users", (req, res) => {
  console.log("User get all postdata!!");
  User.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

/* get singel user */
app.get("/users/:id", (req, res) => {
  db.collection("users")
    .findOne({ _id: ObjectId(req.params.id) })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

/* Create new user */
app.get("/new-user", (req, res) => {
  const user = new User({
    username: "nobody",
    firstname: "nob",
    lastname: "nabizadeh",
    email: "nabizadeh@gmail.com",
    phone: 0730307201,
  });
  user
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

/* create new post */
app.get("/new-post", (req, res) => {
  const post = new Post({
    title: "new post",
    author: "nobody",
    body: "Hello World! this is a new post 4!",
  });
  post
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
