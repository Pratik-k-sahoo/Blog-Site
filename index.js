const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv').config();

const Blog = require("./models/blog");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const userRoute = require("./routes/user");
const blogRouter = require("./routes/blog");

const app = express();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGODBURL)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Error Occurred:" + err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({}).sort({ createdAt: -1 });
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRouter);

app.listen(PORT, () => console.log(`Server started at Port: ${PORT}`));
