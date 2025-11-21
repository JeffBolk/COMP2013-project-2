// Jeffrey Bolk
// Backend Server

// Setup && Connection
const express = require("express");
const { request, response } = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/products");

const server = express();
const port = 3000;
require("dotenv").config();
const { DB_URI } = process.env;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

//DB connection and server start
mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Connection Error", error.message);
  });

// Routes
// Root
server.get("/", (request, response) => {
  response.send("Live");
});

// JSON Products
server.get("/products", async (request, response) => {
  try {
    const products = await Product.find();
    response.send(products);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// Add Product
server.post("/add-product", async (request, response) => {
  const { productName, brand, image, price } = request.body;
  const newProduct = new Product({
    id: new mongoose.Types.ObjectId().toString(),
    productName,
    brand,
    image,
    price,
  });
  try {
    await newProduct.save();
    response.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    response.status(201).json({ message: error.message });
  }
});

// Delete Product
server.delete("/products/:id", async (request, response) => {
  const { id } = request.params;
  const objectId = new mongoose.Types.ObjectId(id);
  try {
    await Product.findByIdAndDelete(objectId);
    await response.status(200).json({ message: "Product Deleted" });
  } catch (error) {
    response.status(200).json({ message: error.message });
  }
});

// Update Product
server.patch("/products/:id", async (request, response) => {
  const { id } = request.params;
  const { productName, brand, image, price } = request.body;
  const objectId = new mongoose.Types.ObjectId(id);
  try {
    await Product.findByIdAndUpdate(id, {
      productName,
      brand,
      image,
      price,
    });
    await response.status(200).json({ message: "Product Updated" });
  } catch (error) {
    await response.status(200).json({ message: error.message });
  }
});
