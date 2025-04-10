require("dotenv").config();
const PORT = process.env.PORT;
const logger = require("./utils/logger");
const app = require("./app");

app.listen(PORT, (err) => {
  if (err) logger.error(err);
  logger.info(`Server is Running on PORT: ${PORT}`);
});
