
const express = require("express");
const mongoose = require("mongoose");



const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.use("/users", require("./Routes/userRoute"));
app.use("/products", require("./Routes/productRoutes"));
app.use("/cart", require("./Routes/cartRoutes"));
app.use("/orders", require("./Routes/orderRoutes"));
app.use("/categories", require("./Routes/categoryRoutes"));

app.listen(3000, () => console.log("Server running on port 3000"));
