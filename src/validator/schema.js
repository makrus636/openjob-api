import Joi from 'joi';

export const UsersPayloadSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});

export const PostAuthenticationsPayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const PutAuthenticationsPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export const DeleteAuthenticationsPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export const CompaniesPayloadSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  location: Joi.string().required(),
});

export const UpdateCompaniesPayloadSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  location: Joi.string().required(),
});

export const CategoriesPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

export const UpdateCategoriesPayloadSchema = Joi.object({
  name: Joi.string().required(),
});