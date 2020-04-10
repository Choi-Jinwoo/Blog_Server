import Joi from 'joi';
import validate from './validate';
import { Request, Response } from 'express';

export const validateCreate = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    name: Joi.string().max(40).required(),
    fk_category_idx: Joi.number().integer().required().allow(null),
  });

  return validate(req, res, schema);
};

export const validateModify = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    name: Joi.string().max(40).required(),
    fk_category_idx: Joi.number().integer().required().allow(null),
  });

  return validate(req, res, schema);
};
