const logger = require("../utils/logger");
const crypto = require("crypto");

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
        throw new Error(`Error fetching products: ${response.statusText}`);
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
        if (response.status === 404) {
          return [];
        }
        throw new Error(`Error fetching product: ${response.statusText}`);
      }

      return [await response.json()];
    } catch (error) {
      logger.error("getProductById : " + error);
      throw new Error("Internal server error");
    }
  },
  addProduct: async (product) => {
    try {
      if (!process.env.API_URI) {
        throw new Error("API_URI is not defined in environment variables.");
      }

      if (!product) {
        throw new Error("Product is required");
      }

      //Manually manage IDs because json-server generate string ids
      // I use string because json-server generate string ids
      product.id = crypto.randomInt(10000000).toString();

      const response = await fetch(`${process.env.API_URI}/products`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(product),
      });

      return await response.json();
    } catch (error) {
      logger.error("addProduct : " + error);
      throw new Error("Internal server error");
    }
  },
  updateProduct: async (product) => {
    try {
      if (!process.env.API_URI) {
        throw new Error("API_URI is not defined in environment variables.");
      }

      if (!product) {
        throw new Error("Product is required");
      }

      const response = await fetch(
        `${process.env.API_URI}/products/${product.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify(product),
        }
      );

      if (!response.ok) {
        throw new Error(`Error updating product : ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      logger.error("addProduct : " + error);
      throw new Error("Internal server error");
    }
  },
  deleteProduct: async (productId) => {
    try {
      if (!process.env.API_URI) {
        throw new Error("API_URI is not defined in environment variables.");
      }

      if (!productId) {
        throw new Error("Product ID is required");
      }

      const response = await fetch(
        `${process.env.API_URI}/products/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Error deleting product: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      logger.error("deleteProduct : " + error);
      throw new Error("Internal server error");
    }
  },
};
