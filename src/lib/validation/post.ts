import Joi from 'joi';
import validate from './validate';
import { Request, Response } from 'express';

export const validateCreate = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    title: Joi.string().min(1).max(50).required(),
    content: Joi.string().required(),
    is_private: Joi.boolean().required(),
    category_idx: Joi.number().integer().required(),
    thumbnail: Joi.string().max(800).required().allow(null),
  });

  return validate(req, res, schema);
};

export const validateCreateTemp = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    title: Joi.string().min(1).max(50).required(),
    content: Joi.string().allow('').allow(null),
    is_private: Joi.boolean(),
    category_idx: Joi.number().integer().allow(null),
    thumbnail: Joi.string().max(800).allow(null),
  });

  return validate(req, res, schema);
};

export const validateModify = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    title: Joi.string().min(1).max(50),
    content: Joi.string(),
    is_private: Joi.boolean(),
    is_temp: Joi.boolean(),
    category_idx: Joi.number().integer().allow(null),
    thumbnail: Joi.string().max(800).allow(null),
  });

  return validate(req, res, schema);
};