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
app.use(express.json());

app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log("new req made");
  console.log("host: ", req.hostname);
  console.log("path:", req.path);
  console.log("method", req.method);
  next();
});

/* app.get("/", (req, res) => {
  res.send(console.log(`Server is listening to ${PORT}`));
}); */

/* create post */
/* app.post("/create", (req, res) => {
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
}); */

/* create post */
/* app.post("/posts", (req, res) => {
  const post = req.body;
  db.collection("posts")
    .insertOne(post)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: "det gick ej!" });
    });
}); */

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

/* get single post by id */
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
  User.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

/* get singel user by id */
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
app.post("/adduser", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/* create new post */
app.post("/newpost", (req, res) => {
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
