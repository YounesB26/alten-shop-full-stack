const usersService = require("./users.service");

module.exports = {
  getCart: async (userEmail) => {
    const user = await usersService.getUser(userEmail);

    if (!user || user.length === 0) {
      throw new Error("User not found.");
    }

    return user[0].cart || [];
  },
  saveCart: async (user, cart) => {
    user.cart = cart;
    const updatedUser = await usersService.updateUser(user);
    return updatedUser.cart;
  },
  addToCart: async (userEmail, productId, quantity) => {
    const user = usersService.getUser(userEmail);
    if (userIndex === -1) {
      throw new Error("User not found.");
    }

    if (!user.cart) {
      user.cart = [];
    }

    //Check if productId exist in the cart
    const productIndex = user.cart.findIndex(
      (item) => item.productId === productId
    );

    if (productIndex !== -1) {
      user.cart[productIndex].quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    return user.cart;
  },
  removeFromCart: async (userId, productId) => {
    const user = usersService.getUser(userId);
    if (!user) {
      throw new Error("User not found.");
    }

    if (!user.cart) {
      throw new Error("Cart is empty.");
    }

    const productIndex = user.cart.findIndex(
      (item) => item.productId === productId
    );
    if (productIndex === -1) {
      throw new Error("Product not found in cart.");
    }

    user.cart.splice(productIndex, 1);

    return user.cart;
  },
};
