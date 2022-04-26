const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Post = require("./models/post");
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

/* get postsssss */
app.get("/posts", (req, res) => {
  console.log("User get all postdata!!");
  Post.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
