import Joi from 'joi';
import validate from './validate';
import { Request, Response } from 'express';

export const validateLogin = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    code: Joi.string().required(),
  });

  return validate(req, res, schema);
};

export const validateSendAuthCode = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    email: Joi.string().max(50).required(),
    type: Joi.number().required(),
  });

  return validate(req, res, schema);
}

export const validateCheckAuthCode = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    email: Joi.string().max(50).required(),
    type: Joi.number().required(),
    code: Joi.string().required(),
  });

  return validate(req, res, schema);
}