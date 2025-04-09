const logger = require("../utils/logger");

module.exports = {
  getProducts: async () => {
    try {
      if (!process.env.API_URI) {
        throw new Error("API_URI is not defined in environment variables.");
      }

      const response = await fetch(`${process.env.API_URI}/products`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      // Parsing data
      logger.info("'getProducts' service done!");
      return await response.json();
    } catch (error) {
      logger.error(error);
      throw new Error("Internal server error");
    }
  },
  getProductById: async (productId) => {
    try {
      if (!process.env.API_URI) {
        throw new Error("API_URI is not defined in environment variables.");
      }

      const response = await fetch(
        `${process.env.API_URI}/products/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      logger.error("getProductById : " + error);
      throw new Error("Internal server error");
    }

    return { id: productId };
  },
};
