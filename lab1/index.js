import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

const products = [
  { id: 1, name: "Mouse", price: 250 },
  { id: 2, name: "Keyboard", price: 500 },
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Product not found" });

  res.json(products[index]);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
