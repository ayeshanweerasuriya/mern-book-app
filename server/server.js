const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./connectDB");
const Book = require("./models/Books");

const app = express();
const PORT = process.env.PORT || 8000;

// middleware | middlewares are functions that have access to objects res, req and next function
app.use(cors()); // This middleware is used to enable Cross-Origin Resource Sharing (CORS)
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // This middleware is used to parse incoming requests with JSON payloads || makes the data available on req.body
app.use("/uploads", express.static("uploads"));
app.use("/", (req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.get("/api/books", async (req, res) => {
  try {
    const category = req.query.category;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    const data = await Book.find(filter);
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occured while fetching the books." });
  }
});

app.get("/", (req, res) => {
  res.json("Success");
});

app.get("*", (req, res) => {
  res.send("not found").status(404);
});

connectDB().then((response) => {
  app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
  });
});
