const express = require("express");
/* const { default: mongoose } = require("mongoose"); */
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
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

/* app.use((req, res, next) => {
  console.log("new req made");
  console.log("host: ", req.hostname);
  console.log("path:", req.path);
  console.log("method", req.method);
  next();
}); */

/* it get info about which req is comming to server. */
app.use(morgan("dev"));
/* create a new blog */
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog 2",
    snippet: "about my blog",
    body: "this is a new blog",
  });
  blog.save();
});
/* get all blog */
app.get("/all-blog", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
/* get single blog */
app.get("/this-blog", (req, res) => {
  Blog.findById("6266b228b80274340f6e99a2")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

/* app.get("/api", (req, res, next) => {
  res.json({ message: "hello from backend!" });
  next();
}); */

app.get("/", (req, res) => {
  res.send(console.log(`Server is listening to ${PORT}`));
});
