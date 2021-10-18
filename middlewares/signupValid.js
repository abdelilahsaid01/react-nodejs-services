const jwt = require("jsonwebtoken");
const Joi = require("joi");
exports.signupValid = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().min(3).max(30).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    repeat_password: Joi.ref("password"),
  });
  const { error, value } = schema.validate({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    repeat_password: req.body.repeat_password,
  });
  console.log(value);
  if (error) return res.status(404).json(error.details[0].message);
  next();
};
