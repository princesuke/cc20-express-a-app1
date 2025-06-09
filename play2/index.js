import express from "express";
// import logger from "./middleware/logger.js";
import checkAuth from "./middleware/checkAuth.js";
import normalizeName from "./middleware/normalizeName.js";

import {
  logRequest,
  checkFieldName,
  toUpperCaseName,
  checkUserIdParam,
  checkApiKey,
} from "./middleware/index.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static("public"));

app.use(logRequest);

app.get("/", (req, res) => {
  res.send("welcome to express");
});

app.get("/hello", (req, res) => {
  res.send("hello hello");
});

app.get("/admin", checkAuth, checkApiKey, (req, res) => {
  res.send("Admin area");
});

app.post("/users", normalizeName, (req, res) => {
  res.send(req.body);
});

app.post("/greet", checkFieldName, toUpperCaseName, (req, res) => {
  res.send(req.body);
});

app.get("/users/:id", checkUserIdParam, (req, res) => {
  res.send(`User ID is ${req.params.id}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
