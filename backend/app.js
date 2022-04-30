const express = require("express");
const { ObjectId } = require("mongodb");
const morgan = require("morgan");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
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

/* user reg new */
app.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.create({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "not ok" });
  }
});
/* user login */
app.post("/login", async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        email: req.body.email,
        firstname: req.body.firstname,
      },
      "secret123"
    );
    /* console.log(localStorage.getItem("token")); */
    return res.json({ token: token });
  } else {
    res.json({ status: "not ok" });
  }
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
