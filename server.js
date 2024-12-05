const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const recipeRouter = require("./routes/recipe.route.js");
const userRouter = require("./routes/user.route.js");
const connectDB = require("./config/db.js");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));

// Routers
app.use("/recipes", recipeRouter);
app.use("/auth", userRouter);

app.get("/", (req, res) => res.send("Hello World This is Recipe Create Api!"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  connectDB();
});
