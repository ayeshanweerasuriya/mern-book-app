const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./connectDB");
const Book = require("./models/Books");
const multer = require("multer");

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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// app.get("/", (req, res) => {
//   res.json("Success");
// });

const upload = multer({ storage: storage });

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

app.post("/api/books", upload.single("thumbnail"), async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    const newBook = new Book({
      title: req.body.title,
      slug: req.body.slug,
      stars: req.body.stars,
      description: req.body.description,
      category: req.body.category,
      thumbnail: req.file.filename,
    });

    await Book.create(newBook);
    res.json("Data Submitted");
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occured while fetching the books." });
  }
});

// app.post("/api/books", async (req, res) => {
//   try {
//     console.log(req.body);

//     const newBook = new Book({
//       title: req.body.title,
//       slug: req.body.slug,
//       stars: req.body.stars,
//       description: req.body.description,
//       category: req.body.category,
//       // thumbnail: req.file.thumbnail,
//     });

//     await Book.create(newBook);
//     res.json("Data Submitted");
//   } catch (err) {
//     res
//       .status(500)
//       .json({ error: "An error occured while fetching the books." });
//   }
// });

app.put("/api/books", upload.single("thumbnail"), async (req, res) => {
  try {
    const bookId = req.body.bookId;

    const updateBook = {
      title: req.body.title,
      slug: req.body.slug,
      stars: req.body.stars,
      description: req.body.description,
      category: req.body.category,
    };

    if (req.file) {
      updateBook.thumbnail = req.file.filename;
    }

    await Book.findByIdAndUpdate(bookId, updateBook);
    res.json("Data Submitted");
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occured while fetching the books." });
  }
});

app.get("/api/books/:slug", async (req, res) => {
  try {
    const slugParam = req.params.slug;
    const data = await Book.findOne({ slug: slugParam });

    res.json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occured while fetching the books." });
  }
});

app.delete("/api/books/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    await Book.deleteOne({ _id: bookId });
    res.json("Deleted Successfully" + req.body.bookId);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while deleting the books." });
  }
});

app.get("*", (req, res) => {
  res.send("not found").status(404);
});

connectDB().then((response) => {
  app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
  });
});
