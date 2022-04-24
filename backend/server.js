const http = require("http");
const { set } = require("lodash");
const fs = require("fs");
/* const _ = require("lodash"); */

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  res.setHeader("content-Type", "text/html");
  fs.readFile("./index.html", (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening to port 3000 😎");
});
