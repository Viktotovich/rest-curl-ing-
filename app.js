const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<p>Hello World</p>");
});

app.get("/users", (req, res) => {
  res.send("Received a GET HTTP method on User Resource");
});

//i.e: curl -X POST http://localhost:3000
app.post("/users", (req, res) => {
  res.send("Received a POST HTTP");
});

app.put("/users", (req, res) => {
  res.send("Received a PUT HTTP method");
});

app.delete("/users", (req, res) => {
  res.send("Recieved a DELETE HTTP method");
});

app.put("/users/:userId", (req, res) => {
  return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});

app.delete("/users/:userId", (req, res) => {
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

app.listen(process.env.PORT, () => {
  console.log("Hey Ya");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json(err);
});
