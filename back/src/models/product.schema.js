const Joi = require("joi");

const productSchema = Joi.object({
  id: Joi.number().required(),
  code: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  internalReference: Joi.string().required(),
  shellId: Joi.number().required(),
  inventoryStatus: Joi.string()
    .valid("INSTOCK", "LOWSTOCK", "OUTOFSTOCK")
    .required(),
  rating: Joi.number().required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
});

module.exports = productSchema;
