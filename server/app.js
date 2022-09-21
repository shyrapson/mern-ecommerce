require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const useRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const errorHandlerMiddleware = require("./middlewares/Error-handler");
const cors = require("cors");
// const {AuthenticationMiddleware} = require("./middlewares/Authorization");

app.use(express.json());
app.use(cors())
app.use(errorHandlerMiddleware);
app.use("/api/v1", useRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/products", cartRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/checkout", stripeRoute);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connection successful");
  } catch (error) {
    console.log(error);
  }
  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
};

start();
