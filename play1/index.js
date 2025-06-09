import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("this is method get");
});

app.post("/product/add", (req, res) => {
  const { title, price, category } = req.body;

  if (!category) {
    res.status(404).json({ error: "missing category field!" });
  }

  res.send(`${title} and price is ${price}, category is ${category}`);
});

app.get("/user", (req, res) => {
  const { role, age } = req.query;
  res.send(`this is role ${role}, age = ${age}`);
});

app.get("/hello", (req, res) => {
  res.send("Hello from get");
});

app.post("/user/:name/year/:age", (req, res) => {
  const { name, age } = req.params;

  res.send(`name is ${name}, age = ${age}`);
});

app.put("/", (req, res) => {
  res.send("this is method put");
});

app.patch("/", (req, res) => {
  res.send("this is method patch");
});

app.delete("/", (req, res) => {
  res.send("this is method delete");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
