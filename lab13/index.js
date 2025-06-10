import express from "express";
import { checkAdmin } from "./middleware/index.js";

const app = express();
const PORT = 3000;

const users = [
  { name: "Alice", email: "alice@gmail.com", role: "user" },
  { name: "Bob", email: "bob@gmail.com", role: "admin" },
];

app.use(express.json());

//routes
app.get("/users", (req, res) => {
  res.json({ users });
});

app.post("/users", (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email || !role) {
    res.status(400).json({ error: "Missing fields" });
  }

  const newUser = { name, email, role };
  users.push(newUser);

  res.status(201).json({
    message: "User added",
    user: newUser,
  });
});

app.delete("/users/:email", checkAdmin, (req, res) => {
  const email = req.params.email;

  const index = users.findIndex((u) => u.email === email);
  users.splice(index, 1);

  res.json({ message: "User deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
