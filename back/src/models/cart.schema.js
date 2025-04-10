const Joi = require("joi");
const cartSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().required(),
});

module.exports = Joi.array().items(cartSchema);
