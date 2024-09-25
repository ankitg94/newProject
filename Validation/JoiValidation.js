import Joi from "joi";
export const validateUser = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().trim().min(3).max(50).required().messages({
      "string.base": "Full name should be a string",
      "string.min": "Full name should be at least 3 characters",
      "string.max": "Full name should not exceed 50 characters",
      "any.required": "Full name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email",
      "any.required": "Email is required",
    }),
    phoneNumber: Joi.number().integer().min(1000000000).max(9999999999).required().messages({
      "number.base": "Phone number must be a number",
      "number.min": "Phone number must be at least 10 digits",
      "number.max": "Phone number must not exceed 10 digits",
      "any.required": "Phone number is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password should be at least 6 characters long",
      "any.required": "Password is required",
    }),
    role: Joi.string().valid("user", "seller", "admin").default("user").messages({
      "any.only": "Role must be one of ['user', 'seller', 'admin']",
    }),
    tokenVersion:Joi.number().optional()
  });

  return schema.validate(data, { abortEarly: false }); 
};


const productValidationSchema = Joi.object({
  category: Joi.string().required(),
  name: Joi.string().required(),
  productdetails: Joi.string().optional(),
  images: Joi.array().items(Joi.string()).min(1).required(),
  quantity: Joi.number().optional(),
  inStock: Joi.boolean().optional().default(true),
});

export const validateProduct = (data) => {
  return productValidationSchema.validate(data, { abortEarly: false });
};