import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().label('Name'),
  username: Joi.string().min(3).max(30).required().label('Username'),
  email: Joi.string().email().min(5).max(30).required().label('Email'),
  role: Joi.string().required().label('Role'),
  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,30}$")
    )
    .required()
    .label('Password')
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long, including one uppercase letter, one lowercase letter, one digit, and one special character.",
    })
});


export const loginSchema = Joi.object({
  email: Joi.string().email().min(5).max(30).required().label('Email is required'),
  password: Joi.string().required().label("Password is required")
})
