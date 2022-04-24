const express = require("express");
const morgan = require("morgan");
const PORT = process.env.PORT || 3000;
const app = express();
const databaseURL =
  "mongodb+srv://amir:Amir2022@cluster0.s6vjp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.listen(3001);

/* app.use((req, res, next) => {
  console.log("new req made");
  console.log("host: ", req.hostname);
  console.log("path:", req.path);
  console.log("method", req.method);
  next();
}); */

/* it get info about which req is comming to server. */
app.use(morgan("dev"));

app.get("/api", (req, res, next) => {
  res.json({ message: "hello from backend!" });
  next();
});

app.get("/", (req, res) => {
  res.send(console.log(`Server is listening to ${PORT}`));
});
