/* eslint-disable camelcase */
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

export const JobPayloadSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  company_id: Joi.string().required(),
  category_id: Joi.string().required(),
});

export const UpdateJobPayloadSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  company_id: Joi.string(),
  category_id: Joi.string(),
});