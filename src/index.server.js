const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const path =require('path')
//environment variable
env.config();
//mongodb connection
//mongodb+srv://abhishek:<password>@cluster0.grgsb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.grgsb.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("database created");
  });
app.use(express.json());
app.use('/public',express.static(path.join(__dirname,'uploads')))
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
