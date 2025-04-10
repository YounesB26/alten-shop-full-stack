const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().required(),
  firstname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = userSchema;