require("dotenv").config();
const express = require("express");
const app = express();
const productsRoute = require("./routes/products.routes");
const PORT = process.env.PORT;
const logger = require("./utils/logger");

app.use(express.json());

app.use("/products", productsRoute);


app.listen(PORT, (err) => {
  if (err) logger.error(err);
  logger.info(`Server is Running on PORT: ${PORT}`);
});
