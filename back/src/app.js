const express = require("express");
const app = express();
const productsRoutes = require("./routes/products.routes");
const accountRoutes = require("./routes/account.routes");
const authRoutes = require("./routes/auth.routes");
const cartRoutes = require("./routes/cart.routes");
const savedItemsRoutes = require("./routes/savedItem.routes");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsConfig = require("./config/cors.config");

app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json());

app.use("/products", productsRoutes);
app.use("/account", accountRoutes);
app.use("/token", authRoutes);
app.use("/cart", cartRoutes);
app.use("/savedItems", savedItemsRoutes);

module.exports = app;