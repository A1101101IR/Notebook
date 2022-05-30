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
  "mongodb+srv://fullstack:9K4ADMWCdbfPe9bI@cluster0.s6vjp.mongodb.net/fullstack01?retryWrites=true&w=majority";

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

/* tell me if any req is made */
/* app.use((req, res, next) => {
  console.log("new req made");
  console.log("host: ", req.hostname);
  console.log("path:", req.path);
  console.log("method", req.method);
  next();
}); */

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

/* create new post */
app.post("/create", (req, res) => {
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

/* get all posts */
app.get("/posts", (req, res) => {
  Post.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

/* get single post by id */
app.get("/posts/:id", (req, res) => {
  db.collection("posts")
    .findOne({ _id: ObjectId(req.params.id) })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

/* get single post by id and delete */
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  Post.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
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

/* add like to post */
app.post("/like/:id", (req, res) => {
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
/* delete like from post */
app.delete("/like/:id", (req, res) => {
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

/* get all users */
app.get("/users", (req, res) => {
  User.find()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/* get singel user by id */
app.get("/users/:id", (req, res) => {
  db.collection("users")
    .findOne({ _id: ObjectId(req.params.id) })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/* uppdate user info */
app.patch("/edituser/:id", (req, res) => {
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

/* uppdate user arrays info */
app.post("/edituser/:id", (req, res) => {
  console.log(req.body);
  db.collection("users")
    .updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $push: {
          followers: {
            followersId: req.body.followersId,
          },
          following: {
            followingId: req.body.followingId,
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

/* follow and onfollow */
app.post("/follow/:id", (req, res) => {
  db.collection("users")
    .updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $push: {
          followers: {
            followersId: req.body.followersId,
          },
        },
      }
    )
    .then((result) => {
      res.status(201).json({ status: result });
    })
    .then((err) => {
      res.status(500).json(err);
    });
});

/* add followers after follow */
app.post("/following/:id", (req, res) => {
  console.log(req.body);
  db.collection("users")
    .updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $push: {
          following: {
            followingId: req.body.followingId,
          },
        },
      }
    )
    .then((result) => {
      res.status(201).json({ status: result });
    })
    .then((err) => {
      res.status(500).json(err);
    });
});

/* get users posts */
app.get("/userposts/:id", (req, res) => {
  Post.find({ authorId: req.params.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/* user search */
app.get("/search", async (req, res) => {
  console.log(req.body.search);
  try {
    User.findOne({
      firstname: req.body.search,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json(err);
  }
});
