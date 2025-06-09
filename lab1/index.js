import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

const products = [
  { id: 1, name: "Mouse", price: 250 },
  { id: 2, name: "Keyboard", price: 500 },
];

app.get("/products/search", (req, res) => {
  const query = req.query.name;
  if (!query) {
    return res.status(400).json("Query parameter 'name' is required");
  }

  const result = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  res.json(result);
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);
  //   const index = products.findIndex((p) => p.id === id);
  if (!product) return res.status(404).json({ error: "Product not found" });

  res.json(product);
});

app.post("/products", (req, res) => {
  const { name, price } = req.body;
  const newProduct = {
    id: products.length != 0 ? products[products.length - 1].id + 1 : 1,
    name,
    price,
  };
  products.push(newProduct);
  res.status(201).json({
    message: "Product addd",
    product: newProduct,
  });
});

app.put("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) return res.status(404).json({ error: "Product not found" });

  products[index] = { id, ...req.body };
  res.json({ message: "Product Updated", product: products[index] });
});

app.patch("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ error: "Product not found" });

  Object.assign(product, req.body);

  res.json({
    message: "Product partially updated",
    product,
  });
});

app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) return res.status(404).json({ error: "Product not found" });

  products.splice(index, 1);

  res.json({ message: "Product deleted" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
