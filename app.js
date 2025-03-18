const express = require("express");
require("dotenv").config();
let { users, messages } = require("./db");
const uuidv4 = require("uuid").v4;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Building custom Middleware:
app.use((req, res, next) => {
  //
  /*Can be used for a PrismaClient instance
  
  *i.e:
  req.context = db
  */
  req.me = users[1];
  next();
});

app.get("/", (req, res) => {
  res.send("<p>Hello World</p>");
});

app.get("/users", (req, res) => {
  return res.send(Object.values(users));
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

app.get("/users/:userId", (req, res) => {
  return res.send(users[req.params.userId]);
});

app.put("/users/:userId", (req, res) => {
  return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});

app.delete("/users/:userId", (req, res) => {
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

app.get("/messages", (req, res) => {
  return res.send(Object.values(messages));
});

app.get("/messages/:messageId", (req, res) => {
  return res.send(messages[req.params.messageId]);
});

app.post("/messages", (req, res) => {
  const id = uuidv4();

  const message = {
    id,
    text: req.body.text,
    userId: req.me.id,
  };

  messages[id] = message;

  return res.send(message);
});

app.delete("/messages/:messageId", (req, res) => {
  const { [req.params.messageId]: message, ...otherMessages } = messages;

  messages = otherMessages;

  return res.send(message);
});

app.put("/messages/:messageId", (req, res) => {
  const { messageId } = req.params;
  messages[messageId] = req.body.text;
  res.send(messages);
});

app.listen(process.env.PORT, () => {
  console.log("Hey Ya");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json(err);
});
